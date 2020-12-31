import {useContext, useState} from "react";
import useAxios from "./useAxios";
import {AuthContext} from "_context";
import {parseRequest} from "_requests";

export default function useStoredRequest() {
    const axios = useAxios();
    const [isProcessing, setIsProcessing] = useState(false);
    const {setAuth} = useContext(AuthContext);

    const send = async (config) => {
        setIsProcessing(true);
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
    };
    return [send, isProcessing];
}
