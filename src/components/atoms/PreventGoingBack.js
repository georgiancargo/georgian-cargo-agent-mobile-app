import {useEffect} from "react";
import {Alert} from "react-native";

const PreventGoingBack = ({navigation, shouldAlert = true}) => {
    useEffect(
        () =>
            navigation.addListener("beforeRemove", (e) => {
                if (!shouldAlert) return;

                e.preventDefault();
                Alert.alert("Go back?", "Are you sure to continue?", [
                    {
                        text: "No",
                        style: "cancel",
                        onPress: () => {},
                    },
                    {
                        text: "Yes",
                        style: "destructive",
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]);
            }),
        [navigation, shouldAlert]
    );
    return null;
};
export default PreventGoingBack;
