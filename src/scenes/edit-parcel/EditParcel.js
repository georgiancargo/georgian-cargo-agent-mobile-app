import React, {useContext, useState} from "react";
import {View} from "react-native";
import {InputWithError, Button} from "_atoms";
import {
    RadioButtonGroup,
    SourceRoutesDropdown,
    DestinationRoutesDropdown,
    ExtraChargesList,
    PaymentDropdown
} from "_molecules";
import {SelectDropdown, PreventGoingBack} from "_atoms";
import {useRequest} from "_hooks";
import {editParcel} from "_requests";
import {useValidation} from "_hooks";
import EditParcelValidations from "./EditParcelValidations";
import {AuthContext} from "_context";
import {ScrollView} from "react-native-gesture-handler";
import { confirmAlert } from "_utils";
import { Text } from "react-native";
import { paymentRequest } from "_requests";
import { Alert } from "react-native";
import { UploadInvoice } from "_scenes/pickup-item";
import { uploadInvoiceRequest } from "_requests";

const EditParcel = ({
    navigation,
    route: {
        params: {parcel: oldParcel},
    },
}) => {
    const [request, saving] = useRequest(editParcel);
    const [isValidating, setValidating] = useState(false);
    const {errors, validate, hasErrors} = useValidation(EditParcelValidations);
    const {auth} = useContext(AuthContext);
    const [parcel, setParcel] = useState(oldParcel);
    const [shouldAlert, setAlert] = useState(false);
    const [paymentMethod, setMethod] = useState("ONLINE");
    const [extra, setExtra] = useState({note: "", amount: ""});
    const [payment, paying] = useRequest(paymentRequest);
    const isPaid = oldParcel.payment_status === "PAID";
    const [image, setImage] = useState(null);
    const [upload_invoice, uploading] = useRequest(uploadInvoiceRequest);

    const labels = [
        "Tracking number",
        "Weight",
        "Notes",
        "Description",
        "Delivery price",
        "Freight price",
        "Currency code",
        "Discount",
        "Item Price",
        "Currency code",
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
        "delivery_price",
        "freight_price",
        "currency_code",
        "discount",
        "item_price",
        "item_currency_code",
    ];
    const editRoutes = auth.agent.privileges.includes("AMEND_CARGO_ROUTE");
    const editPrices = auth.agent.privileges.includes("AMEND_CARGO_PRICING");
    const editWeight = auth.agent.privileges.includes("AMEND_CARGO_WEIGHT");

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
        setAlert(true);
        validate(newParcel, name).catch((e) => {});
    };
    const edit = (isSender = false) => {
        navigation.navigate(`Edit ${isSender ? "Sender" : "Receiver"}`, {
            user: isSender ? parcel.sender : parcel.receiver,
            parcel: parcel,
            type: isSender ? "Sender" : "Receiver",
            setParcel: setParcel,
            setAlert: setAlert,
        });
    };
    const saveParcel = () => {
        // alert(JSON.stringify(parcel))
        setValidating(true);
        validate(parcel)
            .then((r) => {
                setValidating(false);
                return request(parcel);
            })
            .then((r) => {
                setAlert(false);
                // alert("Saved Successfully");
                Alert.alert(
                    "Done",
                    "Saved successfully!",
                    [{text: "Home", onPress: () => navigation.goBack()}],
                    {cancelable: true}
                );
            })
            .catch((e) => {
                alert(e);
                // alert(e.response.data.data.errors);
            });
    };
    const save = ()=>{
        confirmAlert({
            paragraph: "Are you sure you want to save this data?",
            onConfirm: saveParcel,
        });
    }
    const onExtraChange = (name, value)=>{
        setExtra({...extra, [name]: value});
        setAlert(true);
    }
    const onAdd = () => {
        const newExtra = parcel.extra_charges
            ? parcel.extra_charges.slice()
            : [];
        newExtra.push(extra);
        setExtra({note: "", amount: ""});
        setParcel({...parcel, extra_charges: newExtra});
        setAlert(true);
    };
    const removeExtraCharge = (index) => {
        const newExtra = parcel.extra_charges.slice();
        newExtra.splice(index, 1);
        setParcel({...parcel, extra_charges: newExtra});
        setAlert(true);
    };

    const changePaymentMethod = (_, value)=>{
        setMethod(value);
    };

    const pay = () => {
        payment({
            invoice_ids: [parcel.invoice_id],
            payment_method: paymentMethod,
        })
            .then(() => {
                Alert.alert(
                    "Done",
                    "Payment success",
                    [{text: "OK", onPress: () => {}}],
                    {cancelable: true}
                );
            })
            .catch((e) => {
                alert(e);
            });
    };
    const uploadInvoice = () => {
        upload_invoice({
            invoice_id: parcel.invoice_id,
            invoice: image,
        })
            .then((r) => {
                Alert.alert(
                    "Done",
                    "Upload success",
                    [{text: "OK", onPress: () => {}}],
                    {cancelable: true}
                );
            })
            .catch((e) => {
                alert(e);
            });
    };
    const confirmUpload = () => {
        confirmAlert({
            paragraph: "Are you sure you want to upload this invoice?",
            onConfirm: uploadInvoice,
        });
    };
    return (
        <View style={{flex:1, backgroundColor:"white", padding:10}}>
            <PreventGoingBack
                navigation={navigation}
                shouldAlert={shouldAlert}
                title="You haven't saved"
                paragraph="Sure you want to go back?"
            />
            <ScrollView>
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
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 2, marginRight:5}}>
                        <PaymentDropdown
                            name=""
                            onSelect={changePaymentMethod}
                            selectedValue={paymentMethod}
                            placeholder="Payment method"
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Text></Text>
                        <Button
                            style={{height: 43}}
                            onPress={pay}
                            loading={paying}
                            disabled={shouldAlert || isPaid}
                        >
                            Pay
                        </Button>
                    </View>
                </View>
                <UploadInvoice image={image} setImage={setImage} onDone={confirmUpload}/>
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 2}}>
                        <InputWithError
                            name="note"
                            placeholder="Note"
                            onChangeText={onExtraChange}
                            value={extra.note}
                            disabled={!editPrices}
                        />
                    </View>
                    <View style={{flex: 1, marginHorizontal: 3}}>
                        <InputWithError
                            name="amount"
                            placeholder="Amount"
                            onChangeText={onExtraChange}
                            value={extra.amount.toString()}
                            isNumber
                            disabled={!editPrices}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Text></Text>
                        <Button onPress={onAdd} disabled={!editPrices || saving || paying} style={{height:43}}>
                            add
                        </Button>
                    </View>
                </View>
                <View style={{marginTop: 2}}>
                    <ExtraChargesList
                        extra_charges={parcel.extra_charges}
                        removeExtraCharge={removeExtraCharge}
                        disabled={!editPrices}
                    />
                </View>
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
                <Button
                    onPress={() => edit(true)}
                    disabled={saving || paying || !privileges.sender}
                >
                    Edit Sender
                </Button>
                <Button
                    onPress={() => edit(false)}
                    disabled={saving || paying || !privileges.receiver}
                    style={{marginVertical: 5}}
                >
                    Edit Receiver
                </Button>
                <Button
                    onPress={save}
                    loading={saving || isValidating}
                    disabled={hasErrors || !shouldAlert}
                >
                    Save
                </Button>
            </ScrollView>
        </View>
    );
};

export default EditParcel;
