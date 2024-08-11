"use client";
import { TypeInput } from "../InputComponents/TypeInput";

export default function Rental() {
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TypeInput
          label={"Rental Price Per Hour"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput
          label={"Rental Price Per Day"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput
          label={"Rental Price Per Week"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput
          label={"Rental Price Per Month"}
          value={""}
          required={false}
          type={"text"}
        />
      </div>
    </div>
  );
}
