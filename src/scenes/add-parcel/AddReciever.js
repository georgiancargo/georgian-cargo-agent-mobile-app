import React, {useState} from "react";
import {ScrollView, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {InputWithError, Button} from "_atoms";
import {RadioButtonGroup} from "_molecules";
import {Divider} from "react-native-elements";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const AddReciever = ({navigation, route}) => {
    const {index, setParcels, parcels = {0: {sender: {}, receiver: {}}}} = {
        ...route.params,
    };
    const [receiver, setReceiver] = useState({});
    const [parcel, setParcel] = useState({});

    const receiveLabels = [
        "Receiver name",
        "Receiver phone",
        "Receiver Email",
        "Receiver address country code",
        "Receiver addrees line 1",
        "Receiver address line 2",
        "Receiver address postal code",
    ];
    const receiverKeys = [
        "name",
        "phone",
        "Email",
        "country_code",
        "addrees_line_1",
        "address_line_2",
        "postal_code",
    ];
    const parcelLabels = [
        "Tracking number",
        "weight",
        "source country code",
        "destination country code",
        "description",
        "notes",
        "extra charges",
        "price",
    ];
    const parcelKeys = [
        "tracking_number",
        "weight",
        "source_country_code",
        "destination_country_code",
        "description",
        "notes",
        "extra_charges",
        "price",
    ];
    const onChangeReceiver = (name, value) => {
        setReceiver({...receiver, [name]: value});
    };
    const onChangeParcel = (name, value) => {
        console.log(name, value);
        setParcel({...parcel, [name]: value});
    };
    const onSave = () => {
        // const parcel = parcels[index] ? parcels[index] : {};
        setParcels({...parcels, [index]: {...parcel, receiver: receiver}});
        navigation.goBack();
    };

    return (
        <View style={[s.container, s.bgWhite, s.p3]}>
            <ScrollView>
                <Form
                    labels={receiveLabels}
                    keys={receiverKeys}
                    receiver={parcels[index]}
                    onChange={onChangeReceiver}
                />
                <Divider style={{backgroundColor: "blue"}} />
                <Divider style={{backgroundColor: "blue", marginBottom: 10}} />
                <Form
                    labels={parcelLabels}
                    keys={parcelKeys}
                    receiver={parcels[index]}
                    onChange={onChangeParcel}
                />
                <RadioButtonGroup
                    label="Collection Option"
                    onValueChange={onChangeParcel}
                    val={parcel.collection_option}
                    values={["HOME", "OFFICE"]}
                    name="collection_option"
                    checkLabels={["Home", "Office"]}
                />
                <View style={[s.formGroup, s.mb3]}>
                    <Button onPress={onSave}>Add</Button>
                </View>
                {/* <View style={[s.formGroup]}>
                    <Button onPress={onPress}>Next</Button>
                </View> */}
                {/* <Text>{JSON.stringify(parcel)}</Text> */}
            </ScrollView>
        </View>
    );
};

const Form = ({labels, keys, receiver, onChange}) => {
    return (
        <View style={[s.formGroup]}>
            {labels.map((label, i) => (
                <View style={[s.formGroup]}>
                    <InputWithError
                        name={keys[i]}
                        key={keys[i]}
                        placeholder={label}
                        onChangeText={onChange}
                        value={receiver[keys[i]]}
                        // label={label}
                    />
                </View>
            ))}
            {/* {keys.map((name, i) => (
                        <Text>{name + ": " + receiver[name]}</Text>
                    ))} */}
            {/* <Text>{index}</Text> */}
            {/* <Text>{JSON.stringify(parcels[index].receiver)}</Text> */}
        </View>
    );
};
export default AddReciever;