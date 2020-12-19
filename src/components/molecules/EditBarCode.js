import React from "react";
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TextInput,
} from "react-native";
import {ModalContainer} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const EditBarCode = ({modalVisible, setModalVisible}) => {
    return (
        <ModalContainer
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
        >
            <View style={[s.container]}>
                <View style={[s.formGroup]}>
                    <TextInput style={[s.formControl]} />
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
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text style={styles.textStyle}>     Save     </Text>
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
