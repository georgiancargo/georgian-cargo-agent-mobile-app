import * as React from "react";
import {Appbar} from "react-native-paper";

const Header = ({navigation, layout, previous, scene, ...rest}) => {
    const title = scene.descriptor.options.title
        ? scene.descriptor.options.title
        : scene.route.name;

    return (
        <Appbar.Header statusBarHeight={30}>
            {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} />
            ) : null}
            <Appbar.Content title={title} />
            {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
            {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
        </Appbar.Header>
    );
};

export default Header;
