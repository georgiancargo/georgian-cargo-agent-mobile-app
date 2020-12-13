import React from "react";
import {TextInput, View, StyleSheet, Text} from "react-native";

const InputWithError = ({
    name = "name",
    label,
    error,
    placeholder = "placeholder",
    style,
    onChangeText,
    ...rest
}) => {
    const onChangeWrapper = (text) => {
        onChangeText(name, text);
    };
    return (
        <View>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <TextInput
                style={style ? style : styles.input}
                placeholder={placeholder}
                onChangeText={onChangeWrapper}
                {...rest}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: "azure",
        fontSize: 20,
    },
    inputError: {
        height: 40,
        backgroundColor: "azure",
        fontSize: 20,
    },
    label: {
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default InputWithError;
