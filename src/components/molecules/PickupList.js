import React from "react";
import { FlatList, Text, View } from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { PickupListItem } from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const PickupList = ({ parcels }) => {
    const renderItem = ({ item, index }) => {
        const { sender, receiver, ...parcel } = item;
        return (
            <View style={[s.tableRow]}>
                <View style={[s.tableHeadCol]}>
                    <Text style={[s.text]}>{index + 1}</Text>
                </View>
                <View style={[s.tableHeadCol, s.flex6]}>
                    <PickupListItem reciever={receiver} />
                </View>
                <View style={[s.tableHeadCol, s.flex6]}>
                    <PickupListItem
                        isParcel
                        parcel={{ tracking_number: "1234567", notes: "wertyu" }}
                    />
                </View>
            </View>
        );
    };
    return (
        <>
            <View>
                <FlatList
                    data={parcels}
                    style={[s.table]}
                    ListHeaderComponent={Header}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>
    );
};

const Header = () => {
    return (
        <View style={[s.tableHead]}>
            <View style={[s.tableHeadCol]}>
                <Text style={[s.text]}>#</Text>
            </View>
            <View style={[s.tableHeadCol, s.flex6]}>
                <Text style={[s.text]}>Reciever</Text>
            </View>
            <View style={[s.tableHeadCol, s.flex6]}>
                <Text style={[s.text]}>Parcel</Text>
            </View>
        </View>
    );
};
export default PickupList;
