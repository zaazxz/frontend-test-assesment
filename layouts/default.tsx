import { ReactNode } from "react";
import { Head } from "./head";
import { getBreadcrumbs } from "@/utils/helper/getBreadcrumbs";
import { useRouter } from "next/router";

import Bars3 from "@/components/icons/Bars3";
import ComputerDesktop from "@/components/icons/ComputerDesktop";
import Squares2x2 from "@/components/icons/Squares2x2";
import SquaresPlus from "@/components/icons/SquaresPlus";
import User from "@/components/icons/User";
import Sidebar from "@/components/sidebar";

const ICON_MAP: Record<string, JSX.Element> = {
  dashboard: <Squares2x2 />,
  monitor: <ComputerDesktop />,
  design: <SquaresPlus />,
  user: <User />,
};

interface DefaultLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function DefaultLayout({ children, title = "Dashboard" }: DefaultLayoutProps) {

  const router = useRouter();
  const breadcrumb = getBreadcrumbs(router.pathname);

  return (
    <div className="relative flex flex-wrap h-screen">
      <Head title={title} />

      {/* Sidebar */}
      <div className="border-r border-r-gray-400 w-[20%] flex flex-col justify-between">

        <Sidebar />

      </div>

      {/* Navigation bar and Content */}
      <div className="w-[80%] flex flex-col">

        <div className="border-b border-b-gray-400 p-3 text-gray-400 flex gap-3 items-center">

          {/* Button */}
          <button className="hidden group border p-2 rounded hover:bg-gray-400 hover:text-white transition">
            <Bars3 />
          </button>

          {/* Breadcrumb */}
          <p className="flex gap-1">
            Home /
            {breadcrumb && (
              <>
                <span className="flex gap-1 items-center text-black">
                  {ICON_MAP[breadcrumb.icon]}
                  {breadcrumb.name}
                </span>
              </>
            )}
          </p>

        </div>

        {/* Content */}
        <div className="overflow-auto p-3 h-full w-full">
          {children}
        </div>

      </div>

    </div>
  );
}
