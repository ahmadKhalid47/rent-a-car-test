"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/store/StoreProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import Nav from "./Components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [verified, setVerified] = useState(true);
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (!verified) {
      router.push("/");
    }
  }, [verified, router]);
  // let pathName =
  //   typeof window !== "undefined" ? window.location.pathname : null;
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathName(window.location.pathname);
    }
  }, [pathName]);

  return (
    <StoreProvider>
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="Rent A Car" content="Rent A Car" />
        </Head>
        <html lang="en">
          <body className="w-full">
            <main
              className={`${
                pathName && pathName !== "/" && verified
                  ? "flex justify-start items-start relative flex-wrap"
                  : ""
              }`}
            >
              {pathName && pathName !== "/" && verified ? (
                <>
                  <Sidebar />
                  <Nav />
                </>
              ) : null}
              <section className={inter.className}>{children}</section>
            </main>
          </body>
        </html>
      </>
    </StoreProvider>
  );
}
