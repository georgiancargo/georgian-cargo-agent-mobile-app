import {useContext, useState} from "react";
import useAxios from "./useAxios";
import {AuthContext} from "_context";
import {NetInfo, Platform} from "react-native";

export default function useRequest(request, load = false) {
    const axios = useAxios();
    const [isProcessing, setIsProcessing] = useState(false);
    const {setAuth} = useContext(AuthContext);

    NetInfo.isConnected.addEventListener(
        "connectionChange",
        handleFirstConnectivityChange
    );
    const handleFirstConnectivityChange = (isConnected) => {
        // NetInfo.isConnected.removeEventListener(
        //     "connectionChange",
        //     this.handleFirstConnectivityChange
        // );
        if (isConnected === false) {
            Alert.alert("You are offline!");
        } else {
            Alert.alert("You are online!");
        }
    };

    const send = async (data) => {
        setIsProcessing(true);
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
            });
        return response;
    };
    return [send, isProcessing];
}
