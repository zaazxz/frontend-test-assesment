import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { getProtectedRoutes } from "@/config/site";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const protectedRoutes = getProtectedRoutes();
      const isAuthRoute = router.pathname.startsWith("/auth");
      const isProtectedRoute = protectedRoutes.includes(router.pathname);

      // if logged in
      if (token && isAuthRoute) {
        router.replace("/");
        return;
      }

      // if non logged in
      if (!token && isProtectedRoute) {
        router.replace("/auth/login");
        return;
      }

      // Aman
      setChecking(false);
    };

    checkAuth();
  }, [router.pathname]);

  if (checking) {
    return <LoadingOverlay />;
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
