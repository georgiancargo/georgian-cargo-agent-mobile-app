import React, {useContext} from "react";
// import {Text} from "react-native";
import {SelectDropdown} from "_atoms";
import {AuthContext} from "_context";
import {codes} from "_utils";

const SourceRoutesDropdown = (props) => {
    const {
        auth: {agent},
    } = useContext(AuthContext);
    const routes = agent ? agent.routes : [];
    const sourceRoutes = [];
    routes.forEach(({sourceCountryCode}) => {
        sourceRoutes.push({
            value: sourceCountryCode,
            label: codes[sourceCountryCode],
        });
    });
    // return <Text>{JSON.stringify(sourceRoutes)}</Text>;
    return <SelectDropdown list={sourceRoutes} {...props} />;
};

export default SourceRoutesDropdown;
