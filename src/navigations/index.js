import React, {useContext, useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "_scenes/login";
import {HomeScreen, SearchScreen} from "_scenes/home";
import * as SplashScreen from "expo-splash-screen";
import {EditParcel, EditUser} from "_scenes/edit-parcel";
import {AddReciever, PickupItemScreen} from "_scenes/pickup-item";
import {Summary} from "_scenes/summary";
import {
    ItemProcessingScanner,
    ItemProcessing,
    ItemModes,
    DeliveredItemProcessing,
    Scanner,
} from "_scenes/item-processing";
import {AuthContext} from "_context";
import {useRequest} from "_hooks";
import {loginRequest} from "_requests";

const {Navigator, Screen} = createStackNavigator();

const App = () => {
    const {auth, setAuth} = useContext(AuthContext);
    const [authenticate] = useRequest(loginRequest);
    useEffect(() => {
        if (auth) {
            SplashScreen.preventAutoHideAsync().catch((e) => {});
            authenticate({
                username: auth.username,
                password: auth.password,
                remember_token: true,
            })
                .then(({data}) => {
                    setAuth({
                        access_token: data.access_token,
                        remember_token: data.remember_token,
                        is_logged_in: true,
                        agent: data.staff,
                        username: auth.username,
                        password: auth.password,
                    }).catch((e) => {});
                })
                .catch((e) => {})
                .finally(() => {
                    SplashScreen.hideAsync().catch((e) => {});
                });
        }          
    }, []);

    return (
        <NavigationContainer>
            <Navigator>
                {auth.is_logged_in ? (
                    <>
                        <Screen name="Home" component={HomeScreen} />
                        <Screen name="Edit Parcel" component={EditParcel} />
                        <Screen name="Edit Sender" component={EditUser} />
                        <Screen name="Edit Receiver" component={EditUser} />
                        <Screen name="Add Sender" component={PickupItemScreen} />
                        <Screen name="Summary" component={Summary} />
                        <Screen name="Add Parcel" component={AddReciever} />
                        <Screen name="Item Processing" component={ItemProcessing} />
                        <Screen name="Scanner" component={ItemProcessingScanner} />
                        <Screen name="cameraScanner" component={Scanner} />
                        <Screen name="Modes" component={ItemModes} />
                        <Screen name="Search" component={SearchScreen} />
                        <Screen name="Delivered Item Processing" component={DeliveredItemProcessing} />
                    </>
                ) : (
                    <Screen name="Login" component={LoginScreen} />
                )}
            </Navigator>
        </NavigationContainer>
    );
};
export default App;
