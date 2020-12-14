import React, {useEffect} from "react";
import AuthContext from "./AuthContext";
import {useAuthentication} from "_hooks";
import {
    getItemAsync as get,
    setItemAsync as set,
    deleteItemAsync as _delete,
    isAvailableAsync,
} from "expo-secure-store";

const AuthContextProvider = ({children}) => {
    const defaultAuthState = {
        accessToken: await get("accessToken") || null,
        refreshToken: await get("refreshToken") || null,
        isLoggedIn: await get("isLoggedIn") === "true" || false,
    };
    const authObj = useAuthentication(defaultAuthState);

    return <AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
