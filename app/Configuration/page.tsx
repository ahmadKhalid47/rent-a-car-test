"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import axios from "axios";
import Link from "next/link";
import configImg1 from "@/public/configImg (2).svg";
import configImg2 from "@/public/configImg (3).svg";
import configImg3 from "@/public/configImg (4).svg";
import configImg4 from "@/public/configImg (5).svg";
import configImg5 from "@/public/configImg (1).svg";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

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
            Configuration
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Lorem ipsum is a placeholder text commonly used to demonstrate the
              visual form.
            </p>
          </h3>
        </div>
        <div className="w-full h-fit">
          <div className="w-full h-fit mt-4">
            <div className="w-full h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] px-1 xs:px-3 md:px-11 pb-3 md:pb-12 pt-0 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-2">
              <Link
                href={`/Configuration/Make`}
                className="w-[100%] lg:w-[200px] h-[200px] bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-6 lg:justify-center items-center relative flex-col"
              >
                <div className="bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img src={configImg1.src} />
                </div>
                <p className="font-[600] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Make
                </p>
              </Link>
              <Link
                href={`/Configuration/Model`}
                className="w-[100%] lg:w-[200px] h-[200px] bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-6 lg:justify-center items-center relative flex-col"
              >
                <div className="bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img src={configImg2.src} />
                </div>
                <p className="font-[600] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Model
                </p>
              </Link>
              <Link
                href={`/Configuration/Type`}
                className="w-[100%] lg:w-[200px] h-[200px] bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-6 lg:justify-center items-center relative flex-col"
              >
                <div className="bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img src={configImg3.src} />
                </div>
                <p className="font-[600] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Type
                </p>
              </Link>
              <Link
                href={`/Configuration/Color`}
                className="w-[100%] lg:w-[200px] h-[200px] bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-6 lg:justify-center items-center relative flex-col"
              >
                <div className="bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img src={configImg4.src} />
                </div>
                <p className="font-[600] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Color
                </p>
              </Link>
              <Link
                href={`/Configuration/Features`}
                className="w-[100%] lg:w-[200px] h-[200px] bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-6 lg:justify-center items-center relative flex-col"
              >
                <div className="bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img src={configImg5.src} />
                </div>
                <p className="font-[600] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Add. Features
                </p>
              </Link>
              <Link
                href={`/Configuration/Country`}
                className="w-[100%] lg:w-[200px] h-[200px] bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-6 lg:justify-center items-center relative flex-col"
              >
                <div className="bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img src={configImg5.src} />
                </div>
                <p className="font-[600] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Country
                </p>
              </Link>
              <Link
                href={`/Configuration/City`}
                className="w-[100%] lg:w-[200px] h-[200px] bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-6 lg:justify-center items-center relative flex-col"
              >
                <div className="bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img src={configImg5.src} />
                </div>
                <p className="font-[600] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  City
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
