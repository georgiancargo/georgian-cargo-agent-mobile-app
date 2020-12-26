import React, {useEffect, useState} from "react";
import {ScrollView, Text, View, SafeAreaView} from "react-native";
import {
    InputWithError,
    Button,
    SelectDropdown,
    InputAutoComplete,
} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {PickupList} from "_molecules";
import {RadioButtonGroup} from "_molecules";
import {countries} from "_utils";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const AddSender = ({navigation}) => {
    const btnGroup = {flex: 1, borderRadius: 20, marginRight: 5};
    const [parcels, setParcels] = useState({});
    const [parcelsArray, setParcelsArray] = useState([]);
    const [sender, setSender] = useState({});
    const [notSaved, setNotSaved] = useState(true);
    const [globalSettings, setGlobal] = useState({});
    useEffect(() => {
        const arr = Object.keys(parcels).map((key) => parcels[key]);
        setParcelsArray(arr);
    }, [parcels]);
    const labels = [
        // "Sender id",
        // "Sender name",
        "Sender phone",
        "Sender Email",
        // "Sender address country code",
        "Sender addrees line 1",
        "Sender address line 2",
        "Sender address postal code",
    ];
    const keys = [
        // "client_id",
        // "name",
        "phone",
        "Email",
        // "country_code",
        "addrees_line_1",
        "address_line_2",
        "postal_code",
    ];
    const onChangeParcel = (name, value) => {
        setGlobal({...globalSettings, [name]: value});
    };
    const parcelType = [
        {label: "Type 1", value: 1},
        {label: "Type 2", value: 2},
        {label: "Type 3", value: 3},
        {label: "Type 4", value: 4},
    ];
    const addReceiver = () => {
        // const temp = {0: {sender: sender, receiver: {}}};
        const index = Object.keys(parcels).length;
        // setParcels({...parcels, [index]: temp});

        navigation.navigate("Add Parcel", {
            index: index,
            setParcels: setParcels,
            // parcels: index ? {...parcels, [index]: temp} : temp,
            parcels: parcels,
            newParcel: {},
            newReceiver: {},
        });
    };

    const editParcel = (index, parcel, receiver) => {
        navigation.navigate("Add Parcel", {
            index: index,
            setParcels: setParcels,
            parcels: parcels,
            newParcel: parcel,
            newReceiver: receiver,
        });
    };
    const onChange = (name, value) => {
        setSender({...sender, [name]: value});
        setNotSaved(true);
    };
    const onSave = () => {
        const parcelsTemp = parcels;
        for (const key in parcels) {
            parcelsTemp[key].sender = sender;
            const r = parcelsTemp[key].receiver;
            parcelsTemp[key].receiver = r ? r : {};
        }
        const index = Object.keys(parcels).length;
        const temp = {0: {sender: sender, receiver: {}}};
        if (index === 0) setParcels(temp);

        setParcels(parcelsTemp);
        setNotSaved(false);
    };
    const gotoSummary = () => {
        navigation.navigate("Summary", {
            parcels: parcelsArray,
        });
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, {flex: 1}]}>
            <View style={[s.formGroup]}>
                <View style={[s.formGroup]}>
                    <InputAutoComplete
                        name={"name"}
                        // label={label}
                        placeholder="Sender name"
                        // onChangeText={onChange}
                    />
                </View>
                {labels.map((label, i) => (
                    <View style={[s.formGroup]} key={label}>
                        <InputWithError
                            name={keys[i]}
                            // label={label}
                            placeholder={label}
                            onChangeText={onChange}
                        />
                    </View>
                ))}
                <ScrollView>
                    <View style={[s.formGroup]}>
                        <SelectDropdown
                            list={countries}
                            name="country_code"
                            onSelect={onChange}
                            selectedValue={sender.country_code}
                            placeholder="Sender address country code"
                        />
                    </View>
                    <View style={[s.formGroup]}>
                        <SelectDropdown
                            list={parcelType}
                            name="parcel_type"
                            onSelect={onChangeParcel}
                            selectedValue={globalSettings.parcel_type}
                            placeholder="Parcel Type"
                        />
                    </View>
                    <RadioButtonGroup
                        label="Customer Type"
                        onValueChange={onChangeParcel}
                        val={globalSettings.customer_type}
                        values={["INDIVIDUAL", "CORPORATE"]}
                        name="customer_type"
                        checkLabels={["Individual", "Corporate"]}
                    />
                </ScrollView>
            </View>

            <View style={[s.flexRow, s.flexWrap, s.buttonGroup]}>
                <Button style={[btnGroup]} onPress={onSave}>
                    Save
                </Button>
                <Button style={[btnGroup]} onPress={addReceiver}>
                    Add Parcel
                </Button>
                <Button
                    style={[btnGroup]}
                    onPress={gotoSummary}
                    disabled={notSaved}
                >
                    Summary
                </Button>
            </View>
            <View>
                {/* <Text>{JSON.stringify(parcelsArray)}</Text> */}
                {/* <Text>{JSON.stringify(parcels)}</Text> */}
                <PickupList parcels={parcelsArray} editParcel={editParcel} />
            </View>
        </View>
    );
};

export default AddSender;
