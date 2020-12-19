import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Button = ({children, onPress, disabled}) => {
    const stle = {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 85,
        flex: 1,
        backgroundColor: "#FFBB34",
        borderColor: "#555555",
        borderWidth: 0,
        borderRadius: 0,
        marginTop: 200,
        justifyContent: "flex-start",
    };
    return (
        <TouchableOpacity
            style={[s.btnTouchable, disabled ? s.btnDisabled : {}]}
            // style={stle}
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
