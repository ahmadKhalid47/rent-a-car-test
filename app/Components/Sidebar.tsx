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
import { useState, useEffect } from "react";
import { setFieldNameR, setSidebarShowR } from "../store/Global";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { FaUserTie } from "react-icons/fa6";
import { DriveEta, DriveEtaRounded } from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";
import { RiSettings4Fill } from "react-icons/ri";

export default function Sidebar() {
  let global = useSelector((state: RootState) => state.Global);
  let [pathName, setPathName] = useState(
    window.location.pathname.split("/")[2]
  );

  useEffect(() => {
    setPathName(pathName);
  }, [pathName]);

  console.log(pathName);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  // let [vehiclesShow, setVehiclesShow] = useState(
  //   pathName === "AddVehicles" || pathName === "Home"
  //     ? true
  //     : false
  // );
  // let [CustomerShow, setCustomerShow] = useState(
  //   pathName === "Customers" || pathName === "AddCustomer"
  //     ? true
  //     : false
  // );
  // let [ChauffeurShow, setChauffeurShow] = useState(
  //   pathName === "Chauffeurs" || pathName === "AddChauffeur"
  //     ? true
  //     : false
  // );
  // let [ReservationsShow, setReservationsShow] = useState(
  //   pathName === "Reservations" ||
  //     pathName === "AddReservations"
  //     ? true
  //     : false
  // );

  // useEffect(() => {
  //   if (
  //     pathName === "Customers" ||
  //     pathName === "AddCustomer"
  //   ) {
  //     setCustomerShow(true);
  //   } else {
  //     setCustomerShow(false);
  //   }
  //   if (pathName === "Home" || pathName === "AddVehicles") {
  //     setVehiclesShow(true);
  //   } else {
  //     setVehiclesShow(false);
  //   }
  //   if (
  //     pathName === "Chauffeurs" ||
  //     pathName === "AddChauffeur"
  //   ) {
  //     setChauffeurShow(true);
  //   } else {
  //     setChauffeurShow(false);
  //   }
  //   if (
  //     pathName === "Reservations" ||
  //     pathName === "AddReservations"
  //   ) {
  //     setReservationsShow(true);
  //   } else {
  //     setReservationsShow(false);
  //   }
  // }, [pathName]);

  let dispatch = useDispatch();
  const router = useRouter();

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
        <Link href={"/Components/Home"} className="w-fit h-fit">
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
          global.sidebarShow ? "px-3 sm:px-6" : "px-8"
        } flex flex-col justify-start items-center gap-[2px] overflow-auto transitions`}
      >
        <div
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <TbLayoutDashboardFilled
            className={`${global.sidebarShow ? "" : "fixed"}`}
          />
          <span className="">{global.sidebarShow ? "Dashboard" : null}</span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <MdCalendarMonth
            className={`${global.sidebarShow ? "ml-[0px]" : "ml-[-1px fixed"}`}
          />
          <span className="">{global.sidebarShow ? "Calendar" : null}</span>
        </div>

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            pathName === "Customers" || pathName === "AddCustomer"
              ? "text-main-blue"
              : ""
          } rounded-[10px]`}
        >
          <div className="w-fit flex justify-start items-center gap-2 bg-red-30">
            <FaUsers
              className={`${
                global.sidebarShow ? "ml-[1px]" : "ml-[-9px] fixed"
              } text-[16px]`}
            />
            {global.sidebarShow ? "Customers" : null}
          </div>
          {global.sidebarShow ? (
            <div
              // onClick={() => {
              //   setCustomerShow(!CustomerShow);
              //   setVehiclesShow(false);
              //   setChauffeurShow(false);
              //   setReservationsShow(false);
              // }}
              className="cursor-pointer"
            >
              {pathName === "Customers" || pathName === "AddCustomer" ? (
                <GoTriangleUp className="float-right me-5" />
              ) : (
                <GoTriangleDown className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>
        {(pathName === "Customers" || pathName === "AddCustomer") &&
        global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[27px]"></div>
              </div>
              <button
                onClick={() => {
                  router.push("/Components/Customers");
                  // setPathName("Customers");
                }}
                // href={"/Components/Home"}
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "Customers" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Customers" : null}
              </button>{" "}
            </div>
            <button
              onClick={() => {
                router.push("/Components/AddCustomer");
                // setPathName("AddCustomer");
              }}
              // href={"/Components/AddVehicles"}
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName === "AddCustomer" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Customer" : null}
              </div>{" "}
            </button>
          </div>
        ) : null}

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            pathName === "Chauffeurs" || pathName === "AddChauffeur"
              ? "text-main-blue"
              : ""
          } rounded-[10px]`}
        >
          <div className="w-fit flex justify-start items-center gap-2 bg-red-30">
            <FaUserTie
              className={`text-[16px] ${
                global.sidebarShow ? "ml-[1px]" : "ml-[-9px] fixed"
              }`}
            />
            {global.sidebarShow ? "Chauffeurs" : null}
          </div>
          {global.sidebarShow ? (
            <div
              // onClick={() => {
              //   setChauffeurShow(!ChauffeurShow);
              //   setVehiclesShow(false);
              //   setCustomerShow(false);
              //   setReservationsShow(false);
              // }}
              className="cursor-pointer"
            >
              {pathName === "Chauffeurs" || pathName === "AddChauffeur" ? (
                <GoTriangleUp className="float-right me-5" />
              ) : (
                <GoTriangleDown className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>
        {(pathName === "Chauffeurs" || pathName === "AddChauffeur") &&
        global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[27px]"></div>
              </div>
              <button
                onClick={() => {
                  router.push("/Components/Chauffeurs");
                  // setPathName("Chauffeurs");
                }}
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "Chauffeurs" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Chauffeurs" : null}
              </button>{" "}
            </div>
            <button
              onClick={() => {
                router.push("/Components/AddChauffeur");
                // setPathName("AddChauffeur");
              }}
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName === "AddChauffeur" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Chauffeur" : null}
              </div>{" "}
            </button>
          </div>
        ) : null}

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            pathName === "Reservations" || pathName === "AddReservations"
              ? "text-main-blue"
              : ""
          } rounded-[10px]`}
        >
          <div className="w-fit flex justify-start items-center gap-2 bg-red-30">
            <FaListCheck
              className={`text-[16px] ${
                global.sidebarShow ? "ml-[1px]" : "ml-[-9px] fixed"
              }`}
            />

            {global.sidebarShow ? "Reservations" : null}
          </div>
          {global.sidebarShow ? (
            <div
              // onClick={() => {
              //   setReservationsShow(!ReservationsShow);
              //   setVehiclesShow(false);
              //   setCustomerShow(false);
              //   setChauffeurShow(false);
              // }}
              className="cursor-pointer"
            >
              {pathName === "Reservations" || pathName === "AddReservations" ? (
                <GoTriangleUp className="float-right me-5" />
              ) : (
                <GoTriangleDown className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>
        {(pathName === "Reservations" || pathName === "AddReservations") &&
        global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[27px]"></div>
              </div>
              <button
                onClick={() => {
                  router.push("/Components/Reservations");
                  // setPathName("Reservations");
                }}
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "Reservations" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Reservations" : null}
              </button>{" "}
            </div>
            <button
              onClick={() => {
                router.push("/Components/AddReservations");
                // setPathName("AddReservations");
              }}
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName === "AddReservations"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add Reservations" : null}
              </div>{" "}
            </button>
          </div>
        ) : null}

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            pathName === "Home" || pathName === "AddVehicles"
              ? "text-main-blue"
              : ""
          } rounded-[10px]`}
        >
          <div className="w-fit flex justify-start items-center gap-2 bg-red-30">
            <FaCar
              className={`${
                global.sidebarShow ? "ml-[1px]" : "ml-[-9px] fixed"
              }`}
            />
            {global.sidebarShow ? "Vehicles" : null}
          </div>
          {global.sidebarShow ? (
            <div
              // onClick={() => {
              //   setVehiclesShow(!vehiclesShow);
              //   setCustomerShow(false);
              //   setChauffeurShow(false);
              //   setReservationsShow(false);
              // }}
              className="cursor-pointer"
            >
              {pathName === "Home" || pathName === "AddVehicles" ? (
                <GoTriangleUp className="float-right me-5" />
              ) : (
                <GoTriangleDown className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>

        {(pathName === "Home" || pathName === "AddVehicles") &&
        global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[27px]"></div>
              </div>
              <button
                onClick={() => {
                  router.push("/Components/Home");
                  // setPathName("Home");
                }}
                // href={"/Components/Home"}
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "Home" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Vehicles" : null}
              </button>{" "}
            </div>
            <button
              onClick={() => {
                router.push("/Components/AddVehicles");
                // setPathName("AddVehicles");
              }}
              // href={"/Components/AddVehicles"}
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName === "AddVehicles" ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New Vehicle" : null}
              </div>{" "}
            </button>
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
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
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <TbTargetArrow className="ml-[1px]" />
          <span className="">{global.sidebarShow ? "Tracking" : null}</span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <RiFileSettingsFill />
          <span className="">
            {global.sidebarShow ? "Offer Generator" : null}
          </span>
        </div>
        <div
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <RiSettings4Fill />
          <span className="">{global.sidebarShow ? "Settings" : null}</span>
        </div>
      </div>
    </div>
  );
}
