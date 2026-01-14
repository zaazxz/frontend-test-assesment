import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import LoadingOverlay from "@/components/LoadingOverlay";
import { getProtectedRoutes } from "@/config/site";

export default function App({ Component, pageProps }: AppProps) {

  // Router
  const router = useRouter();

  // State
  const [checking, setChecking] = useState(true);

  // useEffect
  useEffect(() => {

    // Get the token from local storage
    const token = localStorage.getItem("token");

    // set the protected routes
    const protectedRoutes = getProtectedRoutes();

    if (token && router.pathname.startsWith("/auth")) {
      router.replace("/");
    } else if (!token && protectedRoutes.includes(router.pathname)) {
      router.replace("/auth/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <LoadingOverlay />
    )
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
