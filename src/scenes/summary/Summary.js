import React from "react";
import {ScrollView, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {InputWithError, Button} from "_atoms";
import { SummaryList } from "_molecules";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Summary = ({navigation, route: {params}}) => {
    const {parcels} = params;
    return (
        <ScrollView style={[s.container, s.bgWhite]}>
            <View style={[s.container, s.p3]}>
                <View style={[s.formGroup]}>
                    <Text>{JSON.stringify(parcels)}</Text>
                    <SummaryList parcels={parcels} />
                </View>
            </View>
        </ScrollView>
    );
};
export default Summary;
