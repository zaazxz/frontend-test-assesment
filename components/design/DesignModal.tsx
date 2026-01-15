import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { Select, SelectItem } from '@heroui/select';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import React from 'react'

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    items: any[];
    animals: any[];
    onOpen: () => void;
}

const DesignModal = ({ isOpen, onOpenChange, items, animals, onOpen }: Props) => {
    return (
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
                                    onSelectionChange={onOpenChange}
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
    )
}

export default DesignModal