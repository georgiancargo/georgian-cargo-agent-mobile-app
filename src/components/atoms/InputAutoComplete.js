import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    Text,
    TouchableOpacity,
} from "react-native";
import {useTheme} from "react-native-paper";
import Axios from "axios";
import InputWithError from "./InputWithError";
import {getUserRequest} from "_requests";
import {useRequest} from "_hooks";

const InputAutoComplete = ({value, setUser, ...props}) => {
    const [data, setData] = useState([]);
    const {colors, roundness} = useTheme();
    const [request, requesting] = useRequest(getUserRequest);

    const styles = {
        dropdown: {
            maxHeight: 100,
            borderWidth: 1,
            borderColor: colors.placeholder,
            borderRadius: roundness,
            padding: 5,
            margin: 2,
            marginTop: 5,
        },
    };
    const onPress = (user) => {
        setData([]);
        setUser(user);
    };
    const renderItem = ({item}) => {
        switch (typeof item) {
            case "string":
                return <Text>{item}</Text>;

            default:
                return (
                    <TouchableOpacity
                        style={{borderBottomWidth: 1, height: 30}}
                        onPress={() => onPress(item)}
                    >
                        <Text>{item.login}</Text>
                    </TouchableOpacity>
                );
        }
    };

    useEffect(() => {
        if (value.length >= 3)
            request(value)
                .then((r) => setData(r.data.items))
                .catch((e) => setData(["No Data"]));
    }, [value]);

    return (
        <>
            <InputWithError value={value} {...props} />
            {data && data.length > 0 ? (
                <SafeAreaView style={styles.dropdown}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            ) : null}
        </>
    );
};

export default InputAutoComplete;
