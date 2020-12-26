import React from "react";
import {View} from "react-native";
import {Button} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const ItemModes = () => {
    const buttons = [
        "Proccessed Mode",
        "In Transit Mode",
        "Arrived Mode",
        "Recieved Mode",
        "Delayed Mode",
        "Delivered Mode",
    ];
    const modes = [
        "PROCCESSED",
        "IN_TRANSIT",
        "ARRIVED",
        "RECIEVED",
        "DELAYED",
        "DELIVERED",
    ];
    return (
        <View style={[s.container, s.bgWhite, s.flex1]}>
            {/* {buttons.map((label) => (
                <Button key={label}>{label}</Button>
            ))} */}
        </View>
    );
};

export default ItemModes;
