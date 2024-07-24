import car1 from "@/public/car (1).svg";
import car2 from "@/public/car (2).svg";
import car3 from "@/public/car (3).svg";
import car4 from "@/public/car (4).svg";
import Link from "next/link";

import { FaEllipsis } from "react-icons/fa6";
export default function GridView() {
  return (
    <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] p-[5%] pt-0 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-6">
      <Link href={"/Components/CarInfo"} className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative">
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] overflow-hidden rounded-[15px]">
          <img src={car2.src} className="w-full h-full" />
        </div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-2">
          <div className="flex justify-start items-center gap-2 w-fit pe-5">
            <p className="font-[400] text-[12px] leading-[18px]">Vehicle ID:</p>
            <p className="font-[600] text-[13px] leading-[15px]">539485</p>
          </div>
          <div className="flex justify-start items-center gap-2 w-fit">
            <p className="font-[400] text-[12px] leading-[18px]">
              Registration No:
            </p>
            <p className="font-[600] text-[13px] leading-[15px]">MBU 5667</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Make:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Honda</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Model:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Civic</p>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">
                Fuel Type:
              </p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </Link>
              <Link href={"/Components/CarInfo"} className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative">
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] overflow-hidden rounded-[15px]">
          <img src={car1.src} className="w-full h-full" />
        </div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-2">
          <div className="flex justify-start items-center gap-2 w-fit pe-5">
            <p className="font-[400] text-[12px] leading-[18px]">Vehicle ID:</p>
            <p className="font-[600] text-[13px] leading-[15px]">539485</p>
          </div>
          <div className="flex justify-start items-center gap-2 w-fit">
            <p className="font-[400] text-[12px] leading-[18px]">
              Registration No:
            </p>
            <p className="font-[600] text-[13px] leading-[15px]">MBU 5667</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Make:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Honda</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Model:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Civic</p>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">
                Fuel Type:
              </p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </Link>
     <Link href={"/Components/CarInfo"} className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative">
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] overflow-hidden rounded-[15px]">
          <img src={car4.src} className="w-full h-full" />
        </div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-2">
          <div className="flex justify-start items-center gap-2 w-fit pe-5">
            <p className="font-[400] text-[12px] leading-[18px]">Vehicle ID:</p>
            <p className="font-[600] text-[13px] leading-[15px]">539485</p>
          </div>
          <div className="flex justify-start items-center gap-2 w-fit">
            <p className="font-[400] text-[12px] leading-[18px]">
              Registration No:
            </p>
            <p className="font-[600] text-[13px] leading-[15px]">MBU 5667</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Make:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Honda</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Model:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Civic</p>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">
                Fuel Type:
              </p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </Link>
      <Link href={"/Components/CarInfo"} className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative">
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] overflow-hidden rounded-[15px]">
          <img src={car3.src} className="w-full h-full" />
        </div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-2">
          <div className="flex justify-start items-center gap-2 w-fit pe-5">
            <p className="font-[400] text-[12px] leading-[18px]">Vehicle ID:</p>
            <p className="font-[600] text-[13px] leading-[15px]">539485</p>
          </div>
          <div className="flex justify-start items-center gap-2 w-fit">
            <p className="font-[400] text-[12px] leading-[18px]">
              Registration No:
            </p>
            <p className="font-[600] text-[13px] leading-[15px]">MBU 5667</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Make:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Honda</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Model:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Civic</p>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">
                Fuel Type:
              </p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
