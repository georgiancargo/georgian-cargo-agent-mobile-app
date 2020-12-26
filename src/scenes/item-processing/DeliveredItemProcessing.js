import React from "react";
import {View} from "react-native";
import {InputWithError, Button} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const DeliveredItemProcessing = ({navigation}) => {
    const [query, setQuery] = React.useState({barcode: ""});
    const goToScanner = () => {
        navigation.navigate("cameraScanner", {
            barCodes: query,
            setBarCodes: setQuery,
        });
    };
    const onChangeText = (name, value) => {
        setQuery({[name]: value});
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <View style={{flexDirection: "row"}}>
                <InputWithError
                    placeholder="Barcode"
                    style={{flex: 6, marginRight: 8}}
                    name="barcode"
                    value={query.barcode}
                    onChangeText={onChangeText}
                />
                <Button
                    style={{flex: 1, height: 35, alignSelf: "flex-end"}}
                    mode="outlined"
                    onPress={goToScanner}
                >
                    Scan
                </Button>
            </View>
            <Button style={{marginVertical: 8}}>Release</Button>
        </View>
    );
};

export default DeliveredItemProcessing;
