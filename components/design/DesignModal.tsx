import { useDesignStore } from '@/stores/useDesignStore';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { Select, SelectItem } from '@heroui/select';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import React, { FormEvent, useMemo, useState } from 'react'
import Plus from '../icons/Plus';
import { Form } from '@heroui/form';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    items: any[];
    onOpen: () => void;
}

const DesignModal = ({ isOpen, onOpenChange, items, onOpen }: Props) => {

    // Fetch data
    const { createFlowVersion, loading } = useDesignStore();

    // State
    const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
    const [selectedMinor, setSelectedMinor] = useState<number | null>(null);
    const [designName, setDesignName] = useState('');
    const [comment, setComment] = useState('');

    // handle Submit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedMajor === null || selectedMinor === null) return;

        await createFlowVersion({
            majorVersion: selectedMajor,
            minorVersion: selectedMinor,
            designName: designName === '' ? '-' : designName,
            comment: comment,
            status: "draft",
            lastUpdated: new Date().toISOString(),
            minifiConfigVersion: {}
        });

        // reset Form
        setDesignName("");
        setComment("");
        setSelectedMajor(null);
        setSelectedMinor(null);
    }

    // Logic major and minor
    const majorOptions = useMemo(() => {
        const majors = items.map((f) => f.majorVersion);

        if (selectedMajor !== null) {
            majors.push(selectedMajor);
        }

        return Array.from(new Set(majors)).sort((a, b) => a - b);
    }, [items, selectedMajor])

    const minorOptions = useMemo(() => {
        if (selectedMajor === null) return [];

        const minors = items
            .filter((f) => f.majorVersion === selectedMajor)
            .map((f) => f.minorVersion);

        if (selectedMinor !== null) {
            minors.push(selectedMinor);
        }

        return Array.from(new Set(minors)).sort((a, b) => a - b);
    }, [items, selectedMajor, selectedMinor])

    // Button add version
    const addMajorVersion = () => {
        const maxMajor = Math.max(...items.map((f) => f.majorVersion));
        setSelectedMajor(maxMajor + 1);
        setSelectedMinor(0);
    }

    const addMinorVersion = () => {
        if (selectedMajor === null) return;

        const minors = items
            .filter((f) => f.majorVersion === selectedMajor)
            .map((f) => f.minorVersion);

        const nextMinor = minors.length ? Math.max(...minors) + 1 : 0;

        setSelectedMinor(nextMinor);
    }

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
                            <Form onSubmit={handleSubmit}>
                                <div className="w-full flex flex-wrap gap-2 justify-between">

                                    {/* Major Version */}
                                    <div className="w-[49%] flex gap-2">

                                        {/* Select */}
                                        <Select
                                            className="w-[90%]"
                                            label="Select major version"
                                            selectedKeys={selectedMajor != null ? [String(selectedMajor)] : []}
                                            onSelectionChange={(keys) => {
                                                const value = Number(keys.currentKey);
                                                setSelectedMajor(value);
                                                setSelectedMinor(null);
                                            }}
                                        >
                                            {majorOptions.map((major) => (
                                                <SelectItem key={major} textValue={String(major)}>{major}</SelectItem>
                                            ))}
                                        </Select>

                                        {/* Button */}
                                        <Button className="w-[10%] h-full" onPress={addMajorVersion}>
                                            <Plus />
                                        </Button>

                                    </div>

                                    {/* Minor Version */}
                                    <div className="w-[49%] flex gap-2">

                                        {/* Select */}
                                        <Select
                                            className="w-[90%]"
                                            label="Select minor version"
                                            selectedKeys={selectedMinor !== null ? [String(selectedMinor)] : []}
                                            onSelectionChange={(keys) => {
                                                setSelectedMinor(Number(keys.currentKey))
                                            }}
                                            isDisabled={selectedMajor === null}
                                        >
                                            {minorOptions.map((minor) => (
                                                <SelectItem key={minor} textValue={String(minor)}>{minor}</SelectItem>
                                            ))}
                                        </Select>

                                        {/* Button */}
                                        <Button
                                            className="w-[10%] h-full"
                                            onPress={addMinorVersion}
                                            isDisabled={selectedMajor === null}
                                        >
                                            <Plus />
                                        </Button>

                                    </div>

                                    {/* Input Design Name */}
                                    <div className="w-full">
                                        <Input
                                            label="Design Name"
                                            value={designName}
                                            onValueChange={(value) => setDesignName(value)}
                                        />
                                    </div>

                                    {/* Textarea Comment */}
                                    <div className="w-full">
                                        <Textarea
                                            label="Comment"
                                            value={comment}
                                            onValueChange={(value) => setComment(value)}
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <div className="w-full">
                                        <Button color="primary" className="w-full" type='submit'>
                                            New Flow
                                        </Button>
                                    </div>

                                </div>
                            </Form>

                            {/* Table */}
                            <div className="w-full overflow-auto p-3 h-[50%]">
                                {loading ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Spinner size="md" label="Loading flow versions..." />
                                    </div>
                                ) : (
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
                                            <TableColumn>Version</TableColumn>
                                            <TableColumn>Design Name</TableColumn>
                                            <TableColumn>Status</TableColumn>
                                            <TableColumn>Comment</TableColumn>
                                            <TableColumn>Last Updated</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {items.map((flow, index) => (
                                                <TableRow key={`${flow.majorVersion}.${flow.minorVersion}-${index}`}>

                                                    {/* Versioning */}
                                                    <TableCell>
                                                        <span className="text-gray-400">Version</span> {flow.majorVersion}.{flow.minorVersion}
                                                    </TableCell>

                                                    {/* Design Name */}
                                                    <TableCell
                                                        className="tracking-tight truncate"
                                                    >
                                                        {flow.designName}
                                                    </TableCell>

                                                    {/* Status */}
                                                    <TableCell>
                                                        <Chip
                                                            isDisabled
                                                            color={flow.status === "draft" ? "default" : "success"}
                                                        >
                                                            {flow.status}
                                                        </Chip>
                                                    </TableCell>

                                                    {/* Comment */}
                                                    <TableCell
                                                        className="tracking-tight truncate"
                                                    >
                                                        {flow.comment}
                                                    </TableCell>

                                                    <TableCell>
                                                        {new Date(flow.lastUpdated).toLocaleDateString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>

                        </ModalBody>

                        {/* Modal Footer */}
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>Cancel</Button>
                            <Button color="primary">Open</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default DesignModal