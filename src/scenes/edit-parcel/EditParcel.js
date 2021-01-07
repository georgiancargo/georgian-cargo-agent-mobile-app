import React, {useContext, useState, useEffect} from "react";
import {View} from "react-native";
import {InputWithError, Button} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {
    RadioButtonGroup,
    SourceRoutesDropdown,
    DestinationRoutesDropdown,
} from "_molecules";
import {SelectDropdown} from "_atoms";
import {useRequest} from "_hooks";
import {editParcel} from "_requests";
import {useValidation} from "_hooks";
import EditParcelValidations from "./EditParcelValidations";
import {AuthContext} from "_context";
import {ScrollView} from "react-native-gesture-handler";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const EditParcel = ({
    navigation,
    route: {
        params: {parcel: oldParcel},
    },
}) => {
    const [request, requesting] = useRequest(editParcel);
    const [isValidating, setValidating] = useState(false);
    const {errors, validate, hasErrors} = useValidation(EditParcelValidations);
    const {auth} = useContext(AuthContext);
    const [parcel, setParcel] = useState(oldParcel);
    const [editRoutes, setEditRoutes] = useState(false);
    const [editPrices, setEditPrices] = useState(false);
    const [editWeight, setEditWeight] = useState(false);
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
    // const editRoutes = auth.agent.privileges.includes("AMEND_CARGO_ROUTE");
    // const editPrices = auth.agent.privileges.includes("AMEND_CARGO_PRICING");
    // const editWeight = auth.agent.privileges.includes("AMEND_CARGO_WEIGHT");
    useEffect(() => {
        if (auth && auth.agent) {
            setEditRoutes(auth.agent.privileges.includes("AMEND_CARGO_ROUTE"));
            setEditPrices(
                auth.agent.privileges.includes("AMEND_CARGO_PRICING")
            );
            setEditWeight(auth.agent.privileges.includes("AMEND_CARGO_WEIGHT"));
        }
    }, [auth]);
    const privileges = {
        tracking_number: false,
        weight: editWeight,
        notes: true,
        description: true,
        sender: editRoutes,
        receiver: editRoutes,
        source_country_code: editRoutes,
        destination_country_code: editRoutes,
        collection_option: editRoutes,
        customer_type: editRoutes,
        parcel_type: editRoutes,
        currency_code: editPrices,
        extra_charges: editPrices,
        freight_price: editPrices,
        delivery_price: editPrices,
        discount: editPrices,
    };
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
        <ScrollView style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <View style={[s.formGroup]}>
                {keys.map((key, i) => {
                    const val = parcel[key];
                    const isNumber = typeof val != "string";
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
                            disabled={!privileges[key]}
                        />
                    );
                })}
                {/* <ScrollView> */}
                <SelectDropdown
                    list={parcelType}
                    name="parcel_type"
                    onSelect={onChange}
                    selectedValue={parcel.parcel_type}
                    placeholder="Parcel Type"
                    disabled={!privileges.parcel_type}
                />
                <SourceRoutesDropdown
                    name="source_country_code"
                    onSelect={onChange}
                    selectedValue={parcel.source_country_code}
                    placeholder="Source country"
                    disabled={!privileges.source_country_code}
                />
                <DestinationRoutesDropdown
                    name="destination_country_code"
                    onSelect={onChange}
                    selectedValue={parcel.destination_country_code}
                    placeholder="Destination country"
                    disabled={!privileges.destination_country_code}
                />
                {/* </ScrollView> */}
                <RadioButtonGroup
                    label="Customer Type"
                    onValueChange={onChange}
                    val={parcel.customer_type}
                    disabled={!privileges.customer_type}
                    values={["INDIVIDUAL", "CORPORATE"]}
                    name="customer_type"
                    checkLabels={["Individual", "Corporate"]}
                />
                <RadioButtonGroup
                    label="Collection Option"
                    onValueChange={onChange}
                    val={parcel.collection_option}
                    disabled={!privileges.collection_option}
                    values={["HOME", "OFFICE"]}
                    name="collection_option"
                    checkLabels={["Home", "Office"]}
                />
            </View>
            <View style={[s.formGroup]}>
                <Button
                    onPress={() => edit(true)}
                    disabled={requesting || !privileges.sender}
                >
                    Edit Sender
                </Button>
                <Button
                    onPress={() => edit(false)}
                    disabled={requesting || !privileges.receiver}
                    style={{marginVertical: 5}}
                >
                    Edit Receiver
                </Button>
                <Button
                    onPress={save}
                    loading={requesting || isValidating}
                    disable={hasErrors}
                >
                    Save
                </Button>
            </View>
        </ScrollView>
    );
};

export default EditParcel;
