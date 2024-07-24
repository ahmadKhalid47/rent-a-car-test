"use client";
import car from "@/public/carInfoCar.svg";
import { useState } from "react";
import General from "./General";
export default function CarInfo() {
  let [activeButton, setActiveButton] = useState("General");
  return (
    <div className="nav-width h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-14">
      <div className="w-full h-[200px bg-yellow-30">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black">
          Suzuki Swift
        </h3>
        <div className="flex justify-between items-start">
          <p className="text-grey font-[400] text-[27px] leading-[21px] text-black">
            All Vehicles / Suzuki Swift
          </p>
        </div>
      </div>
      <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-8">
        <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%] py-10 px-10 rounded-[10px] bg-white border-2 border-grey">
          <div className="w-full h-fit flex justify-between items-center px-8">
            <div className="w-[340px] h-[212px] flex justify-between items-start rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey">
              <img src={car.src} />
            </div>
            <div className="w-[55%] flex justify-start flex-col items-start gap-1">
              <h3 className="font-[600] text-[28px] leading-[42px] text-black">
                Suzuki Swift
              </h3>
              <div className="w-full flex justify-start items-center">
                <div className="flex justify-start items-center gap-2 w-[26%] pe-5">
                  <p className="font-[400] text-[18px] leading-[27px]">Make:</p>
                  <p className="font-[400] text-[18px] leading-[15px]">Honda</p>
                </div>
                <div className="flex justify-start items-center gap-2 w-[50%]">
                  <p className="font-[400] text-[18px] leading-[27px]">
                    Model:
                  </p>
                  <p className="font-[400] text-[18px] leading-[15px]">Civic</p>
                </div>
              </div>
              <div className="w-full flex justify-start items-center">
                <div className="flex justify-start items-center gap-2 w-[26%] pe-5">
                  <p className="font-[400] text-[18px] leading-[27px]">Year:</p>
                  <p className="font-[400] text-[18px] leading-[15px]">2024</p>
                </div>
                <div className="flex justify-start items-center gap-2 w-[50%]">
                  <p className="font-[400] text-[18px] leading-[27px]">Type:</p>
                  <p className="font-[400] text-[18px] leading-[15px]">
                    539485
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-start items-center">
                <div className="flex justify-start items-center gap-2 w-[26%]">
                  <p className="font-[400] text-[18px] leading-[27px]">
                    Color:
                  </p>
                  <p className="font-[400] text-[18px] leading-[15px]">White</p>
                </div>
                <div className="flex justify-start items-center gap-2 w-[50%]">
                  <p className="font-[400] text-[18px] leading-[27px]">
                    Fuel Type:
                  </p>
                  <p className="font-[400] text-[18px] leading-[15px]">
                    Petrol
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex justify-between items-center mt-5">
            <div
              className="w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer border-grey border-light-grey items-center text-white font-[500] text-[16px] leading-[18px] bg-main-blue"
              onClick={() => setActiveButton("General")}
            >
              General Info.
            </div>
            <div
              className="w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer border-2 border-light-grey items-center text-black font-[400] text-[16px] leading-[18px] bg-light-grey"
              onClick={() => setActiveButton("Rental")}
            >
              Rental Info
            </div>
            <div
              className="w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer border-2 border-light-grey items-center text-black font-[400] text-[16px] leading-[18px] bg-light-grey"
              onClick={() => setActiveButton("Insurance")}
            >
              Insurance Info
            </div>
            <div
              className="w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer border-2 border-light-grey items-center text-black font-[400] text-[16px] leading-[18px] bg-light-grey"
              onClick={() => setActiveButton("Maintenance")}
            >
              Maintenance Info
            </div>
            <div
              className="w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer border-2 border-light-grey items-center text-black font-[400] text-[16px] leading-[18px] bg-light-grey"
              onClick={() => setActiveButton("Additional")}
            >
              Additional Ft
            </div>
            <div
              className="w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer border-2 border-light-grey items-center text-black font-[400] text-[16px] leading-[18px] bg-light-grey"
              onClick={() => setActiveButton("Others")}
            >
              Others
            </div>
          </div>
          {activeButton === "General" ? (
            <>
              <General />
            </>
          ) : (
            <>else</>
          )}
        </div>
      </div>
    </div>
  );
}
