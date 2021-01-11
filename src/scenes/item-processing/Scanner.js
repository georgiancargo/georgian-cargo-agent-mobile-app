import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import {Alert} from "react-native";

const Scanner = (props) => {
    // const Scanner = ({navigation, route: {params}}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const {barCodes, setBarCodes} = props.barCodes ? props : props.route.params;
    // const {barCodes, setBarCodes} = params;

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        // if (barCodes.indexOf(data) == -1) setBarCodes([data].concat(barCodes));
        if (props.barCodes)
            if (barCodes.indexOf(data) == -1) setBarCodes([...barCodes, data]);
            else {
            }
        else if (props.route.params.scanOnce) {
            setScanned(true);
            Alert.alert(
                "Alert",
                `Barcode ${data} has been scanned!`,
                [
                    {
                        text: "Retry",
                        onPress: () => setScanned(false),
                        // style: "cancel",
                    },
                    {
                        text: "OK",
                        onPress: () => {
                            props.route.params.callback(data);
                            props.navigation.goBack();
                        },
                    },
                ],
                {cancelable: false}
            );
        } else {
            setBarCodes({...barCodes, barcode: data});
            alert(`Barcode ${data} has been scanned!`);
            props.navigation.goBack();
        }
        // setScanned(true);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                // onBarCodeScanned={handleBarCodeScanned}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {/* {scanned && (
                <Button
                title={"Tap to Scan Again"}
                onPress={() => setScanned(false)}
                />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});

export default Scanner;
