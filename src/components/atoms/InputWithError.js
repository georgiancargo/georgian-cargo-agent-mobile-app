import React from "react";
import {TextInput, Text} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const InputWithError = ({name, label, error, style, onChangeText, ...rest}) => {
    const onChangeWrapper = (text) => {
        onChangeText(name, text);
    };
    return (
        <>
            {label ? <Text style={[s.formLabelText, s.textMuted]}>{label}</Text> : null}
            <TextInput style={[s.formControl]} onChangeText={onChangeWrapper} {...rest} />
            {error ? (
                <Text style={[s.textSmall, s.formText, s.invalidFeedback, s.textMuted]}>
                    {error}
                </Text>
            ) : null}
        </>
    );
};

export default InputWithError;
