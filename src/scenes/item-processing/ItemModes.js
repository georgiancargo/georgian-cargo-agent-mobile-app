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
    const showModal = (parcel) => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    
    const goToScanner = (index) => {
        navigation.navigate("Item Processing", {event: modes[index]});
    };
    const Delivered = () => {
        const [num, setNum] = useState("");
        const onChange = (_, value) => {
            setNum(value);
        };
        const delivered = () => {
            hideModal();
            navigation.navigate("Delivered Item Processing", {size: num});
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
                            placeholder="Number of cargos"
                            onChangeText={onChange}
                            value={num.toString()}
                            isNumber
                        />
                    </View>
                    <Button onPress={delivered}>Done</Button>
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
                        <Button onPress={() => goToScanner(i)}>{label}</Button>
                    </View>
                ))}
                <View style={[s.formGroup]}>
                    <Button onPress={showModal}>Delivered Mode</Button>
                </View>
            </View>
        </View>
    );
};

export default ItemModes;
