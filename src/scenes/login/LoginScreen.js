import React, {useContext, useState, useEffect} from "react";
import {View, StyleSheet, Text} from "react-native";
import {useRequest} from "_hooks";
import {InputWithError, Button} from "_atoms";
import {loginRequest} from "_requests";
import {AuthContext} from "_context";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import loginScreenValidations from "./LoginScreenValidations";
import {useValidation} from "_hooks";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const LoginScreen = ({navigation}) => {
    const [user, setUser] = useState({username: "admin", password: "12341234"});
    const {setAuth, auth} = useContext(AuthContext);
    const [request, requesting] = useRequest(loginRequest);
    const {errors, validate} = useValidation(loginScreenValidations);
    useEffect(() => {
        if (auth.is_logged_in) navigation.navigate("Home");
    }, []);
    const onChangeText = (name, text) => {
        const newUser = {...user, [name]: text};
        setUser(newUser);
        validate(newUser, name).catch((e) => {});
    };
    const login = () => {
        validate(user)
            .then((r) => {
                request({...user, remember_token: true})
                    .then(({data}) => {
                        setAuth({
                            access_token: data.access_token,
                            remember_token: data.remember_token,
                            is_logged_in: true,
                            agent: data.staff,
                        })
                            .then((r) => {
                                navigation.navigate("Home");
                            })
                            .catch(() => {});
                    })
                    .catch(() => {
                        setAuth({
                            access_token: "Some random JWT",
                            remember_token: "Some random refresh JWT", // Generated only if {"remember_token": true}
                            is_logged_in: true,
                            agent: {
                                id: "ABC123",
                                username: "foo",
                                privileges: ["PICKUP_CARGO", "HANDLE_CARGO"],
                                enabled_routes: [
                                    {
                                        source_country_code: "US",
                                        destination_country_code: "UK",
                                    },
                                ],
                            },
                        })
                            .catch(() => {
                                setUser({...user, username: "help"});
                            })
                            .finally(() => navigation.navigate("Home"));
                    });
            })
            .catch((e) => {});
    };
    return (
        <View style={styles.container}>
            <View style={[s.formGroup]}>
                <InputWithError
                    name="username"
                    error={errors.username}
                    value={user.username}
                    label="username"
                    placeholder="Username"
                    onChangeText={onChangeText}
                />
                <InputWithError
                    name="password"
                    error={errors.password}
                    value={user.password}
                    label="password"
                    placeholder="Password"
                    onChangeText={onChangeText}
                    secureTextEntry={true}
                />
            </View>
            {/* <Text>{JSON.stringify(auth)}</Text> */}
            <View style={styles.formButton}>
                <Button onPress={login} loading={requesting}>
                    Login
                </Button>
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
        flex: 2,
        // margin: 10,
        // borderWidth: 10,
        // borderColor: "#fff",
        // alignContent:"stretch",
        // alignItems:"stretch",
    },
    formButton: {
        flex: 5,
        // margin: 30,
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
