import React from "react";
import {HelperText, TextInput as TI, Colors} from "react-native-paper";
import {StyleSheet, Text} from "react-native";
import {TextInput} from "react-native";

const styles = StyleSheet.create({
    input: {
        minHeight: 56,
        borderWidth: 1,
        borderColor: "grey",
        paddingHorizontal: 12,
        fontSize: 16,
        borderRadius: 10,
        // fontWeight:"bold"
        color: "black",
        // fontVariant:
        // flexGrow: 1,
        zIndex: 1,
        color: "#000000",
        backgroundColor: Colors.grey100,
        marginBottom: 3,
    },
    errorText: {
        fontSize: 12,
        color: "red",
        marginLeft: 9,
    },
});
const InputWithError = ({
    name,
    label,
    error,
    style = {},
    onChangeText,
    isNumber,
    info,
    ...rest
}) => {
    const onChangeWrapper = (text) => {
        if (isNumber) {
            const number = parseFloat(text);
            if (isNaN(number)) onChangeText(name, 0);
            else onChangeText(name, number);
        } else onChangeText(name, text);
    };
    return (
        <>
            {/* <TI
                style={style}
                onChangeText={onChangeWrapper}
                label={label ? label : rest.placeholder}
                keyboardType={isNumber ? "numeric" : "default"}
                mode={"outlined"}
                error={error}
                {...rest}
            /> */}
            <TextInput
                style={{...styles.input, ...style}}
                onChangeText={onChangeWrapper}
                label={label ? label : rest.placeholder}
                keyboardType={isNumber ? "numeric" : "default"}
                mode={"outlined"}
                error={error}
                {...rest}
            />
            {info || error ? (
                <Text type={error ? "error" : "info"} style={styles.errorText}>
                    {error ? error : info}
                </Text>
            ) : null}
        </>
    );
};

export default InputWithError;
