import {useContext, useState} from "react";
import useAxios from "./useAxios";
import {AuthContext} from "_context";
import {setItemAsync as set, getItemAsync as get} from "expo-secure-store";
import {parseRequest} from "_requests";

export default function useOfflineRequest(r, load = false) {
    const axios = useAxios();
    const [isProcessing, setIsProcessing] = useState(false);
    const {setAuth} = useContext(AuthContext);

    const isConnected = async () => {
        try {
            await axios.get("google.com");
            return true;
        } catch (e) {
            return false;
        }
    };
    const send = async (data) => {
        setIsProcessing(true);
        const config = {
            url: r.url,
            method: r.method,
            data: data,
        };

        if (isConnected)
            return parseRequest(axios, config)
                .catch((e) => {
                    switch (e.response.status) {
                        case 401:
                            // Invalidate access tokens etc...
                            setAuth({isLoggedIn: false, accessToken: null});
                            break;
                        default:
                            break;
                    }
                    throw e;
                })
                .finally(() => {
                    setIsProcessing(false);
                });
        else {
            let requests = [];
            const store = "requests";
            get(store)
                .then((res) => {
                    if (res !== null) requests = JSON.parse(res);
                    requests.push(config);
                    return set(store, JSON.stringify(requests));
                })
                .then(() => {})
                .catch((e) => {});
        }
    };
    return [send, isProcessing];
}
