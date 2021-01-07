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

    const labels = ["Tracking number", "Weight", "Status", "From", "To", "Collection option", "Customer type", "Parcel type", "Notes", "Description", "Customer id", "Created at", "Release code"];
    const keys = ["trackingNumber", "weight", "status", "sourceCountryCode", "destinationCountryCode", "collectionOption", "customerType", "parcelType", "notes", "description", "customerId", "createdAt", "releaseCode"];
    const userLabels = ["Name", "Email", "Phone", "Address line 1", "Address line 2", "Postal code"];
    const userKeys = ["name", "email", "phone", "addressLine1", "addressLine2", "postalCode"];
   
    const showModal = (parcel) => {
        const {shippingSpecs, item, ...p} = parcel;
        const {
            route,
            senderInformation,
            receiverInformation,
            ...rest
        } = shippingSpecs;
        const sender = senderInformation;
        const sender_address = senderInformation.address;
        const receiver = receiverInformation;
        const receiver_address = receiverInformation.address;
        setParcel({
            ...p,
            ...item,
            ...route,
            sender: {...sender, ...sender_address, address: {}},
            receiver: {...receiver, ...receiver_address, address: {}},
            ...rest,
        });
        setModalVisible(true);
    };
    const hideModal = () => setModalVisible(false);

    const edit = () => {
        hideModal();
        navigation.navigate("Edit Parcel", {parcel: parcel});
    };
    const renderItem = ({item}) => <ListItem parcel={item} edit={showModal} />;

    const ParcelInfoModal = () =>{ 
        const receiver = parcel.receiver;
        const sender = parcel.sender;
        const style = {
            dd: {
                flex: 4.5,
                fontSize: 13,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                marginRight: 5,
                borderColor: colors.disabled,
            },
            dt: {flex: 5, fontSize: 13},
            row: {flexDirection: "row", marginBottom: 3},
            buttonRow: {flexDirection: "row", marginTop: 3},
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
