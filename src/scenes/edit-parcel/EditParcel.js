import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {InputWithError, Button} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const EditParcel = ({
    navigation,
    route: {
        params: {parcel: oldParcel},
    },
}) => {
    const list = [
        "ID",
        "weight",
        "price",
        "status",
        "place",
        "type",
        "sender",
        "reciever",
    ];
    const [parcel, setParcel] = useState({id: oldParcel});
    const onChange = (name, value) => {
        setParcel({...parcel, [name]: value});
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <View style={[s.formGroup]}>
                {list.map((label, i) => (
                    // <View style={[s.formGroup]}>
                    <InputWithError
                        // label={label}
                        name={label}
                        placeholder={label}
                        value={parcel[label]}
                        onChangeText={onChange}
                        // style={styles.input}
                        key={label}
                    />
                    // </View>
                ))}
            </View>
            <View style={[s.formGroup]}>
                <Button>Save</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
});

export default EditParcel;
