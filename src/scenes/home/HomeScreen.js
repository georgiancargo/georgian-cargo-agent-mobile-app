import React, {useEffect, useState, useContext} from "react";
import {View, StyleSheet, Text} from "react-native";
import {ParcelList} from "_molecules";
import {Button} from "_atoms";
import SyncButton from "./SyncButton";
import {useRequest} from "_hooks";
import {getGargosRequest} from "_requests";
import {AuthContext} from "_context";

const Home = ({navigation}) => {
    const {auth} = useContext(AuthContext);
    // const {accessToken, rememberToken, ...rest} = auth;
    // const [canPickup, setCanPickup] = useState(false);
    // const [canProccess, setCanProccess] = useState(false);
    const canPickup = auth.agent.privileges.includes("PICKUP_CARGO");
    const canProccess = auth.agent.privileges.includes("HANDLE_CARGO");
    const [parcels, setParcels] = useState([
        {
            trackingNumber: "G123456",
            item: {
                itemId: "123",
                weight: 10,
                description: "Blah",
            },
            shippingSpecs: {
                route: {
                    sourceCountryCode: "US",
                    destinationCountryCode: "UK",
                },
                senderInformation: {
                    name: "Name",
                    email: "email@example.com",
                    phone: "+123456",
                    address: {
                        countryCode: "US",
                        addressLine1: " ",
                        addressLine2: " ",
                        postalCode: "XX",
                    },
                },
                receiverInformation: {
                    name: "Name",
                    email: "email@example.com",
                    phone: "+123456",
                    address: {
                        countryCode: "US",
                        addressLine1: " ",
                        addressLine2: " ",
                        postalCode: "XX",
                    },
                },
                collectionOption: "HOME",
                customerType: "INDIVIDUAL",
                parcelType: "PARCEL",
                comments: [
                    {
                        id: "123",
                        content: "Send nudes ASAP",
                        authorType: "CUSTOMER", // or STAFF,
                        authorId: "123",
                    },
                ],
                notes: "note1",
                status: "ARRIVED",
                customerId: null, // Or an ID
                createdAt: "2020-12-31 00:00:00",
                releaseCode: null, // Or Release code
            },
        },
    ]);
    const [request] = useRequest(getGargosRequest);

    const goto = (route) => {
        navigation.navigate(route);
    };
    // useEffect(() => {
    //     if (auth && auth.agent) {
    //         setCanPickup(auth.agent.privileges.includes("PICKUP_CARGO"));
    //         setCanProccess(auth.agent.privileges.includes("HANDLE_CARGO"));
    //     }
    // }, [auth]);
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
                    <Button style={s.mr} onPress={() => goto("Login")}>
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
