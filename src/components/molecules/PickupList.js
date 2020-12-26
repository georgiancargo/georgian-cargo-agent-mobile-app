import React from "react";
import {SafeAreaView} from "react-native";
import {FlatList, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {PickupListItem} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const PickupList = ({parcels, editParcel}) => {
    const renderItem = ({item, index}) => {
        const {sender, receiver, ...parcel} = item;
        const edit = () => {
            editParcel(index, parcel, receiver);
            // console.log(item);
        };
        return (
            <View
                style={[s.tableRow, s.tableStripedRow(index)]}
                key={parcel.tracking_number}
            >
                <View style={[s.tableHeadCol]}>
                    <Text style={[s.text]}>{index + 1}</Text>
                </View>
                <View style={[s.tableHeadCol, s.flex6]}>
                    <PickupListItem reciever={receiver} edit={edit} />
                </View>
                <View style={[s.tableHeadCol, s.flex6]}>
                    <PickupListItem isParcel parcel={parcel} edit={edit} />
                </View>
            </View>
        );
    };
    return (
        <>
            <SafeAreaView>
                <FlatList
                    data={parcels}
                    style={[s.table]}
                    ListHeaderComponent={Header}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
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
