import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {InputWithError} from "_atoms";
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
        <ScrollView style={styles.outerContainer}>
            <View style={[s.formGroup]}>
                {list.map((label, i) => (
                    <View style={[s.formGroup]}>
                        <InputWithError
                            label={label}
                            name={label}
                            placeholder={label}
                            value={parcel[label]}
                            onChangeText={onChange}
                            style={styles.input}
                            key={label}
                        />
                    </View>
                ))}
            </View>
            <View style={[s.formGroup]}>
                <TouchableOpacity style={[s.btnTouchable]}>
                    <View style={[s.btn, s.btnPrimary]}>
                        <Text style={[s.btnText, s.btnPrimaryText]}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
});

export default EditParcel;
