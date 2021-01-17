import React, {useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    VirtualizedList,
    StyleSheet,
} from "react-native";
import {ListItem} from "_atoms";
import ParcelInfoModal from "./ParcelInfoModal";
import {codes} from "_utils";

const styles = StyleSheet.create({
    empty: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        // borderWidth: 1,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

const ParcelList = ({parcels = [], navigation, refresh}) => {
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
            source_country: codes[route.source_country_code],
            destination_country: codes[route.destination_country_code],
        };
        let pickup_date = new Date(created_at);
        pickup_date = pickup_date.toLocaleString();
        setParcel({
            ...p,
            created_at: pickup_date,
            ...item,
            ...route_name,
            ...route,
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
    const Empty = () => (
        <View style={styles.empty}>
            <Text style={styles.emptyText}>
                No parcels matching term were found
            </Text>
        </View>
    );
    return (
        <>
            <ParcelInfoModal
                navigation={navigation}
                hideModal={hideModal}
                parcel={parcel}
                modalVisible={modalVisible}
                refresh={refresh}
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
                    ListEmptyComponent={Empty}
                />
            </SafeAreaView>
        </>
    );
};
export default ParcelList;
