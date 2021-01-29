import React, {useState, useEffect} from "react";
import {Image, View, Platform, StyleSheet} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Button} from "_atoms";
import {ModalContainer} from "_atoms";
import {FlatList} from "react-native-gesture-handler";
import {Text} from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 5,
    },
    button: {
        flex: 1,
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

export default function UploadInvoice({
    image: images = null,
    setImage: setImages = () => {},
    onDone = () => {},
    loading = false,
}) {
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
            const newImages = images.slice();
            newImages.push(result.uri);
            setImages(newImages);
        }
    };
    const pickCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.cancelled) {
            const newImages = images.slice();
            newImages.push(result.uri);
            setImages(newImages);
        }
    };
    const remove = (i) => {
        const newImages = images.slice();
        newImages.splice(i, 1);
        setImages(newImages);
    };
    const renderItem = ({item, index}) => {
        let file_name = item.split("/").pop();
        file_name =
            file_name.length > 20
                ? file_name.substring(0, 17) + "..."
                : file_name;
        return (
            <View
                style={{
                    // borderWidth: 1,
                    backgroundColor: index % 2 === 1 ? "#f5f5f5" : "white",
                    flexDirection: "row",
                    flex: 1,
                }}
            >
                <View style={{flex: 4, flexDirection: "row"}}>
                    <View style={{flex: 2, margin: 4}}>
                        <Image
                            source={{uri: item}}
                            style={{width: "100%", height: "100%"}}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={{flex: 3, justifyContent: "center"}}>
                        <Text>{file_name}</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        mode="outlined"
                        color="red"
                        onPress={() => remove(index)}
                    >
                        X
                    </Button>
                </View>
            </View>
        );
    };
    return (
        <View style={style.container}>
            <ModalContainer modalVisible={modalVisible}>
                <View style={style.modalContainer}>
                    <View style={{flex: 4}}>
                        <FlatList data={images} renderItem={renderItem} />
                    </View>
                    <Button style={style.button} onPress={pickImage}>
                        Upload file
                    </Button>
                    <Button style={style.button} onPress={pickCamera}>
                        Open Camera
                    </Button>
                    <Button
                        style={style.button}
                        onPress={hideModal}
                        mode="outlined"
                    >
                        Done
                    </Button>
                </View>
            </ModalContainer>
            <View style={style.col}>
                <Button onPress={showModal} loading={loading}>
                    Upload Invoice
                </Button>
            </View>
        </View>
    );
}
