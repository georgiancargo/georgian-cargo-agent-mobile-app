import React, {useState} from "react";
import {StyleSheet, SafeAreaView, TextInput} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {FlatList, Text, TouchableOpacity} from "react-native";
import Axios from "axios";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const InputAutoComplete = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [text, setText] = useState();

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

    const apiUrl = "https://api.github.com/search/users?q=";

    const onChangeText = (text) => {
        setText(text);
        if (text.length >= 3)
            Axios.get(`${apiUrl}${text}`)
                .then((r) => setData(r.data.items))
                .catch((e) => setData(["No Data"]));
    };
    return (
        <>
            <TextInput
                style={[s.formControl]}
                placeholder="Text here"
                onChangeText={onChangeText}
                value={text}
            />
            <SafeAreaView style={styles.dropdown}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    dropdown: {
        maxHeight: 100,
    },
});

export default InputAutoComplete;
