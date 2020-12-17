import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Button = ({children, onPress, disabled}) => {
    return (
        <TouchableOpacity
            style={[s.btnTouchable, disabled ? s.btnDisabled : {}]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={[s.btn, s.btnPrimary]}>
                <Text style={[s.btnText, s.btnPrimaryText]}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Button;
