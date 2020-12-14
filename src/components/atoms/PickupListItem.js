import React from "react";
import {Text, View, StyleSheet} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {GRAY_MEDIUM} from "_styles/colors";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const PickupListItem = ({reciever = {}, parcel = {}}) => {
    const arr = [1, 2, 3, 4, 5, 6];
    return (
        <>
            <View style={[s.flexRow, s.flexWrap]}>
                <View style={styles.side}>
                    {arr.map((i) => (
                        <View style={[s.btnTouchable, s.m1]} key={i * 2}>
                            <View style={[s.btn, s.btnOutlineInfo]}>
                                <Text style={[s.btnText, s.btnOutlineInfo]}>item</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.side}>
                    {arr.map((i) => (
                        <View style={[s.btnTouchable, s.m1]} key={i}>
                            <View style={[s.btn, s.btnOutlineInfo]}>
                                <Text style={[s.btnText, s.btnOutlineInfo]}>
                                    iteaaaaaaaam
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    side: {
        flex: 1,
        borderWidth: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: 20,
        borderColor: GRAY_MEDIUM,
        padding: 5,
    },
});
export default PickupListItem;
