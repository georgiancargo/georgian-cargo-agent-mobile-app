import React, {useContext} from "react";
// import {Text} from "react-native";
import {SelectDropdown} from "_atoms";
import {AuthContext} from "_context";
import {codes} from "_utils";

const SourceRoutesDropdown = (props) => {
    const {
        auth: {agent},
    } = useContext(AuthContext);
    const routes = agent ? agent.enabled_routes : [];
    const sourceRoutes = [];
    routes.forEach(({source_country_code}) => {
        sourceRoutes.push({
            value: source_country_code,
            label: codes[source_country_code],
        });
    });
    // return <Text>{JSON.stringify(sourceRoutes)}</Text>;
    return <SelectDropdown list={sourceRoutes} {...props} />;
};

export default SourceRoutesDropdown;
