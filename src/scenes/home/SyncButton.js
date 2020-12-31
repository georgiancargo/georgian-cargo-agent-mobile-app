import React, {useEffect, useState} from "react";
import {TouchableOpacity, View, Text} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {getItemAsync, setItemAsync as set} from "expo-secure-store";
import {useStoredRequest} from "_hooks";
import {Button} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const SyncButton = () => {
    const [label, setLabel] = useState("Sync Items");
    const [sync, setSync] = useState(true);
    const [request] = useStoredRequest();

    useEffect(() => {
        getItemAsync("requests")
            .then((requests) => {
                if (!requests || !requests.length) {
                    setLabel("No sync");
                    setSync(false);
                } else {
                    setLabel("Sync Items");
                    setSync(true);
                }
            })
            .catch((e) => {});
    }, []);

    const synItems = async () => {
        getItemAsync("requests")
            .then((requests) => {
                const requestsArray = JSON.parse(requests);
                const stays = Array(requestsArray.length);

                requestsArray.forEach(async (element, i) => {
                    try {
                        await request(element);
                        stays[i] = false;
                    } catch (error) {
                        stays[i] = true;
                    }
                });

                const remainingRequests = [];

                stays.forEach((val) => {
                    if (val) remainingRequests.push(requestsArray[i]);
                });

                return set("requests", JSON.stringify(remainingRequests));
            })
            .catch((e) => {});
    };
    return (
        <Button style={{flex: 1}} disabled={!sync} onPress={synItems}>
            {label}
        </Button>
    );
};

export default SyncButton;
