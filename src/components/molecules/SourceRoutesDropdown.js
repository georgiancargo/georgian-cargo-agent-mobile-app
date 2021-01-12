import React, {useContext} from "react";
import {SelectDropdown} from "_atoms";
import {AuthContext} from "_context";
import {codes} from "_utils";

const SourceRoutesDropdown = (props) => {
    const {
        auth: {agent},
    } = useContext(AuthContext);
    const routes = agent ? agent.routes : [];
    const sourceRoutes = [];
    const sourceCodes = [];
    routes.forEach(({sourceCountryCode: code}) => {
        if (sourceCodes.indexOf(code) === -1) {
            sourceRoutes.push({
                value: code,
                label: codes[code],
            });
            sourceCodes.push(code);
        }
    });
    return <SelectDropdown list={sourceRoutes} {...props} />;
};

export default SourceRoutesDropdown;
