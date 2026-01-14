import { siteConfig } from '@/config/site'
import { Button } from '@heroui/button'
import { useRouter } from 'next/router'
import { useLoginStore } from '@/stores/useLoginStore'

import React from 'react'
import ArrowLeftEndOnRectangle from './icons/ArrowLeftEndOnRectangle'
import ComputerDesktop from './icons/ComputerDesktop'
import Squares2x2 from './icons/Squares2x2'
import SquaresPlus from './icons/SquaresPlus'
import User from './icons/User'
import Link from 'next/link'

const ICON_MAP: Record<string, JSX.Element> = {
    dashboard: <Squares2x2 />,
    monitor: <ComputerDesktop />,
    design: <SquaresPlus />,
    user: <User />,
};

const Sidebar = () => {

    // use Router
    const router = useRouter();

    // use Login Store
    const resetLogin = useLoginStore((state) => state.reset);

    // handle logout
    const handleLogout = () => {

        // reset token
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // reset Zustand
        resetLogin();

        // redirect
        router.replace("/auth/login");

    }

    // use Site Config
    const { sidebarItems } = siteConfig();
    

    return (
        <>

            {/* Image and Content */}
            <div className="p-3">

                {/* Image */}
                <div className="flex justify-center gap-3 my-10">
                    <img src="/images/logo/sovware-logo.png" alt="Logo" className="w-13 h-13" />

                    {/* Text */}
                    <div className="flex justify-center flex-col">
                        <h1 className="text-xl font-bold">S.2.R.E</h1>
                        <h1 className="text-xl">ADMIN</h1>
                    </div>
                </div>

                {/* Content */}
                {sidebarItems.map((section) => (
                    <div key={section.prefix} className="mb-10">
                        
                        {/* Prefix */}
                        <small className="text-gray-400 text-sm">
                            {section.prefix}
                        </small>

                        {/* Items */}
                        <ul>
                            {section.items.map((item) => {
                                const isActive = router.pathname == item.href

                                return (
                                    <li key={item.href} className="my-2">
                                        <Link
                                            className={`flex gap-2 p-1 py-2 w-full rounded-lg text-gray-600 hover:bg-gray-400 hover:text-white transition ${isActive ? "bg-gray-400 text-white" : ""}`}
                                            href={item.href}
                                        >
                                            {/* Icon */}
                                            {ICON_MAP[item.icon]}

                                            {/* Text */}
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}

            </div>

            {/* Footer */}
            <div className="py-5 px-3">
                <Button className="w-full" color="primary" variant="solid" onClick={handleLogout}>

                    {/* Icon */}
                    <ArrowLeftEndOnRectangle />

                    Logout
                </Button>
            </div>

        </>
    )
}

export default Sidebar