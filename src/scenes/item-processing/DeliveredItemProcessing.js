import React from "react";
import {View} from "react-native";
import {InputWithError, Button} from "_atoms";
import {releaseRequest} from "_requests";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {useRequest} from "_hooks";
import {HelperText} from "react-native-paper";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const DeliveredItemProcessing = ({navigation}) => {
    const [query, setQuery] = React.useState({barcode: ""});
    const [error, setError] = React.useState("");
    const [request, requesting] = useRequest(releaseRequest);

    const goToScanner = () => {
        navigation.navigate("cameraScanner", {
            barCodes: query,
            setBarCodes: setQuery,
        });
    };
    const onChangeText = (name, value) => {
        setQuery({[name]: value});
    };
    const release = () => {
        request({release_code: query.barcode})
            .then((r) => {
                setError("");
            })
            .catch((e) => {
                try {
                    setError(e.response.data.message);
                } catch (error) {}
            });
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
            {error !== "" ? (
                <HelperText type="error" visible={true}>
                    {error}
                </HelperText>
            ) : null}
            <Button
                onPress={release}
                style={{marginVertical: 8}}
                loading={requesting}
            >
                Release
            </Button>
        </View>
    );
};

export default DeliveredItemProcessing;
