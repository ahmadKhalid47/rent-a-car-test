"use client";
import shape from "@/public/Shape.svg";
import car from "@/public/carInfoCar.svg";

export default function Feature() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey px-10 py-8 overflow-auto">
        <div className="flex justify-between items-center w-full h-fit">
          <div className="w-[48.5%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
            <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
              Make
            </label>
            <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
              <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
                <option value="">Suzuki</option>
                <option value="">Sedan</option>
                <option value="">Sedan</option>
                <option value="">Sedan</option>
                <option value="">Sedan</option>
              </select>
              <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                <img src={shape.src} className="w-[10.5px]" />
              </div>
            </div>
          </div>{" "}
          <div className="w-[48.5%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
            <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
              Model
            </label>
            <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
              <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
                <option value="">Swift</option>
                <option value="">Sedan</option>
                <option value="">Sedan</option>
                <option value="">Sedan</option>
                <option value="">Sedan</option>
              </select>
              <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                <img src={shape.src} className="w-[10.5px]" />
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex justify-start gap-4 items-center relative">
          <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
            <img src={car.src} className="w-full h-full" />
          </div>
          <div className="w-[55%] h-fit flex justify-start flex-col bg-red-20 items-start">
            <div className="w-full flex justify-start items-center pe-5 h-fit py-[-10px] -mt-2">
              <span className="font-[600] text-[24px] leading-[36px]">
                Suzuki Swift{" "}
              </span>
            </div>
            <div className="w-full flex justify-start items-center py-[-10px] -mt-1">
              <span className="font-[500] text-[20px] leading-[30px]">
                LEM 1234{" "}
              </span>
            </div>

            <div className="w-full flex justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <span className=" w-[42%]">Year:</span>
                <span className=" w-[40%]">2024</span>
              </div>
              <div className="flex justify-start items-center gap- w-[50%]">
                <span className=" w-[30%]">Type:</span>
                <span className=" w-[30%]">Sedan</span>
              </div>
            </div>

            <div className="w-full flex justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <span className="">Color:</span>
                <div className="">
                  <div className="w-[23px] h-[12px] bg-red-600 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap- w-[50%]">
                <span className=" w-[30%]">City:</span>
                <span className=" w-[30%]">Atlanta</span>
              </div>
            </div>
            <div className="w-[77px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] complete-status font-[600] mt-1">
              Available
            </div>
          </div>
          <button className="w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Select
          </button>
        </div>
        <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex justify-start gap-4 items-center relative">
          <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
            <img src={car.src} className="w-full h-full" />
          </div>
          <div className="w-[55%] h-fit flex justify-start flex-col bg-red-20 items-start">
            <div className="w-full flex justify-start items-center pe-5 h-fit py-[-10px] -mt-2">
              <span className="font-[600] text-[24px] leading-[36px]">
                Suzuki Swift{" "}
              </span>
            </div>
            <div className="w-full flex justify-start items-center py-[-10px] -mt-1">
              <span className="font-[500] text-[20px] leading-[30px]">
                LEM 1234{" "}
              </span>
            </div>

            <div className="w-full flex justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <span className=" w-[42%]">Year:</span>
                <span className=" w-[40%]">2024</span>
              </div>
              <div className="flex justify-start items-center gap- w-[50%]">
                <span className=" w-[30%]">Type:</span>
                <span className=" w-[30%]">Sedan</span>
              </div>
            </div>

            <div className="w-full flex justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <span className="">Color:</span>
                <div className="">
                  <div className="w-[23px] h-[12px] bg-red-600 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap- w-[50%]">
                <span className=" w-[30%]">City:</span>
                <span className=" w-[30%]">Atlanta</span>
              </div>
            </div>
            <div className="w-[100px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] progress-status font-[600] mt-1">
              Not Available
            </div>
          </div>
          <button className="w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
