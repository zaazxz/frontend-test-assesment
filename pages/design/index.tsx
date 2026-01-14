import { siteConfig } from '@/config/site';
import { Input, Textarea } from '@heroui/input';

import SquaresPlus from '@/components/icons/SquaresPlus';
import DefaultLayout from '@/layouts/default';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@heroui/button';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import { Pagination } from '@heroui/pagination';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { Select, SelectItem } from '@heroui/select';

export const SearchIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
];

const DesignIndex = () => {

    // import site config
    const config = siteConfig();

    // Disclosure
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Settings for table
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);

    const items = [
        { id: 1, name: "Tony Reichert", role: "CEO", status: "Active" },
        { id: 2, name: "Zoey Lang", role: "Tech Lead", status: "Paused" },
        { id: 3, name: "Jane Fisher", role: "Senior Dev", status: "Active" },
        { id: 4, name: "William Howard", role: "Community Manager", status: "Vacation" },
        { id: 5, name: "Kristen Copper", role: "Sales", status: "Active" },
        { id: 6, name: "Bruce Wayne", role: "Investor", status: "Active" },
        { id: 7, name: "Natasha Romanoff", role: "CEO", status: "Active" },
        { id: 8, name: "Clint Barton", role: "CEO", status: "Active" },
        { id: 9, name: "Natasha Romanoff", role: "CEO", status: "Active" },
        { id: 10, name: "Natasha Romanoff", role: "CEO", status: "Active" },
        { id: 11, name: "Natasha Romanoff", role: "CEO", status: "Active" },
        { id: 12, name: "Natasha Romanoff", role: "CEO", status: "Active" },
    ];

    const pages = Math.ceil(items.length / rowsPerPage);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return items.slice(start, start + rowsPerPage);
    }, [page]);

    return (
        <>

            {/* Content */}
            <DefaultLayout title="Design">
                <div className="w-full h-full">

                    {/* Title page */}
                    <div className="flex gap-2 items-center">

                        {/* Icon */}
                        <div className="w-15 h-15 flex justify-center items-center rounded-full bg-gray-200 group text-white">
                            <SquaresPlus />
                        </div>

                        {/* Text */}
                        <div className="">
                            <h1 className="text-xl font-bold">Design Class</h1>
                            <p className="text-sm text-gray-400">select your class</p>
                        </div>

                    </div>

                    {/* Search bar */}
                    <div className="flex items-center gap-5 my-3 w-full">
                        <Input
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "bg-transparent",
                                    "text-black/90 dark:text-white/90",
                                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                    "shadow-sm",
                                    "bg-gray-200",
                                    "dark:bg-default/60",
                                    "backdrop-blur-xl",
                                    "backdrop-saturate-200",
                                    "hover:bg-default-200/70",
                                    "dark:hover:bg-default/70",
                                    "group-data-[focus=true]:bg-gray-200",
                                    "dark:group-data-[focus=true]:bg-default/60",
                                    "cursor-text!",
                                ],
                            }}
                            label="Search"
                            placeholder="Type to search..."
                            radius="lg"
                            startContent={
                                <SearchIcon className="mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0" />
                            }
                            endContent={
                                <Button color='primary'>
                                    Open Class
                                </Button>
                            }
                        />

                    </div>

                    {/* Table */}
                    <div className="h-content overflow-auto p-3">
                        <Table
                            aria-label="Example static collection table"
                            color="default"
                            selectionMode="single"
                            onSelectionChange={() => {
                                onOpen();
                            }}
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
                            <TableBody items={paginatedItems}>
                                {(item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.role}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="p-3 flex justify-end">
                        <Pagination
                            isCompact
                            showControls
                            page={page}
                            total={pages}
                            onChange={setPage}
                        />
                    </div>

                </div>
            </DefaultLayout>

            {/* Modal */}
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    base: "w-[80vw] h-[85vh] max-w-none max-h-none flex flex-col",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {/* Modal Header */}
                            <ModalHeader className="flex flex-col gap-1 border-b border-b-gray-300">
                                Modal Title
                            </ModalHeader>

                            {/* Modal Body */}
                            <ModalBody className="flex-1 overflow-auto">

                                {/* Form */}
                                <div className="w-full flex flex-wrap gap-2 justify-between">

                                    {/* Major Version */}
                                    <div className="w-[49%] flex gap-2">

                                        {/* Select */}
                                        <Select className="w-[90%]" label="Select an animal">
                                            {animals.map((animal) => (
                                                <SelectItem key={animal.key}>{animal.label}</SelectItem>
                                            ))}
                                        </Select>

                                        {/* Button */}
                                        <Button className="w-[10%] h-full">+</Button>

                                    </div>

                                    {/* Minor Version */}
                                    <div className="w-[49%] flex gap-2">

                                        {/* Select */}
                                        <Select className="w-[90%]" label="Select an animal">
                                            {animals.map((animal) => (
                                                <SelectItem key={animal.key}>{animal.label}</SelectItem>
                                            ))}
                                        </Select>

                                        {/* Button */}
                                        <Button className="w-[10%] h-full">+</Button>

                                    </div>

                                    {/* Input Design Name */}
                                    <div className="w-full">
                                        <Input label="Design Name" />
                                    </div>

                                    {/* Textarea Comment */}
                                    <div className="w-full">
                                        <Textarea label="Comment" />
                                    </div>

                                    {/* Submit button */}
                                    <div className="w-full">
                                        <Button color="primary" className="w-full">Submit</Button>
                                    </div>

                                </div>

                                {/* Table */}
                                <div className="w-full overflow-auto p-3 h-[50%]">
                                    <Table
                                        aria-label="Example static collection table"
                                        color="default"
                                        selectionMode="single"
                                        onSelectionChange={() => {
                                            onOpen();
                                        }}
                                        removeWrapper
                                        classNames={{
                                            thead: "bg-transparent",
                                            base: "bg-transparent shadow-none rounded-none",
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
                                        <TableBody>
                                            {items.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.role}</TableCell>
                                                    <TableCell>{item.status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                            </ModalBody>

                            {/* Modal Footer */}
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>Cancel</Button>
                                <Button color="primary">Save</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}

export default DesignIndex