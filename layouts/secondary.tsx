import { ReactNode } from "react";
import { Head } from "./head";

interface SecondaryLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function SecondaryLayout({ children, title = "Home" }: SecondaryLayoutProps) {
    return (
        <div className="relative flex flex-col h-screen">
            <Head title={title} />
            {children}
        </div>
    );
}
