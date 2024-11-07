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
import configImg8 from "@/public/configImg (6).svg";
import configImg9 from "@/public/configImg (7).svg";
import configImg10 from "@/public/configImg (8).svg";
import { setConfigurations } from "../store/Configurations";
import Image from "next/image";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
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

  const configArray = [
    {
      href: "/Configuration/Category",
      img: configImg10,
      label: "Category",
    },
    { href: "/Configuration/Make", img: configImg1, label: "Make" },
    { href: "/Configuration/Model", img: configImg2, label: "Model" },
    {
      href: "/Configuration/Type",
      img: configImg3,
      label: "Body Type",
    },
    { href: "/Configuration/Color", img: configImg4, label: "Color" },
    {
      href: "/Configuration/Features",
      img: configImg5,
      label: "Features",
    },
    {
      href: "/Configuration/Country",
      img: configImg7,
      label: "Country",
    },
    { href: "/Configuration/City", img: configImg6, label: "City" },
    { href: "/Configuration/Insurance", img: configImg8, label: "Insurance" },
    { href: "/Configuration/Ownership", img: configImg9, label: "Ownership" },
  ];

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="h-[44px] w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-center">
          <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] h-[44px]">
            Configuration
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              Manage and customize vehicle configurations to meet your specific
              needs.{" "}
            </span>
          </span>
        </div>
        <div className="w-full h-fit">
          <div className="w-full h-fit mt-4">
            <div className="w-full h-fit flex justify-between flex-wrap items-start gap-y-4 p-4 rounded-[10px] border-[1px] border-grey dark:bg-dark bg-light-grey mt-2">
              {configArray.map((item) => (
                <Link
                  href={item.href}
                  className="card w-[100%] lg:w-[18.50%] h-[155px] dark:bg-dark1 bg-white rounded-[10px] border-[1px] border-grey px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-5 flex justify-center gap-3 md:gap-3 lg:gap-4 items-center relative flex-col"
                >
                  <div className="w-fit h-fit flex justify-center items-center">
                    <Image
                      alt=""
                      width={30}
                      height={30}
                      src={item.img.src}
                      className="dark:filter dark:brightness-[0] dark:invert"
                    />
                  </div>
                  <span className="font-[600] text-[18px] xs:text-[24px] leading-none">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
