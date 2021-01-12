import React, {useState} from "react";
import {ScrollView, View} from "react-native";
import {
    InputWithError,
    Button,
    SelectDropdown,
    InputAutoComplete,
    PreventGoingBack
} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {PickupList, RadioButtonGroup} from "_molecules";
import {useValidation} from "_hooks";
import senderDataValidations from "./PickupItemValidations";
import { SourceRoutesDropdown } from "_molecules";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const PickupItemScreen = ({navigation}) => {
    const btnGroup = {flex: 1, borderRadius: 20, marginRight: 5};
    const {errors, validate, hasErrors} = useValidation(senderDataValidations);

    const [parcels, setParcels] = useState([]);
    const [sender, setSender] = useState({});
    
    const [globalSettings, setGlobal] = useState({
        parcel_type: "PARCEL",
    });

    const labels = ["Sender phone", "Sender Email", "Sender addrees line 1", "Sender address line 2", "Sender address postal code"];
    const keys = ["phone", "email", "address_line_1", "address_line_2", "postal_code"];
    
    const onChangeParcel = (name, value) => {
        setGlobal({...globalSettings, [name]: value});
    };
    
    const parcelType = [
        {label: "Freight", value: "FREIGHT"},
        {label: "Parcel", value: "PARCEL"},
        {label: "Palette", value: "PALETTE"},
    ];
    
    const addReceiver = () => {
        alert(JSON.stringify(sender));
        validate(sender).then(()=>{
            const index = parcels.length;
            navigation.navigate("Add Parcel", {
                index: index,
                setParcels: setParcels,
                // parcels: index ? {...parcels, [index]: temp} : temp,
                parcels: parcels,
                newParcel: {description: "Clothes"},
                newReceiver: {},
                source_country_code: sender.country_code,
                parcel_type: globalSettings.parcel_type,
                customer_type: globalSettings.customer_type,
            });
        }).catch((e)=>{
            alert(JSON.stringify(e));
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
    return (
        <View style={[s.container, s.bgWhite, s.p3, {flex: 1}]}>
            <PreventGoingBack navigation={navigation} />
            <InputAutoComplete
                name="name"
                value={sender.name}
                error={errors.name}
                // label={label}
                placeholder="Sender name"
                onChangeText={onChange}
                setUser={setSender}
                isCustomer
            />
            <ScrollView>
                <View style={{borderWidth: 0, flex: 5.1}}>
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
                        <Button style={[btnGroup]} onPress={addReceiver}>
                            Add Parcel
                        </Button>
                        <Button
                            style={[btnGroup]}
                            onPress={gotoSummary}
                            disabled={hasErrors}
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
        </View>
    );
};

export default PickupItemScreen;
