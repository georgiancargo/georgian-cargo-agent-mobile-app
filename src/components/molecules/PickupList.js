import React from "react";
import {SafeAreaView} from "react-native";
import {FlatList, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {TouchableOpacity} from "react-native";
import {PickupListItem} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const PickupList = ({parcels, editParcel, removeParcel}) => {
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
                <View style={[s.tableHeadCol, s.flex1, s.justifyContentCenter]}>
                    <Text style={[s.text]}>{index + 1}</Text>
                </View>
                <View style={[s.tableHeadCol, s.flex6]}>
                    <TouchableOpacity onPress={edit}>
                        <Text>name: {receiver.name}</Text>
                        <Text>phone: {receiver.phone}</Text>
                        <Text>email: {receiver.email}</Text>
                        <Text>tracking number: {parcel.tracking_number}</Text>
                        <Text>weight: {parcel.weight}</Text>
                        <Text>description: {parcel.description}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[s.tableHeadCol, s.flex1, s.justifyContentCenter]}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => removeParcel(index)}
                    >
                        <Text style={{color: "red"}}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <>
            <SafeAreaView>
                {parcels.length ? (
                    <FlatList
                        data={parcels}
                        style={[s.table]}
                        ListHeaderComponent={Header}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                ) : null}
            </SafeAreaView>
        </>
    );
};

const Header = () => {
    return (
        <View style={[s.tableHead]}>
            <View style={[s.tableHeadCol]}>
                <Text style={[s.text, s.flex1]}>#</Text>
            </View>
            <View style={[s.tableHeadCol, s.flex6]}>
                <Text style={[s.text, s.textCenter]}>Parcel</Text>
            </View>
            <View style={[s.tableHeadCol, s.flex1]}>
                <Text style={[s.text]}></Text>
            </View>
        </View>
    );
};
export default PickupList;
