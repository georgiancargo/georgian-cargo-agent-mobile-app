import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {GRAY_DARK} from "_styles/colors";

const ListItem = ({parcel, edit}) => {
    const list = [
        "ID",
        "weight",
        "price",
        "status",
        "place",
        "type",
        "sender",
        "reciever",
    ];
    return (
        <TouchableOpacity style={styles.container} onPress={() => edit(parcel)}>
            {list.map((item, i) => (
                <Text
                    key={item}
                    style={
                        i == 0 || i == 1 ? {...styles.text, width: "91%"} : styles.text
                    }
                >
                    {item}
                </Text>
            ))}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        padding: 5,
        flexWrap: "wrap",
        borderRadius: 10,
    },
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
