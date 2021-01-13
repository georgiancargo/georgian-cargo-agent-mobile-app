import {useEffect} from "react";
import {Alert} from "react-native";

const PreventGoingBack = ({
    navigation,
    title = "Go back?",
    paragraph = "Are you sure to continue?",
    shouldAlert = true,
}) => {
    useEffect(
        () =>
            navigation.addListener("beforeRemove", (e) => {
                if (!shouldAlert) return;

                e.preventDefault();
                Alert.alert(title, paragraph, [
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
