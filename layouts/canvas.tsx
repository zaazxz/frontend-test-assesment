import { ReactNode } from "react";
import { Head } from "./head";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";

interface CanvasLayoutProps {
    children: ReactNode;
    title?: string;
    onBack?: () => void;
}

export default function CanvasLayout({ children, title = "Home", onBack }: CanvasLayoutProps) {
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
            <Footer />
            
        </div>
    );
}
