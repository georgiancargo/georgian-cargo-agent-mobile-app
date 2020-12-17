import {useState} from "react";
import {setItemAsync as set} from "expo-secure-store";

const useAuthentication = (defaultAuth) => {
    const [auth, setAuth] = useState(defaultAuth);

    const setAuthStorage = async (data) => {
        for (const key in auth) {
            await set(key, auth[key]);
        }
        setAuth(data);
    };
    return {auth, setAuth: setAuthStorage};
};

export default useAuthentication;
