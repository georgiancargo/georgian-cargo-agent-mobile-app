import React, {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SelectDropdown = ({list = [], name, onSelect, selectedValue}) => {
    const onSelectWrapper = (itemValue, itemIndex) => {
        onSelect(name, itemValue);
    };
    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 30,
                paddingHorizontal: 5,
            }}
        >
            <Picker
                selectedValue={selectedValue}
                onValueChange={onSelectWrapper}
                style={{height: 35}}
            >
                {list.map((item, i) => (
                    <Picker.Item
                        label={item.label}
                        value={item.value}
                        key={item.value}
                    />
                ))}
            </Picker>
        </View>
    );
};

export default SelectDropdown;
