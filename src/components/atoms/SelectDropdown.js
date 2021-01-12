import React, {useState, useEffect} from "react";
import {Picker} from "@react-native-picker/picker";
import {View, StyleSheet} from "react-native";
import {Text} from "react-native";
import {useTheme} from "react-native-paper";

const style = StyleSheet.create({
    input: {
        minHeight: 46,
        borderWidth: 1,
        borderColor: "grey",
        fontSize: 16,
        borderRadius: 10,
        zIndex: 1,
        color: "#000000",
        backgroundColor: "#f5f5f5",
        marginBottom: 3,
    },
    errorText: {
        fontSize: 12,
        color: "red",
        marginLeft: 9,
    },
    label: {
        fontSize: 12,
        color: "#616161",
        marginLeft: 9,
    },
});
const SelectDropdown = ({
    list = [],
    disabled,
    name,
    onSelect,
    selectedValue,
    label,
    placeholder,
    error,
}) => {
    const {colors, roundness} = useTheme();
    const [pickerStyle, setPickerStyle] = useState({height: 46});
    const [viewStyle, setViewStyle] = useState(style.input);

    useEffect(() => {
        if (selectedValue && selectedValue !== "") {
            if (disabled) {
                setViewStyle({...viewStyle, borderColor: colors.disabled});
                setPickerStyle({...pickerStyle, color: colors.disabled});
            } else {
                setPickerStyle({...pickerStyle, color: colors.primary});
                // setViewStyle({...viewStyle, borderColor: colors.primary});
            }
        } else {
            setPickerStyle({...pickerStyle, color: colors.placeholder});
        }
    }, [selectedValue]);

    const onSelectWrapper = (itemValue, itemIndex) => {
        onSelect(name, itemValue);
    };
    return (
        <>
            {label || placeholder ? (
                <Text style={style.label}>{label ? label : placeholder}</Text>
            ) : null}
            <View style={viewStyle}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onSelectWrapper}
                    style={pickerStyle}
                    enabled={!disabled}
                >
                    {selectedValue && selectedValue !== "" ? null : (
                        <Picker.Item label={placeholder} value="" />
                    )}
                    {list.map((item, i) => (
                        <Picker.Item
                            label={item.label}
                            value={item.value}
                            key={item.value}
                        />
                    ))}
                </Picker>
            </View>
            {error ? <Text style={style.errorText}>{error}</Text> : null}
        </>
    );
};

export default SelectDropdown;
