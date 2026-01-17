import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import '@xyflow/react/dist/style.css';
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { getProtectedRoutes } from "@/config/site";
import SessionExpiredModal from "@/components/common/SessionExpiredModal";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);

  const hadTokenRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const protectedRoutes = getProtectedRoutes();

    const pathname = router.asPath;
    const isAuthRoute = pathname.startsWith("/auth");

    const isProtectedRoute = protectedRoutes.some((route) =>
      router.asPath === route || router.asPath.startsWith(route + "/")
    );

    if (token) {
      hadTokenRef.current = true;
    }

    // Logged in
    if (token && isAuthRoute) {
      router.replace("/");
      return;
    }

    // Not logged in
    if (!token && isProtectedRoute) {
      router.replace("/auth/login");
      return;
    }

    setChecking(false);
  }, [router.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const protectedRoutes = getProtectedRoutes();
      const pathname = router.asPath;

      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname === route || pathname.startsWith(route + "/")
      );

      if (!token && hadTokenRef.current && isProtectedRoute) {
        setShowSessionModal(true);
        hadTokenRef.current = false;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router.asPath]);

  const handleSessionConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setShowSessionModal(false);
    router.replace("/auth/login");
  };

  if (checking) {
    return <LoadingOverlay />;
  }

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />

        <SessionExpiredModal
          isOpen={showSessionModal}
          title="Session expired"
          description="No session found, please login again."
          onConfirm={handleSessionConfirm}
        />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
