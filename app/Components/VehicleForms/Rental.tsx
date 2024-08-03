"use client";
import shape from "@/public/ShapeBlack.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { RootState } from "@/app/store";
import { FaAsterisk } from "react-icons/fa";

export default function Rental() {
  let global = useSelector((state: RootState) => state.Global);
  const [gridView, setGridView] = useState(true);
  const [showLess, setShowLess] = useState(true);
  return (
    <div className="w-full h-fit  ">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Rental Price Per Hour{" "}
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"$90"}
            />
          </div>
        </div>{" "}
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Rental Price Per Day{" "}
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"$150"}
            />
          </div>
        </div>{" "}
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Rental Price Per Week{" "}
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"$150"}
            />
          </div>
        </div>{" "}
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Rental Price Per Month
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"$400"}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
