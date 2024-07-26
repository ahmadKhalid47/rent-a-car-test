import car1 from "@/public/car (1).svg";
import car2 from "@/public/car (2).svg";
import car3 from "@/public/car (3).svg";
import car4 from "@/public/car (4).svg";
import Link from "next/link";

import { FaEllipsis } from "react-icons/fa6";
export default function GridView() {
  return (
    <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] p-[5%] pt-0 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-6">
      <Link
        href={"/Components/CarInfo"}
        className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative"
      >
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] overflow-hidden rounded-[15px]">
          <img src={car2.src} className="w-full h-full" />
        </div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-1">
          <div className="w-full flex justify-start items-center pe-5 -mb-1">
            <p className="font-[500] text-[24px] leading-[36px]">Honda City</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <p className="font-[400] text-[14px] leading-[21px]">LEM 1234</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">City:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
