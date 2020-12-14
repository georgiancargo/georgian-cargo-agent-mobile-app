import React, {useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {getItemAsync as get, setItemAsync as set} from "expo-secure-store";

const AuthContextProvider = ({children}) => {
    const defaultAuthState = {
        // accessToken: (await get("accessToken")) || null,
        // refreshToken: (await get("refreshToken")) || null,
        // isLoggedIn: (await get("isLoggedIn")) === "true" || false,
    };

    const [auth, setAuth] = useState(defaultAuthState);

    const setAuthStorage = async (data) => {
        for (const key in auth) {
            await set(key, auth[key]);
        }
        setAuth(data);
    };
    const authObj = {auth, setAuth: setAuthStorage};
    const update = async () => {

        for (const key in auth) {
            await set(key, auth[key]);
        }
    };
    useEffect(() => {
        update();
        return () => {
            console.log("This will be logged on unmount");
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);
    return <AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
