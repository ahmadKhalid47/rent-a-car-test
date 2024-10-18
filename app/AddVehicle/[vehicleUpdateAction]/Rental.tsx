"use client";
import React from "react";
import { TypeInput, TempTypeInputSign } from "../../Components/InputComponents/TypeInput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  setrentHour,
  setrentDay,
  setrentWeek,
  setrentMonth,
} from "@/app/store/Vehicle";

export default function Rental() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let global = useSelector((state: RootState) => state.Global);
 
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Rental Price
        </span>
        <TempTypeInputSign
          setState={setrentHour}
          label={"Per Hour"}
          value={vehicle.rentHour}
          required={false}
          type={"number"}
          sign={global.currentCurrency}
        />
        <TempTypeInputSign
          setState={setrentDay}
          label={"Per Day"}
          value={vehicle.rentDay}
          required={false}
          type={"number"}
          sign={global.currentCurrency}
        />
        <TempTypeInputSign
          setState={setrentWeek}
          label={"Per Week"}
          value={vehicle.rentWeek}
          required={false}
          type={"number"}
          sign={global.currentCurrency}
        />
        <TempTypeInputSign
          setState={setrentMonth}
          label={"Per Month"}
          value={vehicle.rentMonth}
          required={false}
          type={"number"}
          sign={global.currentCurrency}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Mileage Limit
        </span>
        <TempTypeInputSign
          setState={setrentDay}
          label={"Per Day"}
          value={vehicle.rentDay}
          required={false}
          type={"number"}
          sign={"KM"}
        />
        <TempTypeInputSign
          setState={setrentWeek}
          label={"Per Week"}
          value={vehicle.rentWeek}
          required={false}
          type={"number"}
          sign={"KM"}
        />
        <TempTypeInputSign
          setState={setrentMonth}
          label={"Per Month"}
          value={vehicle.rentMonth}
          required={false}
          type={"number"}
          sign={"KM"}
        />
        <TempTypeInputSign
          setState={setrentHour}
          label={"Excess Mileage Fee"}
          value={vehicle.rentHour}
          required={false}
          type={"number"}
          sign={global.currentCurrency}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Late Return Fee
        </span>
        <TempTypeInputSign
          setState={setrentHour}
          label={"Per Hour"}
          value={vehicle.rentHour}
          required={false}
          type={"number"}
          sign={global.currentCurrency}
        />
        <TempTypeInputSign
          setState={setrentDay}
          label={"Per Day"}
          value={vehicle.rentDay}
          required={false}
          type={"number"}
          sign={global.currentCurrency}
        />
      </div>
    </div>
  );
}
