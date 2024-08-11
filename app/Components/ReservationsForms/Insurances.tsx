"use client";
import shape from "@/public/ShapeBlack.svg";
import { TypeInputWidth } from "../InputComponents/TypeInput";
import { SelectInputWidth } from "../InputComponents/SelectInput";

export default function Insurances() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8">
        <TypeInputWidth
          label={"Reservation ID"}
          value={""}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
        <TypeInputWidth
          label={"Reservation Date"}
          value={""}
          required={false}
          type={"date"}
          widthProp="sm:w-[48%]"
        />
        <TypeInputWidth
          label={"Odometer (KMPH)"}
          value={""}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
        <SelectInputWidth
          label={"Fuel Status"}
          value={""}
          required={true}
          options={["Select", "Fuel1", "Fuel2"]}
          widthProp="sm:w-[48%]"
        />

        <TypeInputWidth
          label={"Security Deposit"}
          value={""}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
        <SelectInputWidth
          label={"City"}
          value={""}
          required={true}
          options={["Select", "City1", "City2"]}
          widthProp="sm:w-[48%]"
        />

        <TypeInputWidth
          label={"Pick Up Address"}
          value={""}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
        <TypeInputWidth
          label={"Pick Up Date"}
          value={""}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
        <SelectInputWidth
          label={"Pick Up Time"}
          value={""}
          required={true}
          options={["Select", "Time1", "Time2"]}
          widthProp="sm:w-[48%]"
        />

        <TypeInputWidth
          label={"Drop Off Address"}
          value={""}
          required={false}
          type={"text"}
          widthProp="sm:w-[48%]"
        />
        <TypeInputWidth
          label={"Drop Off Date"}
          value={""}
          required={false}
          type={"date"}
          widthProp="sm:w-[48%]"
        />
        <SelectInputWidth
          label={"Drop Off Time"}
          value={""}
          required={true}
          options={["Select", "Time1", "Time2"]}
          widthProp="sm:w-[48%]"
        />
      </div>
    </div>
  );
}
