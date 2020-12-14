import React from "react";
import {SafeAreaView, FlatList, StyleSheet} from "react-native";
import {ListItem} from "_atoms";

const ParcelList = ({parcels = [], navigation}) => {
    const edit = (parcel) => {
        console.log(parcel);
        navigation.navigate("Edit", {parcel: parcel});
    };
    const renderItem = ({item}) => <ListItem parcel={item} edit={edit} />;
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={parcels}
                renderItem={renderItem}
                keyExtractor={(parcel) => parcel.toString()}
            />
        </SafeAreaView>
    );
};
export default ParcelList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
