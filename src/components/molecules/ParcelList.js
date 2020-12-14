import React from "react";
import {SafeAreaView, FlatList, StyleSheet, Pressable} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {ListItem} from "_atoms";

const ParcelList = ({parcels = []}) => {
    const renderItem = ({item}) => (
        <TouchableOpacity>
            <ListItem title={item.title} />
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={parcels}
                renderItem={renderItem}
                keyExtractor={(item) => item}
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
