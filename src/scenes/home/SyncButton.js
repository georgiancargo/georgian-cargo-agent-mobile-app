import React, {useEffect, useState} from "react";
import {getItemAsync, setItemAsync as set} from "expo-secure-store";
import {useStoredRequest} from "_hooks";
import {Button} from "_atoms";

const SyncButton = () => {
    const [label, setLabel] = useState("Sync Items");
    const [sync, setSync] = useState(true);
    const [request, requesting] = useStoredRequest();

    useEffect(() => {
        getItemAsync("requests")
            .then((requests) => {
                if (!requests || !requests.length) {
                    setLabel("No sync");
                    setSync(false);
                } else {
                    setLabel(`Sync ${requests.length} Items`);
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
        <Button
            style={{flex: 1}}
            disabled={!sync}
            onPress={synItems}
            loading={requesting}
        >
            {label}
        </Button>
    );
};

export default SyncButton;
