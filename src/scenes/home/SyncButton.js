import React, {useEffect, useState} from "react";
import {TouchableOpacity, View, Text} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
// import {getItemAsync, setItemAsync as set} from "expo-secure-store";
import {useStoredRequest} from "_hooks";
import {Button} from "_atoms";
import * as fs from "expo-file-system"
import {useIsFocused} from "@react-navigation/core";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SyncButton = () => {
    const [label, setLabel] = useState("Sync Items");
    const [sync, setSync] = useState(true);
    const [request] = useStoredRequest();

    const isFocused = useIsFocused();

    const updateButtonText = () => {
        const path = fs.cacheDirectory + '/offline_requests.json';
        fs.readAsStringAsync(path).then((raw) => {
            const requests = JSON.parse(raw);
            if (!requests || !requests.length) {
                setLabel("No sync");
                setSync(false);
            } else {
                setLabel(`Sync ${requests.length} Items`);
                setSync(true);
            }
        });
    }

    useEffect(()=>{
        updateButtonText();
    }, [isFocused]);

    const synItems = async () => {
        const path = fs.cacheDirectory + '/offline_requests.json';
        fs.readAsStringAsync(path).then((requests) => {
            const requestsArray = JSON.parse(requests);
            const stays = Array(requestsArray.length);

            requestsArray.forEach(async (element, i) => {
                try {
                    await request(element);
                    stays[i] = false;
                } catch (error) {
                    alert(error);
                    if(error.message === 'Network error'){
                        alert("Network error");
                        stays[i] = true;
                    }
                }
            });

            const remainingRequests = [];

            stays.forEach((val) => {
                if (val) remainingRequests.push(requestsArray[i]);
            });
            fs.writeAsStringAsync(path, JSON.stringify(remainingRequests)).then(()=>{
                updateButtonText();
            });
        })
    };
    return (
        <Button style={{flex: 1}} disabled={!sync} onPress={synItems}>
            {label}
        </Button>
    );
};

export default SyncButton;
