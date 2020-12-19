import React, {useState, useEffect} from "react";
import {Picker} from "@react-native-picker/picker";
import {View, SafeAreaView} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Text} from "react-native";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SelectDropdown = ({
    list = [],
    name,
    onSelect,
    selectedValue,
    label,
    placeholder,
}) => {
    const [style, setStyle] = useState({height: 35});

    useEffect(() => {
        if (selectedValue && selectedValue !== "")
            setStyle({...style, color: "black"});
        else setStyle({...style, color: "rgb(181, 175, 166)"});
    }, [selectedValue]);

    const onSelectWrapper = (itemValue, itemIndex) => {
        onSelect(name, itemValue);
    };
    return (
        <>
            <SafeAreaView style={{flex: 1}}>
                {label ? (
                    <Text style={[s.formLabelText, s.textMuted]}>{label}</Text>
                ) : null}
                {/* <Text>{JSON.stringify(style)}</Text> */}
                <View
                    style={{
                        borderWidth: 0.8,
                        borderColor: "#ced4da",
                        borderRadius: 5,
                    }}
                >
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={onSelectWrapper}
                        style={style}
                        // style={[
                        //     s.textMuted,
                        //     {
                        //         borderWidth: 30,
                        //         borderColor: "black",
                        //         height: 35,
                        //         maxHeight: 35,
                        //     },
                        // ]}
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
            </SafeAreaView>
        </>
    );
};

export default SelectDropdown;
