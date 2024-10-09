"use client";
import React from "react";
import expire404 from "@/public/LinkExpired.svg";
import Link from "next/link";
import { setLoginPageR } from "@/app/store/Global";
import { useDispatch } from "react-redux";

export default function ExpiredPage() {
  let dispatch = useDispatch();

  return (
    <div className="w-[90vw] h-[90vh] mx-auto">
      <img src={expire404.src} className="w-[40vw] mx-auto mt-10" />
      <div className="w-[70%] mx-auto mt-10 font-[600] text-[16px] dark:text-white text-black text-center">
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
