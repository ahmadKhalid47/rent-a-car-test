"use client";
import shape from "@/public/ShapeBlack.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { RootState } from "@/app/store";
import { FaAsterisk } from "react-icons/fa";

export default function Info() {
  let global = useSelector((state: RootState) => state.Global);
  const [gridView, setGridView] = useState(true);
  const [showLess, setShowLess] = useState(true);
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-10 pb-5 pt-7">
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Vehicle ID
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
              value={12345}
            />
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Make
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Model
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Type
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Year
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">2024</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
            Registration No
            <FaAsterisk className="text-[6px]" />
            <span className="font-[900] absolute right-3">ⓘ</span>
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
              value={12345}
            />
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Color
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative">
            <select className="ps-7 font-[400] text-[16px] leading-[19px] px-5 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey ">
              <option value="">Red</option>
              <option value="">Red</option>
              <option value="">Red</option>
              <option value="">Red</option>
            </select>
            <div className="rounded-full w-[19px] h-[12px] bg-red-500 absolute left-2 top-[15.5px]"></div>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Fuel Type
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Petrol</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Transmission
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Auto</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
            Odometer (KMPH)
            <FaAsterisk className="text-[6px]" />
            <span className="font-[900] absolute right-3">ⓘ</span>
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
              value={"KMPH"}
            />
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
            Passengers
            <FaAsterisk className="text-[6px]" />
            <span className="font-[900] absolute right-3">ⓘ</span>
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Country
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            City
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
