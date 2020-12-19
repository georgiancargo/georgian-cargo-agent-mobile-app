import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import Scanner from "./Scanner";
import {ProcessingList, EditBarCode} from "_molecules";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const ItemProcessing = ({navigation}) => {
    const [barCodes, setBarCodes] = useState([
        "11111",
        "11111",
        "11111",
        "11111",
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const remove = (i) => {
        const newBars = [];
        for (let index = 0; index < barCodes.length; index++) {
            if (i !== index) newBars.push(barCodes[index]);
        }
        setBarCodes(newBars);
    };

    const edit = (index) => {
        setModalVisible(true);
    };

    return (
        <>
            <React.Fragment>
                <Scanner barCodes={barCodes} setBarCodes={setBarCodes} />
            </React.Fragment>
            {/* <ScrollView style={{flex: 1}}> */}
            <View style={[s.container, styles.camera, s.m2]}>
                {/* <Text style={[s.text]}>HI</Text>
                    <Button
                        onPress={() =>
                            navigation.navigate("scan", {
                                barCodes: barCodes,
                                setBarCodes: setBarCodes,
                            })
                        }
                    >
                        Scan
                    </Button> */}
                <EditBarCode
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
                <ProcessingList
                    barCodes={barCodes.reverse()}
                    remove={remove}
                    edit={edit}
                />
            </View>
            {/* </ScrollView> */}
        </>
    );
};

const styles = StyleSheet.create({
    camera: {flex: 1, borderWidth: 1, borderRadius: 10},
});

export default ItemProcessing;
