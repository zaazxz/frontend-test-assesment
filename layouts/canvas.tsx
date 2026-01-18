import { ReactNode } from "react";
import { Head } from "./head";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";

interface CanvasLayoutProps {
    children: ReactNode;
    title?: string;
    onBack?: () => void;
    lastUpdated?: string
}

export default function CanvasLayout({ children, title = "Home", onBack, lastUpdated }: CanvasLayoutProps) {
    return (
        <div className="flex flex-col h-screen">
            <Head title={title} />

            {/* Topbar */}
            <Topbar onBack={onBack} />

            {/* children container flexible */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {children}
            </div>

            {/* Footer */}
            <Footer lastUpdated={lastUpdated} />
            
        </div>
    );
}
