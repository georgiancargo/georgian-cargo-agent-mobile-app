import React from "react";
import {ScrollView, Text, View} from "react-native";
import {InputWithError, Button, PickupListItem} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {PickupList} from "_molecules";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const AddSender = ({navigation}) => {
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
            <ScrollView style={[s.container, s.bgWhite, s.p3]}>
                <View style={[s.formGroup]}>
                    {labels.map((label, i) => (
                        <View style={[s.formGroup]}>
                            <InputWithError
                                name={keys[i]}
                                key={keys[i]}
                                // label={label}
                                placeholder={label}
                            />
                        </View>
                    ))}
                    <Button onPress={onPress}>Next</Button>
                </View>

                <View>
                    {/* <PickupListItem /> */}
                    <PickupList />
                </View>
            </ScrollView>
        </>
    );
};

export default AddSender;
