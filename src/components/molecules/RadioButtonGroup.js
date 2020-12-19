import React from "react";
import {Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {RadioButton} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const RadioButtonGroup = ({
    label,
    values,
    checkLabels = [],
    name,
    onValueChange,
    val,
}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
            }}
        >
            <View style={{flex: 2}}>
                <Text style={[s.text]}>{label}</Text>
            </View>
            {values.map((value, i) => (
                <View style={{flex: 2}} key={value}>
                    <RadioButton
                        name={name}
                        original={val}
                        value={value}
                        onSelect={onValueChange}
                        label={checkLabels[i]}
                    />
                </View>
            ))}
        </View>
    );
};

export default RadioButtonGroup;
