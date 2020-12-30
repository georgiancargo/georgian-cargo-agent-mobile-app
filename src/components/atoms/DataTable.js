import React, {useState, useEffect} from "react";
import {DataTable, useTheme, Subheading} from "react-native-paper";

const Table = ({
    totalNumOfRows = 1,
    headers = [],
    rowsPerPage = 1,
    title = "Extra charges",
    RenderItems,
    justifyContent = "center",
}) => {
    const {colors, roundness} = useTheme();
    const [numberOfPages, setNumberOfPages] = useState();
    const [page, setPage] = useState(0);
    const style = {
        borderWidth: 1,
        borderRadius: roundness,
        borderColor: colors.background,
        padding: 5,
    };
    const headerBorderStyle = {
        borderTopWidth: 1,
        borderTopColor: colors.background,
    };
    useEffect(() => {
        const num = Math.ceil(totalNumOfRows / rowsPerPage);
        if (num > 1) setNumberOfPages(num);
        else setNumberOfPages(0);
    }, [totalNumOfRows]);
    return (
        <DataTable style={style}>
            <Subheading style={{marginLeft: 5}}>{title}</Subheading>
            <DataTable.Header style={headerBorderStyle}>
                {headers.map((header, i) => (
                    <DataTable.Title
                        style={{
                            justifyContent:
                                i === 0 ? "flex-start" : justifyContent,
                        }}
                    >
                        {header}
                    </DataTable.Title>
                ))}
            </DataTable.Header>
            <RenderItems page={page} rowsPerPage={rowsPerPage} />
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

export default Table;
