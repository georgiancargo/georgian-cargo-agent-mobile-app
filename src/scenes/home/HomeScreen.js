import React, {useEffect, useState, useContext} from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import {ParcelList} from "_molecules";
import {Button} from "_atoms";
import SyncButton from "./SyncButton";
import {useRequest} from "_hooks";
import {getGargosRequest, logout as logoutRequest} from "_requests";
import {AuthContext} from "_context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Home = ({navigation}) => {
    const {auth, setAuth} = useContext(AuthContext);
    // const {accessToken, rememberToken, ...rest} = auth;
    // const [canPickup, setCanPickup] = useState(false);
    // const [canProccess, setCanProccess] = useState(false);
    const canPickup = auth.agent.privileges.includes("PICKUP_CARGO");
    const canProccess = auth.agent.privileges.includes("HANDLE_CARGO");
    const [parcels, setParcels] = useState([
        {
            tracking_number: "12342134",
            item: {
                item_id: "bae6adb2-a750-3d83-b09a-a33ba5684733",
                weight: 4.604,
                description: "Laudantium",
            },
            shipping_specs: {
                route: {
                    source_country_code: "FJ",
                    destination_country_code: "SA",
                },
                sender_information: {
                    name: "Zelma Johnston",
                    email: "angela94@bergnaum.info",
                    phone: "+1-570-726-3894",
                    address: {
                        country_code: "TV",
                        address_line_1:
                            "54330 Terrence Rest Suite 675 South Charity, NJ 84125",
                        address_line_2: "Apt. 165",
                        postal_code: "46892",
                    },
                },
                receiver_information: {
                    name: "Fae Willms",
                    email: "albertha68@gmail.com",
                    phone: "(578) 682-8373",
                    address: {
                        country_code: "SM",
                        address_line_1:
                            "35751 Nader Throughway Suite 777 Hectorfurt, NV 46769",
                        address_line_2: "Suite 471",
                        postal_code: "76317-3071",
                    },
                },
                collection_option: "OFFICE",
                customer_type: "CORPORATE",
                parcel_type: "FREIGHT",
            },
            invoice: {
                invoice_id: "1aca7d5e-7ab4-356b-9a58-aafc1c8ff318",
                freight_price: 29370276.36,
                delivery_price: 34,
                extra_charges: [
                    {
                        note: "Dishwasher",
                        amount: 10,
                    },
                ],
                discount_amount: 0,
                total_amount: 29370320.36,
                payment_status: "PAID",
                currency_code: "PHP",
            },
            comments: [],
            notes: "Luv u",
            status: "RELEASED",
            customer_id: null,
            created_at: "Mon Dec 28 2020 15:57:14 GMT+0200",
            release_code: "luvu",
        },  {
            tracking_number: "12342134",
            item: {
                item_id: "bae6adb2-a750-3d83-b09a-a33ba5684733",
                weight: 4.604,
                description: "Laudantium",
            },
            shipping_specs: {
                route: {
                    source_country_code: "FJ",
                    destination_country_code: "SA",
                },
                sender_information: {
                    name: "Zelma Johnston",
                    email: "angela94@bergnaum.info",
                    phone: "+1-570-726-3894",
                    address: {
                        country_code: "TV",
                        address_line_1:
                            "54330 Terrence Rest Suite 675 South Charity, NJ 84125",
                        address_line_2: "Apt. 165",
                        postal_code: "46892",
                    },
                },
                receiver_information: {
                    name: "Fae Willms",
                    email: "albertha68@gmail.com",
                    phone: "(578) 682-8373",
                    address: {
                        country_code: "SM",
                        address_line_1:
                            "35751 Nader Throughway Suite 777 Hectorfurt, NV 46769",
                        address_line_2: "Suite 471",
                        postal_code: "76317-3071",
                    },
                },
                collection_option: "OFFICE",
                customer_type: "CORPORATE",
                parcel_type: "FREIGHT",
            },
            invoice: {
                invoice_id: "1aca7d5e-7ab4-356b-9a58-aafc1c8ff318",
                freight_price: 29370276.36,
                delivery_price: 34,
                extra_charges: [
                    {
                        note: "Dishwasher",
                        amount: 10,
                    },
                ],
                discount_amount: 0,
                total_amount: 29370320.36,
                payment_status: "PAID",
                currency_code: "PHP",
            },
            comments: [],
            notes: "Luv u",
            status: "RELEASED",
            customer_id: null,
            created_at: "Mon Dec 28 2020 15:57:14 GMT+0200",
            release_code: "luvu",
        },  {
            tracking_number: "12342134",
            item: {
                item_id: "bae6adb2-a750-3d83-b09a-a33ba5684733",
                weight: 4.604,
                description: "Laudantium",
            },
            shipping_specs: {
                route: {
                    source_country_code: "FJ",
                    destination_country_code: "SA",
                },
                sender_information: {
                    name: "Zelma Johnston",
                    email: "angela94@bergnaum.info",
                    phone: "+1-570-726-3894",
                    address: {
                        country_code: "TV",
                        address_line_1:
                            "54330 Terrence Rest Suite 675 South Charity, NJ 84125",
                        address_line_2: "Apt. 165",
                        postal_code: "46892",
                    },
                },
                receiver_information: {
                    name: "Fae Willms",
                    email: "albertha68@gmail.com",
                    phone: "(578) 682-8373",
                    address: {
                        country_code: "SM",
                        address_line_1:
                            "35751 Nader Throughway Suite 777 Hectorfurt, NV 46769",
                        address_line_2: "Suite 471",
                        postal_code: "76317-3071",
                    },
                },
                collection_option: "OFFICE",
                customer_type: "CORPORATE",
                parcel_type: "FREIGHT",
            },
            invoice: {
                invoice_id: "1aca7d5e-7ab4-356b-9a58-aafc1c8ff318",
                freight_price: 29370276.36,
                delivery_price: 34,
                extra_charges: [
                    {
                        note: "Dishwasher",
                        amount: 10,
                    },
                ],
                discount_amount: 0,
                total_amount: 29370320.36,
                payment_status: "PAID",
                currency_code: "PHP",
            },
            comments: [],
            notes: "Luv u",
            status: "RELEASED",
            customer_id: null,
            created_at: "Mon Dec 28 2020 15:57:14 GMT+0200",
            release_code: "luvu",
        },  {
            tracking_number: "12342134",
            item: {
                item_id: "bae6adb2-a750-3d83-b09a-a33ba5684733",
                weight: 4.604,
                description: "Laudantium",
            },
            shipping_specs: {
                route: {
                    source_country_code: "FJ",
                    destination_country_code: "SA",
                },
                sender_information: {
                    name: "Zelma Johnston",
                    email: "angela94@bergnaum.info",
                    phone: "+1-570-726-3894",
                    address: {
                        country_code: "TV",
                        address_line_1:
                            "54330 Terrence Rest Suite 675 South Charity, NJ 84125",
                        address_line_2: "Apt. 165",
                        postal_code: "46892",
                    },
                },
                receiver_information: {
                    name: "Fae Willms",
                    email: "albertha68@gmail.com",
                    phone: "(578) 682-8373",
                    address: {
                        country_code: "SM",
                        address_line_1:
                            "35751 Nader Throughway Suite 777 Hectorfurt, NV 46769",
                        address_line_2: "Suite 471",
                        postal_code: "76317-3071",
                    },
                },
                collection_option: "OFFICE",
                customer_type: "CORPORATE",
                parcel_type: "FREIGHT",
            },
            invoice: {
                invoice_id: "1aca7d5e-7ab4-356b-9a58-aafc1c8ff318",
                freight_price: 29370276.36,
                delivery_price: 34,
                extra_charges: [
                    {
                        note: "Dishwasher",
                        amount: 10,
                    },
                ],
                discount_amount: 0,
                total_amount: 29370320.36,
                payment_status: "PAID",
                currency_code: "PHP",
            },
            comments: [],
            notes: "Luv u",
            status: "RELEASED",
            customer_id: null,
            created_at: "Mon Dec 28 2020 15:57:14 GMT+0200",
            release_code: "luvu",
        },
    ]);
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
    // useEffect(() => {
    //     request({
    //         paging_specification: {
    //             page_offset: 0,
    //             page_size: 30,
    //         },
    //     })
    //         .then((r) => {
    //             setParcels(r.data.cargos);
    //         })
    //         .catch((e) => {});
    // }, []);
    return (
        <View style={s.container}>
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
