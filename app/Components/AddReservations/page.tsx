"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import Rental from "./Rental";
import Insurances from "./Insurances";
import Others from "./Others";
import Feature from "./Feature";
import Info from "./Info";
import axios from "axios";

export default function Reservations() {
  let global = useSelector((state: RootState) => state.Global);
  let reservation = useSelector((state: RootState) => state.reservation);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  let [currentPage, setCurrentPage] = useState(0);
  const [customerloading, setcustomerLoading] = useState<any>(true);
  const [chauffeursloading, setchauffeursLoading] = useState<any>(true);
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  let dispatch = useDispatch();
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [chauffeursData, setchauffeursData] = useState<any[]>([]);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  // Customer Data
  useEffect(() => {
    async function getData() {
      try {
        setcustomerLoading(true);
        const result = await axios.get("/api/getCustomer", {
          headers: { "Cache-Control": "no-store" },
        });

        if (result?.data?.data) {
          setCustomersData(result.data.data);
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setcustomerLoading(false);
      }
    }
    getData();
  }, []);
  // Chauffeur Data
  useEffect(() => {
    async function getData() {
      try {
        setchauffeursLoading(true);
        const result = await axios.get("/api/getchauffeur", {
          headers: { "Cache-Control": "no-store" },
        });

        if (result?.data?.data) {
          setchauffeursData(result.data.data);
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setchauffeursLoading(false);
      }
    }
    getData();
  }, []);
  // vehicle Data
  useEffect(() => {
    async function getData() {
      try {
        setvehicleLoading(true);
        const result = await axios.get("/api/getVehicle", {
          headers: { "Cache-Control": "no-store" },
        });

        if (result?.data?.data) {
          setVehiclesData(result.data.data);
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setvehicleLoading(false);
      }
    }
    getData();
  }, []);

  const customerDataById = customersData.find(
    (customer: any) => customer._id === reservation?.customer_id
  );
  const chauffeurDataById = chauffeursData.find(
    (customer: any) => customer._id === reservation?.chauffeur_id
  );
  const vehicleDataById = VehiclesData.find(
    (customer: any) => customer._id === reservation?.vehicle_id
  );

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%]  flex justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Add New Reservations
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Reservations / Add New Reservations
            </p>
          </h3>
        </div>
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-8 flex flex-col justify-start items-start relative mt-5">
          <div className="w-full h-fit flex flex-col justify-start items-center">
            <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[18px] md:text-[24px] leading-[36px]">
              <div className="w-[84%] h-[10px] flex justify-start items-center absolute top-[20px] left-[8%] border-[1px] border-grey bg-white z-[0]">
                <div
                  className={` h-full flex justify-start items-center bg-main-blue z-[0] transitions2 rounded-full`}
                  style={{ width: `${currentPage * 34}%` }}
                ></div>
              </div>
              <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => setCurrentPage(0)}
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
                  onClick={() => setCurrentPage(1)}
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
                  onClick={() => setCurrentPage(2)}
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
                  onClick={() => setCurrentPage(3)}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
                    currentPage >= 3
                      ? "transitions2 bg-main-blue text-white"
                      : "bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  4
                </button>
              </div>
            </div>
            <div className="w-full h-[50px] flex justify-between items-center relative text-[10px] sm:text-[12px] md:text-[16px] leading-[14px] md:leading-[19px]">
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 0 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Select Customer
              </div>
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 1 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Select Chauffeur
              </div>
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 2 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Reservation Details
              </div>
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 3 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Select Vehicle
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col-reverse 1200:flex-row h-fit justify-between items-start gap-4 1200:gap-0">
            <div
              className={`w-full 1200:w-[58%] ${
                currentPage === 2 ? "1200:h-[650px]" : "1200:h-[570px]"
              }`}
            >
              {currentPage === 0 ? (
                <Info data={customersData} loading={customerloading} />
              ) : currentPage === 1 ? (
                <Rental data={chauffeursData} loading={chauffeursloading} />
              ) : currentPage === 2 ? (
                <Insurances />
              ) : currentPage === 3 ? (
                <Feature data={VehiclesData} loading={vehicleLoading} />
              ) : null}
            </div>
            <div
              className={`w-full 1200:w-[40%] ${
                currentPage === 2 ? "1200:h-[650px]" : "1200:h-[570px]"
              }`}
            >
              <Others />
            </div>
          </div>

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
            {currentPage === 3 ? (
              <div className="flex justify-start items-center gap-1 md:gap-3">
                <button className="px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
                  Save and Close
                </button>
                <button className="px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
                  Save and New
                </button>
              </div>
            ) : (
              <button
                className="px-2 md:px-0 w-fit md:w-[240px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Save and Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
