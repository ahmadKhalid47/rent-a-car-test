"use client";
import React from "react";
import car from "@/public/PaymentCar.svg";
import { TempTypeInputWidth } from "../../Components/InputComponents/TypeInput";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setdiscount,
  setduration,
  setamount,
  setdurationinDays,
  setcarTotal,
  setchauffeurTotal,
  setvatInclude,
} from "@/app/store/reservations";
import { useEffect, useState } from "react";
import { setAllValues as setAllInvoiceValues } from "@/app/store/Invoicing";
import axios from "axios";

interface dataType {
  customerData: any;
  chauffeurData: any;
  vehicleData: any;
}

export default function Others({ chauffeurData, vehicleData }: dataType) {
  let dispatch = useDispatch();
  let reservation = useSelector((state: RootState) => state.reservation);
  let carRentPerDays = isNaN(Number(vehicleData?.rentDay))
    ? 0
    : Number(vehicleData?.rentDay);
  let chauffeurRentPerDays = isNaN(Number(chauffeurData?.rentPerDay))
    ? 0
    : Number(chauffeurData?.rentPerDay);
  let carRentPerHours = isNaN(Number(vehicleData?.rentHour))
    ? 0
    : Number(vehicleData?.rentHour);
  let carRentPerWeeks = isNaN(Number(vehicleData?.rentWeek))
    ? 0
    : Number(vehicleData?.rentWeek);
  let carRentPerMonths = isNaN(Number(vehicleData?.rentMonth))
    ? 0
    : Number(vehicleData?.rentMonth);
  let discount = isNaN(Number(reservation.discount))
    ? 0
    : Number(reservation.discount);
  const Invoicing = useSelector((state: RootState) => state.Invoicing);
  const global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  function calculateDaysBetween(pickUpDate: any, dropOffDate: any) {
    if (!pickUpDate || !dropOffDate) {
      return 0;
    }
    const pickUp = new Date(pickUpDate);
    const dropOff = new Date(dropOffDate);
    const differenceInTime = dropOff.getTime() - pickUp.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.ceil(differenceInDays);
  }
  function calculateTimeDifference(pickUpTime: string, dropOffTime: string) {
    if (!pickUpTime || !dropOffTime) {
      return 0;
    }
    const [pickUpHours, pickUpMinutes] = pickUpTime.split(":").map(Number);
    const [dropOffHours, dropOffMinutes] = dropOffTime.split(":").map(Number);
    const today = new Date().toDateString();
    const pickUpDateTime = new Date(
      `${today} ${pickUpHours}:${pickUpMinutes}:00`
    );
    const dropOffDateTime = new Date(
      `${today} ${dropOffHours}:${dropOffMinutes}:00`
    );
    const differenceInTime =
      dropOffDateTime.getTime() - pickUpDateTime.getTime();
    const differenceInHours = Math.floor(differenceInTime / (1000 * 60 * 60));
    return differenceInHours;
  }
  const daysBetween = calculateDaysBetween(
    reservation?.PickUpDate,
    reservation?.dropOffDate
  );
  const timeBetween = calculateTimeDifference(
    reservation?.PickUpTime,
    reservation?.dropOffTime
  );
  const weeksBetween = daysBetween / 7;
  const monthsBetween = daysBetween / 30;
  let [days, setDays] = useState(0);
  let [weeks, setWeeks] = useState(0);
  let [months, setMonths] = useState(0);

  useEffect(() => {
    dispatch(
      setduration(JSON.stringify(daysBetween ? daysBetween : timeBetween))
    );
    dispatch(setdurationinDays(daysBetween ? true : false));
  }, [daysBetween]);

  function calculateRentPerHours(timeBetween: any, carRentPerHour: any) {
    let rentWithHours = timeBetween * carRentPerHour;
    return rentWithHours;
  }

  function tempAmount() {
    let total = 0;
    let totalDays = daysBetween;

    let months = Math.floor(totalDays / 30);
    let remainingDaysAfterMonths = totalDays % 30;

    let weeks = Math.floor(remainingDaysAfterMonths / 7);
    let days = remainingDaysAfterMonths % 7;
    setDays(days);
    setWeeks(weeks);
    setMonths(months);
    if (daysBetween < 1) {
      total = calculateRentPerHours(timeBetween, carRentPerHours);
    } else {
      let totalPerDays = days * carRentPerDays;
      let totalPerWeeks = weeks * carRentPerWeeks;
      let totalPerMonths = months * carRentPerMonths;
      total = totalPerDays + totalPerWeeks + totalPerMonths;
    }
    return total;
  }

  useEffect(() => {
    dispatch(setcarTotal(tempAmount()));
  }, [
    reservation?.carTotal,
    daysBetween,
    timeBetween,
    weeksBetween,
    monthsBetween,
    carRentPerDays,
    carRentPerWeeks,
    carRentPerMonths,
    carRentPerHours,
  ]);

  useEffect(() => {
    dispatch(setvatInclude(Invoicing?.vatInclude));
  }, []);

  useEffect(() => {
    if (daysBetween < 1) {
      dispatch(setchauffeurTotal(chauffeurRentPerDays * 1));
    } else {
      dispatch(setchauffeurTotal(chauffeurRentPerDays * daysBetween));
    }
  }, [daysBetween, chauffeurRentPerDays]);

  useEffect(() => {
    dispatch(
      setamount(
        JSON.stringify(varTotalAmount(varPerNum, totalAmount) - discount)
      )
    );
  }, [
    reservation?.carTotal,
    daysBetween,
    timeBetween,
    weeksBetween,
    monthsBetween,
    carRentPerDays,
    carRentPerWeeks,
    carRentPerMonths,
    carRentPerHours,
    discount,
  ]);

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getInvoicing", {
          createdBy: myProfile._id,
        });
        dispatch(setAllInvoiceValues(result.data.data[0].data));
        console.log(result.data.data[0].data);
      } catch (error) {
        console.log(error);
      }
    }
    if (myProfile._id) getData();
  }, [myProfile._id]);

  let varPerNum = isNaN(Number(Invoicing?.vatPercentage))
    ? 0
    : Number(Invoicing?.vatInclude ? Invoicing?.vatPercentage : "0");

  let totalAmount =
    daysBetween || timeBetween
      ? reservation?.carTotal + reservation?.chauffeurTotal
      : 0;
  console.log(reservation?.amount);
  function varTotalAmount(varPer: any, total: any) {
    let tempvar = (total * varPer) / 100;
    return tempvar + total;
  }
  function varAmount(varPer: any, total: any) {
    let tempvar = (total * varPer) / 100;
    return tempvar;
  }

  return (
    <div className="w-full h-full  ">
      <div className="flex flex-col justify-start items-center gap-x-[4%] gap-y-0 xs:gap-y-3 w-full h-full dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-8 py-8">
        <img src={car.src} className="mt-2" />
        <h3 className="font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black text-center w-full">
          Payment Calculation
        </h3>
        <div className="w-full h-fit mt-1 rounded-[10px] border-[1px] border-grey font-[400] text-[14px] leading-[17px] pt-5 pb-3 px-4 flex flex-col justify-start items-center gap-y-3 ">
          <div className="w-full flex justify-between items-center h-fit">
            <span>Rental Period</span>
            <span>
              {daysBetween < 1 ? (
                <span>
                  {timeBetween} {timeBetween === 1 ? "Hour" : "Hours"}
                </span>
              ) : (
                <>
                  {months !== 0 && (
                    <span>
                      {months} {months === 1 ? "Month" : "Months"}
                    </span>
                  )}{" "}
                  {weeks !== 0 && (
                    <span>
                      {weeks} {weeks === 1 ? "Week" : "Weeks"}
                    </span>
                  )}{" "}
                  {days !== 0 && (
                    <span>
                      {days} {days === 1 ? "Day" : "Days"}
                    </span>
                  )}{" "}
                </>
              )}
            </span>
          </div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>
              Car Rent {global.currentCurrency}{" "}
              {daysBetween < 1 ? (
                <span>{timeBetween + " x " + carRentPerHours}</span>
              ) : (
                <>
                  {months !== 0 && (
                    <span>{months + " x " + carRentPerMonths}</span>
                  )}
                  {weeks !== 0 && months !== 0 && <span>{" + "}</span>}
                  {weeks !== 0 && (
                    <span>{weeks + " x " + carRentPerWeeks}</span>
                  )}
                  {weeks !== 0 && days !== 0 && <span>{" + "}</span>}
                  {days !== 0 && (
                    <span>{days + " x " + carRentPerDays}</span>
                  )}{" "}
                </>
              )}
            </span>
            <span>
              {global.currentCurrency}
              {isNaN(reservation?.carTotal)
                ? 0
                : reservation?.carTotal.toLocaleString("en-US")}{" "}
            </span>
          </div>

          {reservation?.withChauffeur ? (
            <>
              <div className="w-full flex justify-between items-center h-fit">
                <span>
                  Chauffeur {global.currentCurrency}{" "}
                  {chauffeurRentPerDays.toLocaleString("en-US")} ×{" "}
                  {daysBetween < 1 && timeBetween > 0
                    ? daysBetween + 1
                    : daysBetween}
                </span>
                <span>
                  {global.currentCurrency}
                  {daysBetween
                    ? (chauffeurRentPerDays * daysBetween).toLocaleString(
                        "en-US"
                      )
                    : timeBetween
                    ? chauffeurRentPerDays.toLocaleString("en-US")
                    : 0}
                </span>
              </div>
              <div className="border-b-[1px] border-grey w-full "></div>
            </>
          ) : null}

          {Invoicing?.vatInclude && (
            <>
              <div className="w-full flex justify-between items-center h-fit">
                <span>VAT {varPerNum}%</span>
                <span>
                  {global.currentCurrency}
                  {varAmount(varPerNum, totalAmount)}
                </span>
              </div>
              <div className="border-b-[1px] border-grey w-full "></div>
            </>
          )}

          <TempTypeInputWidth
            setState={setdiscount}
            label={"Any Discount"}
            value={reservation.discount}
            required={false}
            type={"number"}
            widthProp="sm:w-full"
          />
          <div className="border-b-[1px] border-grey w-full "></div>

          {reservation?.discount ? (
            <div className="w-full flex justify-between items-center h-fit">
              <span>Discount</span>
              <span>
                {global.currentCurrency}
                {reservation?.discount.toLocaleString("en-US")}
              </span>
            </div>
          ) : null}
          <div className="w-full flex justify-between items-center h-fit">
            <span>Total</span>
            <span>
              {global.currentCurrency}
              {isNaN(reservation?.carTotal)
                ? 0
                : (
                    varTotalAmount(varPerNum, totalAmount) - discount
                  ).toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
