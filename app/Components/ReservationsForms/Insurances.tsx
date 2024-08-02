"use client";
import shape from "@/public/ShapeBlack.svg";
import { FaAsterisk, FaTimes, FaTimesCircle } from "react-icons/fa";

export default function Insurances() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey px-10 py-8">
        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Reservation ID
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={12345}
            />
          </div>
        </div>
        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Reservation Date
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              type="date"
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"James"}
            />
          </div>
        </div>

        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Odometer (KMPH)
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"234343"}
            />
          </div>
        </div>

        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Fuel Status
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
              <option value="">50%</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>

        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Security Deposit
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"$100"}
            />
          </div>
        </div>

        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            City
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>

        <div className="w-[100%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Pick Up Address{" "}
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"Pick Up Address"}
            />
          </div>
        </div>
        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Pick Up Date
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              type="date"
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"James"}
            />
          </div>
        </div>
        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Pick Up Time
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
              <option value="">11:00</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>

        <div className="w-[100%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Drop Off Address{" "}
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"Drop Off Address"}
            />
          </div>
        </div>
        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Drop Off Date
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              type="date"
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              value={"James"}
            />
          </div>
        </div>
        <div className="w-[48%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Drop Off Time
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
              <option value="">11:00</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
