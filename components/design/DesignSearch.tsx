import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import React from 'react'
import SearchIcon from '../icons/SearchIcon'

const DesignSearch = () => {
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
        </>
    )
}

export default DesignSearch