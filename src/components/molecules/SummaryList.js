import React from "react";
import {SafeAreaView} from "react-native";
import {FlatList, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {SummaryListItem} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SummaryList = ({parcels}) => {
    const renderItem = ({item, index}) => {
        const {price, ...parcel} = item;
        return (
            <View style={[s.tableRow]}>
                <View style={[s.tableHeadCol, {justifyContent: "center"}]}>
                    <Text style={[s.text]}>{index + 1}</Text>
                </View>
                <View style={[s.tableHeadCol, s.flex6]}>
                    <SummaryListItem isParcel parcel={parcel} />
                </View>
                <View
                    style={[
                        s.tableHeadCol,
                        s.flex2,
                        {justifyContent: "center"},
                    ]}
                >
                    <SummaryListItem price={price} />
                </View>
            </View>
        );
    };
    return (
        <>
            <SafeAreaView style={{flex: 1}}>
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
                <Text style={[s.text]}>Parcel</Text>
            </View>
            <View style={[s.tableHeadCol, s.flex2]}>
                <Text style={[s.text]}>Price</Text>
            </View>
        </View>
    );
};
export default SummaryList;
