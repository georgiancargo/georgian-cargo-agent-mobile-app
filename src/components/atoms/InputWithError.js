import React from "react";
import {HelperText} from "react-native-paper";
import {StyleSheet, TextInput, Text} from "react-native";

const styles = StyleSheet.create({
    input: {
        minHeight: 56,
        borderWidth: 1,
        borderColor: "grey",
        paddingHorizontal: 12,
        fontSize: 16,
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
