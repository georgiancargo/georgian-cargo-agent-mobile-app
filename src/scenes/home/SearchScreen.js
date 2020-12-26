import React, {useState} from "react";
import {View} from "react-native";
import {InputWithError, Button} from "_atoms";
import {ParcelList} from "_molecules";

import BootstrapStyleSheet from "react-native-bootstrap-styles";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SearchScreen = ({navigation}) => {
    const [query, setQuery] = useState({});
    const onChangeText = (name, value) => {
        setQuery({[name]: value});
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            <InputWithError
                name="q"
                value={query.q}
                onChangeText={onChangeText}
                placeholder="Enter barcode"
            />
            <Button style={{marginVertical: 8}}>Search</Button>
            <View style={{flex: 1}}>
                <ParcelList
                    parcels={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
                    navigation={navigation}
                />
            </View>
        </View>
    );
};

export default SearchScreen;
