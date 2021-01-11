import React, {useState, useEffect} from "react";
import {ScrollView, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {InputWithError, Button, InputAutoComplete} from "_atoms";
import {
    DestinationRoutesDropdown,
    ExtraChargesList,
    RadioButtonGroup,
} from "_molecules";
import {useRequest} from "_hooks";
import {getParcelPrice} from "_requests";
import {Chip, Divider, ActivityIndicator} from "react-native-paper";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

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
    const [price, setPrice] = useState({
        currency_code: "",
        freight_price: 0,
        delivery_price: 0,
    });
    const [extra, setExtra] = useState({note: "", amount: ""});
    const onExtraChange = (name, value)=>{
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
    const [request, requesting] = useRequest(getParcelPrice);

    useEffect(() => {
        request({
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
                setParcel({
                    ...parcel,
                    price:
                        data.prices.freight_price + data.prices.delivery_price,
                });
            })
            .catch((e) => {
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
    const goToScanner = () => {
        navigation.navigate("cameraScanner", {
            scanOnce: true,
            callback: (number) =>
                setParcel({...parcel, tracking_number: number}),
        });
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
                            <DestinationRoutesDropdown
                                name="country_code"
                                onSelect={onChangeReceiver}
                                selectedValue={receiver.country_code}
                                placeholder="Receiver address country code"
                            />
                        </View>
                    </View>
                    <Divider />
                    <Divider style={{marginBottom: 10}} />
                    <View style={[s.formGroup]}>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flexDirection: "column", flex: 3}}>
                                <InputWithError
                                    name="tracking_number"
                                    placeholder="Tracking number"
                                    onChangeText={onChangeParcel}
                                    value={parcel.tracking_number}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingTop: 15,
                                    paddingBottom: 5,
                                }}
                            >
                                <Button
                                    mode="outlined"
                                    onPress={goToScanner}
                                    style={{flexGrow: 1}}
                                >
                                    Scan
                                </Button>
                            </View>
                        </View>
                        <Form
                            labels={parcelLabels}
                            keys={parcelKeys}
                            receiver={parcel}
                            onChange={onChangeParcel}
                        />
                        <Divider />
                        <Divider style={{marginBottom: 10}} />
                        <Divider />
                        <Divider style={{marginBottom: 10}} />
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
                                }}
                            >
                                <Button onPress={onAdd} style={{flexGrow: 1}}>
                                    add
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
                            {requesting ? (
                                <ActivityIndicator
                                    animating={requesting}
                                ></ActivityIndicator>
                            ) : (
                                <>
                                    <Chip>
                                        {`Freight price: ${price.freight_price} ${price.currency_code}`}
                                    </Chip>
                                    <Chip>
                                        {`Delivery price: ${price.delivery_price} ${price.currency_code}`}
                                    </Chip>
                                </>
                            )}
                        </View>
                    </View>
                    {/* <View style={[s.formGroup]}>
                    <Button onPress={onPress}>Next</Button>
                </View> */}
                    {/* <Text>{JSON.stringify(receiver.country_code)}</Text> */}
                </View>
                <View style={[s.formGroup, s.pb3]}>
                    <Button onPress={onSave}>Add</Button>
                </View>
            </ScrollView>
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
