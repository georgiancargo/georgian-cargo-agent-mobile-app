import React from "react";
import Navigator from "_navigations";
import {AuthContextProvider} from "_context";
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";

const theme = {
    ...DefaultTheme,
    roundness: 12,
    // dark: true,
    colors: {
        ...DefaultTheme.colors,
        // primary: "",
        // accent: "yellow",
        primary: "#153e90", // - primary color for your app, usually your brand color.
        accent: "#0e49b5", // - secondary color for your app which complements the primary color.
        background: "#54e346", // - background color for pages, such as lists.
        // surface: "", // - background color for elements containing content, such as cards.
        text: "#54e346", // - text color for content.
        disabled: "muted", // - color for disabled elements.
        placeholder: "muted", // - color for placeholder text, such as input placeholder.
        backdrop: "", // - color for backdrops of various components such as modals.
    },
};

const App = () => (
    <AuthContextProvider>
        <PaperProvider theme={theme}>
            <Navigator />
        </PaperProvider>
    </AuthContextProvider>
);

export default App;
