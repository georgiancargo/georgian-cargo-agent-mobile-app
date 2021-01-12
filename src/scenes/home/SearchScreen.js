import React, {useState} from "react";
import {Text, View} from "react-native";
import {InputWithError, Button} from "_atoms";
import {ParcelList} from "_molecules";
import {useRequest} from "_hooks";
import {getGargosRequest} from "_requests";
import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SearchScreen = ({navigation}) => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [parcels, setParcels] = useState([]);
    const [request, requesting] = useRequest(getGargosRequest);
    const onChangeText = (_, value) => {
        setTrackingNumber(value);
    };
    const search = () => {
        request({
            paging_specification: {
                page_offset: 0,
                page_size: 30,
            },
            filter_specification: {
                filter_by: "TRACKING_NUMBER",
                filter_value: trackingNumber,
            },
        })
            .then((r) => {
                setParcels(r.data.cargos);
            })
            .catch((e) => {});
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <InputWithError
                name="trackingNumber"
                value={trackingNumber}
                onChangeText={onChangeText}
                placeholder="Enter tracking number"
            />
            <Button
                style={{marginVertical: 8}}
                loading={requesting}
                onPress={search}
            >
                Search
            </Button>
            <View style={{flex: 1}}>
                {parcels.length === 0 && <Text>No parcels matching term were found</Text>}
                <ParcelList parcels={parcels} navigation={navigation} />
            </View>
        </View>
    );
};

export default SearchScreen;
