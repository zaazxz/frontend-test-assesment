import React from 'react'

const footer = ({ lastUpdated }: { lastUpdated?: string }) => {
    return (
        <>
            <div className="w-full h-3 p-2 px-3 border-t border-t-gray-500 flex items-center justify-end">

                {/* Title */}
                <small className="ml-3 text-xs text-gray-500 flex gap-2 items-center">
                    Last Updated :{" "}
                    {lastUpdated
                        ? new Date(lastUpdated).toLocaleDateString()
                        : "-"}
                </small>

            </div>
        </>
    )
}

export default footer