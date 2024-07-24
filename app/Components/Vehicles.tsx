"use client";
import {
  FaBars,
  FaBeer,
  FaChevronDown,
  FaHamburger,
  FaSquare,
} from "react-icons/fa";
import check from "@/public/check.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import shape from "@/public/Shape.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  GridViewRounded,
  Menu,
  MenuOpen,
  MenuRounded,
} from "@mui/icons-material";
import { BiMenu } from "react-icons/bi";
import { FcMenu } from "react-icons/fc";
import ListView from "./ListView";
import { useState } from "react";
import GridView from "./GridView";
export default function Vehicles() {
  const [gridView, setGridView] = useState(false);
  const [showLess, setShowLess] = useState(true);
  return (
    <div className="nav-width h-full absolute right-0 flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px]">
      <div className="w-full h-[200px bg-yellow-30">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black">
          All Vehicles
        </h3>
        <div className="flex justify-between items-start">
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            Lorem ipsum is a placeholder text commonly used
            <br /> to demonstrate the visual form.
          </p>
          <button className="px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[30px] text-center">
            Add New Vehicle
          </button>
        </div>
      </div>
      <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-11 flex flex-col justify-start items-start gap-[15px]">
        <div className="w-full h-fit">
          <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1">
            Search
          </h3>
          <div className="w-full h-fit flex justify-between items-center">
            <input className="px-5 w-[82%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"></input>
            <button className="w-[17%] px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[30px] text-center">
              Search
            </button>
          </div>
        </div>
        {!showLess ? (
          <div className="w-full flex justify-between items-center">
            <div className="w-[18%] h-fit">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Registration No.
              </h3>
              <div className="w-full h-fit flex justify-between items-center ">
                <input
                  className=" font-[400] text-[14px] leading-[18px] px-5 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
                  value={"MBU56i403378"}
                ></input>
              </div>
            </div>
            <div className="w-[15%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Make
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[14px] leading-[18px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
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
            <div className="w-[15%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Model
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[14px] leading-[18px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
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
            <div className="w-[15%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Year
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select className="pe-10 font-[400] text-[14px] leading-[18px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
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
                <select className="pe-10 font-[400] text-[14px] leading-[18px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
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
            <div className="w-[15%] h-fit ">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black pb-1 ">
                Color
              </h3>
              <div className="w-full h-fit flex justify-between items-center relative">
                <select className="ps-6 font-[400] text-[14px] leading-[18px] px-5 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
                  <option value="">Red</option>
                  <option value="">Red</option>
                  <option value="">Red</option>
                  <option value="">Red</option>
                </select>
                <div className=" rounded-full w-[15px] h-[15px] bg-red-500 absolute left-2 top-[30%]"></div>
                <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                  <img src={shape.src} className="w-[10.5px]" />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <h3
          className="font-[400] text-[14px] leading-[17px] text-black pb-1 underline hover:no-underline cursor-pointer"
          onClick={() => setShowLess(!showLess)}
        >
          {showLess ? "Advanced Features" : "Show Less"}
        </h3>
      </div>
      <div className="w-full h-fit">
        <div>
          <div className="w-full h-fit flex justify-end gap-4 items-center pt-2">
            <div className="w-fit h-fit flex justify-end items-center gap-3">
              <button
                className={`w-[42px] flex justify-center items-center h-[39px] rounded-[10px] ${
                  gridView
                    ? "bg-main-blue text-white"
                    : "bg-light-grey border-2 border-grey"
                }  font-[500] text-[20px] leading-[30px] text-center bg-hover-blue`}
                onClick={() => setGridView(true)}
              >
                <GridViewRounded />
              </button>
              <button
                className={`w-[42px] flex justify-center items-center h-[39px] rounded-[10px] ${
                  !gridView
                    ? "bg-main-blue text-white"
                    : "bg-light-grey border-2 border-grey"
                } font-[500] text-[20px] leading-[30px] text-center bg-hover-blue`}
                onClick={() => setGridView(false)}
              >
                {!gridView ? (
                  <img src={list.src} />
                ) : (
                  <img src={listBlack.src} />
                )}
              </button>
            </div>
            <button className="w-fit px-8 py- h-[39px] rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[30px] text-center">
              Export
            </button>
          </div>
        </div>
        {gridView ? <GridView /> : <ListView />}
      </div>
    </div>
  );
}
