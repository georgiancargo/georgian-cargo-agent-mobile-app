import React, {useState, useEffect, useContext} from "react";
import {Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {SelectDropdown} from "_atoms";
import {InputWithError, Button} from "_atoms";
import {SummaryList} from "_molecules";
import {Divider} from "react-native-paper";
import {useOfflineRequest} from "_hooks";
import {ErrorText} from "_atoms";
import {AuthContext} from "_context";
import {useRequest} from "_hooks";
import {paymentRequest} from "_requests";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const Summary = ({navigation, route: {params}}) => {
    const {parcels = [], setAlert = () => {}} = params;
    const [pickupRequest, requesting] = useOfflineRequest({
        url: "/cargo/pickup",
        method: "POST",
    });

    const [pay, paying] = useRequest(paymentRequest);

    const {auth} = useContext(AuthContext);
    const getCash = auth.agent.privileges.includes("COLLECT_CASH_PAYMENTS");
    const getBank = auth.agent.privileges.includes("COLLECT_BANK_PAYMENTS");

    const [summaryData, setSummary] = useState({
        coupon_code: "",
        payment_method: "ONLINE",
        // extra_charges: [],
    });
    const [sum, setSum] = useState(0);
    const [errors, setErrors] = useState([]);
    const [payment_methods, setPaymentMethods] = useState([
        {label: "Online", value: "ONLINE"},
    ]);

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

    useEffect(() => {
        const newMethods = payment_methods.slice();
        if (getCash) newMethods.push({label: "Cash", value: "CASH"});
        if (getBank) newMethods.push({label: "Bank", value: "BANK"});
        setPaymentMethods(newMethods);
    }, [auth]);

    // const removeExtraCharge = (index) => {
    //     const newExtra = summaryData.extra_charges.slice();
    //     newExtra.splice(index, 1);
    //     setSummary({...summaryData, extra_charges: newExtra});
    // };

    const onCheckout = () => {
        const invoice_ids = [];

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
                try {
                    if(error.response.data.data.errors.length > 0){
                        setErrors(error.response.data.data.errors[0]);
                    }else{
                        setErrors(error.response.data.message);
                    }
                } catch (error) {}
            }
            if (i === parcels.length - 1) {
                setAlert(false);
                pay({
                    invoice_ids: invoice_ids,
                    payment_method: summaryData.payment_method,
                })
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {
                        navigation.navigate("Home");
                    });
            }
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
                    <SelectDropdown
                        list={payment_methods}
                        name="payment_method"
                        onSelect={onChange}
                        selectedValue={summaryData.payment_method}
                        placeholder="Payment method"
                    />
                    <ErrorText error={errors} />
                    <Divider style={{marginBottom: 10}} />
                    <View style={[s.formGroup]}>
                        <Text>Sum is: {isNaN(sum) ? 'Cannot be calculated, please contact administrator' : sum}</Text>
                    </View>
                </View>
                <SummaryList parcels={parcels} />
            </View>
            <View style={{marginBottom: 10}}>
                <Button onPress={onCheckout} loading={requesting || paying}>
                    Checkout
                </Button>
            </View>
        </>
    );
};
export default Summary;
