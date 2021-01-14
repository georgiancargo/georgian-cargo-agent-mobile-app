import React, {useState, useContext} from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Linking,
} from "react-native";
import {ListItem, ModalContainer, Button} from "_atoms";
import {Divider} from "react-native-paper";
import {AuthContext} from "_context";
import {codes} from "_utils";
import { VirtualizedList } from "react-native";


const ParcelList = ({parcels = [], navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [parcel, setParcel] = useState({});

    const showModal = (parcel) => {
        const {shipping_specs, item, invoice, created_at, ...p} = parcel;
        const {
            route,
            sender_information,
            receiver_information,
            ...rest
        } = shipping_specs;
        const sender = sender_information;
        const sender_address = sender_information.address;
        const receiver = receiver_information;
        const receiver_address = receiver_information.address;
        let route_name = {
            source_country_code: codes[route.source_country_code],
            destination_country_code: codes[route.destination_country_code],
        };
        let pickup_date = new Date(created_at);
        pickup_date = pickup_date.toLocaleString();
        setParcel({
            ...p,
            created_at: pickup_date,
            ...item,
            ...route_name,
            sender: {...sender, ...sender_address, address: {}},
            receiver: {...receiver, ...receiver_address, address: {}},
            ...rest,
            ...invoice,
        });
        setModalVisible(true);
    };
    const hideModal = () => setModalVisible(false);

    const renderItem = ({item, index}) => (
        <ListItem parcel={item} edit={showModal} i={index} key={index} />
    );

    const getItem = (data, index) => {
        return data[index];
    };

    const getItemCount = (data) => {
        return data.length;
    };

    return (
        <>
            <ParcelInfoModal
                navigation={navigation}
                hideModal={hideModal}
                parcel={parcel}
                modalVisible={modalVisible}
            />
            <SafeAreaView style={styles.container}>
                <VirtualizedList
                    data={parcels}
                    initialNumToRender={3}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                    getItemCount={getItemCount}
                    windowSize={3}
                    getItem={getItem}
                />
            </SafeAreaView>
        </>
    );
};
const ParcelInfoModal = ({
    navigation,
    hideModal = () => {},
    parcel,
    modalVisible,
}) => {
    const {auth} = useContext(AuthContext);
    const canEdit = auth.agent.privileges.includes("AMEND_CARGO_INFORMATION");

    const labels = ["Tracking number", "Weight", "Status", "From", "To", "Collection option", "Customer type", "Parcel type", "Notes", "Description", "Customer id", "Pickup date", "Release code", "Currency code", "Freight price", "Delivery price", "Discount"];
    const keys = ["tracking_number", "weight", "status", "source_country_code", "destination_country_code", "collection_option", "customer_type", "parcel_type", "notes", "description", "customer_id", "created_at", "release_code", "currency_code", "freight_price", "delivery_price", "discount"];
    const userLabels = ["Name", "Email", "Phone", "Address line 1", "Address line 2", "Postal code"];
    const userKeys = ["name", "email", "phone", "address_line_1", "address_line_2", "postal_code"];

    const receiver = parcel.receiver;
    const sender = parcel.sender;

    const edit = () => {
        hideModal();
        navigation.navigate("Edit Parcel", {parcel: parcel});
    };

    const Parcel = () =>
        keys.map((key, i) => (
            <View style={styles.row} key={key}>
                <Text style={styles.dd}>{labels[i]}</Text>
                <Text style={styles.dt}>
                    {parcel[key] ? parcel[key] : "N/A"}
                </Text>
            </View>
        ));

        const User = ({user, role}) => {
        if (!user) return null;
        const email = (mail) => Linking.openURL(`mailto:${mail}`);
        const call = (number) => Linking.openURL(`tel:${number}`);

        return userKeys.map((key, i) => {
            const data = user[key] ? user[key] : "N/A";
            const label = `${role} ${userLabels[i]}`;
            return (
                <View style={styles.row} key={key}>
                    <Text style={styles.dd}>{label}</Text>
                    {i === 1 ? ( //email
                        <Text style={styles.link} onPress={() => email(data)}>
                            {data}
                        </Text>
                    ) : i === 2 ? ( //phone
                        <Text style={styles.link} onPress={() => call(data)}>
                            {data}
                        </Text>
                    ) : (
                        <Text style={styles.dt}>{data}</Text>
                    )}
                </View>
            );
        });
    };
    return (
        <ModalContainer modalVisible={modalVisible}>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    <Parcel />
                    <Divider style={{marginVertical: 3}} />
                    <User user={sender} role="Sender" />
                    <Divider style={{marginVertical: 3}} />
                    <User user={receiver} role="Receiver" />
                    <Divider style={{marginVertical: 3}} />
                </ScrollView>
                <View style={styles.buttonRow}>
                    <Button
                        style={{flex: 8, marginHorizontal: 2}}
                        onPress={edit}
                        disabled={!canEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        style={{flex: 1, marginHorizontal: 2}}
                        onPress={hideModal}
                        mode="outlined"
                    >
                        Ok
                    </Button>
                </View>
            </SafeAreaView>
        </ModalContainer>
    );
};
export default ParcelList;

const styles = StyleSheet.create({
    dd: {
        flex: 4.5,
        marginRight: 5,
        fontWeight: "bold",
        // borderRightWidth: 1,
    },
    dt: {flex: 5},
    link: {flex: 5, color: "blue", textDecorationLine: "underline"},
    row: {
        flexDirection: "row",
        marginBottom: 5,
        borderColor: "rgba(0,0,0,0.12)",
        borderBottomWidth: 0.5,
    },
    btnContainer: {flex: 1},
    buttonRow: {flexDirection: "row"},
});
