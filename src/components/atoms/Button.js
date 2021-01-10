import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
// import BootstrapStyleSheet from "react-native-bootstrap-styles";

import {Button} from "react-native";
// import {Button} from "react-native-paper";
// import {ActivityIndicator, Colors} from "react-native-paper";

// // const bootstrapStyleSheet = new BootstrapStyleSheet();
// const {s, c} = bootstrapStyleSheet;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#f5a11c",
        minWidth: 64,
        borderStyle: "solid",
        borderColor: "transparent",
        margin: 5,
        shadowOffset: {
            width: 0,
            height: 0.75,
        },
        shadowColor: "#000000",
        borderWidth: 0,
        minHeight: 35,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    text: {
        fontSize: 15,
        color: "white",
        // fontStyle: "bold",
        fontWeight: "bold",
        marginLeft: 5,
    },
    disabled: {
        backgroundColor: "grey",
    },
});
const ButtonWrapper = ({
    children,
    loading = false,
    disabled,
    style = [],
    ...rest
}) => {
    return (
        // <TouchableOpacity
        //     style={[s.btnTouchable, ...style, disabled ? s.btnDisabled : {}]}
        //     // style={stle}
        //     onPress={onPress}
        //     disabled={disabled}
        // >
        //     <View style={[s.btn, s.btnPrimary]}>
        //         <Text style={[s.btnText, s.btnPrimaryText]}>{children}</Text>
        //     </View>
        // </TouchableOpacity>
        // <Button
        //     mode="contained"
        //     style={style}
        //     disabled={disabled || loading}
        //     loading={loading}
        //     uppercase={false}
        //     {...rest}
        // >
        //     {children}
        // </Button>
        <TouchableOpacity
            mode="contained"
            style={{
                ...styles.button,
                ...style,
                backgroundColor: disabled ? "grey" : "#f5a11c",
            }}
            disabled={disabled || loading}
            loading={loading}
            uppercase={false}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator animating={loading} color="white" />
            ) : null}
            {/* <ActivityIndicator animating={false} color="white" /> */}
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};

export default ButtonWrapper;
