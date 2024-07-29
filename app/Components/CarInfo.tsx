"use client";
import car from "@/public/carInfoCar.svg";
import smallCar1 from "@/public/smallcar (1).png";
import smallCar2 from "@/public/smallcar (2).png";
import smallCar3 from "@/public/smallcar (3).png";
import smallCar4 from "@/public/smallcar (4).png";
import { useState } from "react";
import General from "./General";
import Rental from "./Rental";
import Insurance from "./Insurance";
import Maintenance from "./Maintanace";
import Additional from "./Additional";
import Other from "./Other";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function CarInfo() {
  let [activeButton, setActiveButton] = useState("General");
  let global = useSelector((state: RootState) => state.Global);
  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-14`}
    >
      <div className="w-full h-[200px bg-yellow-30">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black">
          Suzuki Swift
        </h3>
        <div className="flex justify-between items-start">
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            All Vehicles / Suzuki Swift
          </p>
        </div>
      </div>
      <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-6">
        <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px] bg-">
          <div className="w-full h-fit flex justify-start gap-[5%] items-center px- bg-white rounded-[10px] border-2 border-grey py-7 px-6 ">
            <div className="w-fit flex justify-start items-center gap-1">
              <div className="h-[464px] fex justify-start flex-col items-center gap-[8px] overflow-y-auto overflow-x-hidden scroll">
                <div className="w-[110px] h-[110px] mb-[8px] flex justify-center overflow-hidden items-center bg-white rounded-[10px] border-2 border-grey">
                  <img src={smallCar1.src} className="w-[100%]" />
                </div>
                <div className="w-[110px] h-[110px] mb-[8px] flex justify-center overflow-hidden items-center bg-white rounded-[10px] border-2 border-grey">
                  <img src={smallCar1.src} className="w-[100%]" />
                </div>
                <div className="w-[110px] h-[110px] mb-[8px] flex justify-center overflow-hidden items-center bg-white rounded-[10px] border-2 border-grey">
                  <img src={smallCar2.src} className="w-[100%]" />
                </div>
                <div className="w-[110px] h-[110px] mb-[8px] flex justify-center overflow-hidden items-center bg-white rounded-[10px] border-2 border-grey">
                  <img src={smallCar3.src} className="w-[100%]" />
                </div>
                <div className="w-[110px] h-[110px] mb-[8px] flex justify-center overflow-hidden items-center bg-white rounded-[10px] border-2 border-grey">
                  <img src={smallCar4.src} className="w-[100%]" />
                </div>
              </div>
              <div className="w-[464] h-[464] flex justify-between items-start rounded-[10px] overflow-hidden border-[1px] border-grey bg-white">
                <img src={car.src} className="w-full h-full" />
              </div>
            </div>
            <div className="w-[35%] flex justify-start flex-col items-start gap-1 bg-green-">
              <h3 className="font-[500] text-[36px] leading-[54px] text-black">
                Suzuki Swift
              </h3>
              <p className="font-[400] text-[28px] leading-[42px] text-black">
                LEM 1234
              </p>
              <div className="w-[80%] flex justify-between items-center">
                <div className="flex justify-start items-center gap-2 w-[50%] pe-5">
                  <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                    Year:
                  </p>
                  <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                    2002
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2 w-[50%]">
                  <p className="font-[400] text-[20px] leading-[30px] w-[35%]">
                    Type:
                  </p>
                  <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                    Sedan
                  </p>
                </div>
              </div>
              <div className="w-[80%] flex justify-between items-center bg-red-5">
                <div className="flex justify-start items-center gap-2 w-[50%] pe-5">
                  <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                    Color:
                  </p>
                  <div className="h-full font-[400] text-[20px] leading-[30px] w-[50%]">
                    <div className="w-[32px] h-[18px] bg-red-500 rounded-[5px]"></div>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2 w-[50%]">
                  <p className="font-[400] text-[20px] leading-[30px] w-[35%]">
                    City:
                  </p>
                  <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                    Atlanta
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit bg-white  border-2 border-grey mt-5 rounded-[10px] px-5 py-1">
            <div className="w-full h-fit flex justify-between items-center mt-3 border-b-2 border-grey pb-3">
              <div
                className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "General"
                    ? "text-white bg-main-blue"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("General")}
              >
                General Info.
              </div>
              <div
                className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Rental"
                    ? "text-white bg-main-blue"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Rental")}
              >
                Rental Info
              </div>
              <div
                className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Insurance"
                    ? "text-white bg-main-blue"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Insurance")}
              >
                Insurance Info
              </div>
              <div
                className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Maintenance"
                    ? "text-white bg-main-blue"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Maintenance")}
              >
                Maintenance Info
              </div>
              <div
                className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Additional"
                    ? "text-white bg-main-blue"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Additional")}
              >
                Additional Ft
              </div>
              <div
                className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Others"
                    ? "text-white bg-main-blue"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Others")}
              >
                Others
              </div>
            </div>
            <div className="w-full h-fit flex justify-center items-start gap-8">
              {activeButton === "General" ? (
                <>
                  <General />
                </>
              ) : activeButton === "Rental" ? (
                <>
                  <Rental />
                </>
              ) : activeButton === "Insurance" ? (
                <>
                  <Insurance />
                </>
              ) : activeButton === "Maintenance" ? (
                <>
                  <Maintenance />
                </>
              ) : activeButton === "Additional" ? (
                <>
                  <Additional />
                </>
              ) : activeButton === "Others" ? (
                <>
                  <Other />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
