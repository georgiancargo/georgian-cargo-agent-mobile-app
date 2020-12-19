import React, {useState, createContext, useContext} from "react";
import {StyleSheet, View, Text} from "react-native";
import {ProcessingList, EditBarCode} from "_molecules";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Button, InputWithError} from "_atoms";
import {createStackNavigator} from "@react-navigation/stack";
// import {NavigationContainer} from "@react-navigation/native";
// import {LoginScreen} from "_scenes/login";
// import {HomeScreen} from "_scenes/home";
// import {StatusBar} from "expo-status-bar";
// import {EditParcel} from "_scenes/edit-parcel";
// import {AddReciever, AddSender} from "_scenes/add-parcel";
// import {Summary} from "_scenes/summary";
// import {ItemProcessingScanner, Scanner} from ".";
import ItemProcessingScanner from "./ItemProcessingScanner";
import Scanner from "./Scanner";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;
const {Navigator, Screen} = createStackNavigator();

const ItemProcessing = (props) => {
    const [barCodes, setBarCodes] = useState([
        "First",
        "Second",
        "Third",
        "Fourth",
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [barcode, setBarcode] = useState({});
    const remove = (i) => {
        const newBars = [];
        for (let index = 0; index < barCodes.length; index++) {
            if (i !== index) newBars.push(barCodes[index]);
        }
        setBarCodes(newBars);
    };

    const edit = (index) => {
        setModalVisible(true);
        setBarcode({barcode: barCodes[index].toString(), index: index});
    };
    const save = () => {
        setModalVisible(false);
        const newBarcodes = barCodes;
        newBarcodes[barcode.index] = barcode.barcode;
        setBarCodes(newBarcodes);
    };

    const BarcodesContext = createContext({
        save: save,
        edit: edit,
        remove: remove,
        barCodes: barCodes,
        setBarCodes: setBarCodes,
        barcode: barcode,
    });
    const gotoScanner = () => {
        navigation.navigate("Scanner", {
            save: save,
            edit: edit,
            remove: remove,
            barCodes: barCodes,
            setBarCodes: setBarCodes,
        });
    };
    const onChangeText = (name, value) => {
        setBarcode({...barcode, [name]: value});
    };
    const add = () => {
        const b = barcode.barcode;
        if (b && barCodes.indexOf(b) == -1) {
            setBarCodes([...barCodes, b]);
            setBarcode({});
        }
    };

    return (
        <>
            <View style={[s.container, s.bgWhite, s.flex1, s.p2]}>
                <View style={[s.formGroup]}>
                    <InputWithError
                        placeholder="Barcode"
                        name="barcode"
                        value={barcode.barcode}
                        onChangeText={onChangeText}
                    />
                </View>
                <View
                    style={[
                        s.formGroup,
                        {flexDirection: "row", justifyContent: "center"},
                    ]}
                >
                    <View style={[s.formGroup, s.flex1, s.mr2]}>
                        <Button onPress={gotoScanner}>Scan</Button>
                    </View>
                    <View style={[s.formGroup, s.flex1, s.ml2]}>
                        <Button onPress={add}>Add</Button>
                    </View>
                </View>
                <View style={[s.flex3]}>
                    <EditBarCode
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        barcode={barcode}
                        setBarcode={setBarcode}
                        save={save}
                    />
                    <ProcessingList
                        barCodes={barCodes}
                        remove={remove}
                        edit={edit}
                    />
                </View>
                <View style={[s.formGroup]}>
                    <Button>Done</Button>
                </View>
            </View>
            {/* </ScrollView> */}
        </>
    );
};

const styles = StyleSheet.create({
    camera: {flex: 1, borderWidth: 1, borderRadius: 10},
});

export default ItemProcessing;
