"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import settings1 from "@/public/settings (10).svg";
import settings2 from "@/public/settings (7).svg";
import settings3 from "@/public/settings (6).svg";
import settings4 from "@/public/settings (5).svg";
import settings5 from "@/public/settings (11).svg";
import settings6 from "@/public/settings (12).svg";
import settings7 from "@/public/settings (3).svg";
import settings8 from "@/public/settings (2).svg";
import settings9 from "@/public/settings (1).svg";
import settings10 from "@/public/settings (4).svg";
import settings11 from "@/public/settings (8).svg";
import settings12 from "@/public/settings (9).svg";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  let [userData, setUserData] = useState<any>(false);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  async function logout() {
    try {
      await axios.post("/api/logOut");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      window.location.href = "/";
    }
  }
  useEffect(() => {
    async function verifyTokenApi() {
      try {
        // setLoading(true);
        // setIsVerified(undefined);
        let userData = await axios.get("/api/verifyToken");
        setUserData(userData?.data?.msg);
        // setIsVerified(true);
      } catch (err) {
        // setIsVerified(false);
      } finally {
        // setLoading(false);
      }
    }
    verifyTokenApi();
  }, []);
  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Settings
          </h3>
        </div>
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          <div className="w-full h-fit">
            <h3 className="font-[400] text-[14px] xs:text-[16px] leading-[19px] text-black pb-">
              Search
            </h3>
            <div className="w-full h-fit flex justify-between items-center">
              <input
                className="px-2 w-[75%] md:w-[82%] h-[43px] flex justify-between items-center text-[14px] xs:text-[16px] bg-white rounded-xl border-2 leading-[19px] border-grey placeholder:placeholder-color"
                placeholder="Search..."
              ></input>
              <button className="w-[24%] md:w-[17%] px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
                Search
              </button>
            </div>
          </div>
          <div className="w-full h-fit flex flex-wrap justify-between  gap-2 md:gap-8 items-start mt-5 md:mt-8">
            {userData?.admin ? (
              <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
                <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={settings1.src} />
                </div>
                <Link
                  href={"/Settings/AddUser"}
                  className="h-fit w-[80%]"
                >
                  <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                    Add New User
                  </h3>
                  <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                    Add New User.
                  </p>
                </Link>
              </div>
            ) : null}

            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings1.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  My Profile
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Manage your personal information and login credentials.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings2.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Notification
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Customize how you receive updates and reminders.{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings3.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  User Management
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Manage access to the system.{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings4.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Report
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Customize reports for rentals, returns, revenue, and
                  maintenance.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings5.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Currency
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Choose your default currency{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings6.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Time Zone
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Set your preferred time zone for booking timings.{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings7.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Language
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Select your preferred language for the application.{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings8.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Insurance Options
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Select your default insurance option for rentals.{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings9.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Agreement
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Choose agreement type{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings10.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Invoicing
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Edit VAT & Taxes{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings11.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Security Questions
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Set security questions to help secure your account.{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings12.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Contact Support
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                  Contact customer support or IT helpdesk.{" "}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
              }}
              className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2"
            >
              {/* <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
              <img src={settings12.src} />
            </div> */}
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Logout
                </h3>
                {/* <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[24px]">
                Contact customer support or IT helpdesk.{" "}
              </p> */}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
