import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import React from 'react'

interface DesignTableProps {
    items: any[];
    onSelect: (keys: any) => void;
}

const DesignTable = ({ items, onSelect }: DesignTableProps) => {
    return (
        <>
            <Table
                aria-label="Example static collection table"
                color="default"
                selectionMode="single"
                onSelectionChange={onSelect}
                removeWrapper
                classNames={{
                    thead: "bg-transparent",
                    base: "bg-transparent shadow-none rounded-none",
                    table: "min-h-full",
                    th: [
                        "bg-transparent",
                        "border-b",
                        "border-gray-300",
                        "text-xs",
                        "font-semibold",
                        "uppercase",
                        "text-gray-600",
                    ],
                }}
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default DesignTable