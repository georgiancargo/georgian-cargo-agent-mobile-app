import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {ParcelList} from "_molecules";
import {Button} from "_atoms";
import {GRAY_MEDIUM} from "_styles/colors";
import SyncButton from "./SyncButton";

const Home = ({navigation}) => {
    const goto = (route) => {
        navigation.navigate(route);
    };
    return (
        <View style={s.container}>
            <View style={s.logo}>
                <Text>Logo</Text>
            </View>
            <View style={s.horizontalButtons}>
                <Button style={s.mr} onPress={() => goto("Login")}>
                    Logout
                </Button>
                <SyncButton />
            </View>
            <View style={s.verticalButtons}>
                <Button style={s.mb} onPress={() => goto("Add Sender")}>
                    Pickup items
                </Button>
                <Button onPress={() => goto("Modes")}>Item processing</Button>
            </View>
            <View style={s.listContainer}>
                <ParcelList parcels={[1, 2, 3, 4]} navigation={navigation} />
            </View>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: "#fff",
        justifyContent: "center",
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
        flexDirection: "row",
        justifyContent: "center",
        margin: 3,
    },
    verticalButtons: {
        margin: 3,
        flex: 1,
    },
    mr: {
        marginRight: 5,
        flex: 1,
    },
    mb: {
        marginBottom: 5,
    },
});

export default Home;
