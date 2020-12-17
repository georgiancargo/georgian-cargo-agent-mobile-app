import React from "react";
import CheckBox from "@react-native-community/checkbox";
import {Text, View} from "react-native";

const Checkbox = ({
    label,
    name,
    direction = "row",
    onValueChange,

    ...rest
}) => {
    const onValueChangeWrapper = (newVal) => {
        onValueChange(name, newVal);
    };
    return (
        <>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: direction,
                    flexWrap: "wrap",
                }}
            >
                <CheckBox onValueChange={onValueChangeWrapper} {...rest} />
                <Text style={{color: "black"}}>{label}</Text>
            </View>
        </>
    );
};

export default Checkbox;
