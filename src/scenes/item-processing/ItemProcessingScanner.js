import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text} from "react-native";
import Scanner from "./Scanner";
import {ProcessingList, EditBarCode} from "_molecules";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Button} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const ItemProcessingScanner = ({navigation, route: {params}}) => {
    // const [barCodes, setBarCodes] = useState([
    //     "First",
    //     "Second",
    //     "Third",
    //     "Fourth",
    // ]);

    const {barCodes, setBarCodes} = params;
    const [barcodes, setBarcodes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [barcode, setBarcode] = useState({});
    useEffect(() => {
        setBarcodes(barCodes);
    }, [barCodes]);
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

    return (
        <>
            <React.Fragment>
                <Scanner barCodes={barCodes} setBarCodes={setBarCodes} />
            </React.Fragment>
            <View style={[s.container, styles.camera, s.m2]}>
                <Text>{JSON.stringify(barcodes)}</Text>
                <EditBarCode
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    barcode={barcode}
                    setBarcode={setBarcode}
                    save={save}
                />
                <ProcessingList
                    barCodes={barcodes}
                    remove={remove}
                    edit={edit}
                />
                <Button onPress={() => navigation.navigate("Home")}>
                    Done
                </Button>
            </View>
            {/* </ScrollView> */}
        </>
    );
};

const styles = StyleSheet.create({
    camera: {flex: 1, borderWidth: 1, borderRadius: 10},
});

export default ItemProcessingScanner;
