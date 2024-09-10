"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useEffect, useState } from "react";
import d1 from "@/public/dashboard (1).svg";
import d2 from "@/public/dashboard (2).svg";
import d3 from "@/public/dashboard (3).svg";
import d4 from "@/public/dashboard (4).svg";
import d5 from "@/public/dashboard (5).svg";
import d6 from "@/public/dashboard (6).svg";
import d7 from "@/public/dashboard (7).svg";
import axios from "axios";
import { TextLoader } from "../Components/Loader";

export default function Vehicles() {
  const global = useSelector((state: RootState) => state.Global);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [reservationLoading, setreservationLoading] = useState<any>(true);
  const [reservationsData, setreservationsData] = useState<any[]>([]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useEffect(() => {
    async function getData() {
      try {
        setvehicleLoading(true);
        const result = await axios.get("/api/getVehicle", {
          headers: { "Cache-Control": "no-store" },
        });
        setVehiclesData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setvehicleLoading(false);
      }
    }
    getData();
  }, []);

  const activeVehicles = VehiclesData.filter(
    (item: any) => item.active === true
  );
  const rentOutVehicles = VehiclesData.filter(
    (item: any) => item.rentOut === true
  );

  useEffect(() => {
    async function getData() {
      try {
        setreservationLoading(true);
        const result = await axios.get("/api/getreservation", {
          headers: { "Cache-Control": "no-store" },
        });
        setreservationsData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setreservationLoading(false);
      }
    }
    getData();
  }, [global.vehicleDataReloader]);

  const completedReservations = reservationsData.filter(
    (item: any) => item.data.status === "complete"
  );
  const currentDate = new Date().toISOString().split("T")[0]; // Formats date as YYYY-MM-DD

  const completedReservationsToday = completedReservations.filter(
    (item: any) => item.data.completeDate === currentDate
  );
  const reservationsMadeToday = reservationsData.filter(
    (item: any) => item.data.reservationDate === currentDate
  );
  const totalAmount = completedReservations.reduce(
    (sum, record) => sum + Number(record.data.amount),
    0
  );
  const totalAmountToday = completedReservationsToday.reduce(
    (sum, record) => sum + Number(record.data.amount),
    0
  );

  console.log(rentOutVehicles);

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
            Dashboard
          </h3>
        </div>
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          <div className="w-[100%] flex justify-start items-start flex-col">
            <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
              Cars
            </h3>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative">
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d7.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? VehiclesData.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Total Cars{" "}
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d6.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? activeVehicles.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Cars Available
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d5.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? rentOutVehicles.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Cars Rented Out{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex justify-start items-start flex-col">
            <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
              Reservations
            </h3>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative">
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d4.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!reservationLoading ? (
                      reservationsMadeToday.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Reservations Today{" "}
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d3.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!reservationLoading ? (
                      reservationsData.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Total Reservations{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex justify-start items-start flex-col">
            <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
              Revenue
            </h3>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative">
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d2.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!reservationLoading ? (
                      "$" + totalAmountToday
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Revenue Today{" "}
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d1.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!reservationLoading ? "$" + totalAmount : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Total Revenue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
