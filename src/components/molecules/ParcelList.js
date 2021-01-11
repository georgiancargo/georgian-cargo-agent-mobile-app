import React, {useState, useContext} from "react";
import {SafeAreaView, FlatList, StyleSheet, View, Text} from "react-native";
import {ListItem, ModalContainer, Button} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Divider, useTheme} from "react-native-paper";
import {AuthContext} from "_context";
import { ScrollView } from "react-native";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const ParcelList = ({parcels = [], navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [parcel, setParcel] = useState({});
    const {auth} = useContext(AuthContext);
    const {colors} = useTheme();
    const canEdit = auth.agent.privileges.includes("AMEND_CARGO_INFORMATION");

    const labels = ["Tracking number", "Weight", "Status", "From", "To", "Collection option", "Customer type", "Parcel type", "Notes", "Description", "Customer id", "Created at", "Release code", "Currency code", "Freight price", "Delivery price", "Discount"];
    const keys = ["tracking_number", "weight", "status", "source_country_code", "destination_country_code", "collection_option", "customer_type", "parcel_type", "notes", "description", "customer_id", "created_at", "release_code",  "currency_code", "freight_price", "delivery_price", "discount"];
    const userLabels = ["Name", "Email", "Phone", "Address line 1", "Address line 2", "Postal code"];
    const userKeys = ["name", "email", "phone", "address_line_1", "address_line_2", "postal_code"];
   
    const showModal = (parcel) => {
        const {shipping_specs, item, invoice, ...p} = parcel;
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
        setParcel({
            ...p,
            ...item,
            ...route,
            sender: {...sender, ...sender_address, address: {}},
            receiver: {...receiver, ...receiver_address, address: {}},
            ...rest,
            ...invoice
        });
        setModalVisible(true);
    };
    const hideModal = () => setModalVisible(false);

    const edit = () => {
        hideModal();
        navigation.navigate("Edit Parcel", {parcel: parcel});
    };
    const renderItem = ({item, index}) => <ListItem parcel={item} edit={showModal} i={index} />;

    const ParcelInfoModal = () =>{ 
        const receiver = parcel.receiver;
        const sender = parcel.sender;
        const style = {
            dd: {
                flex: 4.5,
                marginRight: 5,
                fontWeight: 'bold',
                borderColor: colors.disabled,
            },
            dt: {flex: 5},
            row: {flexDirection: "row", marginBottom: 5},
            buttonRow: {flexDirection: "row", marginTop: 12},
        };
        const Parcel = () =>
            keys.map((key, i) => (
                <View style={style.row} key={key}>
                    <Text style={style.dd}>{labels[i]}</Text>
                    <Text style={style.dt}>{parcel[key] ? parcel[key] : "N/A"}</Text>
                </View>
            ));
        const Sender = () =>
            sender &&
            userKeys.map((key, i) => (
                <View style={style.row} key={key}>
                    <Text style={style.dd}>{"Sender " + userLabels[i]}</Text>
                    <Text style={style.dt}>{sender[key] ? sender[key] : "N/A"}</Text>
                </View>
            ));
        const Receiver = () =>
            receiver &&
            userKeys.map((key, i) => (
                <View style={style.row} key={key}>
                    <Text style={style.dd}>{"Receiver " + userLabels[i]}</Text>
                    <Text style={style.dt}>{receiver[key] ? receiver[key] : "N/A"}</Text>
                </View>
            ));
        return (
            <ModalContainer
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            >
                <ScrollView style={[s.container]}>
                    <Parcel />
                    <Divider style={{marginVertical:3}} />
                    <Sender />
                    <Divider style={{marginVertical:3}} />
                    <Receiver />
                    <View style={style.buttonRow}>
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
                        >
                            Ok
                        </Button>
                    </View>
                </ScrollView>
            </ModalContainer>
        );}
    return (
        <>
            <SafeAreaView style={styles.container}>
                <ParcelInfoModal />
                <FlatList
                    data={parcels}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </>
    );
};
export default ParcelList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
