import {useContext, useState} from "react";
import useAxios from "hooks/useAxios";
import {AuthContext} from "context";

export default function useRequest(request, load = false) {
    const axios = useAxios();
    const [isProcessing, setIsProcessing] = useState(false);
    const {setAuth} = useContext(AuthContext);
    const send = async (data) => {
        setIsProcessing(true);
        if (load) document.getElementById("loader").classList.add("loading-indicator");
        const response = request(axios, data)
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
                if (load)
                    document
                        .getElementById("loader")
                        .classList.remove("loading-indicator");
            });
        return response;
    };
    return [send, isProcessing];
}
