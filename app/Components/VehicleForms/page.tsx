"use client";
import shape from "@/public/Shape2.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { RootState } from "@/app/store";
import Rental from "./Rental";
import Insurances from "./Insurances";
import Others from "./Others";
import Damages from "./Damages";
import Feature from "./Feature";
import Info from "./Info";

export default function VehicleForms() {
  let [currentPage, setCurrentPage] = useState(0);

  return (
    <div
      className={`w-full h-fit flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-10`}
    >
      <div className="w-[100%] bg-yellow-30 flex justify-start items-end">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-[50%]">
          Add New Vehicle
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            Vehicles / Add New Vehicle
          </p>
        </h3>
      </div>
      <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-10 px-8 flex flex-col justify-start items-start relative mt-5">
        <div className="w-full h-fit flex flex-col justify-start items-center">
          <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[24px] leading-[36px]">
            <div className="w-[84%] h-[10px] flex justify-start items-center absolute top-[20px] left-[8%] border-[1px] border-grey bg-white z-[0]">
              <div
                className={` h-full flex justify-start items-center bg-main-blue z-[0] transitions2 rounded-full`}
                style={{ width: `${currentPage * 20}%` }}
              ></div>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(0)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 0
                    ? "transitions2 bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                <span className="bg-red-30 text-center -translate-x-[2px]">
                  1
                </span>
              </button>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 1
                    ? "transitions2 bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                2
              </button>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 2
                    ? "transitions2 bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                }
                     flex justify-center items-center rounded-full z-[5]`}
              >
                3
              </button>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 3
                    ? "transitions2 bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                4
              </button>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(4)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 4
                    ? "transitions2 bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                5
              </button>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(5)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 5
                    ? "transitions2 bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                6
              </button>
            </div>
          </div>
          <div className="w-full h-[50px] flex justify-between items-center relative text-[16px] leading-[19px]">
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 0 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              Vehicle Information
            </div>
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 1 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              Rental Information
            </div>
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 2 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              Insurance Info
            </div>
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 3 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              Features
            </div>
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 4 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              Damages
            </div>
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 5 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              Others
            </div>
          </div>
        </div>

        {currentPage === 0 ? (
          <Info />
        ) : currentPage === 1 ? (
          <Rental />
        ) : currentPage === 2 ? (
          <Insurances />
        ) : currentPage === 3 ? (
          <Feature />
        ) : currentPage === 4 ? (
          <Damages />
        ) : currentPage === 5 ? (
          <Others />
        ) : null}

        <div
          className={`w-full h-[100px] pt-6 flex ${
            currentPage === 0 ? "justify-end" : "justify-between"
          } items-center`}
        >
          {currentPage !== 0 ? (
            <button
              className="w-[140px] h-[44px] rounded-[10px] input-color border-2 border-grey text-main-blue  font-[500] text-[18px] leading-[21px] text-center"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Back
            </button>
          ) : null}
          {currentPage === 5 ? (
            <div className="flex justify-start items-center gap-3">
              <button className="w-[206px] h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
                Save and Close
              </button>
              <button className="w-[206px] h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
                Save and New
              </button>
              <div />
            </div>
          ) : (
            <button
              className="w-[240px] h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Save and Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
