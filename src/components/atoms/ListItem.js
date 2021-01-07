import React from "react";
import {StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {GRAY_DARK} from "_styles/colors";
import {Chip, useTheme} from "react-native-paper";

const ListItem = ({parcel: p, edit}) => {
    const {colors, roundness} = useTheme();
    const container = {
        flexDirection: "row",
        borderWidth: 1,
        padding: 8,
        flexWrap: "wrap",
        borderRadius: roundness,
        borderColor: colors.placeholder,
    };
    const C = ({children}) => (
        <Chip mode="outlined" style={{margin: 3}}>
            {children}
        </Chip>
    );
    return (
        <TouchableOpacity style={container} onPress={() => edit(p)}>
            <C>{p.tracking_number}</C>
            <C>{p.item.weight + " Kg"}</C>
            <C>{p.shipping_specs.route.source_country_code} </C>
            <C>{p.shipping_specs.route.destination_country_code} </C>
            <C>{p.shipping_specs.sender_information.name} </C>
            <C>{p.shipping_specs.receiver_information.name} </C>
            <C>{p.shipping_specs.collection_option}</C>
            <C>{p.shipping_specs.customer_type}</C>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        margin: 2,
        borderWidth: 1,
        // flex: 1,
        borderColor: GRAY_DARK,
        padding: 3,
        borderRadius: 10,
        width: "45%",
    },
});
export default ListItem;
