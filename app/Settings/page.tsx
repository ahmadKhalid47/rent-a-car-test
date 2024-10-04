"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import settings1 from "@/public/settings (10).svg";
import settings2 from "@/public/settings (7).svg";
import settings3 from "@/public/settings (6).svg";
import settings9 from "@/public/settings (1).svg";
import settings10 from "@/public/settings (4).svg";
import settings12 from "@/public/settings (9).svg";
import settings13 from "@/public/Company.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MediumLoader } from "../Components/Loader";
import { LinearProgress } from "@mui/material";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [settingsArray, setSettingsArray] = useState<any>([]);
  useEffect(() => {
    if (myProfile.admin === true) {
      setSettingsArray([
        {
          link: "Settings/MyProfile",
          img: settings1,
          heading: "My Profile",
          text: "Manage your personal info along with login credentials.",
          prefixes: "my profiles username email address profile pic password",
        },
        {
          link: "Settings/General",
          img: settings3,
          heading: "General",
          text: "Manage your VAT rate and adjust other general settings.",
          prefixes:
            "vat percentage dark themes light themes vat include currency",
        },
      ]);
    } else if (myProfile.admin === false) {
      setSettingsArray([
        {
          link: "Settings/MyProfile",
          img: settings1,
          heading: "My Profile",
          text: "Manage your personal info along with login credentials.",
          prefixes: "my profiles username email address profile pic password",
        },
        {
          link: "Settings/CompanyProfile",
          img: settings13,
          heading: "Company Profile",
          text: "Upload your company logo to build your brand identity.",
          prefixes: "company profiles logos",
        },
        {
          link: "Settings/General",
          img: settings3,
          heading: "General",
          text: "Manage your VAT rate and adjust other general settings.",
          prefixes:
            "vat percentage dark themes light themes vat include currency",
        },
        {
          link: "Settings/Invoicing",
          img: settings10,
          heading: "Invoicing",
          text: "Manage additional info and payment details for invoices.",
          prefixes:
            "terms and conditions additional information invoice invoicing payment method",
        },
        {
          link: "Settings/Agreement",
          img: settings9,
          heading: "Agreement",
          text: "Customize terms and conditions to fit your business needs.",
          prefixes: "terms and conditions terms & conditions",
        },
      ]);
    } else if (myProfile.admin === undefined) {
      setSettingsArray([]);
    }
  }, [myProfile.admin]);
  const [filteredSettings, setFilteredSettings] = useState(settingsArray);
  useEffect(() => {
    setFilteredSettings(settingsArray);
  }, [settingsArray]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  function handleSearch(e: any) {
    let searchQuery = e.target.value.toLowerCase().trim();
    let filter = settingsArray.filter((item: any) =>
      item.prefixes.includes(searchQuery)
    );
    setFilteredSettings(filter);
  }

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-end">
          <span className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            Settings
          </span>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          {/* <div className="w-full h-fit">
            <h3 className="font-[400] text-[14px] xs:text-[16px] leading-[19px] dark:text-white text-black pb-">
              Search
            </h3>
            <div className="w-full h-fit flex justify-between items-center">
              <input
                className="px-2 w-[100%] md:w-[100%] h-[43px] flex justify-between items-center text-[14px] xs:text-[16px] dark:bg-dark1 bg-white rounded-xl border-2 leading-[19px] border-grey placeholder:placeholder-color"
                placeholder="Search..."
                onChange={handleSearch}
              ></input>
            </div>
          </div> */}
          <div className="w-full h-fit flex flex-wrap justify-between  gap-2 md:gap-8 items-start mt-5 md:mt-0">
            {filteredSettings.length > 0 ? (
              filteredSettings.map((item: any) => (
                <SettingBox
                  link={item.link}
                  img={item.img}
                  heading={item.heading}
                  text={item.text}
                />
              ))
            ) : (
              <MediumLoader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingBox({ link, img, heading, text }: any) {
  return (
    <Link
      href={link}
      className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 dark:bg-dark1 bg-white rounded-[10px] border-grey border-2"
    >
      <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
        <img src={img.src} className={`w-[25px] h-[25px]`} />
      </div>
      <div className="h-full w-[100%] flex flex-col justify-center item-start">
        <h3 className="font-[400] text-[18px] xs:text-[24px] leading-2 xs:leading-[20px]">
          {heading}
        </h3>
        <span className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[20px]">
          {text}
        </span>
      </div>
    </Link>
  );
}
