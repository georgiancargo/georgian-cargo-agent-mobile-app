import React from "react";
import {Text, View, StyleSheet} from "react-native";

const EditParcel = (props) => {
    const hi = `I'm edit ${JSON.stringify(props)}`;
    return (
        <View style={styles.container}>
            <Text>{hi}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
});

export default EditParcel;
