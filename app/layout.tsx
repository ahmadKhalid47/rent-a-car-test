"use client";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/store/StoreProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import Nav from "./Components/Nav";
import axios from "axios";
import Loader from "./Components/Loader";
import AlertShower from "./Components/AlertShower";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const pathName = usePathname();
  const [isVerified, setIsVerified] = useState<any>(undefined);
  // const [isVerified, setIsVerified] = useState<any>(true);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    if (isVerified === false) {
      if (!pathName.includes("forgotPassword")) {
        router.push("/");
      }
    } else if (isVerified === true && pathName === "/") {
      router.push("/Dashboard");
    }
  }, [isVerified, router]);
  useEffect(() => {
    const [navigationEntry] = window.performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];

    const isPageReload =
      navigationEntry?.type === "reload" || document.referrer === "";

    async function verifyTokenApi() {
      try {
        setLoading(true);
        setIsVerified(undefined);
        await axios.post("/api/verifyToken");
        setIsVerified(true);
      } catch (err) {
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    }
    if (isPageReload) {
      verifyTokenApi();
    }
  }, []);

  return (
    <StoreProvider>
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="Rent A Car" content="Rent A Car" />
        </Head>
        <html lang="en">
          <body className="w-full">
            {isVerified === undefined || loading ? (
              <Loader />
            ) : (
              <main
                className={`${
                  pathName &&
                  pathName !== "/" &&
                  !pathName.includes("forgotPassword") &&
                  isVerified
                    ? "flex justify-start items-start relative flex-wrap"
                    : ""
                }`}
              >
                {pathName &&
                pathName !== "/" &&
                !pathName.includes("forgotPassword") &&
                isVerified ? (
                  <>
                    <Sidebar />
                    <Nav />
                  </>
                ) : (
                  <>
                    <AlertShower />
                  </>
                )}
                <section className={inter.className}>{children}</section>
              </main>
            )}
          </body>
        </html>
      </>
    </StoreProvider>
  );
}
