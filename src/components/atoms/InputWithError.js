import React from "react";
import {TextInput, Text} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const InputWithError = ({
    name,
    label,
    error,
    style,
    onChangeText,
    isNumber,
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
            {label ? (
                <Text style={[s.formLabelText, s.textMuted]}>{label}</Text>
            ) : null}
            <TextInput
                style={[s.formControl]}
                onChangeText={onChangeWrapper}
                keyboardType={isNumber ? "numeric" : "default"}
                {...rest}
            />
            {error ? (
                <Text
                    style={[
                        s.textSmall,
                        s.formText,
                        s.invalidFeedback,
                        s.textMuted,
                    ]}
                >
                    {error}
                </Text>
            ) : null}
        </>
    );
};

export default InputWithError;
