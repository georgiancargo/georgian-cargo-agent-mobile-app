import React from "react";
import {Text} from "react-native";
import {Subheading} from "react-native-paper";
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
                <Row key={extra_charge.note}>
                    <Cell>{extra_charge.note}</Cell>
                    <Cell>{extra_charge.amount}</Cell>
                    <Cell
                        style={{justifyContent: "flex-end"}}
                        onPress={() => rm(page * rowsPerPage + i)}
                    >
                        <Text style={{color: "red"}}>X{"    "}</Text>
                    </Cell>
                </Row>
            ));
    return extra_charges.length > 0 ? (
        <Table
            headers={["Note", "Amount", ""]}
            title={title}
            totalNumOfRows={extra_charges.length}
            rowsPerPage={4}
            RenderItems={Rows}
            justifyContent="flex-start"
        />
    ) : (
        <Subheading> No Extra Charges </Subheading>
    );
};

export default ExtraChargesTable;
