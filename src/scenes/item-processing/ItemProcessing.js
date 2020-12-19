import React from "react";
import {Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const ItemProcessing = ({navigation}) => {
    return (
        <View style={[s.container]}>
            <Text style={[s.text]}>HI</Text>
        </View>
    );
};

export default ItemProcessing;
