import React, {useState, useEffect} from "react";
import {ScrollView, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {InputWithError, Button} from "_atoms";
import {RadioButtonGroup} from "_molecules";
import {Divider} from "react-native-elements";
import {countries} from "_utils";
import {SelectDropdown} from "_atoms";
import {InputAutoComplete} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const AddReciever = ({navigation, route}) => {
    const {index, setParcels, parcels, newReceiver = {}, newParcel} = {
        ...route.params,
    };
    const [receiver, setReceiver] = useState({});
    const [parcel, setParcel] = useState({});

    useEffect(() => {
        setReceiver(newReceiver);
    }, [newReceiver]);

    useEffect(() => {
        setParcel(newParcel);
    }, [newParcel]);

    const receiveLabels = [
        // "Receiver name",
        "Receiver phone",
        "Receiver Email",
        // "Receiver address country code",
        "Receiver addrees line 1",
        "Receiver address line 2",
        "Receiver address postal code",
    ];
    const receiverKeys = [
        // "name",
        "phone",
        "email",
        // "country_code",
        "addrees_line_1",
        "address_line_2",
        "postal_code",
    ];
    const parcelLabels = [
        "Tracking number",
        "weight",
        // "source country code",
        // "destination country code",
        "description",
        "notes",
        "extra charges",
        "price",
    ];
    const parcelKeys = [
        "tracking_number",
        "weight",
        // "source_country_code",
        // "destination_country_code",
        "description",
        "notes",
        // "extra_charges",
        // "price",
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
        if (index <= parcels.length) {
            const newParcels = parcels.slice();
            newParcels[index] = {...parcel, receiver: receiver};
            setParcels(newParcels);
        }
        // setParcels({...parcels, [index]: {...parcel, receiver: receiver}});
        navigation.goBack();
    };

    return (
        <>
            <ScrollView style={[s.container, s.bgWhite, s.p3, s.flex1]}>
                <View>
                    <InputAutoComplete
                        name="name"
                        value={receiver.name}
                        // error={errors.name}
                        // label={label}
                        placeholder="Receiver name"
                        // onChangeText={onChange}
                        onChangeText={onChangeReceiver}
                        setUser={setReceiver}
                        // isCustomer
                    />
                    <View style={[s.formGroup]}>
                        <Form
                            labels={receiveLabels}
                            keys={receiverKeys}
                            receiver={receiver}
                            onChange={onChangeReceiver}
                        />
                        <View style={[s.formGroup]}>
                            <SelectDropdown
                                list={countries}
                                name="country_code"
                                onSelect={onChangeReceiver}
                                selectedValue={receiver.country_code}
                                placeholder="Receiver address country code"
                            />
                        </View>
                    </View>
                    <Divider style={{backgroundColor: "blue"}} />
                    <Divider
                        style={{backgroundColor: "blue", marginBottom: 10}}
                    />
                    <View style={[s.formGroup]}>
                        <Form
                            labels={parcelLabels}
                            keys={parcelKeys}
                            receiver={parcel}
                            onChange={onChangeParcel}
                        />
                        {/* <View style={[s.formGroup]}> */}
                        <RadioButtonGroup
                            label="Collection Option"
                            onValueChange={onChangeParcel}
                            val={parcel.collection_option}
                            values={["HOME", "OFFICE"]}
                            name="collection_option"
                            checkLabels={["Home", "Office"]}
                        />
                    </View>
                    {/* <View style={[s.formGroup]}>
                    <Button onPress={onPress}>Next</Button>
                </View> */}
                    {/* <Text>{JSON.stringify(parcel)}</Text> */}
                </View>
            </ScrollView>
            <View style={[s.formGroup]}>
                <Button onPress={onSave}>Add</Button>
            </View>
        </>
    );
};

const Form = ({labels, keys, receiver, onChange}) => {
    return (
        <>
            {keys.map((key, i) => (
                // <View style={[s.formGroup]} key={key}>
                // {/* <Text style={[s.text]}>{JSON.stringify(receiver)}</Text> */}
                <InputWithError
                    name={key}
                    key={"receiver_" + key}
                    placeholder={labels[i]}
                    onChangeText={onChange}
                    value={receiver[key] ? receiver[key].toString() : ""}
                    // label={label}
                    isNumber={key === "price" || key === "weight"}
                />
                // </View>
            ))}
            {/* {keys.map((name, i) => (
                        <Text>{name + ": " + receiver[name]}</Text>
                    ))} */}
            {/* <Text>{index}</Text> */}
            {/* <Text>{JSON.stringify(parcels[index].receiver)}</Text> */}
        </>
    );
};
export default AddReciever;
