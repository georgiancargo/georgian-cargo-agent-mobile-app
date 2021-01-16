import React, {useState, useEffect} from "react";
import {ScrollView, Text, View, SafeAreaView} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {InputWithError, Button, InputAutoComplete} from "_atoms";
import {
    DestinationRoutesDropdown,
    ExtraChargesList,
    RadioButtonGroup,
} from "_molecules";
import {useRequest, useValidation} from "_hooks";
import {getParcelPrice, getTrackingDuplicates} from "_requests";
import {Chip, Divider, ActivityIndicator} from "react-native-paper";
import {PreventGoingBack} from "_atoms";
import receiverValidations from "./receiverValidations";
import parcelValidations from "./parcelValidations";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const AddReciever = ({navigation, route}) => {
    const {
        index,
        setParcels,
        parcels,
        newReceiver = {},
        newParcel,
        source_country_code,
        parcel_type,
        customer_type,
    } = {
        ...route.params,
    };
    const [receiver, setReceiver] = useState({});
    const [parcel, setParcel] = useState({});
    const {errors: receiverErrors, validate: validateReceiver} = useValidation(receiverValidations);
    const {errors: parcelErrors, validate: validateParcel} = useValidation(parcelValidations);
    const [policyError, setPolicyError] = useState(false);
    const [shouldAlert, setAlert] = useState(false);
    const [price, setPrice] = useState({currency_code: "",freight_price: 0,delivery_price: 0});
    const [extra, setExtra] = useState({note: "", amount: ""});
    const onExtraChange = (name, value) => {
        setExtra({...extra, [name]: value});
    }
    const onAdd = () => {
        const newExtra = parcel.extra_charges
            ? parcel.extra_charges.slice()
            : [];
        newExtra.push(extra);
        setExtra({note: "", amount: ""});
        setParcel({...parcel, extra_charges: newExtra});
    };
    const removeExtraCharge = (index) => {
        const newExtra = parcel.extra_charges.slice();
        newExtra.splice(index, 1);
        setParcel({...parcel, extra_charges: newExtra});
    };
    const [priceRequest, requestingPrice] = useRequest(getParcelPrice);
    const [trackingRequest, requestingTracking] = useRequest(getTrackingDuplicates);
    
    const existing = "9999";

    useEffect(() => {
        priceRequest({
            source_country_code: source_country_code,
            destination_country_code: receiver.country_code,
            collection_option: parcel.collection_option,
            parcel_type: parcel_type,
            customer_type: customer_type,
            weight: parcel.weight,
        })
            .then(({data}) => {
                setPrice({
                    currency_code: data.prices.currency_code,
                    freight_price: data.prices.freight_price,
                    delivery_price: data.prices.delivery_price,
                });
                setPolicyError(false);
            })
            .catch(() => {
                setPolicyError(true);
            });
    }, [
        source_country_code,
        receiver.country_code,
        parcel.collection_option,
        parcel_type,
        customer_type,
        parcel.weight,
    ]);
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
        "address_line_1",
        "address_line_2",
        "postal_code",
    ];
    const parcelLabels = [
        // "Tracking number",
        "weight",
        // "source country code",
        // "destination country code",
        "description",
        "notes",
        "extra charges",
        "price",
    ];
    const parcelKeys = [
        // "tracking_number",
        "weight",
        // "source_country_code",
        // "destination_country_code",
        "description",
        "notes",
        // "extra_charges",
        // "price",
    ];
    const onChangeReceiver = (name, value) => {
        const newReceiver = {...receiver, [name]: value};
        setReceiver(newReceiver);
        validateReceiver(newReceiver, name).catch((e) => {});
        setAlert(true);
    };
    const onChangeParcel = (name, value) => {
        const next = {...parcel, [name]: value};
        setParcel(next);
        validateParcel(next, name).catch((e) => {});
        setAlert(true);
    };
    const onSave = () => {
        validateReceiver(receiver)
            .finally(() => {
                return validateParcel(parcel);
            })
            .then(() => {
                trackingRequest({tracking_number: parcel.tracking_number})
                    .then((r) => alert("This tracking number already exists"))
                    .catch((e) => {
                        setAlert(false);
                        if (index <= parcels.length) {
                            const newParcels = parcels.slice();
                            const _price =
                                price.freight_price + price.delivery_price;
                            newParcels[index] = {
                                ...parcel,
                                receiver: receiver,
                                price: _price,
                            };
                            setParcels(newParcels);
                        }
                        navigation.goBack();
                    });
            })
            .catch((e) => {
                return validateParcel(parcel);
            });
    };
    const goToScanner = () => {
        navigation.navigate("cameraScanner", {
            scanOnce: true,
            callback: (number) =>{
                const next = {...parcel, tracking_number: number};
                validateParcel(next).then(()=>setParcel(next));
            }
        });
    };
    return (
        <>
            <PreventGoingBack
                navigation={navigation}
                shouldAlert={shouldAlert}
                title="You haven't saved"
                paragraph="Sure you want to go back?"
            />
            <ScrollView style={[s.container, s.bgWhite, s.p3, s.flex1]}>
                <View>
                    <SafeAreaView>
                    <InputAutoComplete
                        name="name"
                        value={receiver.name}
                        error={receiverErrors.name}
                        // label={label}
                        placeholder="Receiver name"
                        // onChangeText={onChange}
                        onChangeText={onChangeReceiver}
                        setUser={setReceiver}
                        validate={validateReceiver}
                    />
                    </SafeAreaView>
                    <View style={[s.formGroup]}>
                        <Form
                            labels={receiveLabels}
                            keys={receiverKeys}
                            receiver={receiver}
                            errors={receiverErrors}
                            onChange={onChangeReceiver}
                        />
                        <View style={[s.formGroup]}>
                            <DestinationRoutesDropdown
                                name="country_code"
                                onSelect={onChangeReceiver}
                                error={receiverErrors.country_code}
                                selectedValue={receiver.country_code}
                                placeholder="Receiver address country code"
                            />
                        </View>
                    </View>
                    <Divider/>
                    <Divider style={{marginBottom: 10}}/>
                    <View style={[s.formGroup]}>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flex: 3}}>
                                <InputWithError
                                    error={parcelErrors.tracking_number}
                                    name="tracking_number"
                                    placeholder="Tracking number"
                                    onChangeText={onChangeParcel}
                                    value={parcel.tracking_number}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    padding: 3
                                }}
                            >
                                <Button
                                    onPress={goToScanner}
                                    style={{}}
                                >
                                    Scan
                                </Button>
                            </View>
                        </View>
                        <Form
                            labels={parcelLabels}
                            keys={parcelKeys}
                            receiver={parcel}
                            errors={parcelErrors}
                            onChange={onChangeParcel}
                        />
                        <Divider/>
                        <Divider style={{marginBottom: 10}}/>
                        <Divider/>
                        <Divider style={{marginBottom: 10}}/>
                        <Text>Add new extra charge</Text>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flex: 2}}>
                                <InputWithError
                                    name="note"
                                    placeholder="Note"
                                    onChangeText={onExtraChange}
                                    value={extra.note}
                                />
                            </View>
                            <View style={{flex: 1, marginHorizontal: 3}}>
                                <InputWithError
                                    name="amount"
                                    placeholder="Amount"
                                    onChangeText={onExtraChange}
                                    value={extra.amount.toString()}
                                    isNumber
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingTop: 15,
                                    paddingBottom: 5,
                                    justifyContent: 'center'
                                }}
                            >
                                <Button onPress={onAdd} style={{}}>
                                    Add
                                </Button>
                            </View>
                        </View>
                        <ExtraChargesList
                            extra_charges={parcel.extra_charges}
                            removeExtraCharge={removeExtraCharge}
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
                        <View style={{marginBottom: 5}}>
                            {requestingPrice ? (
                                <ActivityIndicator
                                    animating={requestingPrice}
                                />
                            ) : (
                                <>
                                    {policyError && <Text>
                                        No route policy found for current setting, please adjust inputs or contact
                                        administrator
                                    </Text>}
                                    {!policyError && <>
                                        <Chip style={{marginBottom: 5, marginTop: 10}}>
                                            {`Freight price: ${price.freight_price} ${price.currency_code}`}
                                        </Chip>
                                        <Chip>
                                            {`Delivery price: ${price.delivery_price} ${price.currency_code}`}
                                        </Chip></>}
                                </>
                            )}
                        </View>
                    </View>
                </View>
                <View style={[s.formGroup, s.pb3]}>
                    <Button
                        onPress={onSave}
                        disabled={policyError}
                        loading={requestingTracking}
                    >
                        Add
                    </Button>
                </View>
            </ScrollView>
        </>
    );
};

const Form = ({labels, keys, receiver, onChange, errors = {}}) => {
    return (
        <>
            {keys.map((key, i) => (
                <InputWithError
                    name={key}
                    key={"receiver_" + key}
                    placeholder={labels[i]}
                    onChangeText={onChange}
                    error={errors[key]}
                    value={receiver[key] ? receiver[key].toString() : ""}
                    // label={label}
                    isNumber={key === "price" || key === "weight"}
                />
            ))}
        </>
    );
};
export default AddReciever;
