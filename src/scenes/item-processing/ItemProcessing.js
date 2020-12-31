import React, {useState} from "react";
import {View, Text} from "react-native";
import {ProcessingList, EditBarCode} from "_molecules";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Button, InputWithError} from "_atoms";
import {processRequest} from "_requests";
import {useRequest} from "_hooks";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s} = bootstrapStyleSheet;

const ItemProcessing = ({navigation, route: {params}}) => {
    const [request, requesting] = useRequest(processRequest);
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
    const send = () => {
        request({tracking_numbers: barCodes, event: params.event})
            .then((r) => {})
            .catch((e) => {});
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
                <View
                    View
                    style={[
                        s.formGroup,
                        {
                            alignItems: "center",
                            borderWidth: 1,
                            borderRadius: 20,
                        },
                    ]}
                >
                    <Text>Total Items: {barCodes.length}</Text>
                    <Text>Mode: {params.event}</Text>
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
                    <Button onPress={send}>Done</Button>
                </View>
            </View>
        </>
    );
};

export default ItemProcessing;
