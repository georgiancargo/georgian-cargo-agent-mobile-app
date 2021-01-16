import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {GRAY_DARK} from "_styles/colors";
import {useTheme} from "react-native-paper";
import {codes} from "_utils";
// import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';

const style = StyleSheet.create({
    container: {
        // flexDirection: "row",
        borderWidth: 1,
        padding: 8,
        flexWrap: "wrap",
        // height: 120,
        borderColor: "rgba(0,0,0,0.26)",
        justifyContent: "space-between",
        alignContent: "space-between",
        marginBottom: 5,
    },
    badgeContainer: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 50,
        margin: 2,
        alignItems: "center"
        // transform: [{ rotate: '45deg' }]
    },
    badgeText: {
        fontSize: 12,
        textTransform: "capitalize",
    },
});
const C = ({children, style}) => (
    <Text mode="outlined" style={{margin: 3, ...style}}>
        {children}
    </Text>
);
const Badge = ({children, ...props}) => (
    <View {...props}>
        <Text style={props.style.text}>{children}</Text>
    </View>
);
const ListItem = ({parcel: p, edit, i}) => {
    const {roundness} = useTheme();
    const status = p.invoice.payment_status;
    const container = {
        ...style.container,
        borderRadius: roundness,
        backgroundColor: i % 2 === 1 ? "#f5f5f5" : "white",
    };
    const badge = {
        ...style.badge,
        backgroundColor: status === "PAID" ? "#a2cc3a" : "#ed1c24",
        text: {
            color: "#fff"
        }
    };
    const badgeDefault = {
        ...style.badge,
        backgroundColor: "#ddd",
        text: {
            color: "#000"
        }
    };
    const src = codes[p.shipping_specs.route.source_country_code];
    const dst = codes[p.shipping_specs.route.destination_country_code];
    const sender_name = p.shipping_specs.sender_information.name;
    const receiver_name = p.shipping_specs.receiver_information.name;
    let pickup_date = new Date(p.created_at);
    pickup_date = pickup_date.toLocaleString();
    const collection_option = p.shipping_specs.collection_option;
    const customer_type = p.shipping_specs.customer_type;
    const parcel_type = p.shipping_specs.parcel_type;
    return (
        <TouchableOpacity style={container} onPress={() => edit(p)}>
            <View style={style.badgeContainer}>
                <Badge style={badge}>{status}</Badge>
                <Badge style={{...badgeDefault, backgroundColor: '#1e96cd', text: {color: '#fff'}}}>{p.status.replace('_', ' ')}</Badge>
                <Badge style={badgeDefault}>{p.item.weight} KG</Badge>

            </View>
            <C>
                Tracking number:{" "}
                <Text style={{fontWeight: "bold"}}>{p.tracking_number}</Text>
            </C>
            <C>Pickup date: {pickup_date}</C>
            <C>
                From <C style={{color: "green"}}> {src} </C>
                To <C style={{color: "red"}}> {dst} </C>
            </C>
            <C>
                {sender_name} to {receiver_name}{" "}
            </C>
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
