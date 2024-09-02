"use client";
import loginPage1 from "@/public/Vector 11.png";
import loginPage2 from "@/public/Vector 10 (1).png";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import car from "@/public/Layer_1 (1).svg";
import { RootState } from "./store";
import { useSelector } from "react-redux";
export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);

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
            <img src={car.src} className="w-[120px] sm:w-[175px] z-10" />
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

        <div className="w-full lg:w-[50%] h-[60%] sm:h-[50%] lg:h-full bg-white flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            {global.loginPage ? <Login /> : <ForgotPassword />}
          </div>
        </div>
      </div>
    </div>
  );
}
