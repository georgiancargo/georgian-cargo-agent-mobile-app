import React, {useState, useEffect} from "react";
import {ScrollView, View} from "react-native";
import {
    InputWithError,
    Button,
    SelectDropdown,
    InputAutoComplete,
    PreventGoingBack
} from "_atoms";
import {PickupList, RadioButtonGroup} from "_molecules";
import {useValidation} from "_hooks";
import senderDataValidations from "./PickupItemValidations";
import { SourceRoutesDropdown } from "_molecules";

const PickupItemScreen = ({navigation}) => {
    const btnGroup = {flex: 1, borderRadius: 20, marginRight: 5};
    const {errors, validate, hasErrors} = useValidation(senderDataValidations);

    const [parcels, setParcels] = useState([]);
    const [sender, setSender] = useState({});
    const [shouldAlert, setAlert] = useState(false);
    
    const [globalSettings, setGlobal] = useState({
        parcel_type: "PARCEL",
    });

    const labels = ["Sender phone", "Sender Email", "Sender addrees line 1", "Sender address line 2", "Sender address postal code"];
    const keys = ["phone", "email", "address_line_1", "address_line_2", "postal_code"];
    
    useEffect(() => {
        if (parcels.length > 0) setAlert(true);
    }, [parcels.length]);
    
    const onChangeParcel = (name, value) => {
        setGlobal({...globalSettings, [name]: value});
        setAlert(true);
    };
    
    const parcelType = [
        {label: "Freight", value: "FREIGHT"},
        {label: "Parcel", value: "PARCEL"},
        {label: "Palette", value: "PALETTE"},
    ];
    
    const addReceiver = () => {
        validate(sender).then(()=>{
            const index = parcels.length;
            navigation.navigate("Add Parcel", {
                index: index,
                setParcels: setParcels,
                // parcels: index ? {...parcels, [index]: temp} : temp,
                parcels: parcels,
                newParcel: {description: "Clothes", item_price: 75, item_currency_code:"EUR"},
                newReceiver: {},
                source_country_code: sender.country_code,
                parcel_type: globalSettings.parcel_type,
                customer_type: globalSettings.customer_type,
            });
        }).catch((e)=>{
        });
    };

    const editParcel = (index, parcel, receiver) => {
        navigation.navigate("Add Parcel", {
            index: index,
            setParcels: setParcels,
            parcels: parcels,
            newParcel: parcel,
            newReceiver: receiver,
            source_country_code: sender.country_code,
            parcel_type: globalSettings.parcel_type,
            customer_type: globalSettings.customer_type,
        });
    };
    const onChange = (name, value) => {
        const newSender = {...sender, [name]: value};
        setSender(newSender);
        setAlert(true);
        validate(newSender, name).catch(() => {});
    };
    const gotoSummary = () => {
        validate(sender)
            .then(() => {
                if (parcels.length > 0) {
                    const parcelsTemp = parcels.slice();
                    for (let key = 0; key < parcelsTemp.length; key++) {
                        parcelsTemp[key] = {
                            ...parcelsTemp[key],
                            ...globalSettings,
                        };
                        parcelsTemp[key].sender = sender;
                        const r = parcelsTemp[key].receiver;
                        parcelsTemp[key].receiver = r ? r : {};
                    }
                    navigation.navigate("Summary", {
                        parcels: parcelsTemp,
                        setAlert: setAlert,
                    });
                }
            })
            .catch(() => {});
    };
    const removeParcel = (index) => {
        const newParcels = parcels.slice();
        newParcels.splice(index, 1);
        setParcels(newParcels);
    };
    const container = {flex:1, backgroundColor:"white", padding:10}
    return (
        // <View style={[s.container, s.bgWhite, s.p3, {flex: 1}]}>
        <>
            <PreventGoingBack
                navigation={navigation}
                shouldAlert={shouldAlert}
            />
            <ScrollView style={container}>
                <View style={{borderWidth: 0, flex: 5.1}}>
                    <InputAutoComplete
                        name="name"
                        value={sender.name}
                        error={errors.name}
                        // label={label}
                        placeholder="Sender name"
                        onChangeText={onChange}
                        setUser={setSender}
                        validate={validate}
                        isCustomer
                    />
                    {keys.map((key, i) => (
                        <InputWithError
                            name={key}
                            value={sender[key]}
                            error={errors[key]}
                            placeholder={labels[i]}
                            onChangeText={onChange}
                            key={"sender_" + key}
                        />
                    ))}
                    <SourceRoutesDropdown
                        name="country_code"
                        onSelect={onChange}
                        error={errors.country_code}
                        selectedValue={sender.country_code}
                        placeholder="Sender address country code"
                    />
                    <SelectDropdown
                        list={parcelType}
                        name="parcel_type"
                        onSelect={onChangeParcel}
                        selectedValue={globalSettings.parcel_type}
                        placeholder="Parcel Type"
                    />
                    <RadioButtonGroup
                        label="Customer Type"
                        onValueChange={onChangeParcel}
                        val={globalSettings.customer_type}
                        values={["INDIVIDUAL", "CORPORATE"]}
                        name="customer_type"
                        checkLabels={["Individual", "Corporate"]}
                    />
                    <View
                        style={{
                            borderWidth: 0,
                            flex: 0.5,
                            flexDirection: "row",
                        }}
                    >
                        <Button style={btnGroup} onPress={addReceiver}>
                            Add Parcel
                        </Button>
                        <Button
                            style={btnGroup}
                            onPress={gotoSummary}
                            disabled={hasErrors || parcels.length <= 0}
                        >
                            Summary
                        </Button>
                    </View>
                    <View style={{borderWidth: 0, flex: 3}}>
                        <PickupList
                            parcels={parcels}
                            editParcel={editParcel}
                            removeParcel={removeParcel}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default PickupItemScreen;
