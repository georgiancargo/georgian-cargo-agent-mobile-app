import React, {useContext} from "react";
import {SelectDropdown} from "_atoms";
import {AuthContext} from "_context";
import {codes} from "_utils";

const DestinationRoutesDropdown = (props) => {
    const {
        auth: {agent},
    } = useContext(AuthContext);
    const routes = agent ? agent.routes : [];
    const destinationRoutes = [];
    routes.forEach(({destinationCountryCode}) => {
        destinationRoutes.push({
            value: destinationCountryCode,
            label: codes[destinationCountryCode],
        });
    });
    return <SelectDropdown list={destinationRoutes} {...props} />;
};

export default DestinationRoutesDropdown;
