"use client";
import shape from "@/public/ShapeBlack.svg";
import { TempTypeInputWidth } from "../../Components/InputComponents/TypeInput";
import { TempSelectInputWidth } from "../../Components/InputComponents/SelectInput";
import {
  setAllValues,
  resetState,
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
  setcustomer_idR,
  setvehicle_idR,
  setchauffeur_idR,
} from "@/app/store/reservations";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { CountryCity } from "../../Components/functions/CountryStateCity";

export default function Insurances() {
  let reservation = useSelector((state: RootState) => state.reservation);
  let { countries, cities } = CountryCity(reservation.country);


  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInputWidth
          setState={setreservationDate}
          label={"Reservation Date"}
          value={reservation.reservationDate}
          required={false}
          type={"date"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setodometer}
          label={"Odometer (KMPH)"}
          value={reservation.odometer}
          required={false}
          type={"number"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setfuelStatus}
          label={"Fuel Status"}
          value={reservation.fuelStatus}
          required={true}
          // required={false}
          type={"number"}
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
          required={true}
          // required={false}
          options={countries.map((item: any) => item.label)}
          widthProp="sm:w-[48%]"
        />
        <TempSelectInputWidth
          setState={setcity}
          label={"City"}
          value={reservation.city}
          required={true}
          // required={false}
          options={cities.map((item: any) => item.label)}
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
          setState={setPickUpDate}
          label={"Pick Up Date"}
          value={reservation.PickUpDate}
          required={true}
          // required={false}
          type={"date"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setPickUpTime}
          label={"Pick Up Time"}
          value={reservation.PickUpTime}
          type={"time"}
          required={true}
          // required={false}
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
        <TempTypeInputWidth
          setState={setdropOffDate}
          label={"Drop Off Date"}
          value={reservation.dropOffDate}
          required={true}
          // required={false}
          type={"date"}
          widthProp="sm:w-[48%]"
        />
        <TempTypeInputWidth
          setState={setdropOffTime}
          label={"Drop Off Time"}
          value={reservation.dropOffTime}
          required={true}
          // required={false}
          type={"time"}
          widthProp="sm:w-[48%]"
        />
      </div>
    </div>
  );
}
