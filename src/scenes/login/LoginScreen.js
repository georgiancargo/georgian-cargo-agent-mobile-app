import React from "react";
import {useState} from "react";
import {Text, View, Button, StyleSheet} from "react-native";
import {InputWithError} from "_atoms";

const LoginScreen = ({navigation}) => {
    const [user, setUser] = useState({username: "", password: ""});
    const onChangeText = (name, text) => {
        setUser({...user, [name]: text});
        console.log(name, text);
    };
    return (
        <View style={styles.container}>
            <View style={styles.formInput}>
                <InputWithError
                    name="username"
                    label="username"
                    placeholder="Username"
                    onChangeText={onChangeText}
                />
            </View>
            <View style={styles.formInput}>
                <InputWithError
                    name="password"
                    label="password"
                    placeholder="Password"
                    onChangeText={onChangeText}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.formButton}>
                <Button style={styles.button} title="Login"></Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 10,
        paddingTop: "20%",
        paddingBottom: "20%",
    },
    formInput: {
        flex: 1,
        padding: 3,
    },
    formButton: {
        flex: 5,
        // justifyContent: "flex-end",
        // margin: 20,
        // alignItems: "stretch",
    },
    button: {
        flex: 1,
    },
});

export default LoginScreen;
