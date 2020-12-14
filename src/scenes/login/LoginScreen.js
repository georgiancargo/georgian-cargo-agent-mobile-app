import React from "react";
import {useState} from "react";
import {Text, View, Button, StyleSheet} from "react-native";
import {useRequest} from "_hooks";
import {InputWithError} from "_atoms";
import {loginRequest} from "_requests";

const LoginScreen = ({navigation}) => {
    const [user, setUser] = useState({username: "", password: ""});
    const [request] = useRequest(loginRequest);
    const onChangeText = (name, text) => {
        setUser({...user, [name]: text});
    };
    const login = () => {
        request(user)
            .then(() => {
                console.log("hi success");
            })
            .catch(() => {
                console.log("failed successfuly");
            })
            .finally(() => {
                console.log("all done");
            });
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
                <Button style={styles.button} title="Login" onPress={login}></Button>
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
        margin: 10,
        // borderWidth: 10,
        // borderColor: "#fff",
    },
    formButton: {
        flex: 5,
        margin: 30,
        // borderWidth: 10,
        // justifyContent: "flex-end",
        // margin: 20,
        // alignItems: "stretch",
    },
    button: {
        flex: 1,
    },
});

export default LoginScreen;
