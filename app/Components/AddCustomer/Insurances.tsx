"use client";
import { TypeInput } from "../InputComponents/TypeInput";
import { SelectInput } from "../InputComponents/SelectInput";

export default function Insurances() {
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TypeInput
          label={"Emergency Contact Name"}
          value={""}
          required={false}
          type={"text"}
        />
        <SelectInput
          label={"Relation"}
          value={""}
          required={false}
          options={["Select", "Father", "Mother", "Brother", "Other"]}
        />
        <TypeInput
          label={"Emergency Phone"}
          value={""}
          required={false}
          type={"text"}
        />
      </div>
    </div>
  );
}
