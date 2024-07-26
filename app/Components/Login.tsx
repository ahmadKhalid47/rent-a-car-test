"use client";
import loginPage1 from "@/public/Vector 11.png";
import loginPage2 from "@/public/Vector 10 (1).png";
import car from "@/public/Layer_1 (1).svg";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-[50%] h-full flex justify-center items-center bg-main-blue relative">
          <img
            src={loginPage2.src}
            className="w-[100% h-[90%] absolute bottom-0 right-0"
            // className="w-[720] h-[90%] absolute bottom-0 right-0"
          />
          <img
            src={loginPage1.src}
            className="w-[100%] h-[50%] absolute bottom-0 left-0"
          />

          <div className="w-fit bg-red-30 h-fit flex flex-col justify-center items-start gap-[31px]">
            <img src={car.src} className="w-[175px] z-10" />
            <h1 className="font-[600] text-[70px] leading-[73px] capitalize text-white">
              welcome <br /> back!
            </h1>
            <p className="font-[400] text-[18px] leading-[22px] text-white z-10 ">
              Ready to manage your fleet and reservations?
              <br />
              Let's keep things running smoothly together.{" "}
            </p>
          </div>
        </div>

        <div className="w-[50%] h-full bg-red-20 flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            <div className="w-[60%] h-fit flex flex-col justify-center items-start gap-[10px]">
              <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
                <h3 className="font-[600] font-weight">Email or Username</h3>
                <input
                  className="w-full h-[59px] px-4 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
                  type="text"
                  placeholder="Email or Username"
                />
              </div>
              <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
                <h3 className="font-[600] font-weight">Password</h3>
                <div className="w-full h-fit relative">
                  <input
                    className="w-full h-[59px] ps-4 pe-7 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
                    placeholder="Password"
                    type={!showPassword ? "Password" : "text"}
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
              <Link
                className="w-full h-[59px] flex justify-center items-center rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[20px] text-center"
                href={"Components/Home"}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
