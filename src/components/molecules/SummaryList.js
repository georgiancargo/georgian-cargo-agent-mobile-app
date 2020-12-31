import React from "react";
import {Text} from "react-native";
import {Subheading} from "react-native-paper";
import {Table, Cell, Row} from "_atoms";

const SummaryList = ({
    parcels = [],
    removeParcel: rm = () => {},
    title = "Parcel Summary",
}) => {
    const parcelKeys = [
        "tracking_number",
        "weight",
        // "source_country_code",
        // "destination_country_code",
        // "description",
        // "notes",
    ];
    const parcelLabels = [
        // "#",
        "Tracking",
        "weight",
        "source",
        "dest.",
        // "description",
        // "notes",
        // "",
    ];
    const Rows = ({page, rowsPerPage}) =>
        parcels
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((parcel, i) => (
                <Row key={i}>
                    {/* <Cell>{page * rowsPerPage + i + 1}</Cell> */}
                    {parcelKeys.map((key) => (
                        <Cell key={key} style={{justifyContent: "center"}}>
                            {parcel[key]}
                        </Cell>
                    ))}
                    <Cell style={{justifyContent: "center"}}>
                        {parcel.sender.country_code}
                    </Cell>
                    <Cell style={{justifyContent: "center"}}>
                        {parcel.receiver.country_code}
                    </Cell>
                    {/* <Cell
                        style={{justifyContent: "flex-end"}}
                        onPress={() => rm(page * rowsPerPage + i)}
                    >
                        <Text style={{color: "red"}}>X{"    "}</Text>
                    </Cell> */}
                </Row>
            ));
    return parcels.length > 0 ? (
        <Table
            headers={parcelLabels}
            title={title}
            totalNumOfRows={parcels.length}
            rowsPerPage={4}
            RenderItems={Rows}
        />
    ) : (
        <Subheading>No Parcels</Subheading>
    );
};

export default SummaryList;
