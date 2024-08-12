"use client";
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

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathName = usePathname();
  const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    // Check if the code is running on the client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isVerified === false) {
      if (!pathName.includes("forgotPassword")) {
        router.push("/");
      }
    }
  }, [isVerified, router, pathName]);

  useEffect(() => {
    async function verifyTokenApi() {
      try {
        setLoading(true);
        setIsVerified(undefined);
        await axios.get("/api/verifyToken");
        setIsVerified(true);
      } catch (err) {
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    }
    verifyTokenApi();
  }, [pathName]);

  if (!isClient) {
    return null; // Return null to prevent rendering on the server
  }

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
                  pathName && pathName !== "/" && isVerified
                    ? "flex justify-start items-start relative flex-wrap"
                    : ""
                }`}
              >
                {pathName && pathName !== "/" && isVerified ? (
                  <>
                    <Sidebar />
                    <Nav />
                  </>
                ) : null}
                <section className={inter.className}>{children}</section>
              </main>
            )}
          </body>
        </html>
      </>
    </StoreProvider>
  );
}

