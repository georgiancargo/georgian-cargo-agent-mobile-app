import React from "react";
import {Text} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {TextInput} from "react-native-paper";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const InputWithError = ({
    name,
    label,
    error,
    style = {},
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
            {/* {label ? (
                <Text style={[s.formLabelText, s.textMuted]}>{label}</Text>
            ) : null} */}
            <TextInput
                // label="Email"
                // value={text}
                style={{height: 35, ...style}}
                mode="outlined"
                // onChangeText={(text) => setText(text)}
                onChangeText={onChangeWrapper}
                label={label ? label : rest.placeholder}
                // style={[s.formControl]}
                keyboardType={isNumber ? "numeric" : "default"}
                error={error}
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
