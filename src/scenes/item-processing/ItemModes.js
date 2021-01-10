import React, {useState} from "react";
import {View} from "react-native";
import {Button} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Text} from "react-native";
import {ScrollView} from "react-native";
import {ModalContainer} from "_atoms";
import { InputWithError } from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const ItemModes = ({navigation}) => {
    const buttons = ["Proccessed Mode", "In Transit Mode", "Arrived Mode", "Recieved Mode", "Delayed Mode"];
    const modes = ["PROCESS", "TRANSIT", "ARRIVE", "RECEIVE", "DELAY"];
    const [modalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState(0);
    const showModal = (i) => {
        setModalVisible(true);
        setMode(i);
    };
    const hideModal = () => setModalVisible(false);

    const Delivered = () => {
        const [num, setNum] = useState(1);
        const onChange = (_, value) => {
            setNum(value);
        };
        const done = () => {
            hideModal();
            if (mode === -1)
                navigation.navigate("Delivered Item Processing", {size: num});
            else
                navigation.navigate("Item Processing", {event: modes[mode], size: num});
        };
        return (
            <ModalContainer
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            >
                <ScrollView style={[s.container]}>
                    <View style={[s.formGroup]}>
                        <InputWithError
                            name="data"
                            placeholder="Number of codes"
                            onChangeText={onChange}
                            value={num.toString()}
                            isNumber
                        />
                    </View>
                    <Button onPress={done}>Done</Button>
                </ScrollView>
            </ModalContainer>
        );
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <View style={{flex: 1}}>
                <Text>Logo</Text>
            </View>
            <Delivered />
            <View style={{flex: 5}}>
                <View style={[s.formGroup]}>
                    <Text>Select Item Processing Mode</Text>
                </View>
                {buttons.map((label, i) => (
                    <View style={[s.formGroup]} key={label}>
                        <Button onPress={() => showModal(i)}>{label}</Button>
                    </View>
                ))}
                <View style={[s.formGroup]}>
                    <Button onPress={() => showModal(-1)}>Delivered Mode</Button>
                </View>
            </View>
        </View>
    );
};

export default ItemModes;
