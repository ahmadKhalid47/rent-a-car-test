"use client";
import { FormEvent, useState, useEffect } from "react";
import Rental from "./Rental";
import Insurances from "./Insurances";
import Others from "./Others";
import Damages from "./Damages";
import Feature from "./Feature";
import Info from "./Info";

export default function VehicleForms() {
  let [currentPage, setCurrentPage] = useState(0);
  let [formVerified, setFormVerified] = useState(false);

  let handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setFormVerified(false);
    event.preventDefault();
    setFormVerified(true);
  };

  function handleSetCurrentPage(page: any) {
    setCurrentPage(formVerified ? page : currentPage);
  }

  useEffect(() => {
    setFormVerified(false);
  }, [currentPage]);

  return (
    <div
      className={`w-full h-fit flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px] pb-10`}
    >
      <div className="w-[100%]  flex justify-start items-end">
        <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
          Add New Vehicle
          <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
            {" "}
            Vehicles / Add New Vehicle
          </p>
        </h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-8 flex flex-col justify-start items-start relative mt-5"
      >
        <div className="w-full h-fit flex flex-col justify-start items-center">
          <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[18px] md:text-[24px] leading-[36px]">
            <div className="w-[84%] h-[10px] flex justify-start items-center absolute top-[20px] left-[8%] border-[1px] border-grey bg-white z-[0]">
              <div
                className={` h-full flex justify-start items-center bg-main-blue z-[0] transitions2 rounded-full`}
                style={{ width: `${currentPage * 20}%` }}
              ></div>
            </div>
            <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
              <button
                type="submit"
                onClick={() => handleSetCurrentPage(0)}
                className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
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
                type="submit"
                onClick={() => handleSetCurrentPage(1)}
                className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
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
                type="submit"
                onClick={() => handleSetCurrentPage(2)}
                className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
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
                type="submit"
                onClick={() => handleSetCurrentPage(3)}
                className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
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
                type="submit"
                onClick={() => handleSetCurrentPage(4)}
                className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
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
                type="submit"
                onClick={() => handleSetCurrentPage(5)}
                className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
                  currentPage >= 5
                    ? "transitions2 bg-main-blue text-white"
                    : "bg-white border-[1px] border-grey"
                } flex justify-center items-center rounded-full z-[5]`}
              >
                6
              </button>
            </div>
          </div>
          <div className="w-full h-[50px] flex justify-between items-center relative text-[10px] sm:text-[12px] md:text-[16px] leading-[14px] md:leading-[19px]">
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
          className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 ${
            currentPage === 0 ? "justify-end" : "justify-between"
          } items-center`}
        >
          {currentPage !== 0 ? (
            <button
              className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Back
            </button>
          ) : null}
          {currentPage === 5 ? (
            <div className="flex justify-start items-center gap-1 md:gap-3">
              <button className="px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
                Save and Close
              </button>
              <button className="px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
                Save and New
              </button>
              <div />
            </div>
          ) : (
            <button
              className="px-2 md:px-0 w-fit md:w-[240px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() =>
                setCurrentPage(formVerified ? currentPage + 1 : currentPage)
              }
              type="submit"
            >
              Save and Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
