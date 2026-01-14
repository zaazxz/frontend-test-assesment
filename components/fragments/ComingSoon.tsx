import { Button } from '@heroui/button'
import Link from 'next/link'
import React from 'react'

const ComingSoon = () => {
  return (
    <>
        <div className="flex flex-col justify-center items-center w-full p-3">

            {/* Images */}
            <img src="/images/assets/web-development.svg" alt="Coming Soon Images" className='cover w-[25%] h-[25%]' />

            {/* Text */}
            <h1 className="text-3xl my-2 font-bold text-blue-500">Coming soon</h1>
            <p className="text-sm mb-5 text-blue-500">This page is under construction</p>

            {/* Button redirect */}
            <Link href="/design" className="bg-blue-500 rounded px-3 py-2 text-white hover:bg-blue-600 transition">Back to design</Link>

        </div>
    </>
  )
}

export default ComingSoon