import React from "react";
import {Text, FlatList} from "react-native";
import {Paragraph, Chip} from "react-native-paper";

const ExtraChargesList = ({
    extra_charges = [],
    removeExtraCharge: rm = () => {},
    disabled = false,
}) => {
    const renderItem = ({item, index}) => {
        return (
            <Chip
                onClose={() => rm(index)}
                mode="outlined"
                style={{marginRight: 3}}
                disabled={disabled}
            >
                {`${item.note}: ${item.amount}`}
            </Chip>
        );
    };
    return extra_charges.length > 0 ? (
        <FlatList
            style={{marginTop: 5}}
            data={extra_charges}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
        />
    ) : (
        <Paragraph> No Extra Charges </Paragraph>
    );
};

export default ExtraChargesList;
