"use client";
import React, { useState } from "react";
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
import configImg6 from "@/public/city.svg";
import configImg7 from "@/public/country.svg";
import { useHandleExport } from "../Components/functions/exportFunction";
import { setConfigurations } from "../store/Configurations";
import { SmallLoader } from "../Components/Loader";
import ExcelUploader from "../Components/functions/ImportData";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  const [loading, setLoading] = useState<any>(false);
  const [exportLoading, setExportLoading] = useState<any>(false);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const handleExport = useHandleExport();
  useEffect(() => {
    async function getData2() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getConfigurations`, {
          createdBy: myProfile._id,
        });
        dispatch(setConfigurations(result?.data?.wholeData));
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (myProfile._id) getData2();
  }, [myProfile._id]);

  const [exportData, setExportData] = useState<any>([]);

  useEffect(() => {
    setExportData([
      Configurations?.Configurations?.color,
      Configurations?.Configurations?.city,
      Configurations?.Configurations?.country,
      Configurations?.Configurations?.feature,
      Configurations?.Configurations?.make,
      Configurations?.Configurations?.model,
      Configurations?.Configurations?.type,
    ]);
  }, [Configurations?.Configurations]);

  let exportObj = exportData?.map((item: any) => item);

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
          <span className="flex flex-col font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[100%]">
            Configuration
            <span className="w-fit text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-5 md:leading-[21px]">
              Manage and customize vehicle configurations to meet your specific
              needs.{" "}
            </span>
          </span>
        </div>
        <div className="w-full h-fit">
          <div className="h-fit w-full flex justify-end gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
            {Configurations?.Configurations && (
              <button
                className="hover:no-underline w-[210px] h-[44px] rounded-[10px] bg-main-blue text-white font-[500] text-[12px] md:text-[16px] flex justify-center items-center leading-[0px]"
                onClick={() => {
                  async function exporting() {
                    const flattenedData = exportObj?.flat();
                    try {
                      setExportLoading(true);
                      await handleExport(flattenedData);
                    } finally {
                      setExportLoading(false);
                    }
                  }
                  exporting();
                }}
              >
                {exportLoading ? <SmallLoader /> : "Export Configurations"}
              </button>
            )}
            <ExcelUploader />
          </div>

          <div className="w-full h-fit mt-4">
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-[5%] gap-y-[5%] px-1 xs:px-3 md:px-11 pb-3 md:pb-12 pt-0 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-2">
              <Link
                href={`/Configuration/Make`}
                className="w-[100%] lg:w-[200px] h-[200px] dark:bg-dark1 bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-5 flex justify-start gap-3 md:gap-3 lg:gap-4 lg:justify-center items-center relative flex-col hover:opacity-[0.8]"
              >
                <div className="dark:bg-main_blue bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img
                    src={configImg1.src}
                    className="dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <p className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Make
                </p>
              </Link>
              <Link
                href={`/Configuration/Model`}
                className="w-[100%] lg:w-[200px] h-[200px] dark:bg-dark1 bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-5 flex justify-start gap-3 md:gap-3 lg:gap-4 lg:justify-center items-center relative flex-col hover:opacity-[0.8]"
              >
                <div className="dark:bg-main_blue bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img
                    src={configImg2.src}
                    className="dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <p className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Model
                </p>
              </Link>
              <Link
                href={`/Configuration/Type`}
                className="w-[100%] lg:w-[200px] h-[200px] dark:bg-dark1 bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-5 flex justify-start gap-3 md:gap-3 lg:gap-4 lg:justify-center items-center relative flex-col hover:opacity-[0.8]"
              >
                <div className="dark:bg-main_blue bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img
                    src={configImg3.src}
                    className="dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <p className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Body Type
                </p>
              </Link>
              <Link
                href={`/Configuration/Color`}
                className="w-[100%] lg:w-[200px] h-[200px] dark:bg-dark1 bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-5 flex justify-start gap-3 md:gap-3 lg:gap-4 lg:justify-center items-center relative flex-col hover:opacity-[0.8]"
              >
                <div className="dark:bg-main_blue bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img
                    src={configImg4.src}
                    className="dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <p className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Color
                </p>
              </Link>
              <Link
                href={`/Configuration/Features`}
                className="w-[100%] lg:w-[200px] h-[200px] dark:bg-dark1 bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-5 flex justify-start gap-3 md:gap-3 lg:gap-4 lg:justify-center items-center relative flex-col hover:opacity-[0.8]"
              >
                <div className="dark:bg-main_blue bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img
                    src={configImg5.src}
                    className="dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <p className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Add. Features
                </p>
              </Link>
              <Link
                href={`/Configuration/Country`}
                className="w-[100%] lg:w-[200px] h-[200px] dark:bg-dark1 bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-5 flex justify-start gap-3 md:gap-3 lg:gap-4 lg:justify-center items-center relative flex-col hover:opacity-[0.8]"
              >
                <div className="dark:bg-main_blue bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img
                    src={configImg6.src}
                    className="w-[37px] h-[37px] dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <p className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Country
                </p>
              </Link>
              <Link
                href={`/Configuration/City`}
                className="w-[100%] lg:w-[200px] h-[200px] dark:bg-dark1 bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-5 flex justify-start gap-3 md:gap-3 lg:gap-4 lg:justify-center items-center relative flex-col hover:opacity-[0.8]"
              >
                <div className="dark:bg-main_blue bg-light-grey border-[1px] border-grey w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <img
                    src={configImg7.src}
                    className="w-[37px] h-[37px] dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <p className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
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
