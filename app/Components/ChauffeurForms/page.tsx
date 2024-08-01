"use client";
import shape from "@/public/Shape2.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { RootState } from "@/app/store";
import Rental from "./Rental";
import Insurances from "./Insurances";
import Others from "./Others";
import Damages from "./Damages";
import Feature from "./Feature";
import Info from "./Info";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFieldNameR } from "@/app/store/Global";

export default function ChauffeurForms() {
  let [currentPage, setCurrentPage] = useState(0);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFieldNameR("AddChauffeur"));
  }, []);

  return (
    <div
      className={`w-full h-fit flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-10`}
    >
      <div className="w-[100%] bg-yellow-30 flex justify-start items-end">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-[50%]">
          Add New Chauffeur
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            Chauffeurs / Add New Chauffeur
          </p>
        </h3>
      </div>
      <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-10 px-8 flex flex-col justify-start items-start relative mt-5">
        <div className="w-full h-fit flex flex-col justify-start items-center">
          <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[24px] leading-[36px]">
            <div className="w-[84%] h-[10px] flex justify-start items-center absolute top-[20px] left-[8%] border-[1px] border-grey bg-white z-[0]">
              <div
                className={` h-full flex justify-start items-center bg-main-blue z-[0]`}
                style={{ width: `${currentPage * 50}%` }}
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
            {/* <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
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
            </div> */}
       
          </div>
          <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[16px] leading-[19px]">
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 0 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              General Information
            </div>
            <div
              className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 1 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              Identity Information
            </div>
            <div
              className={`w-[15% h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 2 ? "text-main-blue font-[600]" : " font-[400]"
              }`}
            >
              Emergency Information
            </div>
            <div
              className={`w-[15% h-[50px]  flex justify-center text-center items-center ${
                currentPage >= 3 ? "text-main-blue font-[600]" : " font-[400]"
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
              className="w-[140px] h-[44px] rounded-[10px] input-color border-2 border-grey text-main-blue  font-[500] text-[18px] leading-[21px] text-center"
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
