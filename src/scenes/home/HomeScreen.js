import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {ParcelList} from "_molecules";
import {GRAY_MEDIUM} from "_styles/colors";
import SyncButton from "./SyncButton";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Home = ({navigation}) => {
    const goto = (route) => {
        navigation.navigate(route);
    };
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text>Logo</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <TouchableOpacity
                    onPress={() => goto("Login")}
                    style={[s.btnTouchable, s.flex1, s.ml2, s.mr1]}
                >
                    <View style={[s.btn, s.btnLight]}>
                        <Text style={[s.btnText, s.btnLightText]}>Logout</Text>
                    </View>
                </TouchableOpacity>
                <SyncButton />
            </View>
            <View>
                <TouchableOpacity
                    style={[s.btnTouchable, s.mx2, s.my2]}
                    onPress={() => goto("Add Sender")}
                >
                    <View style={[s.btn, s.btnLight]}>
                        <Text style={[s.btnText, s.btnLightText]}>
                            Pickup items
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[s.btnTouchable, s.mx2]}
                    onPress={() => goto("Item Processing")}
                >
                    <View style={[s.btn, s.btnLight]}>
                        <Text style={[s.btnText, s.btnLightText]}>
                            Item processing
                        </Text>
                    </View>
                </TouchableOpacity>
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
