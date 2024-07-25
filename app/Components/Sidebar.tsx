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
} from "react-icons/fa";
import { CalendarMonth } from "@mui/icons-material";
import { FaListCheck } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";
import { RiFileSettingsFill } from "react-icons/ri";

export default function Sidebar() {
  let global = useSelector((state: RootState) => state.Global);
  console.log(global);

  return (
    <div
      className={`${
        global.sidebarShow ? "w-[300px]" : "w-[120px]"
      } sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-0`}
    >
      <div className="w-full h-[90px] bg-white flex justify-center border-b-[2px]">
        <Link href={"/Components/Home"} className="w-fit h-fit">
          <img
            src={bar.src}
            className={`${
              global.sidebarShow ? "w-[124px] h-[37px]" : "w-[87px] h-[25px]"
            } mt-[30px]`}
          />
        </Link>
      </div>
      <div className="w-full h-[80%] pt-10 px-10 flex flex-col justify-start items-center gap-2">
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <TbLayoutDashboardFilled />
          {global.sidebarShow ? "Dashboard" : null}
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <MdCalendarMonth />
          {global.sidebarShow ? "Calendar" : null}
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <FaUsers />
          {global.sidebarShow ? "Customers" : null}
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <FaListCheck />
          {global.sidebarShow ? "Reservations" : null}
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <FaCar />
          {global.sidebarShow ? "Vehicles" : null}
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <TbTargetArrow />
          {global.sidebarShow ? "Tracking" : null}
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <RiFileSettingsFill />
          {global.sidebarShow ? "Offer Generator" : null}
        </div>
      </div>
    </div>
  );
}
