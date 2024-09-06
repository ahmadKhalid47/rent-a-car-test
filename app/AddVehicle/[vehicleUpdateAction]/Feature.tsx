"use client";
import { TypeInput, TempTypeInput } from "../../Components/InputComponents/TypeInput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { setfeatures } from "@/app/store/Vehicle";
import { useState } from "react";

export default function Feature() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  console.log();

  let featuresDisplayArray: any = Configurations?.Configurations?.feature?.map(
    (item: any) => item.Feature
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
      <div className="w-full h-fit  ">
        <div className="flex flex-wrap justify-start items-start gap-x-[4%] lg:gap-x-[6.66%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8">
          {featuresDisplayArray?.map((item: any, key: any) => (
            <button
              className={`w-[100%] sm:w-[48%] lg:w-[20%] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] 
                ${
                  featuresSubmitArray?.includes(item)
                    ? "bg-main-blue text-white font-[500]"
                    : "input-color border-2 border-grey font-[400]"
                } 
                font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center`}
              key={key}
              onClick={() => {
                handleClick(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
