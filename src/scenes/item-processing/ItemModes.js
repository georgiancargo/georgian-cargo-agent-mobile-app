import React from "react";
import {View} from "react-native";
import {Button} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Text} from "react-native";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const ItemModes = ({navigation}) => {
    const buttons = [
        "Proccessed Mode",
        "In Transit Mode",
        "Arrived Mode",
        "Recieved Mode",
        "Delayed Mode",
    ];
    const modes = [
        "PROCCESSED",
        "IN_TRANSIT",
        "ARRIVED",
        "RECIEVED",
        "DELAYED",
    ];
    const goToScanner = (index) => {
        navigation.navigate("Item Processing", {mode: modes[index]});
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <View style={{flex: 1}}>
                <Text>Logo</Text>
            </View>
            <View style={{flex: 5}}>
                <View style={[s.formGroup]}>
                    <Text>Select Item Processing Mode</Text>
                </View>
                {buttons.map((label, i) => (
                    <View style={[s.formGroup]}>
                        <Button key={label} onPress={() => goToScanner(i)}>
                            {label}
                        </Button>
                    </View>
                ))}
                <View style={[s.formGroup]}>
                    <Button
                        onPress={() =>
                            navigation.navigate("Delivered Item Processing")
                        }
                    >
                        Delivered Mode
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default ItemModes;
