import React, {useEffect, useState, useContext} from "react";
import {View, StyleSheet, Text} from "react-native";
import {ParcelList} from "_molecules";
import {Button} from "_atoms";
import SyncButton from "./SyncButton";
import {useRequest} from "_hooks";
import {getGargosRequest, logout as logoutRequest} from "_requests";
import {AuthContext} from "_context";

const Home = ({navigation}) => {
    const {auth, setAuth} = useContext(AuthContext);
    // const {accessToken, rememberToken, ...rest} = auth;
    // const [canPickup, setCanPickup] = useState(false);
    // const [canProccess, setCanProccess] = useState(false);
    const canPickup = auth.agent.privileges.includes("PICKUP_CARGO");
    const canProccess = auth.agent.privileges.includes("HANDLE_CARGO");
    const [parcels, setParcels] = useState([]);
    const [request] = useRequest(getGargosRequest);
    const [_logout] = useRequest(logoutRequest);

    const goto = (route) => {
        navigation.navigate(route);
    };
    const logout = () => {
        _logout()
            .then((r) => {
                setAuth({
                    isLoggedIn: false,
                    accessToken: null,
                    agent: {privileges: []},
                });
                navigation.goBack();
            })
            .catch((e) => {});
    };
    useEffect(() => {
        request({
            paging_specification: {
                page_offset: 0,
                page_size: 30,
            },
        })
            .then((r) => {
                setParcels(r.data.cargos);
            })
            .catch((e) => {});
    }, []);
    return (
        <View style={s.container}>
            <View style={s.logo}>
                <Text>Logo</Text>
                <Text>{JSON.stringify(auth.agent)}</Text>
            </View>
            <View style={s.buttons}>
                <View style={s.horizontalButtons}>
                    <Button style={s.mr} onPress={logout}>
                        Logout
                    </Button>
                    <SyncButton />
                </View>
                <View style={s.verticalButtons}>
                    <Button
                        style={s.mb}
                        onPress={() => goto("Add Sender")}
                        disabled={!canPickup}
                    >
                        Pickup items
                    </Button>
                    <Button
                        style={s.mb}
                        onPress={() => goto("Modes")}
                        disabled={!canProccess}
                    >
                        Item processing
                    </Button>
                    <Button onPress={() => goto("Search")}>Search</Button>
                </View>
            </View>
            <View style={s.listContainer}>
                <ParcelList parcels={parcels} navigation={navigation} />
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
        flex: 5,
        margin: 5,
    },
    logo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        flex: 2,
    },
    horizontalButtons: {
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
        margin: 3,
    },
    verticalButtons: {
        margin: 3,
        flex: 4,
        // borderWidth: 1,
        // flexWrap: "wrap",
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
