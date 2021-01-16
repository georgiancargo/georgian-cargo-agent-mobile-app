import React, {useContext} from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Linking,
    Alert,
} from "react-native";
import {ModalContainer, Button} from "_atoms";
import {Divider} from "react-native-paper";
import {AuthContext} from "_context";
import {useRequest} from "_hooks";
import {releaseParcelRequest} from "_requests";

const ParcelInfoModal = ({
    navigation,
    hideModal = () => {},
    parcel,
    modalVisible,
}) => {
    const {auth} = useContext(AuthContext);
    const [request, releasing] = useRequest(releaseParcelRequest);

    const canEdit = auth.agent.privileges.includes("AMEND_CARGO_INFORMATION");
    const canRelease = auth.agent.privileges.includes(
        "RELEASE_CARGO_BY_TRACKING_NUMBER"
    );
    const payed = parcel.payment_status === "PAID";
    const notReleased = parcel.status !== "RELEASED";
    const labels = [
        "Tracking number",
        "Weight",
        "Status",
        "From",
        "To",
        "Collection option",
        "Customer type",
        "Parcel type",
        "Notes",
        "Description",
        "Customer id",
        "Pickup date",
        "Release code",
        "Currency code",
        "Freight price",
        "Delivery price",
        "Discount",
    ];
    const keys = [
        "tracking_number",
        "weight",
        "status",
        "source_country",
        "destination_country",
        "collection_option",
        "customer_type",
        "parcel_type",
        "notes",
        "description",
        "customer_id",
        "created_at",
        "release_code",
        "currency_code",
        "freight_price",
        "delivery_price",
        "discount",
    ];
    const userLabels = [
        "Name",
        "Email",
        "Phone",
        "Address line 1",
        "Address line 2",
        "Postal code",
    ];
    const userKeys = [
        "name",
        "email",
        "phone",
        "address_line_1",
        "address_line_2",
        "postal_code",
    ];

    const receiver = parcel.receiver;
    const sender = parcel.sender;

    const edit = () => {
        hideModal();
        navigation.navigate("Edit Parcel", {parcel: parcel});
    };

    const release = () => {
        request({tracking_number: parcel.tracking_number})
            .then(() => {
                Alert.alert(
                    "Done",
                    "Released successfully!",
                    [{text: "Home", onPress: hideModal}],
                    {cancelable: true}
                );
            })
            .catch((e) => {
                Alert.alert(
                    "Error",
                    `${e}`,
                    [{text: "OK", onPress: () => {}}],
                    {cancelable: true}
                );
            })
            .finally(() => {});
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
        const call = (number) => Linking.openURL(`sms:${number}`);

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
                        style={{flex: 4}}
                        onPress={edit}
                        disabled={!canEdit || releasing}
                    >
                        Edit
                    </Button>
                    <Button
                        style={{flex: 4, marginHorizontal: 2}}
                        onPress={release}
                        loading={releasing}
                        disabled={
                            !(payed && notReleased && canRelease) || releasing
                        }
                    >
                        Release
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
export default ParcelInfoModal;

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
