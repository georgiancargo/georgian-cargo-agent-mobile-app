import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
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
    const [searchQuery, setQuery] = useState({});
    const [parcels, setParcels] = useState([]);
    const [request, requesting] = useRequest(getGargosRequest);
    const onChangeText = (name, value) => {
        setQuery({...searchQuery, [name]: value});
    };
    const search = () => {
        request({
            paging_specification: {
                page_offset: 0,
                page_size: 30,
            },
            filter_specification: {
                filter_by: "TRACKING_NUMBER",
                filter_value: searchQuery.tracking_number,
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
                name="tracking_number"
                value={searchQuery.tracking_number}
                onChangeText={onChangeText}
                placeholder="Enter tracking number"
            />
            <InputWithError
                name="sender_name"
                value={searchQuery.sender_name}
                onChangeText={onChangeText}
                placeholder="Enter Receiver's name"
            />
            <InputWithError
                name="receiver_name"
                value={searchQuery.receiver_name}
                onChangeText={onChangeText}
                placeholder="Enter Sender's name"
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
