"use client";
import React from "react";
import {
  TempTypeInput,
  TempTypeInputSign,
  TempTypeInputWidth,
} from "../../Components/InputComponents/TypeInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  setinsNo,
  setinsCompany,
  setinsEnd,
  setinsStart,
  setinsPayable,
  setinsDeductible,
  setinsRecurringPeriod,
  setinsRecurringDate,
  setinsRemarks,
  setinsImage,
} from "@/app/store/Vehicle";
import { TempSelectInputLink } from "@/app/Components/InputComponents/SelectInput";

export default function Insurances() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  let dispatch = useDispatch();

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Insurance Information
        </span>
        <TempSelectInputLink
          setState={setinsCompany}
          label={"Company"}
          value={vehicle.insCompany}
          required={false}
          options={Configurations?.Configurations?.Insurance?.map(
            (item: any) => item.Insurance
          )}
          link={"/Configuration/Insurance"}
        />
        <TempTypeInput
          setState={setinsNo}
          label={"Policy No"}
          value={vehicle.insNo}
          required={false}
          type={"number"}
        />
        <TempTypeInputSign
          setState={setinsPayable}
          label={"Charge Payable"}
          value={vehicle.insPayable}
          required={false}
          type={"number"}
          sign={"$"}
        />
        <TempTypeInputSign
          setState={setinsDeductible}
          label={"Deductible"}
          value={vehicle.insDeductible}
          required={false}
          type={"number"}
          sign={"%"}
        />
        <TempTypeInput
          setState={setinsStart}
          label={"Start Date"}
          value={vehicle.insStart}
          required={false}
          type={"date"}
        />
        <TempTypeInput
          setState={setinsEnd}
          label={"End Date"}
          value={vehicle.insEnd}
          required={false}
          type={"date"}
        />
        <TempSelectInputLink
          setState={setinsRecurringPeriod}
          label={"Recurring"}
          value={vehicle.insRecurringPeriod}
          required={false}
          options={Configurations?.Configurations?.Insurance?.map(
            (item: any) => item.recurring
          )}
          link={"/Configuration/Insurance"}
        />
        <TempTypeInput
          setState={setinsRecurringDate}
          label={"Recurring Date"}
          value={vehicle.insRecurringDate}
          required={false}
          type={"date"}
        />
        <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Remarks
          </label>
          <textarea
            className="w-full pe-2 py-3 font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
            rows={6}
            cols={6}
            onChange={(e) => dispatch(setinsRemarks(e.target.value))}
            value={vehicle.insRemarks}
            placeholder="Enter Remarks Here"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
