"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/store/StoreProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "./store";
import Sidebar from "./Components/Sidebar";
import Nav from "./Components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  let [verified, setVerified] = useState(true);
  console.log(verified);
  useEffect(() => {
    if (!verified) {
      router.push("/");
    }
  }, [verified, router]);
  let pathName =
    typeof window !== "undefined" ? window.location.pathname : null;
  console.log(pathName)
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
                pathName !== "/"
                  ? "flex justify-start items-start relative flex-wrap"
                  : ""
              }`}
            >
              {pathName !== "/" ? (
                <>
                  <Sidebar />
                  <Nav />
                </>
              ) : null}

              <main className={inter.className}>{children}</main>
            </main>
          </body>
        </html>
      </>
    </StoreProvider>
  );
}
