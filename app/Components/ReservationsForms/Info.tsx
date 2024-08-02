"use client";
import car from "@/public/Costumer.svg";
import Link from "next/link";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";

export default function Info() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey px-10 py-8 overflow-auto">
        <div className="w-full flex flex-wrap justify-center items-center h-fit gap-1">
          <span className="w-full text-start font-[400] text-[14px] leading-[17px]">
            Search Customer
          </span>
          <input
            className="w-full h-[43px] flex justify-start ps-5 items-center border-[1px] border-grey rounded-[10px] input-color text-[16px] leading-[19px] placeholder:text-black"
            placeholder="Search"
          />
        </div>

        <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex justify-start gap-4 items-center relative">
          <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
            <img src={car.src} className="w-full h-full" />
          </div>
          <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-1">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[600] text-[24px] leading-[36px]">
                Glenn A. Jean
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[500] text-[20px] leading-[30px]">
                757-947-5015
              </p>
            </div>
            <div className="w-full flex justify-between items-start flex-col font-[400] text-[14px] leading-[21px]">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="w-fit">City:</p>
                <p className="w-fit">Brentwood</p>
              </div>
              <div className="flex justify-start items-center gap-2 w-[50%]">
                <p className="w-fit">Country:</p>
                <p className="w-fit">Australia</p>
              </div>
            </div>
          </div>
          <button className="w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Select
          </button>
        </div>
        <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex justify-start gap-4 items-center relative">
          <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
            <img src={car.src} className="w-full h-full" />
          </div>
          <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-1">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[600] text-[24px] leading-[36px]">
                Glenn A. Jean
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[500] text-[20px] leading-[30px]">
                757-947-5015
              </p>
            </div>
            <div className="w-full flex justify-between items-start flex-col font-[400] text-[14px] leading-[21px]">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="w-fit">City:</p>
                <p className="w-fit">Brentwood</p>
              </div>
              <div className="flex justify-start items-center gap-2 w-[50%]">
                <p className="w-fit">Country:</p>
                <p className="w-fit">Australia</p>
              </div>
            </div>
          </div>
          <button className="w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Select
          </button>
        </div>
        <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex justify-start gap-4 items-center relative">
          <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
            <img src={car.src} className="w-full h-full" />
          </div>
          <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-1">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[600] text-[24px] leading-[36px]">
                Glenn A. Jean
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[500] text-[20px] leading-[30px]">
                757-947-5015
              </p>
            </div>
            <div className="w-full flex justify-between items-start flex-col font-[400] text-[14px] leading-[21px]">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="w-fit">City:</p>
                <p className="w-fit">Brentwood</p>
              </div>
              <div className="flex justify-start items-center gap-2 w-[50%]">
                <p className="w-fit">Country:</p>
                <p className="w-fit">Australia</p>
              </div>
            </div>
          </div>
          <button className="w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Select
          </button>
        </div>
        <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex justify-start gap-4 items-center relative">
          <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
            <img src={car.src} className="w-full h-full" />
          </div>
          <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-1">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[600] text-[24px] leading-[36px]">
                Glenn A. Jean
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[500] text-[20px] leading-[30px]">
                757-947-5015
              </p>
            </div>
            <div className="w-full flex justify-between items-start flex-col font-[400] text-[14px] leading-[21px]">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="w-fit">City:</p>
                <p className="w-fit">Brentwood</p>
              </div>
              <div className="flex justify-start items-center gap-2 w-[50%]">
                <p className="w-fit">Country:</p>
                <p className="w-fit">Australia</p>
              </div>
            </div>
          </div>
          <button className="w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
