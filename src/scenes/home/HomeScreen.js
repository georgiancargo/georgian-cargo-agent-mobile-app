import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {ParcelList} from "_molecules";
import {GRAY_MEDIUM} from "_styles/colors";

const Home = ({navigation}) => {
    const goto = (route) => {
        navigation.navigate(route);
    };
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text>Logo</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.verticalButtons}>
                    <TouchableOpacity style={styles.button}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text>Upload items</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontalButtons}>
                    <TouchableOpacity style={styles.button} onPress={() => goto("Add")}>
                        <Text>Pickup items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text>Item processing</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listContainer}>
                <ParcelList parcels={[1, 2, 3, 4]} navigation={navigation} />
            </View>
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
    buttonContainer: {
        flex: 2,
    },
    listContainer: {
        flex: 6,
        margin: 5,
    },
    logo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    horizontalButtons: {
        flex: 2,
    },
    verticalButtons: {
        flex: 1,
        flexDirection: "row",
    },
    button: {
        flex: 1,
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: GRAY_MEDIUM,
        borderRadius: 20,
    },
});

export default Home;
