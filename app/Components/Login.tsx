"use client";
import loginPage1 from "@/public/Vector 11.png";
import loginPage2 from "@/public/Vector 10 (1).png";
import car from "@/public/Layer_1 (1).svg";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Alert, Snackbar, SnackbarContent } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(null);
  const router = useRouter();

  const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    try {
      let result: any = await axios.post(`/api/login`, formDataObj);
      if (result?.data?.error === null) {
        router.push("/Components/Home");
      } else { 
        setShowError(result?.data?.error);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {showError ? (
        <Alert
          variant="filled"
          severity="error"
          className="absolute w-[200px] z-[100] top-2 right-2 fade-ou"
        >
          {showError}
        </Alert>
      ) : null}
      <div className="w-full h-[100vh] flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full lg:w-[50%] h-[40%] sm:h-[50%] lg:h-full flex justify-center items-center bg-main-blue relative">
          <img
            src={loginPage2.src}
            className="w-[100% h-[90%] absolute bottom-0 right-0"
          />
          <img
            src={loginPage1.src}
            className="w-[100%] h-[50%] absolute bottom-0 left-0"
          />

          <div className="w-[90%] sm:w-fit h-fit flex flex-col justify-center items-start gap-2 sm:gap-[20px] z-[10]">
            <img src={car.src} className="w-[120px] sm:w-[175px] z-10" />
            <h1 className="font-[600] text-[40px] sm:text-[70px] leading-[40px] sm:leading-[73px] capitalize text-white">
              welcome <br /> back!
            </h1>
            <p className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[22px] text-white z-10 ">
              Are you ready to efficiently manage your fleet and
              <br className="hidden sm:block" />
              reservations? Let's work together to ensure everything
              <br className="hidden sm:block" />
              runs smoothly and seamlessly.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[50%] h-[60%] sm:h-[50%] lg:h-full bg-white flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
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
                <p className="font-[400] text-[16px] leading-[20px] text-[#EB4643] w-full text-end mb-2">
                  Forgot Password?
                </p>
              </div>
              <button
                type="submit"
                className="w-full h-[59px] flex justify-center items-center rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[20px] text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
