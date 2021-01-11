import {useEffect} from "react";
import {Alert} from "react-native";

const PreventGoingBack = ({navigation}) => {
    useEffect(
        () =>
            navigation.addListener("beforeRemove", (e) => {
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
        [navigation]
    );
    return null;
};
export default PreventGoingBack;
