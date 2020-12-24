import {useContext, useState} from "react";
import useAxios from "./useAxios";
import {AuthContext} from "_context";
import {setItemAsync as set, getItemAsync as get} from "expo-secure-store";
import {parseRequest} from "_requests";

export default function useStoredRequest() {
    const axios = useAxios();
    const [isProcessing, setIsProcessing] = useState(false);
    const {setAuth} = useContext(AuthContext);

    const isConnected = async () => {
        let hasInternet = true;
        try {
            const request = await axios.get("google.com");
        } catch (e) {
            hasInternet = false;
        }

        return hasInternet;
    };

    const send = async (data, payload) => {
        setIsProcessing(true);
        let config = {};

        if (payload) config = payload;
        else
            config = {
                url: r.url,
                method: r.method,
                data: data,
            };

        if (isConnected) {
            const response = parseRequest(axios, config)
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
            return response;
        } else {
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
