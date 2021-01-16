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
                    <View style={styles.side}>
                        <Text style={[s.text, {fontWeight: "bold"}]}>
                            Tracking number: {parcel.tracking_number}
                        </Text>
                        <Text style={[s.text]}>weight: {parcel.weight}</Text>
                        <Text style={[s.text]}>
                            source country: {parcel.sender.country_code}
                        </Text>
                        <Text style={[s.text]}>
                            dest. country: {parcel.receiver.country_code}
                        </Text>
                        <Text style={[s.text]}>
                            description: {parcel.description}
                        </Text>
                        <Text style={[s.text]}>notes: {parcel.notes}</Text>
                        <Text style={[s.text]}>extra charges: </Text>
                        {parcel.extra_charges &&
                            parcel.extra_charges.map((c, i) => (
                                <Text
                                    key={i + " " + parcel.tracking_number}
                                >{`    ${c.note}: ${c.amount}`}</Text>
                            ))}
                    </View>
                ) : (
                    <View>
                        <Text>{price ? price : 0}</Text>
                    </View>
                )}
            </View>
        </>
    );
};

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
});
export default SummaryListItem;
