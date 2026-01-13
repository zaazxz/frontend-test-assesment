import { Head } from "./head";

export default function SecondaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Head title="Login" />
            {children}
        </div>
    );
}
