import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import React from 'react'

interface DesignTableProps {
    items: any[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    onDoubleClick: (id: number) => void;
}

const DesignTable = ({ items, selectedId, onSelect, onDoubleClick }: DesignTableProps) => {
    return (
        <>
            <Table
                aria-label="Example static collection table"
                color="default"
                // selectionMode="single"
                // onSelectionChange={onSelect}
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
                    <TableColumn>Class ID</TableColumn>
                    <TableColumn>Number of Agents</TableColumn>
                </TableHeader>
                <TableBody
                    items={items}
                    emptyContent={
                        <div className="w-full py-10 flex justify-center text-gray-400 text-sm">
                            Designs not found
                        </div>
                    }
                >
                    {(item) => (
                        <TableRow
                            key={item.id}
                            aria-selected={selectedId === item.id}
                            onPointerDown={() => onSelect(item.id)}
                            onDoubleClick={() => onDoubleClick(item.id)}
                            className="
                                cursor-pointer
                                transition-colors
                                data-[selected=true]:bg-primary/10
                                hover:bg-gray-100
                            "
                        >
                            <TableCell>{item.classId}</TableCell>
                            <TableCell>{item.numberOfAgents}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default DesignTable