import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import React, { useEffect, useState } from 'react'
import SearchIcon from '../icons/SearchIcon'
import { useDesignStore } from '@/stores/useDesignStore'
import { useDebounce } from '@/utils/hooks/useDebounce'

interface DesignSearchProps {
    onOpen: () => void;
}

const DesignSearch = ({ onOpen }: DesignSearchProps) => {

    // use Design Store
    const { setSearch, selectedDesignId } = useDesignStore();

    // use State
    const [value, setValue] = useState("");

    // Debounce
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        setSearch(debouncedValue);
    }, [debouncedValue, setSearch])

    return (
        <>
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
                value={value}
                onValueChange={setValue}
                label="Search"
                placeholder="Type to search..."
                radius="lg"
                startContent={
                    <SearchIcon className="mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0" />
                }
                endContent={
                    <Button 
                        color='primary'
                        isDisabled={!selectedDesignId}
                        onPress={onOpen}
                    >
                        Open Class
                    </Button>
                }
            />
        </>
    )
}

export default DesignSearch