import React from "react";
import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Button = ({children, onPress}) => {
    return (
        <TouchableOpacity style={[s.btnTouchable]} onPress={onPress}>
            <View style={[s.btn, s.btnPrimary]}>
                <Text style={[s.btnText, s.btnPrimaryText]}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Button;
