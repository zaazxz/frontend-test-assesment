import DesignModal from "@/components/design/DesignModal";
import DesignSearch from "@/components/design/DesignSearch";
import DesignTable from "@/components/design/DesignTable";
import SquaresPlus from "@/components/icons/SquaresPlus";
import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import { usePagination } from "@/utils/hooks/usePagination";
import { useDisclosure } from "@heroui/modal";
import { Pagination } from "@heroui/pagination";

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

export const items = [
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

const DesignIndex = () => {

    // import site config
    const config = siteConfig();

    // Use Pagination Hooks
    const itemsPerPage = 10;
    const pagination = usePagination(items, itemsPerPage);

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
                        <DesignSearch />
                    </div>

                    {/* Table */}
                    <div className="h-content overflow-auto p-3">
                        <DesignTable items={pagination.paginatedItems} onSelect={() => { onOpen(); }} />
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
                items={items} 
                animals={animals} 
                onOpen={onOpen} 
            />

        </>
    );
}

export default DesignIndex