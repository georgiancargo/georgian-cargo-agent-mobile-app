import React from "react";
import Navigator from "_navigations";
import {AuthContextProvider} from "_context";
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
// import {StatusBar} from "expo-status-bar";
import {StatusBar} from "react-native";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#f5a11c", // - secondary color for your app which complements the primary color.
        accent: "#ed1c24", // - primary color for your app, usually your brand color.
    },
};

const App = () => (
    <AuthContextProvider>
        <PaperProvider theme={theme}>
            <StatusBar/>
            <Navigator />
        </PaperProvider>
    </AuthContextProvider>
);

export default App;
