"use client";
import React from "react";
import demyIcon from "@/public/features (1).png";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { setfeatures } from "@/app/store/Vehicle";
import { useState } from "react";
import Link from "next/link";

export default function Feature() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);

  let featuresDisplayArray: any = Configurations?.Configurations?.feature?.map(
    (item: any) => item.Feature
  );
  let iconsDisplayArray: any = Configurations?.Configurations?.feature?.map(
    (item: any) => item.Icon
  );
  let dispatch = useDispatch();

  let [featuresSubmitArray, setFeaturesSubmitArray] = useState<any>(
    vehicle.features
  );

  function handleClick(name: string) {
    setFeaturesSubmitArray((prevArray: any) => {
      const newArray = prevArray.includes(name)
        ? prevArray.filter((item: any) => item !== name)
        : [...prevArray, name];

      dispatch(setfeatures(newArray));
      return newArray;
    });
  }

  return (
    <div className="w-full h-fit  ">
      <div className="w-full h-fit">
        <div className="flex flex-wrap justify-start items-start gap-x-[4%] lg:gap-x-[6.66%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8">
          <span className="flex justify-start gap-4 items-end font-[600] text-[20px] w-full my-1 c">
            Feature
            <span className="px-2 md:px-0 w-fit flex justify-start items-end mb-[3px]">
              <span className="text-[12px] w-full text-center font-[400]">
                Feature Not found?{" "}
                <Link
                  href={"/Configuration/Features"}
                  className="text-[#3d84ff] no-underline hover:underline capitalize"
                >
                  Add new
                </Link>
              </span>
            </span>
          </span>

          {featuresDisplayArray?.map((item: any, index: any) => (
            <button
              className={`w-[100%] sm:w-[48%] lg:w-[20%] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] truncate px-3
                ${
                  featuresSubmitArray?.includes(item)
                    ? "bg-main-blue text-white font-[500]"
                    : "dark:bg-dark1 input-color border-2 border-grey font-[400]"
                } 
                font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center flex justify-start items-center gap-4`}
              key={index}
              onClick={() => {
                handleClick(item);
              }}
            >
              <img
                className="w-[20px] h-[20px] bg-white"
                src={
                  iconsDisplayArray[index]
                    ? iconsDisplayArray[index]
                    : demyIcon.src
                }
                alt=""
              />
              <span className="w-[90%] truncate text-start">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
