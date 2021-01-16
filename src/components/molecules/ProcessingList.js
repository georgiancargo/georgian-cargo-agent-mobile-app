import React from "react";
import {SafeAreaView} from "react-native";
import {FlatList, Text, View, TouchableOpacity} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const ProcessingList = ({barCodes = [], remove, edit}) => {
    const renderItem = ({item, index}) => {
        const {price, ...parcel} = item;
        return (
            <View style={[s.tableRow, s.tableStripedRow(index)]}>
                <View style={[s.tableHeadCol]}>
                    <Text style={[s.text]}>{index + 1}</Text>
                </View>
                <View style={[s.tableHeadCol, s.flex6]}>
                    <TouchableOpacity
                        style={[s.btnTouchable, s.m1]}
                        key={item}
                        onPress={() => edit(index)}
                    >
                        <View style={[s.btn, s.btnOutlineDark]}>
                            <Text style={[s.btnText, s.btnOutlineDark]}>
                                {item}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[s.tableHeadCol, {justifyContent: "center"}]}>
                    {barCodes.length > 1 && (
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => remove(index)}
                        >
                            <Text style={[s.text, s.textDanger]}>X</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };
    return (
        <>
            <SafeAreaView>
                <FlatList
                    data={barCodes}
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
                <Text style={[s.text, {alignSelf: "center"}]}>barcode</Text>
            </View>
            <View style={[s.tableHeadCol, s.flex1]}>
                {/* <Text style={[s.text]}>action</Text> */}
            </View>
        </View>
    );
};
export default ProcessingList;
