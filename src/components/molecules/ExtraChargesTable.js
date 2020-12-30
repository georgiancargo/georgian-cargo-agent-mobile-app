import React, {useState, useEffect} from "react";
import {Text} from "react-native";
import {DataTable} from "react-native-paper";

const ExtraChargesTable = ({
    extra_charges = [],
    removeExtraCharge = () => {},
}) => {
    const [numberOfPages, setNumberOfPages] = useState();
    const [page, setPage] = useState(0);
    useEffect(() => {
        const num = Math.ceil(extra_charges.length / 4);
        if (num > 1) setNumberOfPages(num);
        else setNumberOfPages(0);
    }, [extra_charges]);
    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Note</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
                <DataTable.Title style={{justifyContent: "flex-end"}}>
                    Action
                </DataTable.Title>
            </DataTable.Header>
            {extra_charges
                .slice(page * 4, page * 4 + 4)
                .map((extra_charge, i) => (
                    <DataTable.Row key={i}>
                        <DataTable.Cell>{extra_charge.note}</DataTable.Cell>
                        <DataTable.Cell numeric>
                            {extra_charge.amount}
                        </DataTable.Cell>
                        <DataTable.Cell
                            style={{justifyContent: "flex-end"}}
                            onPress={() => removeExtraCharge(page * 4 + i)}
                        >
                            <Text style={{color: "red"}}>X{"    "}</Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={numberOfPages}
                onPageChange={(page) => {
                    setPage(page);
                }}
            />
        </DataTable>
    );
};

export default ExtraChargesTable;
