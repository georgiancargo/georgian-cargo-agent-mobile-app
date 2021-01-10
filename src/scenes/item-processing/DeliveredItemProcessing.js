import React, {useState, useEffect} from "react";
import {View, Text} from "react-native";
import {InputWithError, Button} from "_atoms";
import {releaseRequest} from "_requests";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {useRequest} from "_hooks";
import {ErrorText} from "_atoms";
import {EditBarCode} from "_molecules";
import {ProcessingList} from "_molecules";
import {Chip} from "react-native-paper";
import {Dialog, Paragraph, Portal} from "react-native-paper";
import {FlatList} from "react-native";
import {useOfflineRequest} from "_hooks";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const DeliveredItemProcessing = ({
    navigation,
    route: {
        params: {size: n },
    },
}) => {
    const [releaseCode, setCode] = useState("");
    const [releaseCodes, setCodes] = useState([]);
    const [missingCodes, setMissing] = useState([]);
    const [error, setError] = useState("");
    const [size, setSize] = useState(n);
    const [modalVisible, setModalVisible] = useState(false);
    const [editedCode, setEdited] = useState({});
    const [visible, setVisible] = useState(false);
    const [request, requesting] = useOfflineRequest({
        url: "/cargo/release",
        method: "POST",
    });
    // const [request, requesting] = useRequest(releaseRequest);

    useEffect(() => {
        const l = releaseCodes.length;
        setSize(l < n ? n - l : l - n);
    }, releaseCodes);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const goToScanner = () => {
        // navigation.navigate("cameraScanner", {
        //     barCodes: releaseCodes,
        //     setBarCodes: setCodes,
        //     multi: true
        // });
        navigation.navigate("Scanner", {
            save: save,
            edit: edit,
            remove: remove,
            barCodes: releaseCodes,
            setBarCodes: setCodes,
        });
    };
    const onChangeText = (_, value) => {
        setCode(value);
    };
    const release = () => {
        hideDialog();
        releaseCodes.forEach(async (code) => {
            try {
                await request({release_code: code});
                setError("");
            } catch (e) {
                try {
                    setError(e.response.data.message);
                } catch (error) {}
            }
        });
    };
    const preReleaseCheck = () => {
        if (size !== 0) {
            let checkOn = [];
            releaseCodes.forEach((item) => {
                try {
                    checkOn.push(parseInt(item));
                } catch (error) {}
            });
            showDialog();
            checkOn = checkOn.sort();
            const missing = [];
            for (let i = 0; i < checkOn.length - 1; i++) {
                const a = checkOn[i];
                const b = checkOn[i + 1];
                if (b - a >= 2) {
                    for (let j = a + 1; j < b - 1; j++) {
                        missing.push(j);
                    }
                }
            }
            setMissing(missing);
        } else {
            release();
        }
    };
    const remove = (i) => {
        const newRelease = releaseCodes.slice();
        newRelease.splice(i, 1);
        // setSize(size + 1);
        setCodes(newRelease);
    };

    const edit = (index) => {
        setModalVisible(true);
        setEdited({code: releaseCodes[index].toString(), index: index});
    };
    const save = () => {
        setModalVisible(false);
        const newRelease = releaseCodes.slice();
        newRelease[editedCode.index] = editedCode.code;
        setCodes(newRelease);
    };
    const add = () => {
        if (releaseCode !== "" && releaseCodes.indexOf(releaseCode) == -1) {
            const newRelease = releaseCodes.slice();
            // setSize(size - 1);
            newRelease.push(releaseCode);
            setCodes(newRelease);
            setCode("");
        }
    };
    const renderItem = ({item}) => (
        <Chip mode="outlined" style={{marginRight: 2}}>
            {item}
        </Chip>
    );
    // const renderItem = ({item}) => <Text>{item}</Text>;
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            {`You have entered only ${releaseCodes.length} out of ${size} Codes`}
                        </Paragraph>
                        <Paragraph>Missing codes are:</Paragraph>
                        <FlatList
                            data={missingCodes}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            style={{flex: 1, margin: 5}}
                            onPress={hideDialog}
                            mode="outlined"
                        >
                            Go back
                        </Button>
                        <Button style={{flex: 1, margin: 5}} onPress={release}>
                            OK
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={[s.flex1]}>
                <View style={{flexDirection: "row"}}>
                    <InputWithError
                        placeholder="Release code"
                        style={{flex: 6, marginRight: 8}}
                        name="releaseCode"
                        value={releaseCode}
                        onChangeText={onChangeText}
                        isNumber
                    />
                    <Button
                        style={{flex: 1, height: 35, alignSelf: "flex-end"}}
                        mode="outlined"
                        onPress={goToScanner}
                    >
                        Scan
                    </Button>
                </View>
                <ErrorText error={error} />
                <Button
                    onPress={add}
                    style={{marginVertical: 8}}
                    disabled={requesting}
                >
                    Add
                </Button>
                <Chip mode="outlined" style={{margin: 3}}>
                    {"Remaining codes: " + size}
                </Chip>
                <EditBarCode
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    barcode={editedCode}
                    setBarcode={setEdited}
                    save={save}
                    placeholder="Release Code"
                    name="code"
                />
                <ProcessingList
                    barCodes={releaseCodes}
                    remove={remove}
                    edit={edit}
                />
            </View>
            <Button onPress={preReleaseCheck} loading={requesting}>
                Release
            </Button>
        </View>
    );
};

export default DeliveredItemProcessing;
