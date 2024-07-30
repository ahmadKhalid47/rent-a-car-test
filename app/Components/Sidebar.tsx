"use client";
import bar from "@/public/car.svg";
import Link from "next/link";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { FaCar, FaUsers } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";
import { RiFileSettingsFill } from "react-icons/ri";
import { useState } from "react";
import { setFieldNameR, setSidebarShowR } from "../store/Global";
import { useDispatch } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  let global = useSelector((state: RootState) => state.Global);
  let [vehiclesShow, setVehiclesShow] = useState(false);
  let [costumerShow, setCostumerShow] = useState(true);
  let dispatch = useDispatch();
  const router = useRouter();

  return (
    <div
      className={`${
        global.sidebarShow ? "w-[300px]" : "w-[120px]"
      } sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-0 transitions`}
      onMouseEnter={() => dispatch(setSidebarShowR(true))}
      onMouseLeave={() =>
        dispatch(setSidebarShowR(global.sidebarShowTemp ? true : false))
      }
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
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <TbLayoutDashboardFilled />
          <span className="">{global.sidebarShow ? "Dashboard" : null}</span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <MdCalendarMonth
            className={`${global.sidebarShow ? "ml-[0px]" : "ml-[-1px]"}`}
          />
          <span className="">{global.sidebarShow ? "Calendar" : null}</span>
        </div>
        {/* <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <FaUsers
            className={`${global.sidebarShow ? "ml-[2px]" : "ml-[4px]"}`}
          />
          <span className="">{global.sidebarShow ? "Customers" : null}</span>
        </div> */}
        <div
          className={`w-full h-[49px] font-[500] text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            costumerShow ? "text-main-blue" : ""
          } rounded-[10px]`}
        >
          <div className="w-fit flex justify-start items-center gap-2 bg-red-30">
            <FaUsers
              className={`${global.sidebarShow ? "ml-[1px]" : "ml-[-6px]"}`}
            />
            {global.sidebarShow ? "Customers" : null}
          </div>
          {global.sidebarShow ? (
            <div
              onClick={() => {
                setCostumerShow(!costumerShow);
                setVehiclesShow(false);
              }}
              className="cursor-pointer"
            >
              {costumerShow ? (
                <GoTriangleDown className="float-right me-5" />
              ) : (
                <GoTriangleUp className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>
        {costumerShow && global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[57.66%] rounded-full top-[27px]"></div>
              </div>
              <button
                onClick={() => {
                  router.push("/Components/Home");
                  dispatch(setFieldNameR("Home"));
                }}
                // href={"/Components/Home"}
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  global.fieldName === "Home" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Costumers" : null}
              </button>{" "}
            </div>
            <button
              onClick={() => {
                router.push("/Components/AddVehicles");
                dispatch(setFieldNameR("AddVehicles"));
              }}
              // href={"/Components/AddVehicles"}
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[57.66%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  global.fieldName === "AddVehicles"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add Costumer" : null}
              </div>{" "}
            </button>
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
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <FaListCheck
            className={`${global.sidebarShow ? "ml-[2px]" : "ml-[4px]"}`}
          />
          <span className="">{global.sidebarShow ? "Reservations" : null}</span>
        </div>
        <div
          className={`w-full h-[49px] font-[500] text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            vehiclesShow ? "text-main-blue" : ""
          } rounded-[10px]`}
        >
          <div className="w-fit flex justify-start items-center gap-2 bg-red-30">
            <FaCar
              className={`${global.sidebarShow ? "ml-[1px]" : "ml-[-6px]"}`}
            />
            {global.sidebarShow ? "Vehicles" : null}
          </div>
          {global.sidebarShow ? (
            <div
              onClick={() => {
                setVehiclesShow(!vehiclesShow);
                setCostumerShow(false);
              }}
              className="cursor-pointer"
            >
              {vehiclesShow ? (
                <GoTriangleDown className="float-right me-5" />
              ) : (
                <GoTriangleUp className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>

        {vehiclesShow && global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[57.66%] rounded-full top-[27px]"></div>
              </div>
              <button
                onClick={() => {
                  router.push("/Components/Home");
                  dispatch(setFieldNameR("Home"));
                }}
                // href={"/Components/Home"}
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  global.fieldName === "Home" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Vehicles" : null}
              </button>{" "}
            </div>
            <button
              onClick={() => {
                router.push("/Components/AddVehicles");
                dispatch(setFieldNameR("AddVehicles"));
              }}
              // href={"/Components/AddVehicles"}
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[57.66%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  global.fieldName === "AddVehicles"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Vehicle" : null}
              </div>{" "}
            </button>
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
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <TbTargetArrow className="ml-[1px]" />
          <span className="">{global.sidebarShow ? "Tracking" : null}</span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <RiFileSettingsFill />
          <span className="">
            {global.sidebarShow ? "Offer Generator" : null}
          </span>
        </div>
      </div>
    </div>
  );
}
