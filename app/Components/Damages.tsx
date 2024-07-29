'use client'
import exterior from "@/public/exterior.svg";
import exteriorNum from "@/public/exteriorNum.svg";
import dent from "@/public/dent.png";
import { FaEye } from "react-icons/fa";

export default function Damages() {
  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-fit h-fit flex flex-col justify-start items-start relative">
        <img src={exterior.src} className="w-[100%" />
        <img src={exteriorNum.src} className="absolute left-[58%] top-[27%]" />
      </div>
      <div className="w-[40%] h-fit flex flex-col justify-start items-start  ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="w-[50px]  font-[600] text-[18px] leading-[27px] text-start">
            No
          </p>
          <p className="w-[60%]  font-[600] text-[18px] leading-[27px] text-start">
            Damage Type
          </p>
          <p className="w-[80px]  font-[600] text-[18px] leading-[27px] text-start">
            Degree
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="w-[50px]  font-[400] text-[18px] leading-[27px] text-start">
            1
          </p>
          <p className="w-[60%]  font-[400] text-[18px] leading-[27px] text-start">
            Dent
          </p>
          <p className="flex justify-between items-center w-[80px]  font-[400] text-[18px] leading-[27px] text-start">
            Low <FaEye className="text-main-blue" />
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="w-[50px]  font-[400] text-[18px] leading-[27px] text-start">
            2
          </p>
          <p className="w-[60%]  font-[400] text-[18px] leading-[27px] text-start">
            Scratch
          </p>
          <p className="flex justify-between items-center w-[80px]  font-[400] text-[18px] leading-[27px] text-start">
            High
            <FaEye className="text-grey" />
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="w-[50px]  font-[400] text-[18px] leading-[27px] text-start">
            3
          </p>
          <p className="w-[60%]  font-[400] text-[18px] leading-[27px] text-start">
            Crack
          </p>
          <p className="flex justify-between items-center w-[80px]  font-[400] text-[18px] leading-[27px] text-start">
            High
            <FaEye className="text-grey" />
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="w-[50px]  font-[400] text-[18px] leading-[27px] text-start">
            4
          </p>
          <p className="w-[60%]  font-[400] text-[18px] leading-[27px] text-start">
            Clip
          </p>
          <p className="flex justify-between items-center w-[80px]  font-[400] text-[18px] leading-[27px] text-start">
            Low <FaEye className="text-grey" />
          </p>
        </div>
      </div>
      <div className="w-[23% h-[100%] flex flex-col justify-start items-start ">
        <img src={dent.src} className="h-[100%" />
      </div>
    </div>
  );
}
