import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "_scenes/login";
import {HomeScreen, SearchScreen} from "_scenes/home";
// import {StatusBar} from "expo-status-bar";
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
import Header from "./Header";
import {AuthContext} from "_context";

const {Navigator, Screen} = createStackNavigator();
function App() {
    const {setAuth, auth} = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Navigator
                initialRouteName="Login"
                // screenOptions={{header: Header}}
            >
                <Screen name="Login" component={LoginScreen} />
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
                <Screen
                    name="Delivered Item Processing"
                    component={DeliveredItemProcessing}
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default App;
