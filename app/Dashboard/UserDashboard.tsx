"use client";
import React from "react";
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
import { TextLoader, MediumLoader } from "../Components/Loader";
import Link from "next/link";
import { formatDate2 } from "../Components/functions/formats";
import { TypeInput } from "../Components/InputComponents/TypeInput";
import { SelectInput } from "../Components/InputComponents/SelectInput";
import Image from "next/image";

export default function UserDashboard() {
  const global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let {Configurations} = useSelector((state: RootState) => state.Configurations);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [configurationsLoading, setConfigurationsLoading] = useState<any>(true);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const [make, setMake] = useState<any>("");
  const [model, setModel] = useState<any>("");
  const [regNo, setRegNo] = useState<any>("");
  const [date, setDate] = useState<any>("");
  const [time, setTime] = useState<any>("");
  const [carAvailable, setCarAvailable] = useState<any>(undefined);
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
        const result = await axios.post("/api/getUserDashboard", {
          createdBy: myProfile._id,
        });
        setVehiclesData(result.data.vehicleData);
        setreservationsData(result.data.reservationData);
      } catch (error) {
        console.log(error);
      } finally {
        setvehicleLoading(false);
      }
    }
    if (myProfile._id) getData();
  }, [myProfile._id]);

  const activeVehicles = VehiclesData.filter(
    (item: any) => item.rentOut === false && item.active === true
  );
  const rentOutVehicles = VehiclesData.filter(
    (item: any) => item.rentOut === true
  );

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

  function submitButton() {
    let filtered: any = activeVehicles;

    if (make) {
      const lowercasedQuery = make?.trim()?.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.make?.trim()?.toLowerCase();
        return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }

    if (model) {
      const lowercasedQuery = model?.trim()?.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.model?.trim()?.toLowerCase();
        return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }

    if (regNo) {
      const lowercasedQuery = regNo?.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.registration
          ?.trim()
          ?.toLowerCase();
        return keyValueInVehicle === lowercasedQuery;
        // return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }
    const allFilteredReservations: any[] = [];

    filtered.forEach((vehicle: any) => {
      const vehicleId = vehicle._id;

      const filteredReservations = reservationsData.filter(
        (reservation: any) => reservation.data.vehicle_id === vehicleId
      );

      allFilteredReservations.push(...filteredReservations);
    });

    let filteredReservations = allFilteredReservations;
    if (date || time) {
      filteredReservations = filterReservationsByDateTime(
        allFilteredReservations,
        date,
        time
      );
      setCarAvailable(filtered?.length - filteredReservations?.length);
    } else if (!date && !time && !make && !model && !regNo) {
      setCarAvailable(undefined);
    } else {
      setCarAvailable(filtered?.length);
    }
  }

  function filterReservationsByDateTime(
    reservations: any,
    date: any,
    time: any
  ) {
    return reservations.filter((reservation: any) => {
      const pickUpDateTime = new Date(
        `${reservation.data.PickUpDate}T${reservation.data.PickUpTime}`
      );
      const dropOffDateTime = new Date(
        `${reservation.data.dropOffDate}T${reservation.data.dropOffTime}`
      );

      if (date && time) {
        const selectedDateTime = new Date(`${date}T${time}`);
        return (
          selectedDateTime >= pickUpDateTime &&
          selectedDateTime <= dropOffDateTime
        );
      }

      if (date && !time) {
        const selectedDate = new Date(date);
        const pickUpDate = new Date(reservation.data.PickUpDate);
        const dropOffDate = new Date(reservation.data.dropOffDate);
        return selectedDate >= pickUpDate && selectedDate <= dropOffDate;
      }

      if (!date && time) {
        const selectedTime = time;
        const pickUpTime = reservation.data.PickUpTime;
        const dropOffTime = reservation.data.dropOffTime;
        return selectedTime >= pickUpTime && selectedTime <= dropOffTime;
      }

      return false;
    });
  }

  function filterReg() {
    let filtered: any = VehiclesData;

    if (make) {
      const lowercasedQuery = make?.trim()?.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.make?.trim()?.toLowerCase();
        return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }

    if (model) {
      const lowercasedQuery = model?.trim()?.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.model?.trim()?.toLowerCase();
        return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }

    if (!model && !make) {
      filtered = [];
    }
    return filtered;
  }

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="h-[44px] w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-center">
          <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
            Dashboard
          </span>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-8 mt-5">
          <div className="w-[100%] flex justify-start items-start flex-col">
            <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%]">
              Vehicles Details
            </span>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative">
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d7.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? VehiclesData?.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Total Vehicles{" "}
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d6.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? activeVehicles?.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Vehicles Available
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d5.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? rentOutVehicles?.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Vehicles Rented Out{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex justify-start items-start flex-col">
            <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%]">
              Reservations Details
            </span>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative">
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d4.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? (
                      reservationsMadeToday?.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Reservations Today{" "}
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d3.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? (
                      reservationsData?.length
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
            <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%]">
              Revenue Details
            </span>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative">
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d2.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? (
                      `${global.currentCurrency} ` +
                      totalAmountToday.toLocaleString("en-US")
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Revenue Today{" "}
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d1.src} alt="" width={40} height={40} />{" "}
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? (
                      `${global.currentCurrency} ` +
                      totalAmount.toLocaleString("en-US")
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Total Revenue
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex justify-between items-start bg">
            <div className="h-[370px] flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-[49%] dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-6 py-6">
              <div className="w-full flex justify-between items-end h-fit">
                <h1 className="w-fit text-[18px] font-[400] leading-[0px]">
                  Car Availability
                </h1>
                <h1
                  className={`w-fit text-[18px] font-[600] leading-[0px] ${
                    carAvailable && carAvailable !== 0
                      ? "text-main-blue"
                      : "text-red-500"
                  }`}
                >
                  {carAvailable !== undefined
                    ? carAvailable === 0
                      ? "Not Available"
                      : carAvailable === 1
                      ? "Hooray! " + carAvailable + " Car Available !"
                      : "Hooray! " + carAvailable + " Vehicles Available !"
                    : ""}
                </h1>
              </div>
              {configurationsLoading ? (
                <div className="pt-5 w-full">
                  <MediumLoader />
                </div>
              ) : (
                <>
                  <div className="w-full flex justify-between items-start">
                    <SelectInput
                      setState={setMake}
                      label={"Make"}
                      value={make}
                      required={false}
                      options={Configurations?.make?.map(
                        (item: any) => item.make
                      )}
                    />
                    <SelectInput
                      setState={setModel}
                      label={"Model"}
                      value={model}
                      required={false}
                      options={Configurations?.model
                        ?.filter((item: any) => item.make?.trim() === make)
                        .map((item: any) => item.model)}
                    />
                  </div>
                  <div className="w-[208%]">
                    <SelectInput
                      setState={setRegNo}
                      label={"Registration Number"}
                      value={regNo}
                      required={false}
                      options={filterReg()?.map(
                        (item: any) => item.data.registration
                      )}
                    />
                  </div>

                  <div className="w-full flex justify-between items-start">
                    <TypeInput
                      setState={setDate}
                      label={"Date & Time"}
                      value={date}
                      required={false}
                      type={"date"}
                      widthProp="sm:w-[48%]"
                    />
                    <div
                      className={`w-[100%] sm:w-[48%] h-fit flex flex-col justify-start items-start gap-1`}
                    >
                      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] text-transparent">
                        {"label"}
                      </label>
                      <div className="w-full h-fit flex justify-between items-center relative">
                        <input
                          type={"time"}
                          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                          onChange={(e) => {
                            setTime(e.target.value);
                          }}
                          value={time}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="px-2 md:px-0 w-fit md:w-full py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                    onClick={() => {
                      submitButton();
                    }}
                  >
                    Check
                  </button>
                </>
              )}
            </div>
            <div className="h-[370px] flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-[49%] dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-6 py-6">
              <div className="w-full flex justify-between items-end h-fit">
                <h1 className="w-fit text-[18px] font-[400] leading-[0px]">
                  Recent Reservations
                </h1>
                <Link
                  href="/Reservations"
                  className="w-fit text-[14px] font-[400] leading-[12px] hover:underline"
                >
                  View More
                </Link>
              </div>
              <div className="w-full flex flex-col justify-start items-center">
                <div className="w-full h-[32px] flex justify-between items-center dark:bg-dark2 bg-light-grey border-[1px] border-grey rounded-[6px] px-3 text-[16px] font-[400] leading-[17px]">
                  <span className="w-[35%]">Customer</span>
                  <span className="w-[30%]">Vehicle</span>
                  <span className="w-[35%]">Duration</span>
                </div>
                {vehicleLoading ? (
                  <>
                    <div className="pt-5 w-full">
                      <MediumLoader />
                    </div>
                  </>
                ) : (
                  reservationsData?.slice(0, 8).map((item, index) => (
                    <Link
                      href={`/ReservationsInfo/${item?._id}`}
                      key={index}
                      className={`w-full h-[32px] flex justify-between items-center dark:bg-dark1 bg-white ${
                        index === 7 ? "" : "border-b-[1px]"
                      } border-grey px-3`}
                    >
                      <span className="w-[35%] text-[14px] pe-3 truncate font-[400] leading-[14px]">
                        {item.data.customerName}
                      </span>
                      <span className="w-[30%] text-[14px] pe-3 truncate font-[400] leading-[14px]">
                        {item.data.vehicleName}
                      </span>
                      <span className="w-[35%] text-[14px] pe-3 truncate font-[400] leading-[14px]">
                        {formatDate2(item.data.PickUpDate)} to{" "}
                        {formatDate2(item.data.dropOffDate)}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
