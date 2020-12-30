import React from "react";
import {Text} from "react-native";
import {Table, Cell, Row} from "_atoms";

const ExtraChargesTable = ({
    extra_charges = [],
    removeExtraCharge: rm = () => {},
    title = "Extra charges",
}) => {
    const Rows = ({page, rowsPerPage}) =>
        extra_charges
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((extra_charge, i) => (
                <Row key={i}>
                    <Cell>{extra_charge.note}</Cell>
                    <Cell numeric>{extra_charge.amount}</Cell>
                    <Cell
                        style={{justifyContent: "flex-end"}}
                        onPress={() => rm(page * rowsPerPage + i)}
                    >
                        <Text style={{color: "red"}}>X{"    "}</Text>
                    </Cell>
                </Row>
            ));
    return (
        <Table
            headers={["Note", "Amount", "Action"]}
            title={title}
            totalNumOfRows={extra_charges.length}
            rowsPerPage={4}
            RenderItems={Rows}
        />
    );
};

export default ExtraChargesTable;
