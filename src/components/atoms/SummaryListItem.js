import React from "react";
import {Text, View, StyleSheet} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {TouchableOpacity} from "react-native-gesture-handler";
// import {GRAY_MEDIUM} from "_styles/colors";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;
const styles = StyleSheet.create({
    side: {
        flex: 1,
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
    container: {
        flexWrap: "wrap",
        flex: 1,
        flexDirection: "row",
    },
    col1: {
        flex: 1.5,
    },
    col2: {
        flex: 1,
    },
});
const SummaryListItem = ({price, parcel = {}}) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.col1}>
                    <Text style={[s.text, {fontWeight: "bold"}]}>
                        Tracking number: {parcel.tracking_number}
                    </Text>
                    <Text style={[s.text]}>weight: {parcel.weight}</Text>
                    <Text style={[s.text]}>
                        description: {parcel.description}
                    </Text>
                    <Text style={[s.text]}>notes: {parcel.notes}</Text>
                </View>
                <View style={styles.col2}>
                    <Text style={[s.text]}>
                        From: {parcel.sender.country_code}
                    </Text>
                    <Text style={[s.text]}>
                        To: {parcel.receiver.country_code}
                    </Text>
                    <Text>Price: {price ? price : 0}</Text>
                    {parcel.extra_charges ? (
                        <>
                            <Text style={[s.text]}>extra charges: </Text>
                            {parcel.extra_charges.map((c, i) => (
                                <Text
                                    key={i + parcel.tracking_number}
                                >{`\t\t${c.note}: ${c.amount}`}</Text>
                            ))}
                        </>
                    ) : (
                        <Text style={[s.text]}>No Extra Charges</Text>
                    )}
                </View>
            </View>
        </>
    );
};

export default SummaryListItem;
