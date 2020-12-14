import React, {useEffect} from "react";
import AuthContext from "./AuthContext";
import {useAuthentication} from "_hooks";
import {getItemAsync as get, setItemAsync as set} from "expo-secure-store";

const AuthContextProvider = ({children}) => {
    const defaultAuthState = {
        accessToken: await get("accessToken") || null,
        refreshToken: await get("refreshToken") || null,
        isLoggedIn: await get("isLoggedIn") === "true" || false,
    };
    const authObj = useAuthentication(defaultAuthState);
    const {auth} = authObj;

    useEffect(() => {
        for (const key in auth) {
            await set(key, auth[key]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);
    return <AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
