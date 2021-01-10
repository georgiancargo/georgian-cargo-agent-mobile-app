import React from "react";
import {Text} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {TextInput, HelperText} from "react-native-paper";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

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
                style={{...style}}
                onChangeText={onChangeWrapper}
                label={label ? label : rest.placeholder}
                keyboardType={isNumber ? "numeric" : "default"}
                mode={"outlined"}
                error={error}
                {...rest}
            />
            {info || error ? (
                <HelperText type={error ? "error" : "info"} visible={true}>
                    {error ? error : info}
                </HelperText>
            ) : null}
        </>
    );
};

export default InputWithError;
