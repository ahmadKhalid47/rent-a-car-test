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
  let pathName = window.location.pathname;
  let [chevronState, setChevronState] = useState("");
  // console.log(pathName);
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
      pathName === "/Components/Customers" ||
      pathName === "/Components/CustomerInfo" ||
      pathName === "/Components/AddCustomer"
    ) {
      setChevronState("Customers");
    } else if (
      pathName === "/Components/Chauffeurs" ||
      pathName === "/Components/ChauffeursInfo" ||
      pathName === "/Components/AddChauffeur"
    ) {
      setChevronState("Chauffeurs");
    } else if (
      pathName === "/Components/Home" ||
      pathName === "/Components/CarInfo" ||
      pathName === "/Components/AddVehicles"
    ) {
      setChevronState("Vehicles");
    } else if (
      pathName === "/Components/Reservations" ||
      pathName === "/Components/AddReservations"
    ) {
      setChevronState("Reservations");
    } else if (pathName === "/Components/Settings") {
      setChevronState("Settings");
    }
  }, [pathName]);

  let dispatch = useDispatch();
  const router = useRouter();
  console.log(chevronState);

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
            // pathName === "/Components/Customers" ||
            // pathName === "/Components/CustomerInfo" ||
            // pathName === "/Components/AddCustomer"
            chevronState === "Customers" ? "text-main-blue" : ""
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
            <div className="cursor-pointer">
              {
                // pathName === "/Components/Customers" ||
                // pathName === "/Components/CustomerInfo" ||
                // pathName === "/Components/AddCustomer" ||
                chevronState === "Customers" ? (
                  <GoTriangleUp
                    className="float-right me-5"
                    onClick={() => setChevronState("")}
                  />
                ) : (
                  <GoTriangleDown
                    className="float-right me-5"
                    onClick={() => setChevronState("Customers")}
                  />
                )
              }
            </div>
          ) : null}
        </div>
        {
          // (pathName === "/Components/Customers" ||
          // pathName === "/Components/CustomerInfo" ||
          //   pathName === "/Components/AddCustomer")
          chevronState === "Customers" && global.sidebarShow ? (
            <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
              <div className="flex justify-start items-center w-full">
                <div className="relative w-[20%] h-full">
                  <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                  <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[27px]"></div>
                </div>
                <Link
                  href="/Components/Customers"
                  className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                    global.sidebarShow
                      ? "justify-start ps-5"
                      : "justify-center px-0"
                  } bg-main-blue-hover ${
                    pathName === "/Components/Customers" ||
                    pathName === "/Components/CustomerInfo"
                      ? "bg-main-blue text-white"
                      : ""
                  } hover:text-white rounded-[10px]`}
                >
                  {global.sidebarShow ? "All Customers" : null}
                </Link>{" "}
              </div>
              <button
                onClick={() => {
                  router.push("/Components/AddCustomer");
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
                    pathName === "/Components/AddCustomer"
                      ? "bg-main-blue text-white"
                      : ""
                  } hover:text-white rounded-[10px]`}
                >
                  {global.sidebarShow ? "Add New Customer" : null}
                </div>{" "}
              </button>
            </div>
          ) : null
        }

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            // pathName === "/Components/Chauffeurs" ||
            // pathName === "/Components/ChauffeursInfo" ||
            // pathName === "/Components/AddChauffeur"
            chevronState === "Chauffeurs" ? "text-main-blue" : ""
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
            <div className="cursor-pointer">
              {
                //   pathName === "/Components/Chauffeurs" ||
                // pathName === "/Components/ChauffeursInfo" ||
                //   pathName === "/Components/AddChauffeur"
                chevronState === "Chauffeurs" ? (
                  <GoTriangleUp
                    className="float-right me-5"
                    onClick={() => setChevronState("")}
                  />
                ) : (
                  <GoTriangleDown
                    className="float-right me-5"
                    onClick={() => setChevronState("Chauffeurs")}
                  />
                )
              }
            </div>
          ) : null}
        </div>
        {
          // (pathName === "/Components/Chauffeurs" ||
          // pathName === "/Components/ChauffeursInfo" ||
          // pathName === "/Components/AddChauffeur")
          chevronState === "Chauffeurs" && global.sidebarShow ? (
            <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
              <div className="flex justify-start items-center w-full">
                <div className="relative w-[20%] h-full">
                  <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                  <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[27px]"></div>
                </div>
                <Link
                  href="/Components/Chauffeurs"
                  className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                    global.sidebarShow
                      ? "justify-start ps-5"
                      : "justify-center px-0"
                  } bg-main-blue-hover ${
                    pathName === "/Components/Chauffeurs" ||
                    pathName === "/Components/ChauffeursInfo"
                      ? "bg-main-blue text-white"
                      : ""
                  } hover:text-white rounded-[10px]`}
                >
                  {global.sidebarShow ? "All Chauffeurs" : null}
                </Link>{" "}
              </div>
              <button
                onClick={() => {
                  router.push("/Components/AddChauffeur");
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
                    pathName === "/Components/AddChauffeur"
                      ? "bg-main-blue text-white"
                      : ""
                  } hover:text-white rounded-[10px]`}
                >
                  {global.sidebarShow ? "Add New Chauffeur" : null}
                </div>{" "}
              </button>
            </div>
          ) : null
        }

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            // pathName === "/Components/Reservations" ||
            // pathName === "/Components/AddReservations"
            chevronState === "Reservations" ? "text-main-blue" : ""
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
            <div className="cursor-pointer">
              {
                // pathName === "/Components/Reservations" ||
                //   pathName === "/Components/AddReservations"
                chevronState === "Reservations" ? (
                  <GoTriangleUp
                    className="float-right me-5"
                    onClick={() => setChevronState("")}
                  />
                ) : (
                  <GoTriangleDown
                    className="float-right me-5"
                    onClick={() => setChevronState("Reservations")}
                  />
                )
              }
            </div>
          ) : null}
        </div>
        {
          // (pathName === "/Components/Reservations" ||
          //   pathName === "/Components/AddReservations")
          chevronState === "Reservations" && global.sidebarShow ? (
            <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
              <div className="flex justify-start items-center w-full">
                <div className="relative w-[20%] h-full">
                  <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                  <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[27px]"></div>
                </div>
                <Link
                  href="/Components/Reservations"
                  className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                    global.sidebarShow
                      ? "justify-start ps-5"
                      : "justify-center px-0"
                  } bg-main-blue-hover ${
                    pathName === "/Components/Reservations"
                      ? "bg-main-blue text-white"
                      : ""
                  } hover:text-white rounded-[10px]`}
                >
                  {global.sidebarShow ? "All Reservations" : null}
                </Link>{" "}
              </div>
              <button
                onClick={() => {
                  router.push("/Components/AddReservations");
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
                    pathName === "/Components/AddReservations"
                      ? "bg-main-blue text-white"
                      : ""
                  } hover:text-white rounded-[10px]`}
                >
                  {global.sidebarShow ? "Add Reservations" : null}
                </div>{" "}
              </button>
            </div>
          ) : null
        }

        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            // pathName === "/Components/Home" ||
            // pathName === "/Components/CarInfo" ||
            // pathName === "/Components/AddVehicles"
            chevronState === "Vehicles" ? "text-main-blue" : ""
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
            <div className="cursor-pointer">
              {
                //   pathName === "/Components/Home" ||
                // pathName === "/Components/CarInfo" ||
                //     pathName === "/Components/AddVehicles"
                chevronState === "Vehicles" ? (
                  <GoTriangleUp
                    className="float-right me-5"
                    onClick={() => setChevronState("")}
                  />
                ) : (
                  <GoTriangleDown
                    className="float-right me-5"
                    onClick={() => setChevronState("Vehicles")}
                  />
                )
              }
            </div>
          ) : null}
        </div>

        {
          // (pathName === "/Components/Home" ||
          // pathName === "/Components/CarInfo" ||
          //   pathName === "/Components/AddVehicles")
          chevronState === "Vehicles" && global.sidebarShow ? (
            <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
              <div className="flex justify-start items-center w-full">
                <div className="relative w-[20%] h-full">
                  <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                  <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[50.2%] rounded-full top-[27px]"></div>
                </div>
                <Link
                  href="/Components/Home"
                  className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                    global.sidebarShow
                      ? "justify-start ps-5"
                      : "justify-center px-0"
                  } bg-main-blue-hover ${
                    pathName === "/Components/Home" ||
                    pathName === "/Components/CarInfo"
                      ? "bg-main-blue text-white"
                      : ""
                  } hover:text-white rounded-[10px]`}
                >
                  {global.sidebarShow ? "All Vehicles" : null}
                </Link>{" "}
              </div>
              <button
                onClick={() => {
                  router.push("/Components/AddVehicles");
                }}
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
                    pathName === "/Components/AddVehicles"
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
          ) : null
        }

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
        <Link
          href="/Components/Settings"
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px]`}
        >
          <RiSettings4Fill />
          <span className="">{global.sidebarShow ? "Settings" : null}</span>
        </Link>
      </div>
    </div>
  );
}
