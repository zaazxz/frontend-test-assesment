import React from 'react'
import ArrowLeft from './icons/ArrowLeft'
import Pencil from './icons/Pencil'

const footer = () => {
    return (
        <>
            <div className="w-full h-3 p-2 px-3 border-t border-t-gray-500 flex items-center justify-end">

                {/* Title */}
                <small className="ml-3 text-xs text-gray-500 flex gap-2 items-center">
                    Last Updated : 10-10-2010
                </small>

            </div>
        </>
    )
}

export default footer