"use client";
import shape from "@/public/Shape2.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import ListView from "./ListView";
import { useState } from "react";
import GridView from "./GridView";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  const [gridView, setGridView] = useState(false);
  const [showLess, setShowLess] = useState(false);
  return (
    <div
      className={`w-full h-fit flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-10`}
    >
      <div className="w-[100%] h-[200px bg-yellow-30 flex justify-start items-end">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-[50%]">
          All Vehicles
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            Vehicles / All Vehicles
          </p>
        </h3>
        <div className="flex justify-end gap-3 items-end w-[50%]">
          <div className="w-fit h-fit flex justify-end items-end gap-3">
            <button
              className={`w-[44px] flex justify-center items-center h-[44px] rounded-[10px] ${
                gridView
                  ? "bg-main-blue text-white"
                  : "bg-light-grey border-2 border-grey"
              }  font-[500] text-[20px] leading-[30px] text-center`}
              onClick={() => setGridView(true)}
            >
              <GridViewRounded />
            </button>
            <button
              className={`w-[44px] flex justify-center items-center h-[44px] rounded-[10px] ${
                !gridView
                  ? "bg-main-blue text-white"
                  : "bg-light-grey border-2 border-grey"
              } font-[500] text-[20px] leading-[30px] text-center`}
              onClick={() => setGridView(false)}
            >
              {!gridView ? <img src={list.src} /> : <img src={listBlack.src} />}
            </button>
          </div>
          <button className="px-6 h-[44px] rounded-[10px] bg-main-blue text-white font-[500] text-[18px] leading-[27px] text-center">
            Add New Vehicle
          </button>
        </div>
      </div>
      <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-11 flex flex-col justify-start items-start gap-[15px]">
        <div className="w-full h-fit">
          <h3 className="font-[400] text-[16px] leading-[17px] text-black pb-1">
            Search
          </h3>
          <div className="w-full h-fit flex justify-between items-center">
            <input
              className="px-2 w-[82%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 leading-[19px] border-grey placeholder:placeholder-color"
              placeholder="Search By Car Name, Reg No, City.."
            ></input>
            <button className="w-[17%] px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[18px] leading-[21px] text-center">
              Search
            </button>
          </div>
        </div>
        {!showLess ? (
          <div className="w-full flex justify-between items-center">
            <div className="w-[20%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Car Name
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
                  <option value="">Select</option>
                  <option value="">Swift</option>
                  <option value="">Swift</option>
                  <option value="">Swift</option>
                  <option value="">Swift</option>
                </select>
                <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                  <img src={shape.src} className="w-[10.5px]" />
                </div>
              </div>
            </div>
            <div className="w-[15%] h-fit">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Registration No.
              </h3>
              <div className="w-full h-fit flex justify-between items-center ">
                <input
                  className=" font-[400] text-[16px] leading-[19px] px-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder:placeholder-color"
                  placeholder="Type"
                ></input>
              </div>
            </div>

            <div className="w-[16%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Year
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
                  <option value="">Select</option>
                  <option value="">2024</option>
                  <option value="">2024</option>
                  <option value="">2024</option>
                  <option value="">2024</option>
                </select>
                <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                  <img src={shape.src} className="w-[10.5px]" />
                </div>
              </div>{" "}
            </div>
            <div className="w-[15%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Type
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
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
            <div className="w-[14%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                City
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
                  <option value="">Select</option>
                  <option value="">Suzuki</option>
                  <option value="">Suzuki</option>
                  <option value="">Suzuki</option>
                  <option value="">Suzuki</option>
                </select>
                <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                  <img src={shape.src} className="w-[10.5px]" />
                </div>
              </div>
            </div>
            <div className="w-[11%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Color
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative">
                <select className="ps-7 font-[400] text-[16px] leading-[19px] px-5 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
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
        {/* <div>
          <div className="w-full h-fit flex justify-end gap-4 items-center pt-2">
            <div className="w-fit h-fit flex justify-end items-center gap-3">
              <button
                className={`w-[42px] flex justify-center items-center h-[39px] rounded-[10px] ${
                  gridView
                    ? "bg-light-blue text-white"
                    : "bg-light-grey border-2 border-grey"
                }  font-[500] text-[20px] leading-[30px] text-center`}
                onClick={() => setGridView(true)}
              >
                <GridViewRounded />
              </button>
              <button
                className={`w-[42px] flex justify-center items-center h-[39px] rounded-[10px] ${
                  !gridView
                    ? "bg-light-blue text-white"
                    : "bg-light-grey border-2 border-grey"
                } font-[500] text-[20px] leading-[30px] text-center`}
                onClick={() => setGridView(false)}
              >
                {!gridView ? (
                  <img src={list.src} />
                ) : (
                  <img src={listBlack.src} />
                )}
              </button>
            </div>
            <button className="w-fit px-8 py- h-[39px] rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[21px] text-center">
              Export
            </button>
          </div>
        </div> */}
        {gridView ? <GridView /> : <ListView />}
      </div>
    </div>
  );
}
