import React, {useContext} from "react";
import {SelectDropdown} from "_atoms";
import {AuthContext} from "_context";
import {codes} from "_utils";

const DestinationRoutesDropdown = (props) => {
    const {
        auth: {agent},
    } = useContext(AuthContext);
    const routes = agent ? agent.enabled_routes : [];
    const destinationRoutes = [];
    routes.forEach(({destination_country_code}) => {
        destinationRoutes.push({
            value: destination_country_code,
            label: codes[destination_country_code],
        });
    });
    return <SelectDropdown list={destinationRoutes} {...props} />;
};

export default DestinationRoutesDropdown;
