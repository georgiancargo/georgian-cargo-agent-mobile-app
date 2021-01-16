import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import {InputWithError, Button} from "_atoms";
import {ParcelList} from "_molecules";
import {useRequest} from "_hooks";
import {getGargosRequest} from "_requests";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
});

const SearchScreen = ({navigation}) => {
    const [searchQuery, setQuery] = useState("");
    const [parcels, setParcels] = useState([]);
    const [request, requesting] = useRequest(getGargosRequest);

    const onChangeText = (_, value) => {
        setQuery(value);
    };

    const search = () => {
        request({
            paging_specification: {
                page_offset: 0,
                page_size: 30,
            },
            filter_specification: {
                filter_by: "ALL",
                filter_value: searchQuery,
            },
        })
            .then((r) => {
                setParcels(r.data.cargos);
            })
            .catch((e) => {});
    };
    return (
        <View style={styles.container}>
            <InputWithError
                name="trackingNumber"
                value={searchQuery}
                onChangeText={onChangeText}
                placeholder="Search"
            />
            <Button
                style={{marginVertical: 8}}
                loading={requesting}
                onPress={search}
            >
                Search
            </Button>
            <View style={{flex: 1}}>
                <ParcelList parcels={parcels} navigation={navigation} />
            </View>
        </View>
    );
};

export default SearchScreen;
