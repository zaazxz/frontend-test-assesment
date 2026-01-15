import { Button } from '@heroui/button'
import React from 'react'
import ArrowLeft from './icons/ArrowLeft'
import Pencil from './icons/Pencil'

const topbar = () => {
    return (
        <>
            <div className="w-full h-15 p-3 border-t-5 border-t-blue-500 border-b border-b-gray-400 flex items-center">

                {/* Back Button */}
                <button className="w-10 h-10 bg-blue-500 flex justify-center items-center group text-white rounded hover:bg-blue-700 transition">
                    <ArrowLeft />
                </button>

                {/* Title */}
                <h1 className="font-bold ml-3 text-lg flex gap-2 items-center">
                    Design Mode
                    <Pencil />
                </h1>

            </div>
        </>
    )
}

export default topbar