"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/store/StoreProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import { RootState } from "../store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  // const [verified, setVerified] = useState("false");
  // let verified = useSelector((state: RootState) => state.Global.sidebarShow);
  let verified = true;
  console.log(verified);
  useEffect(() => {
    if (!verified) {
      router.push("/login");
    }
  }, [verified, router]);
  return (
    <StoreProvider>
      <Head>
        <title>Dashboard</title>
        <meta name="Rent A Car" content="Rent A Car" />
      </Head>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
