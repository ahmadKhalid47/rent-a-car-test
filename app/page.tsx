"use client";
import loginPage1 from "@/public/Vector 11.png";
import loginPage2 from "@/public/Vector 10 (1).png";
import carLogo from "@/public/Layer_1 (1).svg";
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
  const [loading, setLoading] = useState<any>(false);
  let dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getcompanyProfile", {
          createdBy: myProfile._id,
        });
        const profilePic = result?.data?.data?.profilePic;
        const profilePic2 = result?.data?.data?.profilePic2;
        // if (typeof window !== "undefined") {
        //   localStorage.setItem("companyLogo", profilePic);
        //   localStorage.setItem("companyLogo2", profilePic2);
        dispatch(setCompanyLogo([profilePic]));
        dispatch(setCompanyLogo2([profilePic2]));
        // }
      } catch (error) {
        console.error("Error fetching company profile:", error);
      }
    }
    // if (typeof window !== "undefined") {
    //   const storedLogo = localStorage.getItem("companyLogo");
    //   const storedLogo2 = localStorage.getItem("companyLogo2");
    //   if (storedLogo && storedLogo2) {
    //     dispatch(setCompanyLogo([storedLogo]));
    //     dispatch(setCompanyLogo2([storedLogo2]));
    //   } else {
    // getData();
    //   }
    // }
    if (myProfile._id) getData();
  }, [myProfile._id]);

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
            <div className="w-[120px] sm:w-[175px] h-[50px]">
              {companyProfile?.profilePic2 ? (
                <img
                  src={companyProfile?.profilePic2}
                  className="w-full z-10"
                />
              ) : null}
            </div>
            {/* <img src={carLogo.src} className="w-[120px] sm:w-[175px] z-10" /> */}
            <h1 className="font-[600] text-[40px] sm:text-[70px] leading-[40px] sm:leading-[73px] capitalize text-white">
              {global.loginPage ? (
                <>
                  welcome <br /> back!
                </>
              ) : (
                <>
                  Forgot <br /> Password?
                </>
              )}
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

        <div className="w-full lg:w-[50%] h-[60%] sm:h-[50%] lg:h-full dark:bg-dark1 bg-white flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            {global.loginPage ? <Login /> : <ForgotPassword />}
          </div>
        </div>
      </div>
    </div>
  );
}
