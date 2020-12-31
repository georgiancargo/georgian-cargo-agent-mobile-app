import React, {useState, useEffect} from "react";
import {ScrollView, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {SelectDropdown} from "_atoms";
import {InputWithError, Button} from "_atoms";
import {SummaryList, ExtraChargesTable} from "_molecules";
import {Divider} from "react-native-elements";
import {useOfflineRequest} from "_hooks";
import {HelperText} from "react-native-paper";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Summary = ({navigation, route: {params}}) => {
    const {parcels = []} = params;
    const [pickupRequest, loading] = useOfflineRequest({
        url: "/cargo/pickup",
        method: "POST",
    });
    const [summaryData, setSummary] = useState({
        coupon_code: "FREE50",
        extra_charges: [],
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

    const payment_methods = [
        {label: "Cash", value: "CASH"},
        {label: "Online", value: "ONLINE"},
        {label: "Bank", value: "BANK"},
    ];

    const removeExtraCharge = (index) => {
        const newExtra = summaryData.extra_charges.slice();
        newExtra.splice(index, 1);
        setSummary({...summaryData, extra_charges: newExtra});
    };

    const onCheckout = () => {
        parcels.forEach(async (data) => {
            try {
                await pickupRequest({
                    ...summaryData,
                    ...data,
                    source_country_code: data.sender.country_code,
                    destination_country_code: data.receiver.country_code,
                });
            } catch (error) {
                setErrors(error);
            }
        });
    };
    return (
        <>
            <ScrollView style={[s.container, s.bgWhite]}>
                <View style={[s.container, s.p3]}>
                    <View style={[s.formGroup]}>
                        <InputWithError
                            // label="Coupon"
                            name="coupon_code"
                            placeholder="Coupon"
                            onChangeText={onChange}
                            value={summaryData.coupon_code}
                        />
                    </View>
                    <View style={[s.formGroup]}>
                        {/* <Text style={[s.text]}>Payment method</Text> */}
                        <SelectDropdown
                            list={payment_methods}
                            name="payment_method"
                            onSelect={onChange}
                            selectedValue={summaryData.payment_method}
                            placeholder="Payment method"
                        />
                    </View>
                    <View style={[s.formGroup]}>
                        <ExtraChargesTable
                            extra_charges={summaryData.extra_charges}
                            removeExtraCharge={removeExtraCharge}
                        />
                    </View>
                    <View style={[s.formGroup]}>
                        {/* <Text>{JSON.stringify(summaryData)}</Text> */}
                        <SummaryList parcels={parcels} />
                    </View>
                    <Divider
                        style={{backgroundColor: "blue", marginBottom: 10}}
                    />
                    <View style={[s.formGroup]}>
                        <Text>Sum is: {sum}</Text>
                        {/* <SummaryList parcels={parcels} /> */}
                        <Text>{JSON.stringify(errors)}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={[s.formGroup]}>
                <Button onPress={onCheckout}>Checkout</Button>
            </View>
        </>
    );
};
export default Summary;
