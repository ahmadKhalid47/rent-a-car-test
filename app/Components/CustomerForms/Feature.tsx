"use client";
import { TypeInput } from "../InputComponents/TypeInput";
import { SelectInput } from "../InputComponents/SelectInput";

export default function Feature() {
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Reference 1
        </h3>

        <TypeInput
          label={"Full Name"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput label={"Phone"} value={""} required={true} type={"text"} />
        <TypeInput
          label={"Address"}
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
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Reference 2
        </h3>

        <TypeInput
          label={"Full Name"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput label={"Phone"} value={""} required={true} type={"text"} />
        <TypeInput
          label={"Address"}
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
      </div>
    </div>
  );
}
