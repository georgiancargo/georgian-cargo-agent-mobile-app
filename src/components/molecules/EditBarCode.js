import React from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {ModalContainer, InputWithError} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const EditBarCode = ({
    modalVisible,
    setModalVisible,
    barcode,
    setBarcode,
    save,
}) => {
    const onChangeText = (name, value) => {
        setBarcode({...barcode, [name]: value});
    };
    return (
        <ModalContainer
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
        >
            <View style={[s.container]}>
                {/* <Text>{JSON.stringify(barcode)}</Text> */}
                <View style={[s.formGroup]}>
                    <InputWithError
                        style={[s.formControl]}
                        onChangeText={onChangeText}
                        placeholder="Barcode"
                        name="barcode"
                        autoFocus={true}
                        value={barcode.barcode}
                    />
                </View>
                <View
                    style={[
                        s.formGroup,
                        {
                            flexDirection: "row",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <TouchableHighlight
                        style={{
                            ...styles.openButton,
                            backgroundColor: "#2196F3",
                        }}
                        onPress={save}
                    >
                        <Text style={styles.textStyle}> Save </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            ...styles.openButton,
                            backgroundColor: "grey",
                            // alignContent: "flex-end"
                        }}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ModalContainer>
    );
};
const styles = StyleSheet.create({
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default EditBarCode;
