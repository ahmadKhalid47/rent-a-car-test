"use client";
import { TypeInput } from "../InputComponents/TypeInput";

export default function Insurances() {
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TypeInput
          label={"Insurance Policy No"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput
          label={"Insurance Provider"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput
          label={"Insurance Expiry Date"}
          value={""}
          required={false}
          type={"date"}
        />
      </div>
    </div>
  );
}
