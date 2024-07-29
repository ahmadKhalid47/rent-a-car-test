"use client";
import shape from "@/public/Shape2.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { RootState } from "@/app/store";

export default function VehicleForms() {
  let global = useSelector((state: RootState) => state.Global);
  const [gridView, setGridView] = useState(true);
  const [showLess, setShowLess] = useState(true);
  return (
    <div
      className={`w-full h-fit flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-10`}
    >
      <div className="w-[100%] bg-yellow-30 flex justify-start items-end">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-[50%]">
          Add New Vehicle
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            Vehicles / Add New Vehicle
          </p>
        </h3>
      </div>
      <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-10 px-8 flex flex-col justify-start items-start">
        <div className="w-full h-fit flex flex-col justify-start items-center">
          <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[24px] leading-[36px]">
            <div className="w-[80%] h-[10px] flex justify-between items-center absolute top-[20px] left-[10%] border-[1px] border-grey bg-white z-[0]"></div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[10]">
              <div className="w-[60px] h-[60px] bg-main-blue text-white flex justify-center items-center rounded-full z-[10]">
                1
              </div>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[10]">
              <div className="w-[60px] h-[60px] bg-white border-[1px] border-grey flex justify-center items-center rounded-full z-[10]">
                2
              </div>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[10]">
              <div className="w-[60px] h-[60px] bg-white border-[1px] border-grey flex justify-center items-center rounded-full z-[10]">
                3
              </div>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[10]">
              <div className="w-[60px] h-[60px] bg-white border-[1px] border-grey flex justify-center items-center rounded-full z-[10]">
                4
              </div>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[10]">
              <div className="w-[60px] h-[60px] bg-white border-[1px] border-grey flex justify-center items-center rounded-full z-[10]">
                5
              </div>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[10]">
              <div className="w-[60px] h-[60px] bg-white border-[1px] border-grey flex justify-center items-center rounded-full z-[10]">
                6
              </div>
            </div>
          </div>
          <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[16px] leading-[19px]">
            <div className="w-[15%] h-[50px]  flex justify-center text-center items-center text-main-blue">
              Vehicle Information
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center text-center items-center">
              Rental Information
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center text-center items-center">
              Insurance Info
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center text-center items-center">
              Damages
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center text-center items-center">
              Features
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center text-center items-center">
              Others
            </div>
          </div>
        </div>
        {/* <div className="w-full h-[400px] bg-white mt-5 rounded-[10px] border-2 border-grey"></div> */}
      </div>
    </div>
  );
}
