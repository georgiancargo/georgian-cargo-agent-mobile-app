import React, {useState} from "react";
import {View} from "react-native";
import {InputWithError, Button} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {RadioButtonGroup} from "_molecules";
import {SelectDropdown} from "_atoms";
import {ScrollView} from "react-native";
import {useRequest} from "_hooks";
import {editParcel} from "_requests";
import {useValidation} from "_hooks";
import EditParcelValidations from "./EditParcelValidations";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const EditParcel = ({
    navigation,
    route: {
        params: {parcel: oldParcel},
    },
}) => {
    const p = {
        tracking_number: "G123654", // Must be >= 4 characters && Unique
        weight: 10, // > 0
        source_country_code: "US", // Two uppercase chars
        destination_country_code: "UK", // Two uppercase chars
        collection_option: "HOME", // HOME or OFFICE
        customer_type: "INDIVIDUAL", // INDIVIDUAL or CORPORATE
        parcel_type: "FREIGHT", // FREIGHT or PARCEL (will add more later)
        notes: "",
        description: "Clothes",
        currency_code: "USD",
        freight_price: 12,
        delivery_price: 20,
        discount: 5,
        extra_charges: [
            {
                note: "VAT",
                amount: 123,
            },
        ],
        sender: {
            name: "Ahmed",
            email: "ah@gm.co", // Valid Email
            phone: "+22123",
            country_code: "US", // Two uppercase chars
            address_line_1: "line 1",
            address_line_2: "line 2",
            postal_code: "VUE 123",
        },
        receiver: {
            name: "Ahmed",
            email: "ah@gm.co", // Valid Email
            phone: "+22123",
            country_code: "UK", // Two uppercase chars
            address_line_1: "line 1",
            address_line_2: "line 2",
            postal_code: "VUE 123",
        },
    };
    const [request, requesting] = useRequest(editParcel);
    const [isValidating, setValidating] = useState(false);
    const {errors, validate, hasErrors} = useValidation(EditParcelValidations);

    const [parcel, setParcel] = useState(p);

    const labels = [
        "Tracking number",
        "Weight",
        "Notes",
        "Description",
        "Currency code",
        "Freight price",
        "Delivery price",
        "Discount",
    ];
    const keys = [
        "tracking_number",
        "weight",
        // "source_country_code",
        // "destination_country_code",
        // "collection_option", //Radio button
        // "customer_type", //Radio button
        // "parcel_type", //Dropdown
        "notes",
        "description",
        "currency_code",
        "freight_price",
        "delivery_price",
        "discount",
    ];

    const parcelType = [
        {label: "Freight", value: "FREIGHT"},
        {label: "Parcel", value: "PARCEL"},
    ];
    const onChange = (name, value) => {
        const newParcel = {...parcel, [name]: value};
        setParcel(newParcel);
        validate(newParcel, name).catch((e) => {});
    };
    const edit = (isSender = false) => {
        navigation.navigate(`Edit ${isSender ? "Sender" : "Receiver"}`, {
            user: isSender ? parcel.sender : parcel.receiver,
            parcel: parcel,
            // type: "meme",
            type: isSender ? "Sender" : "Receiver",
            setParcel: setParcel,
        });
    };
    const save = () => {
        setValidating(true);
        validate(parcel)
            .then((r) => {
                request(parcel)
                    .then((r) => {})
                    .catch((e) => {});
            })
            .catch((e) => {})
            .finally(() => setValidating(false));
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <View style={[s.formGroup]}>
                {keys.map((key, i) => {
                    const val = parcel[key];
                    const isNumber = Number.isInteger(val);
                    return (
                        <InputWithError
                            // label={label}
                            name={key}
                            error={errors[key]}
                            placeholder={labels[i]}
                            value={isNumber && val ? val.toString() : val}
                            onChangeText={onChange}
                            key={key}
                            isNumber={isNumber}
                        />
                    );
                })}
                <ScrollView>
                    <SelectDropdown
                        list={parcelType}
                        name="parcel_type"
                        onSelect={onChange}
                        selectedValue={parcel.parcel_type}
                        placeholder="Parcel Type"
                    />
                </ScrollView>
                <RadioButtonGroup
                    label="Customer Type"
                    onValueChange={onChange}
                    val={parcel.customer_type}
                    values={["INDIVIDUAL", "CORPORATE"]}
                    name="customer_type"
                    checkLabels={["Individual", "Corporate"]}
                />
                <RadioButtonGroup
                    label="Collection Option"
                    onValueChange={onChange}
                    val={parcel.collection_option}
                    values={["HOME", "OFFICE"]}
                    name="collection_option"
                    checkLabels={["Home", "Office"]}
                />
            </View>
            <View style={[s.formGroup]}>
                <Button onPress={() => edit(true)} disabled={requesting}>
                    Edit Sender
                </Button>
                <Button
                    onPress={() => edit(false)}
                    disabled={requesting}
                    style={{marginVertical: 5}}
                >
                    Edit Receiver
                </Button>
                <Button onPress={save} loading={requesting || isValidating}>
                    Save
                </Button>
            </View>
        </View>
    );
};

export default EditParcel;
