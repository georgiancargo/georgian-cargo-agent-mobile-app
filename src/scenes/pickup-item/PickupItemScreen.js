import React, {useEffect, useState} from "react";
import {ScrollView, View, Text} from "react-native";
import {
    InputWithError,
    Button,
    SelectDropdown,
    InputAutoComplete,
} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {PickupList, RadioButtonGroup} from "_molecules";
import {useValidation} from "_hooks";
import senderDataValidations from "./PickupItemValidations";
import { SourceRoutesDropdown } from "_molecules";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const PickupItemScreen = ({navigation}) => {
    const btnGroup = {flex: 1, borderRadius: 20, marginRight: 5};
    const {errors, validate, hasErrors} = useValidation(senderDataValidations);

    const [parcels, setParcels] = useState([
        {
            tracking_number: "12342134",
            item_id: "bae6adb2-a750-3d83-b09a-a33ba5684733",
            weight: 4.604,
            description: "Laudantium",
            receiver: {
                name: "Fae Willms",
                email: "albertha68@gmail.com",
                phone: "(578) 682-8373",
                country_code: "SM",
                address_line_1:
                    "35751 Nader Throughway Suite 777 Hectorfurt, NV 46769",
                address_line_2: "Suite 471",
                postal_code: "76317-3071",
            },
            collection_option: "OFFICE",
            customer_type: "CORPORATE",
            parcel_type: "FREIGHT",
        },
    ]);
    const [sender, setSender] = useState({
        name: "Zelma Johnston",
        email: "angela94@bergnaum.info",
        phone: "+1-570-726-3894",
        country_code: "TV",
        address_line_1: "54330 Terrence Rest Suite 675 South Charity, NJ 84125",
        address_line_2: "Apt. 165",
        postal_code: "46892",
    });
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
        // const temp = {0: {sender: sender, receiver: {}}};
        const index = parcels.length;
        // setParcels({...parcels, [index]: temp});

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
        validate(newSender, name).catch((e) => {});
    };
    const gotoSummary = () => {
        validate(sender)
            .then((r) => {
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
            .catch((e) => {});
    };
    const removeParcel = (index) => {
        const newParcels = parcels.slice();
        newParcels.splice(index, 1);
        setParcels(newParcels);
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, {flex: 1}]}>
                {/* <View style={[s.formGroup]}> */}
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
                {/* </View> */}
                <ScrollView>
            <View style={{borderWidth: 0, flex: 5.1}}>
                    {keys.map((key, i) => (
                        // <View style={[s.formGroup]} key={label}>
                        <InputWithError
                            name={key}
                            value={sender[key]}
                            error={errors[key]}
                            placeholder={labels[i]}
                            onChangeText={onChange}
                            key={"sender_" + key}
                        />
                        // </View>
                    ))}
                    {/* <View style={[s.formGroup, s.mt2]}> */}
                    <SourceRoutesDropdown
                        name="country_code"
                        onSelect={onChange}
                        selectedValue={sender.country_code}
                        placeholder="Sender address country code"
                    />
                    {/* </View> */}
                    {/* <View style={[s.formGroup]}> */}
                    <SelectDropdown
                        list={parcelType}
                        name="parcel_type"
                        onSelect={onChangeParcel}
                        selectedValue={globalSettings.parcel_type}
                        placeholder="Parcel Type"
                    />
                    {/* </View> */}
                    <RadioButtonGroup
                        label="Customer Type"
                        onValueChange={onChangeParcel}
                        val={globalSettings.customer_type}
                        values={["INDIVIDUAL", "CORPORATE"]}
                        name="customer_type"
                        checkLabels={["Individual", "Corporate"]}
                    />
                <View style={{borderWidth: 0,  flex: 0.5, flexDirection:"row"}}>
                {/* <View style={[s.flexRow, s.flexWrap, s.buttonGroup]}> */}
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
                    {/* <Text>{JSON.stringify(parcelsArray)}</Text> */}
                    {/* <Text>{JSON.stringify(sender)}</Text> */}
                    {/* <Text>{JSON.stringify(parcels)}</Text> */}
                    {/* <Text>{JSON.stringify(notSaved)}</Text> */}
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
