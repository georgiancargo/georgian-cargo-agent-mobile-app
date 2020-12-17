import React from "react";
import Navigator from "_navigations";
import {AuthContextProvider} from "_context";

const App = () => (
    <AuthContextProvider>
        <Navigator />
    </AuthContextProvider>
);

export default App;
