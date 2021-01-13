import React, {useContext, useState} from "react";
import {View, StyleSheet, Image} from "react-native";
import {useRequest} from "_hooks";
import {InputWithError, Button} from "_atoms";
import {loginRequest} from "_requests";
import {AuthContext} from "_context";
import loginScreenValidations from "./LoginScreenValidations";
import {useValidation} from "_hooks";
import logoImage from "./logo.png";

const LoginScreen = ({}) => {
    const [user, setUser] = useState({username: "", password: ""});
    const {setAuth} = useContext(AuthContext);
    const [request, requesting] = useRequest(loginRequest);
    const {errors, validate, addErrors} = useValidation(loginScreenValidations);
    const onChangeText = (name, text) => {
        const newUser = {...user, [name]: text};
        setUser(newUser);
        validate(newUser, name).catch(() => {});
    };
    const login = () => {
        validate(user)
            .then(() => {
                request({...user, remember_token: true})
                    .then(({data}) => {
                        setAuth({
                            access_token: data.access_token,
                            remember_token: data.remember_token,
                            is_logged_in: true,
                            agent: data.staff,
                            username: user.username,
                            password: user.password,
                        })
                            .then(() => {})
                            .catch(() => {});
                    })
                    .catch(() => {
                        addErrors({
                            username: "Wrong username/password",
                            password: "Wrong username/password",
                        });
                    });
            })
            .catch(() => {});
    };
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={logoImage} style={styles.logoImage} />
            </View>
            <View style={styles.formGroup}>
                <InputWithError
                    name="username"
                    error={errors.username}
                    value={user.username}
                    label="Username"
                    placeholder="Username"
                    onChangeText={onChangeText}
                    style={styles.field}
                />
                <InputWithError
                    name="password"
                    error={errors.password}
                    value={user.password}
                    label="Password"
                    placeholder="Password"
                    onChangeText={onChangeText}
                    secureTextEntry={true}
                    style={styles.field}
                />
                <Button
                    onPress={login}
                    loading={requesting}
                    style={styles.field}
                >
                    Login
                </Button>
            </View>
            <View style={styles.elasticBottom} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
    },
    logo: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    formGroup: {
        flex: 4,
        justifyContent: "center",
    },
    field: {
        margin: 5,
    },
    elasticBottom: {
        flex: 2,
    },
    logoImage: {
        width: 300,
        resizeMode: "contain",
    },
});

export default LoginScreen;
