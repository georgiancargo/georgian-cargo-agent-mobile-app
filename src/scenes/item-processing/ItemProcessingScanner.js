import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import Scanner from "./Scanner";
import {ProcessingList, EditBarCode} from "_molecules";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Button} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const ItemProcessingScanner = ({navigation, route: {params}}) => {
    const {barCodes, setBarCodes} = params;
    const [barcodes, setBarcodes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [barcode, setBarcode] = useState({});

    useEffect(() => {
        if (!arraysEqual(barCodes, barcodes)) setBarcodes(barCodes);
    }, [barCodes]);

    useEffect(() => {
        setBarCodes(barcodes);
    }, [barcodes]);
    const remove = (i) => {
        const newBars = [];
        for (let index = 0; index < barcodes.length; index++) {
            if (i !== index) newBars.push(barcodes[index]);
        }
        setBarcodes(newBars);
    };

    const edit = (index) => {
        setModalVisible(true);
        setBarcode({barcode: barcodes[index].toString(), index: index});
    };
    const save = () => {
        setModalVisible(false);
        const newBarcodes = barcodes;
        newBarcodes[barcode.index] = barcode.barcode;
        setBarcodes(newBarcodes);
    };

    return (
        <>
            <React.Fragment>
                <Scanner barCodes={barcodes} setBarCodes={setBarcodes} />
            </React.Fragment>
            <View style={[s.container, styles.camera, s.m2]}>
                {/* <Text>{JSON.stringify(barcodes)}</Text> */}
                <EditBarCode
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    barcode={barcode}
                    setBarcode={setBarcode}
                    save={save}
                />
                <View style={{flex: 1}}>
                    <View style={{flex: 8}}>
                        <ProcessingList
                            barCodes={barcodes}
                            remove={remove}
                            edit={edit}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Button onPress={() => navigation.goBack()}>
                            Done
                        </Button>
                    </View>
                </View>
            </View>
            {/* </ScrollView> */}
        </>
    );
};

const styles = StyleSheet.create({
    camera: {flex: 1, borderWidth: 1, borderRadius: 10},
});

export default ItemProcessingScanner;
