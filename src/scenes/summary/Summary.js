import React from "react";
import {ScrollView, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {InputWithError, Button} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Summary = ({navigation}) => {
    const labels = [
        "Sender id",
        "Sender name",
        "Sender phone",
        "Sender Email",
        "Sender address country code",
        "Sender addrees line 1",
        "Sender address line 2",
        "Sender address postal code",
    ];
    const keys = [
        "client_id",
        "name",
        "phone",
        "Email",
        "country_code",
        "addrees_line_1",
        "address_line_2",
        "postal_code",
    ];
    const onPress = () => {
        navigation.navigate("Add Reciever");
    };
    return (
        <>
            {/* <ScrollView style={[s.container, s.bgWhite]}> */}
                <View style={[s.formGroup]}>
                    {/* {labels.map((label, i) => (
                        <View style={[s.formGroup]}>
                            <InputWithError name={keys[i]} key={keys[i]} label={label} />
                        </View>
                    ))}
                    <Button onPress={onPress}>Next</Button> */}
                    <Text>Add Parcel</Text>
                </View>
            {/* </ScrollView> */}
        </>
    );
};
export default Summary;
