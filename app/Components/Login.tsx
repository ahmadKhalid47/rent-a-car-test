"use client";
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
    try {
      setLoading(true);
      let result: any = await axios.post(`/api/login`, formDataObj);
      if (result?.data?.error === null) {
        router.push("/Vehicles");
      } else {
        setShowError(result?.data?.error);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        className="w-[90%] sm:w-[60%] h-fit flex flex-col justify-center items-start gap-[10px]"
      >
        <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
          <h3 className="font-[400]">Email or Username</h3>
          <input
            className="w-full h-[59px] px-4 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
            type="text"
            name="username"
            placeholder="Email or Username"
            minLength={6}
            maxLength={30}
            required
          />
        </div>
        <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
          <h3 className="font-[400]">Password</h3>
          <div className="w-full h-fit relative">
            <input
              className="w-full h-[59px] ps-4 pe-7 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
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
          <p
            className="font-[400] text-[16px] leading-[20px] text-[#EB4643] w-full text-end mb-2 cursor-pointer"
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
