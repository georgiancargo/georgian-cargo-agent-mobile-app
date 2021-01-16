import React, {useState, useEffect} from "react";
import {Text, View} from "react-native";
import {InputWithError, Button} from "_atoms";
import {SummaryList, PaymentDropdown} from "_molecules";
import {Divider} from "react-native-paper";
import {useOfflineRequest} from "_hooks";
import {ErrorText} from "_atoms";
import {useRequest} from "_hooks";
import {paymentRequest} from "_requests";
import {confirmAlert} from "_utils";
import { Alert } from "react-native";


const Summary = ({navigation, route: {params}}) => {
    const {parcels = [], setAlert = () => {}} = params;
    const [pickupRequest, requesting] = useOfflineRequest({
        url: "/cargo/pickup",
        method: "POST",
    });

    const [pay, paying] = useRequest(paymentRequest);

    const [summaryData, setSummary] = useState({
        coupon_code: "",
        payment_method: "ONLINE",
        // extra_charges: [],
    });
    const [sum, setSum] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let s = 0;
        parcels.forEach((parcel) => {
            s += parcel.price;
        });
        setSum(s);
    }, [parcels]);

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
                invoice_ids.push(res.data.cargo.invoice.invoice_id);
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
                            {cancelable: true}
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
    return (
        <>
            <View style={{flex: 1, backgroundColor: "white", padding: 15}}>
                <View>
                    <InputWithError
                        name="coupon_code"
                        placeholder="Coupon"
                        onChangeText={onChange}
                        value={summaryData.coupon_code}
                    />
                    <PaymentDropdown
                        // list={payment_methods}
                        dummyBank={true}
                        name="payment_method"
                        onSelect={onChange}
                        selectedValue={summaryData.payment_method}
                        placeholder="Payment method"
                    />
                    <ErrorText error={errors} />
                    <Divider style={{marginBottom: 10}} />
                    <View style={{marginBottom: 10}}>
                        <Text>Sum is: {isNaN(sum) ? 'Cannot be calculated, please contact administrator' : sum}</Text>
                    </View>
                </View>
                <SummaryList parcels={parcels} />
            </View>
            <View style={{marginBottom: 10}}>
                <Button onPress={confirmCheckout} loading={requesting || paying}>
                    Checkout
                </Button>
            </View>
        </>
    );
};
export default Summary;
