"use client";
import shape from "@/public/Shape.svg";
import car from "@/public/carInfoCar.svg";
import { SelectInputWidth } from "../InputComponents/SelectInput";

export default function Feature() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8 overflow-auto scroll">
        <div className="flex justify-between flex-wrap gap-y-3 items-center w-full h-fit">
          <SelectInputWidth
            label={"Make"}
            value={""}
            required={false}
            options={[ "Make1", "Make2"]}
            widthProp="sm:w-[48.5%]"
          />
          <SelectInputWidth
            label={"Model"}
            value={""}
            required={false}
            options={[ "Model1", "Model2"]}
            widthProp="sm:w-[48.5%]"
          />

        </div>
        <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex flex-col sm:flex-row justify-start gap-4 items-center relative">
          <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
            <img src={car.src} className="w-full h-full" />
          </div>
          <div className="w-full sm:w-[55%] h-fit flex justify-start flex-col bg-red-20 items-center sm:items-start">
            <div className="w-full flex justify-center sm:justify-start items-center pe-0 sm:pe-5 h-fit py-[-10px] -mt-2">
              <span className="font-[600] text-[15px] xs:text-[24px] leading-7 sm:leading-[36px]">
                Suzuki Swift
              </span>
            </div>
            <div className="w-full flex justify-center sm:justify-start items-center py-[-10px] -mt-1">
              <span className="font-[500] text-[14px] xs:text-[20px] leading-7 sm:leading-[30px]">
                LEM 1234
              </span>
            </div>

            <div className="w-full flex justify-center sm:justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
              <div className="flex justify-center sm:justify-start items-center gap-2 w-[50%] sm:w-[40%] pe-5">
                <span className="leading-7 w-[50%] sm:w-[42%]">Year:</span>
                <span className="leading-7 w-[50%] sm:w-[40%]">2024</span>
              </div>
              <div className="flex justify-center sm:justify-start items-center gap- w-[50%]">
                <span className="leading-7 w-[50%] sm:w-[30%]">Type:</span>
                <span className="leading-7 w-[50%] sm:w-[30%]">Sedan</span>
              </div>
            </div>

            <div className="w-full flex justify-center sm:justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
              <div className="flex justify-center sm:justify-start items-center gap-2 w-[50%] sm:w-[40%]">
                <span className="leading-7 w-[50%] sm:w-fit">Color:</span>
                <div className="w-[50%] sm:w-fit">
                  <div className="w-[23px] h-[12px] bg-red-600 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-center sm:justify-start items-center gap- w-[50%]">
                <span className="leading-7 w-[50%] sm:w-[30%]">City:</span>
                <span className="leading-7 w-[50%] sm:w-[30%]">Atlanta</span>
              </div>
            </div>
            <div className="w-[77px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] complete-status font-[600] mt-1">
              Available
            </div>
          </div>
          <button className="w-full sm:w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-5 sm:leading-[21px] text-center">
            Select
          </button>
        </div>
        <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex flex-col sm:flex-row justify-start gap-4 items-center relative">
          <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
            <img src={car.src} className="w-full h-full" />
          </div>
          <div className="w-full sm:w-[55%] h-fit flex justify-start flex-col bg-red-20 items-center sm:items-start">
            <div className="w-full flex justify-center sm:justify-start items-center pe-0 sm:pe-5 h-fit py-[-10px] -mt-2">
              <span className="font-[600] text-[15px] xs:text-[24px] leading-7 sm:leading-[36px]">
                Suzuki Swift
              </span>
            </div>
            <div className="w-full flex justify-center sm:justify-start items-center py-[-10px] -mt-1">
              <span className="font-[500] text-[14px] xs:text-[20px] leading-7 sm:leading-[30px]">
                LEM 1234
              </span>
            </div>

            <div className="w-full flex justify-center sm:justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
              <div className="flex justify-center sm:justify-start items-center gap-2 w-[50%] sm:w-[40%] pe-5">
                <span className="leading-7 w-[50%] sm:w-[42%]">Year:</span>
                <span className="leading-7 w-[50%] sm:w-[40%]">2024</span>
              </div>
              <div className="flex justify-center sm:justify-start items-center gap- w-[50%]">
                <span className="leading-7 w-[50%] sm:w-[30%]">Type:</span>
                <span className="leading-7 w-[50%] sm:w-[30%]">Sedan</span>
              </div>
            </div>

            <div className="w-full flex justify-center sm:justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
              <div className="flex justify-center sm:justify-start items-center gap-2 w-[50%] sm:w-[40%]">
                <span className="leading-7 w-[50%] sm:w-fit">Color:</span>
                <div className="w-[50%] sm:w-fit">
                  <div className="w-[23px] h-[12px] bg-red-600 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-center sm:justify-start items-center gap- w-[50%]">
                <span className="leading-7 w-[50%] sm:w-[30%]">City:</span>
                <span className="leading-7 w-[50%] sm:w-[30%]">Atlanta</span>
              </div>
            </div>
            <div className="w-[100px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] progress-status font-[600] mt-1">
              Not Available
            </div>
          </div>
          <button className="w-full sm:w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-5 sm:leading-[21px] text-center">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
