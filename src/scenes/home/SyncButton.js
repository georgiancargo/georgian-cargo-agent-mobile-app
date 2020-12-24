import React, {useEffect, useState} from "react";
import {TouchableOpacity, View, Text} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {getItemAsync, setItemAsync as set} from "expo-secure-store";
import {useStoredRequest} from "_hooks";

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
                const remove = Array(requestsArray.length);

                requestsArray.forEach(async (element, i) => {
                    try {
                        const res = await request(element);
                        remove[i] = true;
                    } catch (error) {
                        remove[i] = false;
                    }
                });

                const remainingRequests = [];

                remove.forEach((val) => {
                    if (val) remainingRequests.push(requestsArray[i]);
                });

                return set("requests", JSON.stringify(remainingRequests));
            })
            .catch((e) => {});
    };
    return (
        <TouchableOpacity
            style={[s.btnTouchable, s.flex1, s.mr2, !sync ? s.btnDisabled : {}]}
            disabled={sync}
            onPress={synItems}
        >
            <View style={[s.btn, s.btnLight]}>
                <Text style={[s.btnText, s.btnLightText]}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SyncButton;
