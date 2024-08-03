"use client";
import shape from "@/public/Shape2.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import ListView from "./ListView";
import GridView from "./GridView";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setFieldNameR } from "../store/Global";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  const [gridView, setGridView] = useState(true);
  const [showLess, setShowLess] = useState(true);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFieldNameR("Home"));
  }, []);
  return (
    <div
      className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
    >
      <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
        <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
          All Vehicles
          <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
            Vehicles / All Vehicles
          </p>
        </h3>
        <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
          <div className="w-fit h-fit flex justify-end items-end gap-3">
            <button
              className={`w-[44px] flex justify-center items-center py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] ${
                gridView
                  ? "bg-main-blue text-white"
                  : "bg-light-grey border-2 border-grey"
              }  font-[500] xs:text-[12px] md:text-[12px] text-[20px] leading-[30px] text-center`}
              onClick={() => setGridView(true)}
            >
              <GridViewRounded />
            </button>
            <button
              className={`w-[44px] flex justify-center items-center py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] ${
                !gridView
                  ? "bg-main-blue text-white"
                  : "bg-light-grey border-2 border-grey"
              } font-[500] xs:text-[12px] md:text-[12px] text-[20px] leading-[30px] text-center`}
              onClick={() => setGridView(false)}
            >
              {!gridView ? <img src={list.src} /> : <img src={listBlack.src} />}
            </button>
          </div>
          <button className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
            Add New Vehicle
          </button>
        </div>
      </div>
      <div className=" w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
        <div className="w-full h-fit">
          <h3 className="font-[400] text-[14px] xs:text-[16px] leading-[19px] text-black pb-">
            Search
          </h3>
          <div className="w-full h-fit flex justify-between items-center">
            <input
              className="px-2 w-[75%] md:w-[82%] h-[43px] flex justify-between items-center text-[14px] xs:text-[16px] bg-white rounded-xl border-2 leading-[19px] border-grey placeholder:placeholder-color"
              placeholder="Search By Car Name, Reg No, City.."
            ></input>
            <button className=" w-[24%] md:w-[17%] px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
              Search
            </button>
          </div>
        </div>
        {!showLess ? (
          <div className="w-full flex flex-wrap gap-y-2 1400:flex-nowrap h-fit justify-between items-center">
            <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[20%] h-fit ">
              <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                Car Name
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
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
            <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[15%] h-fit">
              <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                Registration No
              </h3>
              <div className="w-full h-fit flex justify-between items-center ">
                <input
                  className=" font-[400] text-[14px] xs:text-[16px] leading-[19px] px-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder:placeholder-color"
                  placeholder="Type"
                ></input>
              </div>
            </div>

            <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[16%] h-fit ">
              <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                Year
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
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
            <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[15%] h-fit ">
              <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                Type
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
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
            <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[14%] h-fit ">
              <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                City
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
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
            <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[11%] h-fit ">
              <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                Color
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative">
                <select className="ps-7 font-[400] text-[14px] xs:text-[16px] leading-[19px] px-5 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey placeholder-color">
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
          className="font-[400] text-[14px] xs:text-[16px] leading-[19px] text-black pb-1 underline hover:no-underline cursor-pointer"
          onClick={() => setShowLess(!showLess)}
        >
          {showLess ? "Advanced Filters" : "Show Less"}
        </h3>
      </div>
      <div className="w-full h-fit">
        {gridView ? <GridView /> : <ListView />}
      </div>
    </div>
  );
}
