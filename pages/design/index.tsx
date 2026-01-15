import DesignModal from "@/components/design/DesignModal";
import DesignSearch from "@/components/design/DesignSearch";
import DesignTable from "@/components/design/DesignTable";
import SquaresPlus from "@/components/icons/SquaresPlus";
import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import { usePagination } from "@/utils/hooks/usePagination";
import { useDisclosure } from "@heroui/modal";
import { Pagination } from "@heroui/pagination";
import { useDesignStore } from "@/stores/useDesignStore";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "@heroui/spinner";

const DesignIndex = () => {

    // import site config
    const config = siteConfig();

    // Fetching data
    const { designs, fetchDesigns, selectedDesign, selectedDesignId, setSelectedDesign, loading, search } = useDesignStore();

    const filteredDesigns = useMemo(() => {
        if (!search) return designs;

        return designs.filter((d) =>
            d.classId.toLowerCase().includes(search.toLowerCase())
        )
    }, [designs, search])

    useEffect(() => {
        fetchDesigns();
    }, [])

    // Use Pagination Hooks
    const itemsPerPage = 10;
    const pagination = usePagination(filteredDesigns, itemsPerPage);

    // Use Disclosure
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <div className="flex items-center gap-5 mt-3 w-full">
                        <DesignSearch 
                            onOpen={onOpen}
                        />
                    </div>

                    {/* Table */}
                    <div className="h-content overflow-auto p-3">
                        {loading ? (
                            <div className="w-full h-[300px] flex items-center justify-center">
                                <Spinner size="lg" label="Loading designs..." />
                            </div>
                        ) : (
                            <DesignTable
                                items={pagination.paginatedItems}
                                selectedId={selectedDesignId}
                                onSelect={setSelectedDesign}
                                onDoubleClick={(id) => {
                                    setSelectedDesign(id);
                                    onOpen();
                                }}
                            />
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="p-3 flex justify-end">
                        <Pagination
                            isCompact
                            showControls
                            page={pagination.page}
                            total={pagination.totalPages}
                            onChange={pagination.setPage}
                        />
                    </div>

                </div>
            </DefaultLayout>

            {/* Modal */}
            <DesignModal
                isOpen={isOpen}
                onOpenChange={() => { onClose(); }}
                items={selectedDesign?.flowVersion || []}
                onOpen={onOpen}
            />

        </>
    );
}

export default DesignIndex