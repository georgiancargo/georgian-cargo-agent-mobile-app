import React, {useEffect, useState} from "react";
import {SafeAreaView, FlatList, Text, TouchableOpacity} from "react-native";
import {useTheme, ActivityIndicator} from "react-native-paper";
import InputWithError from "./InputWithError";
import {getUserRequest} from "_requests";
import {useRequest} from "_hooks";

const InputAutoComplete = ({value, isCustomer, setUser, ...props}) => {
    const [data, setData] = useState([]);
    const [selectedValue, setSelected] = useState();
    const {colors, roundness} = useTheme();
    const [request, requesting] = useRequest(getUserRequest);

    const styles = {
        dropdown: {
            maxHeight: 100,
            borderWidth: 1,
            borderColor: colors.placeholder,
            borderRadius: roundness,
            padding: 5,
            margin: 2,
            marginTop: 5,
            position: "absolute",
            backgroundColor:"white", 
            zIndex:99,
            width: "100%",
            alignSelf:"center",
            top:40
        },
    };
    const onPress = (user) => {
        setData([]);
        setSelected(user.name);
        // setUser({
        //     name: user.name,
        //     phone: user.email,
        //     email: user.phone,
        //     country_code: user.address.countryCode,
        //     addrees_line_1: user.address.addressLine1,
        //     address_line_2: user.address.addressLine2,
        //     postal_code: user.address.postalCode,
        // });
        setUser({...user, ...user.address});
    };
    const renderItem = ({item}) => {
        switch (typeof item) {
            case "string":
                return <Text>{item}</Text>;

            default:
                return (
                    <TouchableOpacity
                        style={{borderBottomWidth: 1, height: 30}}
                        onPress={() => onPress(item)}
                    >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                );
        }
    };

    useEffect(() => {
        if (value && selectedValue != value && value.length >= 1)
            request({name: value})
                .then((r) =>
                    setData(isCustomer ? r.data.customers : r.data.receivers)
                )
                .catch((e) => setData([]));
    }, [value]);

    return (
        <>
            <InputWithError value={value} {...props} />
            {(data && value && value != "" && data.length > 0) || requesting ? (
                <SafeAreaView style={styles.dropdown}>
                    {requesting ? (
                        <ActivityIndicator animating={requesting} />
                    ) : (
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    )}
                </SafeAreaView>
            ) : null}
        </>
    );
};

export default InputAutoComplete;
