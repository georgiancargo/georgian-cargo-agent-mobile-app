import React, {useState, useEffect} from "react";
import {Picker} from "@react-native-picker/picker";
import {View, SafeAreaView} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Text} from "react-native";
import {useTheme} from "react-native-paper";
import { ScrollView } from "react-native";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SelectDropdown = ({
    list = [],
    disabled,
    name,
    onSelect,
    selectedValue,
    label,
    placeholder,
}) => {
    const {colors, roundness} = useTheme();
    const [pickerStyle, setPickerStyle] = useState({});
    const [viewStyle, setViewStyle] = useState({
        borderWidth: 1,
        borderColor: colors.backdrop,
        backgroundColor: colors.background,
        borderRadius: roundness,
        marginTop: 6,
    });

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
            {/* <ScrollView style={{flex: 1}}> */}
                {label ? (
                    <Text style={[s.formLabelText, s.textMuted]}>{label}</Text>
                ) : null}
                {/* <Text>{JSON.stringify(style)}</Text> */}
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
            {/* </ScrollView> */}
        </>
    );
};

export default SelectDropdown;
