import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], rowsPerPage = 10) {
    
    // Setup state
    const [page, setPage] = useState(1);

    // Logic
    const totalPages = Math.ceil(items.length / rowsPerPage);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return items.slice(start, start + rowsPerPage);
    }, [items, page, rowsPerPage]);

    return {
        page,
        setPage,
        totalPages,
        paginatedItems
    };

}