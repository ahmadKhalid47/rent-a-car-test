"use client";
import React from "react";

import loginPage1 from "@/public/Vector 11.png";
import loginPage2 from "@/public/Vector 10 (1).png";
import White from "@/public/DashboardLogo.svg";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import { RootState } from "./store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import axios from "axios";
import {
  setprofilePicR as setCompanyLogo,
  setprofilePic2R as setCompanyLogo2,
} from "./store/companyProfile";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let companyProfile: any = useSelector(
    (state: RootState) => state.companyProfile
  );
  let dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLogo2 = localStorage.getItem("companyLogo");
      dispatch(setCompanyLogo([storedLogo2]));
    }
  }, []);

  return (
    <div className="w-full h-fit">
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
            <div className="w-fit h-[100vh] absolute top-0 z-[100] pt-10">
              <img
                src={White.src}
                className="z-10 w-[120px] sm:w-[191px] h-[55px]"
              />
            </div>
            <span className="font-[600] text-[40px] sm:text-[70px] leading-[40px] sm:leading-[73px] capitalize text-white">
              {global.loginPage ? (
                <>
                  welcome <br /> back!
                </>
              ) : (
                <>
                  Forgot <br /> Password?
                </>
              )}
            </span>
            <span className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[22px] text-white z-10">
              Take control of your fleet like never before with our cutting-edge
              <br className="hidden sm:block" />
              rental management CRM. Streamline operations, optimize
              performance,
              <br className="hidden sm:block" />
              and unlock real-time insights to drive your business forward.
            </span>
          </div>
        </div>

        <div className="w-full lg:w-[50%] h-[60%] sm:h-[50%] lg:h-full dark:bg-dark1 bg-white flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            {global.loginPage ? <Login /> : <ForgotPassword />}
          </div>
        </div>
      </div>
    </div>
  );
}
