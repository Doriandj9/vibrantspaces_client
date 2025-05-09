import { ButtonGroup, IconButton, Pagination, Table, TableRootProps } from "@chakra-ui/react";
import { useState } from "react";
import { ResultTableHelperHook } from "../@types/core";
import { LoadingTable } from "./LoadingTable";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type AppTableProps<T> = {
    tableHelper: ResultTableHelperHook<T>;
    isLoading: boolean;
    error: unknown;
    data: T[];
    originalPropsTable?: TableRootProps;
    displayRows?: number;
};


export function AppTable<TData>({ tableHelper, isLoading, error, data, originalPropsTable, displayRows = 5 }: AppTableProps<TData>) {
    const { actions, columns, rowStyleCustom } = tableHelper;
    const [page, setPage] = useState(1);

    if (isLoading) {
        return (<LoadingTable />);
    }

    if (error) {
        return 'error';
    }

    const values = data.slice((page - 1) * displayRows, page * displayRows);

    return (
        <>
            <Table.ScrollArea borderWidth="1px">
                <Table.Root {...originalPropsTable}>
                    <Table.Header>
                        <Table.Row>
                            {columns.map((item, index) => {
                                return (
                                    <Table.ColumnHeader key={index}>{item.header.trim()}</Table.ColumnHeader>
                                );
                            })}
                            <Table.ColumnHeader style={{ position: 'sticky', zIndex: 1, right: 0, backgroundColor: 'inherit' }}>{actions.header.trim()}</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {values.map((row, index) => (
                            <Table.Row
                                style={rowStyleCustom ? rowStyleCustom(row) : {}}
                                key={(++index + ((page - 1) * displayRows))}
                            >
                                {columns.map((item, columnIndex) => (
                                    <Table.Cell key={columnIndex} align="center" >
                                        {item.render(row, (++index + ((page - 1) * displayRows)))}
                                    </Table.Cell>
                                ))}

                                <Table.Cell width={actions.width ? actions.width : '1.8rem'} align="center" style={{ position: 'sticky', zIndex: 1, right: 0, backgroundColor: 'inherit' }}>
                                    {actions.list?.render ? actions.list.render(row, (++index + ((page - 1) * displayRows))) : ''}
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

            </Table.ScrollArea>


            <div className="mt-2">
                <Pagination.Root count={data?.length}
                    pageSize={displayRows}
                    defaultPage={1}
                    page={page}
                    onPageChange={(e) => setPage(e.page)}
                    >
                    <ButtonGroup variant="outline" size="sm">
                        <Pagination.PrevTrigger asChild>
                            <IconButton>
                                <LuChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>

                        <Pagination.Items
                            render={(page) => (
                                <IconButton variant={{ base: "outline", _selected: "solid" }}>
                                    {page.value}
                                </IconButton>
                            )}
                        />

                        <Pagination.NextTrigger asChild>
                            <IconButton>
                                <LuChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>
                    </ButtonGroup>
                </Pagination.Root>
            </div>
        </>
    );
};