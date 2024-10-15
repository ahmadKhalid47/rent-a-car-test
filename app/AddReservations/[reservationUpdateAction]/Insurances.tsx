"use client";
import React from "react";
import { TempTypeInputWidth } from "../../Components/InputComponents/TypeInput";
import { TempSelectInputWidth } from "../../Components/InputComponents/SelectInput";
import {
  setreservationDate,
  setodometer,
  setfuelStatus,
  setsecurityDeposit,
  setcountry,
  setcity,
  setPickUpAddress,
  setPickUpDate,
  setPickUpTime,
  setdropOffAddress,
  setdropOffDate,
  setdropOffTime,
} from "@/app/store/reservations";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { CountryCity } from "../../Components/functions/CountryStateCity";

export default function Insurances() {
  let reservation = useSelector((state: RootState) => state.reservation);
  let { countries, cities } = CountryCity(reservation.country);

  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full h-full dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[16px] leading-[17px] w-full mt-1">
          Pick Up
        </span>
        <TempTypeInputWidth
          setState={setreservationDate}
          label={"Reservation Date"}
          value={reservation.reservationDate}
          required={true}
          type={"date"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setPickUpDate}
          label={"Pick Up Date"}
          value={reservation.PickUpDate}
          required={true}
          type={"date"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setPickUpTime}
          label={"Pick Up Time"}
          value={reservation.PickUpTime}
          type={"time"}
          required={true}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setPickUpAddress}
          label={"Pick Up Address"}
          value={reservation.PickUpAddress}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setodometer}
          label={"Odometer (KM)"}
          value={reservation.odometer}
          required={false}
          type={"number"}
          widthProp="sm:w-[48%]"
        />
        <TempSelectInputWidth
          setState={setfuelStatus}
          label={"Fuel Status"}
          value={reservation.fuelStatus}
          required={false}
          options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setsecurityDeposit}
          label={"Security Deposit"}
          value={reservation.securityDeposit}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
        <TempSelectInputWidth
          setState={setcountry}
          label={"Country"}
          value={reservation.country}
          required={false}
          options={countries.map((item: any) => item.label)}
          widthProp="sm:w-[48%]"
        />
        <TempSelectInputWidth
          setState={setcity}
          label={"City"}
          value={reservation.city}
          required={false}
          options={cities.map((item: any) => item.label)}
          widthProp="sm:w-[48%]"
        />
        <span className="flex justify-start gap-1 items-center font-[600] text-[16px] leading-[17px] w-full mt-1">
          Drop Off
        </span>
        <TempTypeInputWidth
          setState={setdropOffDate}
          label={"Drop Off Date"}
          value={reservation.dropOffDate}
          required={true}
          type={"date"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setdropOffTime}
          label={"Drop Off Time"}
          value={reservation.dropOffTime}
          required={true}
          type={"time"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setdropOffAddress}
          label={"Drop Off Address"}
          value={reservation.dropOffAddress}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
      </div>
    </div>
  );
}
