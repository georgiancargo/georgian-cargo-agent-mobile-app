import {useState} from "react";
import {setItemAsync as set} from "expo-secure-store";

const useAuthentication = (defaultAuth) => {
    const [auth, setAuth] = useState(defaultAuth);

    const setAuthCookies = (data) => {
        for (const key in auth) {
            await set(key, auth[key]);
        }
        setAuth(data);
    };
    return {auth, setAuth: setAuthCookies};
};

export default useAuthentication;
