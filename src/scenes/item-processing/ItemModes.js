import React, {useState} from "react";
import {View} from "react-native";
import {Button} from "_atoms";
import {Text} from "react-native";
import {ScrollView, StyleSheet, Image} from "react-native";
import {ModalContainer} from "_atoms";
import { InputWithError } from "_atoms";
import {logoImage} from '_scenes/login'

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    logo: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    main: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    logoImage: {
        width: 300,
        resizeMode: "contain",
    },
});

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
                <ScrollView style={styles.container}>
                    <View>
                        <InputWithError
                            name="data"
                            placeholder="Number of codes"
                            onChangeText={onChange}
                            value={num.toString()}
                            isNumber
                        />
                    </View>
                    <Button
                        onPress={hideModal}
                        mode="outlined"
                        style={{marginBottom: 3}}
                    >
                        Cancel
                    </Button>
                    <Button onPress={done}>Done</Button>
                </ScrollView>
            </ModalContainer>
        );
    };
    return (
        <View style={styles.main}>
            <View style={styles.logo}>
                <Image source={logoImage} style={styles.logoImage} />
            </View>
            <Delivered />
            <View style={{flex: 5}}>
                <View style={styles.container}>
                    <Text>Select Item Processing Mode</Text>
                </View>
                {buttons.map((label, i) => (
                    <View style={styles.container} key={label}>
                        <Button onPress={() => showModal(i)}>{label}</Button>
                    </View>
                ))}
                <View style={styles.container}>
                    <Button onPress={() => showModal(-1)}>Delivered Mode</Button>
                </View>
            </View>
        </View>
    );
};

export default ItemModes;
