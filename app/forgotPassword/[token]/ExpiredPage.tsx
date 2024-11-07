"use client";
import React from "react";
import expire404 from "@/public/LinkExpired.svg";
import Link from "next/link";
import { setLoginPageR } from "@/app/store/Global";
import { useDispatch } from "react-redux";
import Image from "next/image";

export default function ExpiredPage() {
  let dispatch = useDispatch();

  return (
    <div className="w-[90vw] h-[100vh] mx-auto flex flex-col justify-center items-center gap-12">
      <Image
        alt=""
        width={800}
        height={0}
        src={expire404.src}
      />
      <div className="w-[70%] mx-auto font-[600] text-[16px] dark:text-white text-black text-center">
        It looks like your password reset link has expired for security reasons.
        Please{" "}
        <Link
          href={"/"}
          className="text-blue-500 hover:text-blue-700 hover:underline"
          onClick={() => dispatch(setLoginPageR(false))}
        >
          click here to request a new password reset link
        </Link>{" "}
        and we'll send you a fresh link to reset your password.
      </div>
    </div>
  );
}
