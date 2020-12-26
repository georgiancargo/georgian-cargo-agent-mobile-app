import React, {Component} from "react";
import {StyleSheet, View, SafeAreaView} from "react-native";
// import {Ionicons} from "@expo/vector-icons";
// import shortid from "shortid";
import {
    Autocomplete,
    withKeyboardAwareScrollView,
} from "react-native-dropdown-autocomplete";
import {InputWithError} from "_atoms";
import {Image} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {StatusBar} from "expo-status-bar";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

class HomeScreen extends Component {
    handleSelectItem(item, index) {
        // const {onDropdownClose} = this.props;
        // onDropdownClose();
        console.log(item);
    }

    render() {
        // const autocompletes = [...Array(10).keys()];

        const apiUrl = "https://api.github.com/users";
        const data = [
            "Apples",
            "Broccoli",
            "Chicken",
            "Duck",
            "Eggs",
            "Fish",
            "Granola",
            "Hash Browns",
        ];

        // const {scrollToInput, onDropdownClose, onDropdownShow} = this.props;

        return (
            <>
                <View style={s.container}>
                    {/* <StatusBar hidden={true} /> */}
                    {/* <View style={s.container}> */}
                    <View style={styles.autocompletesContainer}>
                        <SafeAreaView>
                            {/* {autocompletes.map(() => ( */}
                            <Autocomplete
                                // key={shortid.generate()}
                                // inputStyle={styles.input}
                                inputStyle={[s.formControl]}
                                // scrollToInput={(ev) => scrollToInput(ev)}
                                handleSelectItem={(item, id) =>
                                    this.handleSelectItem(item, id)
                                }
                                // onDropdownClose={() => onDropdownClose()}
                                // onDropdownShow={() => onDropdownShow()}
                                // renderIcon={() => (
                                //     <Ionicons
                                //         name="ios-add-circle-outline"
                                //         size={20}
                                //         color="#c7c6c1"
                                //         style={styles.plus}
                                //     />
                                // )}
                                fetchDataUrl={apiUrl}
                                minimumCharactersCount={1}
                                // highlightText
                                valueExtractor={(item) => item.login}
                                // rightContent
                                // rightTextExtractor={(item) => item.properties}
                                // data={data}
                                // valueExtractor={(item) => item}
                            />
                            {/* ))} */}
                        </SafeAreaView>
                    </View>
                    <View style={s.formGroup}>
                        <TextInput style={[s.formControl]} />{" "}
                    </View>
                </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    autocompletesContainer: {
        paddingTop: 50,
        zIndex: 1,
        width: "100%",
        paddingHorizontal: 8,
        borderWidth: 1,
        margin: 5,
    },
    input: {
        maxHeight: 40,
        borderWidth: 10,
        flex: 1,
        borderRadius: 0,
        borderColor: "salmon",
    },
    inputContainer: {
        display: "flex",
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#c7c6c1",
        paddingVertical: 13,
        paddingLeft: 12,
        paddingRight: "5%",
        width: "100%",
        justifyContent: "flex-start",
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    plus: {
        position: "absolute",
        left: 15,
        top: 10,
    },
});

export default HomeScreen;
// export default withKeyboardAwareScrollView(HomeScreen);
