"use client";
import React from "react";
import vip from "@/public/vip.svg";
import Generalreservation from "./Generalreservation";
import Identityreservation from "./Identityreservation";
import Emergencyreservation from "./Emergencyreservation";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setAlert, setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { setreservationInfo } from "@/app/store/reservationInfo";
import { useParams, useRouter } from "next/navigation";
import Generalreservations from "./Generalreservation";
import Emergencyreservations from "./Emergencyreservation";
import Referencereservations from "./ReferenceChauffeurs";
import {
  formatDate,
  formatId,
  formatTime,
} from "@/app/Components/functions/formats";
import { MediumLoader, SmallLoader } from "@/app/Components/Loader";
import Link from "next/link";

export default function reservationInfoMainPage() {
  let { reservationInfo } = useSelector(
    (state: RootState) => state.reservationInfo
  );
  let [activeButton, setActiveButton] = useState("General");
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const [customerloading, setcustomerLoading] = useState<any>(true);
  const [chauffeursloading, setchauffeursLoading] = useState<any>(true);
  const [chauffeursData, setchauffeursData] = useState<any[]>([]);
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [statusLoading, setStatusLoading] = useState<any>(undefined);
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  const router = useRouter();
  // Customer Data
  useEffect(() => {
    async function getData() {
      try {
        setcustomerLoading(true);
        const result = await axios.post(
          `/api/getCustomerInfo/${reservationInfo?.customer_id}`
        );

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
    if (reservationInfo?.customer_id) {
      getData();
    }
  }, [reservationInfo]);
  // Chauffeur Data
  useEffect(() => {
    async function getData() {
      try {
        setchauffeursLoading(true);
        const result = await axios.post(
          `/api/getchauffeurInfo/${reservationInfo?.chauffeur_id}`
        );

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
    if (reservationInfo?.chauffeur_id) {
      getData();
    }
  }, [reservationInfo]);
  // vehicle Data
  useEffect(() => {
    async function getData() {
      try {
        setvehicleLoading(true);
        const result = await axios.post(
          `/api/getVehicleInfo/${reservationInfo?.vehicle_id}`
        );

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
  }, [reservationInfo]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getreservationInfo/${_id}`);
        if (result?.data?.data) {
          dispatch(setreservationInfo(result?.data?.data?.data));
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  async function updateCancel() {
    try {
      setStatusLoading(true);
      await axios.post(`/api/updatereservationCancel/${_id}`, {
        status: "cancel",
      });
      dispatch(setAlert("Reservation Canceled Successfully"));
    } finally {
      setStatusLoading(false);
    }
  }
  const currentDate = new Date().toISOString().split("T")[0];
  const pickUpDate = reservationInfo?.PickUpDate;
  const dropOffDate = reservationInfo?.dropOffDate;

  function getDateDifference(currentDate: any, pickUpDate: any) {
    const current: any = new Date(currentDate);
    const pickUp: any = new Date(pickUpDate);
    const diffTime: any = Math.abs(current - pickUp);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  console.log(getDateDifference(currentDate, pickUpDate));

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="h-[44px] w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-center">
                    <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
            ID: {formatId(_id)}
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Reservations"} className="hover:underline">
                Reservations / All Reservations
              </Link>
              {" / "}
              {formatId(_id)}
            </span>
          </span>
          <div className="flex justify-end items-center w-[100%] md:w-[50%] h-[44px]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                updateCancel();
              }}
              disabled={
                reservationInfo?.status === "cancel" || statusLoading === false
                  ? true
                  : false
              }
            >
              {reservationInfo?.status === "cancel" ||
              statusLoading === false ? (
                "Canceled"
              ) : statusLoading === true ? (
                <MediumLoader />
              ) : (
                "Cancel Reservation"
              )}
            </button>
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push(`/ReservationsInfo/${_id}/CompleteReservation`);
              }}
            >
              Complete Reservation
            </button>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px] bg-">
            <div className=" dark:bg-dark1 bg-white w-full flex justify-between items-center p-[50px] border border-1 border-gray-300 rounded-xl">
              <div className="w-[40%] h-[150px]">
                <div className="font-[600] text-main-blue text-[18px] ">
                  Pick-Up:
                </div>
                <div className="flex justify-start items-center relative mt-1">
                  {/* <div className="w-[9px] h-[9px] rounded-full dark:bg-white bg-main-blue absolute left-0 top-[-3.125px]"></div> */}
                  <div className="dark:bg-white bg-main-blue border object-fill w-[250px] border-none h-[1px]"></div>
                </div>

                <div className="mt-[13px]">
                  <div className="font-[400] text-[18px]">
                    {reservationInfo?.PickUpAddress
                      ? reservationInfo?.PickUpAddress
                      : "---"}
                  </div>
                  <div className="font-[400] text-[18px]">
                    {reservationInfo?.PickUpDate
                      ? formatDate(reservationInfo?.PickUpDate)
                      : "---"}
                    ,{" "}
                    {reservationInfo?.PickUpTime
                      ? formatTime(reservationInfo?.PickUpTime)
                      : "---"}
                  </div>
                </div>
              </div>
              {/* 2nd */}
              <div className="w-[40%] h-[150px]">
                <div className="font-[600] text-main-blue text-[18px] ">
                  Drop-off:
                </div>
                <div className="flex justify-start items-center relative mt-1">
                  {/* <div className="w-[9px] h-[9px] rounded-full dark:bg-white bg-main-blue absolute left-0 top-[-3.125px]"></div> */}
                  <div className="dark:bg-white bg-main-blue border object-fill w-[250px] border-none h-[1px]"></div>{" "}
                </div>

                <div className="mt-[13px]">
                  <div className="font-[400] text-[18px]">
                    {reservationInfo?.dropOffAddress
                      ? reservationInfo?.dropOffAddress
                      : "---"}
                  </div>
                  <div className="font-[400] text-[18px]">
                    {reservationInfo?.dropOffDate
                      ? formatDate(reservationInfo?.dropOffDate)
                      : "---"}
                    ,{" "}
                    {reservationInfo?.dropOffTime
                      ? formatTime(reservationInfo?.dropOffTime)
                      : "---"}
                  </div>
                </div>
              </div>
              {/* 3rd */}
              <div className=" rounded-xl border border-gray-200 p-6">
                <div className="text-main-blue font-[600] text-[24px]">
                  {reservationInfo?.duration
                    ? reservationInfo?.duration
                    : "---"}{" "}
                  Days
                </div>
              </div>
            </div>
            <div className="w-full h-fit dark:bg-dark1 bg-white  border-2 border-grey mt-5 rounded-[10px] px-5 py-1">
              <div className="w-full h-fit flex justify-between items-center mt-3 border-b-2 border-grey pb-3">
                <div
                  className={`w-[290px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "General"
                      ? "text-white bg-main-blue font-[500]"
                      : " dark:text-white text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("General")}
                >
                  Reservation Details
                </div>
                <div
                  className={`w-[290px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Identity"
                      ? "text-white bg-main-blue font-[500]"
                      : " dark:text-white text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Identity")}
                >
                  Customer Info
                </div>
                <div
                  className={`w-[290px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Emergency"
                      ? "text-white bg-main-blue font-[500]"
                      : " dark:text-white text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Emergency")}
                >
                  Vehicle Info
                </div>
                <div
                  className={`w-[290px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Chauffeur"
                      ? "text-white bg-main-blue font-[500]"
                      : " dark:text-white text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Chauffeur")}
                >
                  Chauffeur Info
                </div>
              </div>
              <div className="w-full h-[300px] flex justify-center items-start gap-8 overflow-auto scroll">
                {activeButton === "General" ? (
                  <>
                    <Generalreservations />
                  </>
                ) : activeButton === "Identity" ? (
                  <>
                    <Identityreservation
                      data={customersData}
                      loading={customerloading}
                    />
                  </>
                ) : activeButton === "Emergency" ? (
                  <Emergencyreservations
                    data={VehiclesData}
                    loading={vehicleLoading}
                  />
                ) : activeButton === "Chauffeur" ? (
                  !reservationInfo?.withChauffeur ? (
                    <div className="w-full flex justify-between items-center  px-[70px] py-[20px]">
                      No Chauffeur Was Selected In This Reservation
                    </div>
                  ) : (
                    <Referencereservations
                      data={chauffeursData}
                      loading={chauffeursloading}
                    />
                  )
                ) : null}
              </div>
            </div>
            <div className="w-full flex justify-end items-center gap-1 md:gap-3 mt-10">
              <Link
                href={`/ReservationsInfo/${_id}/Contract`}
                className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center flex justify-center items-center`}
              >
                {false ? <SmallLoader /> : "Create Contract"}
              </Link>
              <Link
                href={`/ReservationsInfo/${_id}/Invoice`}
                className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center flex justify-center items-center`}
              >
                {false ? <SmallLoader /> : "Create Invoice"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
