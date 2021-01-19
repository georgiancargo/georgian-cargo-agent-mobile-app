import React, {useState, useEffect} from "react";
import {Text, View} from "react-native";
import {InputWithError, Button} from "_atoms";
import {SummaryList, PaymentDropdown} from "_molecules";
import {useOfflineRequest} from "_hooks";
import {ErrorText} from "_atoms";
import {useRequest} from "_hooks";
import {paymentRequest, uploadInvoiceRequest, getDiscount} from "_requests";
import {confirmAlert} from "_utils";
import { Alert } from "react-native";
import * as SMS from 'expo-sms';

const Summary = ({navigation, route: {params}}) => {
    const {parcels = [], setAlert = () => {}} = params;
    const [pickupRequest, requesting] = useOfflineRequest({
        url: "/cargo/pickup",
        method: "POST",
    });

    const [pay, paying] = useRequest(paymentRequest);
    const [uploadInvoice, uploading] = useRequest(uploadInvoiceRequest);
    const [apply, applying] = useRequest(getDiscount);

    const [summaryData, setSummary] = useState({
        coupon_code: "",
        payment_method: "ONLINE",
        // extra_charges: [],
    });
    const [sum, setSum] = useState(0);
    const [errors, setErrors] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [total_discounts, setTotalDiscounts] = useState(0);

    useEffect(() => {
        let s = 0;
        parcels.forEach((parcel) => {
            s += parcel.price;
            if (parcel.extra_charges){
                parcel.extra_charges.map(
                    (extra) => (s += parseFloat(extra.amount))
                );
            }
        });
        setSum(s);
    }, [parcels]);
    
    useEffect(() => {
        if (discounts.length) {
            let s = 0;
            let d = 0;
            parcels.forEach((parcel) => {
                s += parcel.price;
                if (parcel.extra_charges) {
                    parcel.extra_charges.map(
                        (extra) => (s += parseFloat(extra.amount))
                    );
                }
            });
            discounts.forEach((discount) => {
                d += discount;
            });
            setSum(s - d);
            setTotalDiscounts(d);
        }
    }, [discounts]);

    const onChange = (name, value) => {
        setSummary({...summaryData, [name]: value});
    };

    const checkout = () => {
        const invoice_ids = [];
        let hasErrors = false;

        parcels.forEach(async (data, i) => {
            const payload = {
                ...summaryData,
                ...data,
                source_country_code: data.sender.country_code,
                destination_country_code: data.receiver.country_code,
            };
            try {
                const res = await pickupRequest(payload);
                const invoice_id = await res.data.cargo.invoice.invoice_id;
                const invoice = payload.invoice;
                invoice_ids.push(invoice_id);
                if(invoice) await uploadInvoice({invoice_id, invoice});
                setErrors("");
            } catch (error) {
                hasErrors = true;
                try {
                    if(error.response.data.data.errors.length > 0){
                        setErrors(error.response.data.data.errors[0]);
                    }else{
                        setErrors(error.response.data.message);
                    }
                } catch (error) {}
            }
            if (i === parcels.length - 1 && !hasErrors) {
                setAlert(false);
                pay({
                    invoice_ids: invoice_ids,
                    payment_method: summaryData.payment_method,
                })
                    .then(() => {
                        Alert.alert(
                            "Done",
                            "Checked out successfully!",
                            [{text: "Home", onPress: () => navigation.navigate("Home")}],
                            // {cancelable: true}
                        );
                        // navigation.navigate("Home");
                    })
                    .catch((e) => {
                        alert(e);
                    });
            }
        });
    };
    const confirmCheckout = () => {
        confirmAlert({
            paragraph: "Sure you want to checkout?",
            onConfirm: checkout,
        });
        
    };
    const applyCoupon = () => {
        const prices = [];
        parcels.forEach((parcel) => {
            let freight_price = parcel.freight_price;
            let delivery_price = parcel.delivery_price;
            let extra_charges = parcel.extra_charges;
            prices.push({freight_price, delivery_price, extra_charges});
        });
        apply({prices, coupon: summaryData.coupon_code})
            .then((r) => {
                // alert(JSON.stringify(r.data));
                setDiscounts(r.data.discounts);
            })
            .catch((e) => {});
    };
    const confirmCoupon = () => {
        confirmAlert({
            paragraph: "Sure you want to apply this coupon?",
            onConfirm: applyCoupon,
        });
        
    };
    const sendSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            const number = parcels[0].sender.phone;
            let msg = "";
            // Tracking number, tracking link, weight and price
            parcels.forEach((parcel, index) => {
                const p = parcel.price;
                const n = parcel.tracking_number;
                const l = `http://georgiancargo.co.uk/home/${n}`;
                const w = parcel.weight;
                const i = index + 1;
                msg += `${i})\tTracking number: ${n}\n\tTracking link: ${l}\n\tWeight: ${w} KG\n\tPrice: ${p}\n`;
            });
            const {result} = await SMS.sendSMSAsync(number, msg, {});
        } else {
            alert("Failed to open SMS app");
        }
    };
    return (
        <>
            <View style={{flex: 1, backgroundColor: "white", padding: 15}}>
                <SummaryList parcels={parcels} discounts={discounts}/>
                <View style={{marginBottom: 20}}>
                    <Text style={{fontSize: 20}}>Discount is: <Text style={{fontWeight: 'bold'}}>{isNaN(total_discounts) ? 'Cannot be calculated, please contact administrator' : total_discounts}</Text></Text>
                    <Text style={{fontSize: 25}}>Sum is: <Text style={{fontWeight: 'bold'}}>{isNaN(sum) ? 'Cannot be calculated, please contact administrator' : sum}</Text></Text>
                </View>
                <ErrorText error={errors} />
                <View>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 3, marginRight:5}}>
                            <InputWithError
                                name="coupon_code"
                                placeholder="Coupon"
                                onChangeText={onChange}
                                value={summaryData.coupon_code}
                            />
                        </View>
                        <View style={{flex: 2}}>
                            <Text></Text>
                            <Button onPress={confirmCoupon} loading={applying} disabled={requesting || paying || uploading}>Apply</Button>
                        </View>
                    </View>
                    <PaymentDropdown
                        // list={payment_methods}
                        link={true}
                        name="payment_method"
                        onSelect={onChange}
                        selectedValue={summaryData.payment_method}
                        placeholder="Payment method"
                    />
                    {/* <Divider style={{marginBottom: 10}} /> */}
                </View>
            <View style={{marginTop: 10}}>
                <Button onPress={sendSMS} disabled={requesting || paying || uploading || applying}>
                    Send Summary SMS
                </Button>
            </View>
            <View style={{marginTop: 10}}>
                <Button onPress={confirmCheckout} loading={requesting || paying || uploading || applying}>
                    Checkout
                </Button>
            </View>
            </View>
        </>
    );
};
export default Summary;
