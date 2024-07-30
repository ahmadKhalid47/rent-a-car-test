"use client";
import shape from "@/public/Shape2.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { RootState } from "@/app/store";
import Info from "./Info";
import Rental from "./Rental";
import Insurances from "./Insurances";
import Others from "./Others";
import Damages from "./Damages";
import Feature from "./Feature";

export default function CostumerForms() {
  let [currentPage, setCurrentPage] = useState(0);

  return (
    <div
      className={`w-full h-fit flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-10`}
    >
      <div className="w-[100%] bg-yellow-30 flex justify-start items-end">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-[50%]">
          Add New Costumer
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            Costumers / Add New Costumer
          </p>
        </h3>
      </div>
      <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-10 px-8 flex flex-col justify-start items-start relative bg-red-700">
        <div className="w-full h-fit flex flex-col justify-start items-center">
          <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[24px] leading-[36px]">
            <div className="w-[84%] h-[10px] flex justify-start items-center absolute top-[20px] left-[8%] border-[1px] border-grey bg-white z-[0]">
              <div
                className={` h-full flex justify-start items-center bg-main-blue z-[0]`}
                style={{ width: `${currentPage * 34}%` }}
              ></div>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(0)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 0
                    ? "bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                1
              </button>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 1
                    ? "bg-main-blue text-white"
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
                    ? "bg-main-blue text-white"
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
                    ? "bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                4
              </button>
            </div>
            {/* <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                onClick={() => setCurrentPage(4)}
                className={`w-[60px] h-[60px] ${
                  currentPage >= 4
                    ? "bg-main-blue text-white"
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
                    ? "bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                6
              </button>
            </div> */}
          </div>
          <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[16px] leading-[19px]">
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage === 0 ? "text-main-blue" : ""
              }`}
            >
              General Information
            </div>
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage === 1 ? "text-main-blue" : ""
              }`}
            >
              Identity Information
            </div>
            <div
              className={`w-[15% h-[50px]  flex justify-center text-center items-center ${
                currentPage === 2 ? "text-main-blue" : ""
              }`}
            >
              Emergency Information
            </div>
            <div
              className={`w-[15% h-[50px]  flex justify-center text-center items-center ${
                currentPage === 3 ? "text-main-blue" : ""
              }`}
            >
              Reference Information
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
        ) : null}

        <div
          className={`w-full h-[100px] pt-6 flex ${
            currentPage === 0 ? "justify-end" : "justify-between"
          } items-center`}
        >
          {currentPage !== 0 ? (
            <button
              className="px-6 h-[44px] rounded-[10px] bg-white border-2 border-grey text-main-blue  font-[500] text-[18px] leading-[21px] text-center"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Back
            </button>
          ) : null}
          {currentPage === 5 ? (
            <div className="flex justify-start items-center gap-3">
              <button className="px-6 h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
                Save and Close
              </button>
              <button className="px-6 h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center">
                Save and New
              </button>
              <div />
            </div>
          ) : (
            <button
              className="px-6 h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[18px] leading-[21px] text-center"
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
