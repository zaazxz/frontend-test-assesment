import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { Spinner } from "@heroui/spinner";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const protectedRoutes = ["/dashboard", "/profile"];

    if (token && router.pathname.startsWith("/auth")) {
      router.replace("/dashboard");
    } else if (!token && protectedRoutes.includes(router.pathname)) {
      router.replace("/auth/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
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
    );
  }

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
