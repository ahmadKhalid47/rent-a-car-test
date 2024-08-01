"use client";
import shape from "@/public/ShapeBlack.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { RootState } from "@/app/store";
import { FaAsterisk } from "react-icons/fa";

export default function Feature() {
  let global = useSelector((state: RootState) => state.Global);
  const [gridView, setGridView] = useState(true);
  const [showLess, setShowLess] = useState(true);
  return (
    <div className="w-full h-fit  ">
      <div className="w-full h-fit  ">
        <div className="flex flex-wrap justify-start items-start gap-x-[6.66%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-10 py-8">
          <button className="w-[20%] h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            GPS
          </button>
          <button className="w-[20%] h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Air Conditioning
          </button>
          <button className="w-[20%] h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Bluetooth
          </button>
          <button className="w-[20%] h-[44px] rounded-[10px] input-color border-2 border-grey   font-[400] text-[18px] leading-[21px] text-center">
            Child Seat{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
