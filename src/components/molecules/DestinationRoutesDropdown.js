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
    const destinationCodes = [];
    routes.forEach(({destinationCountryCode: code}) => {
        if (destinationCodes.indexOf(code) === -1) {
            destinationRoutes.push({
                value: code,
                label: codes[code],
            });
            destinationCodes.push(code);
        }
    });
    return <SelectDropdown list={destinationRoutes} {...props} />;
};

export default DestinationRoutesDropdown;
