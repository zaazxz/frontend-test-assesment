import { Spinner } from '@heroui/spinner'
import React from 'react'

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 flex-col">

            {/* Image and text */}
            <div className="flex items-center justify-center gap-5">
                <img src="/images/logo/sovware-logo.png" alt="Logo" className="w-15 h-15" />

                {/* Text */}
                <div className="flex justify-center flex-col">
                    <h1 className="text-2xl font-bold">SOVWARE</h1>
                    <h1 className="text-2xl">EDGE SYSTEM</h1>
                </div>

            </div>

            {/* Spinner */}
            <div className="mt-10">
                <Spinner />
            </div>

        </div>
    )
}

export default LoadingOverlay