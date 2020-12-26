import React from "react";
import {Text, View, StyleSheet} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {TouchableOpacity} from "react-native-gesture-handler";
// import {GRAY_MEDIUM} from "_styles/colors";
import {Button} from "react-native-paper";

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
                <Button
                    style={{marginBottom: 2}}
                    key={key}
                    onPress={edit}
                    mode="outlined"
                >
                    {obj[key]}
                </Button>
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
