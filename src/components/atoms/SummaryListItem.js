import React from "react";
import {Text, View, StyleSheet} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {TouchableOpacity} from "react-native-gesture-handler";
// import {GRAY_MEDIUM} from "_styles/colors";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SummaryListItem = ({price, parcel = {}, isParcel}) => {
    const parcelKeys = [
        "tracking_number",
        "weight",
        "source_country_code",
        "destination_country_code",
        "description",
        "notes",
        "extra_charges",
    ];
    const parcelLabels = [
        "Tracking number",
        "weight",
        "source country",
        "dest. country",
        "description",
        "notes",
        "extra charges",
    ];
    return (
        <>
            <View style={[s.flexRow, s.flexWrap]}>
                {isParcel ? (
                    <Print
                        obj={parcel}
                        arr={parcelKeys}
                        labels={parcelLabels}
                    />
                ) : (
                    <View>
                        <Text>{price}</Text>
                    </View>
                )}
            </View>
        </>
    );
};

const Print = ({arr, obj = {}, labels}) => {
    return (
        <View style={styles.side}>
            {arr.map((key, i) => (
                // <TouchableOpacity style={[s.btnTouchable, s.m1]} key={key}>
                // <View style={[s.btn, s.btnOutlineInfo]}>
                <Text style={[s.text]} key={key}>
                    {labels[i] + ": " + obj[key]}
                </Text>
                // </View>
                // </TouchableOpacity>
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
    text: {
        alignContent: "flex-end",
    },
    price: {
        justifyContent: "center",
        alignContent: "center",
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
    },
});
export default SummaryListItem;
