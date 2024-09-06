"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import shape from "@/public/Shape2.svg";
import { useRouter } from "next/navigation";
import ReservationDetails from "../ReservationDetails";
import ReservationInfo from "../ReservationCustomerInfo";
import ReservationCustomerInfo from "../ReservationCustomerInfo";
import ReservationVehicleInfo from "../ReservationVehicleInfo";
import ReservationChauffeurInfo from "../ReservationChauffeurInfo";
const ReservationPreview = () => {
  let [activeButton, setActiveButton] = useState("Reservation Details");
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [showLess, setShowLess] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            ID: 539485
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Reservations / All Reservations / 539485
            </p>
          </h3>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("/Components/AddCustomer");
              }}
            >
              Complete Reservation
            </button>
          </div>
        </div>
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-1 xs:px-3 md:px-8 md:py-8 flex flex-col justify-start items-start gap-[15px] mt-5">
          <div className=" bg-white w-full flex justify-between items-center p-[50px] border border-1 border-gray-300 rounded-xl">
            <div>
              <div className="font-[600] text-[#242E69] text-[18px]  ">
                Pick-Up:
              </div>
              <div className="flex">
                <div className="p-[3px] rounded-full bg-[#242E69] object-cover"></div>

                <div className=" border-b-[#242E69] border object-fill bg-white"></div>
              </div>

              <div className="mt-[13px]">
                <div className="font-[400] text-[18px]">
                  35 Roanoke Road, North York
                </div>
                <div className="font-[400] text-[18px]">Ontario, Canada</div>
                <div className="font-[400] text-[18px]">
                  5 Feb 2022, 9:00 Am
                </div>
              </div>
            </div>
            {/* 2nd */}
            <div>
              <div className="font-[600] text-[#242E69] text-[18px]  ">
                Drop-off:
              </div>
              <div className="flex">
                <div className="p-[3px] rounded-full bg-[#242E69] object-cover"></div>

                <div className=" border-b-[#242E69] border object-fill bg-white"></div>
              </div>

              <div className="mt-[13px]">
                <div className="font-[400] text-[18px]">
                  11 Boulevard Cremazie, North
                </div>
                <div className="font-[400] text-[18px]">York, Canada</div>
                <div className="font-[400] text-[18px]">
                  20 Feb 2022, 9:00 Am
                </div>
              </div>
            </div>
            {/* 3rd */}
            <div className=" rounded-xl border border-gray-200 p-6 ">
              <div className="text-[#242E69] font-[600] text-[24px]">
                15 Days
              </div>
            </div>
          </div>

          {/* next section */}

          <div className="w-full h-fit bg-white  border-2 border-grey mt-5 rounded-[10px] px-5 py-1">
            <div className="w-full h-fit flex justify-between items-center mt-3 border-b-2 border-grey pb-3">
              <div
                className={`w-[215px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Reservation Details"
                    ? "text-white bg-main-blue font-[500]"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Reservation Details")}
              >
                Reservation Details
              </div>
              <div
                className={`w-[215px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Customer Info"
                    ? "text-white bg-main-blue font-[500]"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Customer Info")}
              >
                Customer Info
              </div>
              <div
                className={`w-[215px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Vehicle Info"
                    ? "text-white bg-main-blue font-[500]"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Vehicle Info")}
              >
                Vehicle Info
              </div>
              <div
                className={`w-[215px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                  activeButton === "Chauffeur Info"
                    ? "text-white bg-main-blue font-[500]"
                    : " text-black "
                } font-[400] text-[18px] leading-[22px]`}
                onClick={() => setActiveButton("Chauffeur Info")}
              >
                Chauffeur Info
              </div>
            </div>
            <div className="w-full h-fit flex justify-center items-start gap-8">
              {activeButton === "Reservation Details" ? (
                <><ReservationDetails/></>
              ) : activeButton === "Customer Info" ? (
                <><ReservationCustomerInfo/></>
              ) : activeButton === "Vehicle Info" ? (
                <><ReservationVehicleInfo/></>
              ) : activeButton === "Chauffeur Info" ? (
                <><ReservationChauffeurInfo/></>
              ) : null}
            </div>
          </div>

          <div className="flex  ml-auto gap-5">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("");
              }}
            >
              Complete Reservation
            </button>
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("");
              }}
            >
              Complete Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPreview;
