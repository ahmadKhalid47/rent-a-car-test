"use client";
import shape from "@/public/Shape2.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import ListViewCostumers from "./ListViewCostumers";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { FaAsterisk } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setFieldNameR } from "../store/Global";

export default function Costumers() {
  let global = useSelector((state: RootState) => state.Global);
  const [showLess, setShowLess] = useState(true);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFieldNameR("Costumers"));
  }, []);

  return (
    <div
      className={`w-full h-fit flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-10`}
    >
      <div className="w-[100%] h-[200px bg-yellow-30 flex justify-start items-end">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-[50%]">
          All Costumers
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            Costumers / All Costumers
          </p>
        </h3>
        <div className="flex justify-end gap-3 items-end w-[50%]">
          <button className="px-6 h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Add New Costumer
          </button>
        </div>
      </div>
      <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
        <div className="w-full h-fit">
          <h3 className="font-[400] text-[16px] leading-[19px] text-black pb-">
            Search
          </h3>
          <div className="w-full h-fit flex justify-between items-center">
            <input
              className="px-2 w-[82%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 leading-[19px] border-grey placeholder:placeholder-color"
              placeholder="Search By Full Name, Phone.."
            ></input>
            <button className="w-[17%] px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[18px] leading-[21px] text-center">
              Search
            </button>
          </div>
        </div>
        {!showLess ? (
          <div className="w-full flex justify-between items-center">
            <div className="w-[24%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Customer Type
              </label>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="placeholder-color pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
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
            <div className="w-[24%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Gender
              </label>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="placeholder-color pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
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
            <div className="w-[24%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Postal/Zip Code
              </label>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <input
                  className="placeholder-color pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
                  value={8733458349}
                />
              </div>
            </div>
            <div className="w-[24%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                City
              </label>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="placeholder-color pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
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
        ) : null}

        <h3
          className="font-[400] text-[16px] leading-[19px] text-black pb-1 underline hover:no-underline cursor-pointer"
          onClick={() => setShowLess(!showLess)}
        >
          {showLess ? "Advanced Filters" : "Show Less"}
        </h3>
      </div>
      <div className="w-full h-fit">
        <ListViewCostumers />
      </div>
    </div>
  );
}
