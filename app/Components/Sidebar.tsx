"use client";
import bar from "@/public/car.svg";
import Link from "next/link";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import car1 from "@/public/sb (1).svg";
import car2 from "@/public/sb (2).svg";
import car3 from "@/public/sb (3).svg";
import car4 from "@/public/sb (4).svg";
import car5 from "@/public/sb (5).svg";
import car6 from "@/public/sb (6).svg";
import car7 from "@/public/sb (7).svg";
import {
  FaCar,
  FaUsers,
  FaTachometerAlt,
  FaTrademark,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { CalendarMonth } from "@mui/icons-material";
import { FaListCheck } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";
import { RiFileSettingsFill } from "react-icons/ri";
import Vehicles from "./Vehicles";
import { useState } from "react";
import { setSidebarShowR } from "../store/Global";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  let global = useSelector((state: RootState) => state.Global);
  let [vehiclesShow, setVehiclesShow] = useState(false);
  let dispatch = useDispatch();

  return (
    <div
      className={`${
        global.sidebarShow ? "w-[300px]" : "w-[120px]"
      } sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-0 transitions`}
      onMouseOver={() => dispatch(setSidebarShowR(true))}
    >
      <div className="w-full h-[90px] bg-white flex justify-center border-b-[2px] transitions">
        <Link href={"/Components/Home"} className="w-fit h-fit">
          <img
            src={bar.src}
            className={`${
              global.sidebarShow ? "w-[124px] h-[37px]" : "w-[87px] h-[25px]"
            } mt-[30px]`}
          />
        </Link>
      </div>
      <div className="w-full h-[80%] pt-10 px-10 flex flex-col justify-start items-center gap-2 transitions">
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] transitions`}
        >
          <TbLayoutDashboardFilled />
          <span className="transitions">
            {global.sidebarShow ? "Dashboard" : null}
          </span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] transitions`}
        >
          <MdCalendarMonth />
          <span className="transitions">
            {global.sidebarShow ? "Calendar" : null}
          </span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] transitions`}
        >
          <FaUsers className="ml-[2px]" />
          <span className="transitions ">
            {global.sidebarShow ? "Customers" : null}
          </span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] transitions`}
        >
          <FaListCheck className="ml-[2px]" />
          <span className="transitions">
            {global.sidebarShow ? "Reservations" : null}
          </span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white bg-green-30 rounded-[10px] transitions`}
        >
          <div className="w-fit flex justify-start items-center gap-2 bg-red-30">
            <FaCar className="ml-[1px]" />
            {global.sidebarShow ? "Vehicles" : null}
          </div>
          {global.sidebarShow ? (
            <div
              onClick={() => setVehiclesShow(!vehiclesShow)}
              className="cursor-pointer"
            >
              {vehiclesShow ? (
                <FaChevronUp className="float-right me-5" />
              ) : (
                <FaChevronDown className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>

        {vehiclesShow && global.sidebarShow ? (
          <div className="w-full h-fit -mt-2  flex flex-col justify-start items-start">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[57.66%] rounded-full top-[27px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Vehicles" : null}
              </div>{" "}
            </div>
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[57.66%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Vehicle" : null}
              </div>{" "}
            </div>
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[57.66%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Configuration" : null}
              </div>{" "}
            </div>
          </div>
        ) : null}

        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] transitions`}
        >
          <TbTargetArrow className="ml-[1px]" />
          <span className="transitions">
            {global.sidebarShow ? "Tracking" : null}
          </span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] transitions`}
        >
          <RiFileSettingsFill />
          <span className="transitions">
            {global.sidebarShow ? "Offer Generator" : null}
          </span>
        </div>
      </div>
    </div>
  );
}
