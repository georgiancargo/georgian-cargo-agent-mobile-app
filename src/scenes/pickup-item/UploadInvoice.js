import React, {useState, useEffect} from "react";
import {Image, View, Platform, StyleSheet} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Button} from "_atoms";
import {ModalContainer} from "_atoms";

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 5,
    },
    button: {
        // flex: 1,
        margin: 2,
    },
    col: {
        flex: 1,
        margin: 2,
    },
    buttonRow: {flexDirection: "row"},
    modalContainer: {
        flexDirection: "column",
        flex: 1,
        flexGrow: 1,
        height: 300,
        justifyContent: "center",
    },
});

export default function UploadInvoice({image=null, setImage=()=>{}, onDone=()=>{}}) {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => {
        onDone();
        setModalVisible(false);
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    const msg =
                        "Sorry, we need camera roll permissions to make this work!";
                    alert(msg);
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        // console.log(result);
        // alert(JSON.stringify(result));

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const pickCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });


        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <View style={style.container}>
            <ModalContainer modalVisible={modalVisible}>
                <View style={style.modalContainer}>
                    {image && (
                        <View style={{justifyContent: "center", alignItems:"center", flex:1}}>
                            <Image source={{uri: image}} style={{width: "100%", height: "100%"}} resizeMode="center"/>
                        </View>
                    )}
                    <Button style={style.button} onPress={pickImage}>
                        Upload file
                    </Button>
                    <Button style={style.button} onPress={pickCamera}>
                        Open Camera
                    </Button>
                    <Button style={style.button} onPress={hideModal} mode="outlined">
                        Done
                    </Button>
                </View>
            </ModalContainer>
            <View style={style.col}>
                <Button onPress={showModal}> Upload Invoice </Button>
            </View>
        </View>
    );
}
