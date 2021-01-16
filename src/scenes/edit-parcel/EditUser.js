import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {InputWithError, Button, PreventGoingBack} from "_atoms";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {ScrollView} from "react-native";
import {useValidation} from "_hooks";
import EditUserValidations from "./EditUserValidations";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const EditUser = ({
    navigation,
    route: {
        params: {user: oldUser, parcel, type, setParcel, setAlert},
    },
}) => {
    const [user, setUser] = useState(oldUser);
    const [isValidating, setValidating] = useState(false);
    const [changed, setChanged] = useState(false);
    const {errors, validate, hasErrors} = useValidation(EditUserValidations);

    useEffect(() => {
        setUser(oldUser);
    }, [oldUser]);
    const labels = ["name", "phone", "email", "addrees line 1", "address line 2", "address postal code"];
    const keys = ["name", "phone", "email", "address_line_1", "address_line_2", "postal_code"];
    // "country_code",

    const onChange = (name, value) => {
        const newUser = {...user, [name]: value};
        setUser(newUser);
        validate(newUser, name).catch((e) => {});
        setAlert(true);
        setChanged(true);
    };
    const onSave = () => {
        setValidating(true);
        validate(user)
            .then((r) => {
                setChanged(false);
                if (type === "Sender") setParcel({...parcel, sender: user});
                else setParcel({...parcel, receiver: user});
                navigation.goBack();
            })
            .catch((e) => {})
            .finally(() => setValidating(false));
    };
    return (
        <View style={[s.container, s.bgWhite, s.p3, s.flex1]}>
            {/* <Text>{JSON.stringify(type)}</Text> */}
            <PreventGoingBack
                navigation={navigation}
                shouldAlert={changed}
                title="You haven't saved"
                paragraph="Sure you want to go back?"
            />
            <View style={[s.formGroup]}>
                {keys.map((key, i) => {
                    const val = user[key];
                    const isNumber = Number.isInteger(val);
                    return (
                        <InputWithError
                            // label={label}
                            name={key}
                            error={errors[key]}
                            placeholder={type + " " + labels[i]}
                            value={isNumber && val ? val.toString() : val}
                            onChangeText={onChange}
                            key={key}
                            isNumber={isNumber}
                        />
                    );
                })}
                <ScrollView></ScrollView>
            </View>
            <View style={[s.formGroup]}>
                <Button
                    onPress={onSave}
                    disabled={hasErrors || !changed}
                    loading={isValidating}
                >
                    Save
                </Button>
            </View>
        </View>
    );
};

export default EditUser;
