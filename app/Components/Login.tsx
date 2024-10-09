"use client";
import React from "react";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoginPageR } from "../store/Global";
import { SmallLoader } from "./Loader";

export default function Login() {
  let dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(null);
  const [loading, setLoading] = useState<any>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();

  const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (typeof window === "undefined") {
      return;
    }
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    setShowError(null);
    console.log(formDataObj);

    try {
      setLoading(true);
      let result: any = await axios.post(`/api/login`, {
        ...formDataObj,
        rememberMe,
      });
      if (result?.data?.error === null) {
        window.location.reload();
      } else {
        setShowError(result?.data?.error);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(rememberMe);

  return (
    <>
      {showError ? (
        <Alert
          variant="filled"
          severity="error"
          className="absolute w-[200px] z-[100] top-2 right-2 alert-animation capitalize"
        >
          {showError}
        </Alert>
      ) : null}

      <form
        onSubmit={loginSubmit}
        className="w-[90%] sm:w-[60%] h-fit flex flex-col justify-center items-start gap-[11px]"
      >
        <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[8px] font-[500] text-[18px] leading-[12px] pb-[13px]">
          <h3 className="font-[400]">Email or Username</h3>
          <input
            className="w-full h-[59px] px-4 dark:bg-dark2 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
            type="text"
            name="username"
            placeholder="Email or Username"
            minLength={6}
            maxLength={30}
            required
          />
        </div>
        <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[8px] font-[500] text-[18px] leading-[12px] pb-[8px]">
          <h3 className="font-[400]">Password</h3>
          <div className="w-full h-fit relative">
            <input
              className="w-full h-[59px] ps-4 pe-7 dark:bg-dark2 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
              placeholder="Password"
              type={!showPassword ? "Password" : "text"}
              name="password"
              minLength={6}
              maxLength={30}
              required
            />
            {!showPassword ? (
              <FaEyeSlash
                className="absolute right-5 top-[20px] text-[20px] cursor-pointer"
                onClick={(e) => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="absolute right-5 top-[20px] text-[20px] cursor-pointer"
                onClick={(e) => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center w-full font-[400] text-[16px] leading-[20px] text-end pb-[13px]">
          <p className="w-fit flex justify-start gap-2 items-center font-[400] text-[16px] leading-[20px] text-[#3d84ff text-end mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-[20px] h-[20px] cursor-pointer"
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
              }}
              id="rememberMe"
              name="rememberMe"
            />
            <label htmlFor="rememberMe" className="cursor-pointer leading-0">
              Remember Me
            </label>
          </p>
          <p
            className="w-fit font-[400] text-[16px] leading-[20px] text-[#000000] text-end mb-2 cursor-pointer hover:underline"
            onClick={() => dispatch(setLoginPageR(false))}
          >
            Forgot Password?
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[59px] flex justify-center items-center rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[20px] text-center"
        >
          {loading ? <SmallLoader /> : "Login"}
        </button>
      </form>
    </>
  );
}
