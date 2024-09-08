"use client";
import bar from "@/public/car.svg";
import Link from "next/link";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { FaCar, FaUsers } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "../store/Global";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import * as navigation from "next/navigation";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { FaUserTie } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { RiSettings4Fill } from "react-icons/ri";

export default function Sidebar() {
  let global = useSelector((state: RootState) => state.Global);
  let pathName = usePathname();
  let [chevronState, setChevronState] = useState("");
  let [chevronStateClose, setChevronStateClose] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useEffect(() => {
    if (
      pathName === "/Customers" ||
      pathName === "/CustomerInfo" ||
      pathName?.includes("/AddCustomer")
    ) {
      setChevronState("Customers");
      setChevronStateClose("Customers");
    } else if (
      pathName === "/Chauffeurs" ||
      pathName === "/ChauffeursInfo" ||
      pathName?.includes("/AddChauffeur")
    ) {
      setChevronState("Chauffeurs");
      setChevronStateClose("Chauffeurs");
    } else if (
      pathName === "/Vehicles" ||
      pathName?.includes("/VehicleInfo") ||
      pathName?.includes("/AddVehicle") ||
      pathName?.includes("/Configuration")
    ) {
      setChevronState("Vehicles");
      setChevronStateClose("Vehicles");
    } else if (
      pathName === "/Reservations" ||
      pathName?.includes("/ReservationsInfo") ||
      pathName?.includes("/AddReservations")
    ) {
      setChevronState("Reservations");
      setChevronStateClose("Reservations");
    } else if (pathName === "/Settings") {
      setChevronState("Settings");
      setChevronStateClose("Settings");
    }
  }, [pathName]);

  let dispatch = useDispatch();

  return (
    <div
      className={`${
        global.sidebarShow ? "w-[250px] sm:w-[300px]" : "w-[70px]"
      } sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-[100] bg-white xl:z-0 transitions`}
      onMouseEnter={() => dispatch(setSidebarShowR(true))}
      onMouseLeave={() =>
        dispatch(setSidebarShowR(global.sidebarShowTemp ? true : false))
      }
    >
      <div className="w-full h-[90px] bg-white flex justify-center border-b-[2px] transitions">
        <Link href={"/Vehicles"} className="w-fit h-fit">
          <img
            src={bar.src}
            className={`${
              global.sidebarShow ? "w-[124px] h-[37px]" : "w-[60px] h-[25px]"
            } mt-[30px]`}
          />
        </Link>
      </div>
      <div
        className={`w-full h-[calc(100vh-90px)] overflow-auto pt-7 ${
          global.sidebarShow ? "px-3 sm:px-3" : "px-1"
        } flex flex-col justify-start items-center gap-[2px] overflow-auto transitions`}
      >
        <div
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <TbLayoutDashboardFilled
            className={`${global.sidebarShow ? "" : "fixed"} text-[24px]`}
          />
          <span className="">{global.sidebarShow ? "Dashboard" : null}</span>
        </div>
        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            chevronState === "Customers" && global.sidebarShow
              ? "text-main-blue font-[600] hover:font-[500]"
              : chevronStateClose === "Customers" && !global.sidebarShow
              ? "text-white bg-main-blue"
              : ""
          } rounded-[10px]`}
          onClick={() =>
            setChevronState(chevronState === "Customers" ? "" : "Customers")
          }
        >
          <div className="w-fit flex justify-start items-center gap-2">
            <FaUsers
              className={`${
                global.sidebarShow ? "ml-[1px]" : "ml-[-11px] fixed"
              } text-[22px]`}
            />
            {global.sidebarShow ? "Customers" : null}
          </div>
          {global.sidebarShow ? (
            <div className="cursor-pointer">
              {chevronState === "Customers" ? (
                <GoTriangleUp className="float-right me-5" />
              ) : (
                <GoTriangleDown className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>
        {chevronState === "Customers" && global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[27px]"></div>
              </div>
              <Link
                href="/Customers"
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "/Customers" || pathName === "/CustomerInfo"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Customers" : null}
              </Link>{" "}
            </div>
            <Link
              href="/AddCustomer/AddNew"
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName === "/AddCustomer/AddNew"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Customer" : null}
              </div>{" "}
            </Link>
          </div>
        ) : null}

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            chevronState === "Chauffeurs" && global.sidebarShow
              ? "text-main-blue font-[600] hover:font-[500]"
              : chevronStateClose === "Chauffeurs" && !global.sidebarShow
              ? "text-white bg-main-blue"
              : ""
          } rounded-[10px]`}
          onClick={() =>
            setChevronState(chevronState === "Chauffeurs" ? "" : "Chauffeurs")
          }
        >
          <div className="w-fit flex justify-start items-center gap-2">
            <FaUserTie
              className={`text-[16px] ${
                global.sidebarShow ? "ml-[2px]" : "ml-[-11px] fixed"
              } text-[20px]`}
            />
            {global.sidebarShow ? "Chauffeurs" : null}
          </div>
          {global.sidebarShow ? (
            <div className="cursor-pointer">
              {chevronState === "Chauffeurs" ? (
                <GoTriangleUp
                  className="float-right me-5"
                  onClick={() => setChevronState("")}
                />
              ) : (
                <GoTriangleDown
                  className="float-right me-5"
                  onClick={() => setChevronState("Chauffeurs")}
                />
              )}
            </div>
          ) : null}
        </div>
        {chevronState === "Chauffeurs" && global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[27px]"></div>
              </div>
              <Link
                href="/Chauffeurs"
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "/Chauffeurs" ||
                  pathName?.includes("/ChauffeursInfo")
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Chauffeurs" : null}
              </Link>{" "}
            </div>
            <Link
              href="/AddChauffeur/AddNew"
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName === "/AddChauffeur/AddNew"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Chauffeur" : null}
              </div>{" "}
            </Link>
          </div>
        ) : null}

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            chevronState === "Reservations" && global.sidebarShow
              ? "text-main-blue font-[600] hover:font-[500]"
              : chevronStateClose === "Reservations" && !global.sidebarShow
              ? "text-white bg-main-blue"
              : ""
          } rounded-[10px]`}
          onClick={() =>
            setChevronState(
              chevronState === "Reservations" ? "" : "Reservations"
            )
          }
        >
          <div className="w-fit flex justify-start items-center gap-2">
            <FaListCheck
              className={`text-[20px] ${
                global.sidebarShow ? "ml-[1.7px]" : "ml-[-11px] fixed"
              }`}
            />

            {global.sidebarShow ? "Reservations" : null}
          </div>
          {global.sidebarShow ? (
            <div className="cursor-pointer">
              {chevronState === "Reservations" ? (
                <GoTriangleUp
                  className="float-right me-5"
                  onClick={() => setChevronState("")}
                />
              ) : (
                <GoTriangleDown
                  className="float-right me-5"
                  onClick={() => setChevronState("Reservations")}
                />
              )}
            </div>
          ) : null}
        </div>
        {chevronState === "Reservations" && global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[27px]"></div>
              </div>
              <Link
                href="/Reservations"
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "/Reservations" ||
                  pathName?.includes("/ReservationsInfo")
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Reservations" : null}
              </Link>{" "}
            </div>
            <Link
              href="/AddReservations/AddNew"
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName === "/AddReservations/AddNew"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Reservations" : null}
              </div>{" "}
            </Link>
          </div>
        ) : null}

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            chevronState === "Vehicles" && global.sidebarShow
              ? "text-main-blue font-[600] hover:font-[500]"
              : chevronStateClose === "Vehicles" && !global.sidebarShow
              ? "text-white bg-main-blue"
              : ""
          } rounded-[10px]`}
          onClick={() =>
            setChevronState(chevronState === "Vehicles" ? "" : "Vehicles")
          }
        >
          <div className="w-fit flex justify-start items-center gap-2">
            <FaCar
              className={`${
                global.sidebarShow ? "ml-[1px]" : "ml-[-12px] fixed"
              } text-[22px]`}
            />
            {global.sidebarShow ? "Vehicles" : null}
          </div>
          {global.sidebarShow ? (
            <div className="cursor-pointer">
              {chevronState === "Vehicles" ? (
                <GoTriangleUp
                  className="float-right me-5"
                  onClick={() => setChevronState("")}
                />
              ) : (
                <GoTriangleDown
                  className="float-right me-5"
                  onClick={() => setChevronState("Vehicles")}
                />
              )}
            </div>
          ) : null}
        </div>

        {chevronState === "Vehicles" && global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[27px]"></div>
              </div>
              <Link
                href="/Vehicles"
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "/Vehicles" || pathName?.includes("/VehicleInfo")
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Vehicles" : null}
              </Link>{" "}
            </div>
            <Link
              href="/AddVehicle/AddNew"
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName === "/AddVehicle/AddNew"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Vehicle" : null}
              </div>{" "}
            </Link>
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[22.5px]"></div>
              </div>
              <Link
                href="/Configuration"
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName?.includes("/Configuration")
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Configuration" : null}
              </Link>
            </div>
          </div>
        ) : null}

        <Link
          href="/Settings"
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] ${
            chevronState === "Settings" && global.sidebarShow
              ? "bg-main-blue text-white font-[500]"
              : chevronStateClose === "Settings" && !global.sidebarShow
              ? "text-white bg-main-blue"
              : ""
          }`}
        >
          <RiSettings4Fill
            className={`${global.sidebarShow ? "" : "fixed"} text-[24px]`}
          />
          <span className="">{global.sidebarShow ? "Settings" : null}</span>
        </Link>
      </div>
    </div>
  );
}
