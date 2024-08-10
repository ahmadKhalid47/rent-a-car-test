"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/store/StoreProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import Nav from "./Components/Nav";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<any>(undefined);
  // const [pathName, setPathName] = useState("");
  let pathName =
    typeof window !== "undefined" ? window.location.pathname : null;

  useEffect(() => {
    if (isVerified === false) {
      router.push("/");
    }
  }, [isVerified, router]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setPathName(window.location.pathname);
  //   }
  //   console.log("hello");
  // }, [pathName]);

  useEffect(() => {
    async function verifyTokenApi() {
      try {
        setIsVerified(undefined);
        await axios.get("/api/verifyToken");
        setIsVerified(true);
      } catch (err) {
        setIsVerified(false);
      }
    }
    verifyTokenApi();
  }, [pathName]);

  console.log(pathName);

  return (
    <StoreProvider>
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="Rent A Car" content="Rent A Car" />
        </Head>
        <html lang="en">
          <body className="w-full">
            {isVerified === undefined ? null : (
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
