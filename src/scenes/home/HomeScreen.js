import React from "react";
import {View, StyleSheet} from "react-native";
import {HelloWorld} from "_atoms";
import { LoginScreen } from "_scenes/login";

const Home = () => (
    <View style={styles.container}>
        <LoginScreen />
        <HelloWorld name="in home" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff1",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Home;
