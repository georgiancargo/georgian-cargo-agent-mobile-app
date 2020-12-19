import React from "react";
import {Text, View, StyleSheet} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {TouchableOpacity} from "react-native-gesture-handler";
// import {GRAY_MEDIUM} from "_styles/colors";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const PickupListItem = ({reciever = {}, parcel = {}, isParcel, edit}) => {
    const recieverKeys = ["name", "phone"];
    const parcelKeys = ["tracking_number", "notes"];
    return (
        <>
            <View style={[s.flexRow, s.flexWrap]}>
                {isParcel ? (
                    <Print obj={parcel} arr={parcelKeys} edit={edit} />
                ) : (
                    <Print obj={reciever} arr={recieverKeys} edit={edit} />
                )}
            </View>
        </>
    );
};

const Print = ({arr, obj = {}, edit}) => {
    return (
        <View style={styles.side}>
            {arr.map((key) => (
                <TouchableOpacity
                    style={[s.btnTouchable, s.m1]}
                    key={key}
                    onPress={edit}
                >
                    <View style={[s.btn, s.btnOutlineInfo]}>
                        <Text style={[s.btnText, s.btnOutlineInfo]}>
                            {obj[key]}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    side: {
        flex: 1,
        // flexDirection: "row",
        // flexWrap: "wrap",
        // borderWidth: 1,
        // borderRadius: 20,
        // borderColor: GRAY_MEDIUM,
        // padding: 5,
    },
});
export default PickupListItem;
