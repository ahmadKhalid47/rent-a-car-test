"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoginPageR } from "../store/Global";
import { SmallLoader } from "./Loader";

export default function ForgotPassword() {
  let dispatch = useDispatch();
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [loading, setLoading] = useState<any>(false);
 
  const ForgotPasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      let result: any = await axios.post(`/api/forgotPassword`, formDataObj);
      if (result?.data?.success) {
        setShowSuccess(result?.data?.success);
        setShowError(null);
      } else {
        setShowError(result?.data?.error);
        setShowSuccess(null);
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
          className="absolute w-fit z-[100] top-2 right-2 alert-animation capitalize"
        >
          {showError}
        </Alert>
      ) : showSuccess ? (
        <Alert
          variant="filled"
          severity="success"
          className="absolute w-fit z-[100] top-2 right-2 alert-animation capitalize"
        >
          {showSuccess}
        </Alert>
      ) : null}

      <form
        onSubmit={ForgotPasswordSubmit}
        className="w-[90%] sm:w-[60%] h-fit flex flex-col justify-center items-start gap-[10px]"
      >
        <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
          <h3 className="font-[400]">Forgot Password</h3>
          
          <input
            className="w-full h-[59px] px-4 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            minLength={6}
            maxLength={30}
            required
          />
        </div>
        <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
          <p
            className="font-[400] text-[16px] leading-[20px] text-[#EB4643] w-full text-end mb-2 cursor-pointer"
            onClick={() => dispatch(setLoginPageR(true))}
          >
            Go Back To Login Page?
          </p>
        </div>
        <button
          type="submit"
          className="w-full h-[59px] flex justify-center items-center rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[20px] text-center"
        >
          {loading ? <SmallLoader /> : "Submit"}
        </button>
      </form>
    </>
  );
}
