import React from "react";
import {StyleSheet, Text, TextInput} from "react-native";

const styles = StyleSheet.create({
    input: {
        minHeight: 46,
        borderWidth: 1,
        borderColor: "grey",
        paddingHorizontal: 12,
        fontSize: 16,
        borderRadius: 10,
        zIndex: 1,
        color: "#000000",
        backgroundColor: "#f5f5f5",
        marginBottom: 3,
    },
    disabled:{
        minHeight: 46,
        borderWidth: 1,
        borderColor: "grey",
        paddingHorizontal: 12,
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
const InputWithError = ({
    name,
    label,
    error,
    style = {},
    onChangeText,
    isNumber,
    isInt,
    disabled,
    ...rest
}) => {
    const onChangeWrapper = (text) => {
        if (isNumber) {
            const number = parseFloat(text);
            if (isNaN(number)) {
                onChangeText(name, 0);
            } else {
                onChangeText(name, text);
            }
        } else {
            onChangeText(name, text);
        }
        if (isInt) {
            const number = parseInt(text);
            if (isNaN(number)) {
                onChangeText(name, 0);
            } else {
                onChangeText(name, number);
            }
        }
    };
    return (
        <>
            {label || rest.placeholder ? (
                <Text style={styles.label}>
                    {label ? label : rest.placeholder}
                </Text>
            ) : null}
            <TextInput
                style={{...styles.input, ...style}}
                onChangeText={onChangeWrapper}
                label={label ? label : rest.placeholder}
                keyboardType={isNumber ? "numeric" : "default"}
                mode={"outlined"}
                error={error}
                autoCapitalize
                autoCorrect={false}
                autoCapitalize="none"
                editable={!disabled}
                {...rest}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </>
    );
};

export default InputWithError;
