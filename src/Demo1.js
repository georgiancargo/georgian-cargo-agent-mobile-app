import Autocomplete from "react-native-autocomplete-input";
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {StatusBar} from "expo-status-bar";
import {InputWithError} from "_atoms";
import {Image} from "react-native";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const API = "https://api.github.com/users";
const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII"];

class AutocompleteExample extends Component {
    static renderFilm(user) {
        const {avatar_url, login, url} = user;
        return (
            <View>
                <Image
                    source={avatar_url}
                    style={{width: 100, height: 100, borderWidth: 1}}
                />
                <Text style={styles.directorText}>({login})</Text>
                <Text style={styles.openingText}>{url}</Text>
            </View>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            query: "",
        };
    }

    componentDidMount() {
        fetch(`${API}`)
            .then((res) => res.json())
            .then((json) => {
                // const {results: users} = json;
                this.setState({users: json});
            });
    }

    findFilm(query) {
        if (query === "") {
            return [];
        }

        const {users} = this.state;
        const regex = new RegExp(`${query.trim()}`, "i");
        return users.filter((user) => user.login.search(regex) >= 0);
    }

    render() {
        const {query} = this.state;
        const users = this.findFilm(query);
        const comp = (a, b) =>
            a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <>
                {/* <View style={[s.container, s.pt4]}> */}
                {/* <View style={[s.formGroup]}> */}
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                    <Autocomplete
                        // style={[s.formControl]}
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        data={
                            users.length === 1 && comp(query, users[0].login)
                                ? []
                                : users
                        }
                        defaultValue={query}
                        onChangeText={(text) => this.setState({query: text})}
                        placeholder="Enter user handle"
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({query: item.login})
                                }
                                style={{zIndex: 999, backgroundColor:"salmon"}}
                            >
                                <Text style={styles.itemText}>
                                    {item.login}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    {/* <View style={styles.descriptionContainer}>
                        {users.length > 0 ? (
                            AutocompleteExample.renderFilm(users[0])
                        ) : (
                            <Text style={styles.infoText}>
                                Enter user handle
                            </Text>
                        )}
                    </View> */}
                </View>

                <View
                    style={{
                        // backgroundColor: "#F5FCFF",
                        flex: 1,
                        // paddingTop: 25,
                        zIndex: 0,
                        // padding:100
                    }}
                >
                    <InputWithError name="username" placeholder="Username" />
                </View>
                <View
                    style={{
                        zIndex: 0,
                        flex: 20,
                        // padding:100
                    }}
                >
                    <Text>Hi</Text>
                </View>
                {/* </View> */}
                {/* <View style={[s.formGroup]}> */}
                {/* </View> */}
                {/* </View> */}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5FCFF",
        flex: 1,
        paddingTop: 25,
        zIndex: 10,
        // padding:100
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 999,
    },
    itemText: {
        fontSize: 15,
        margin: 2,
        zIndex: 999,
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: "#F5FCFF",
        marginTop: 25,
    },
    infoText: {
        textAlign: "center",
    },
    titleText: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
    },
    directorText: {
        color: "grey",
        fontSize: 12,
        marginBottom: 10,
        textAlign: "center",
    },
    openingText: {
        textAlign: "center",
    },
});

export default AutocompleteExample;
