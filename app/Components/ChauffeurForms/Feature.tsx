"use client";
import { TypeInput } from "../InputComponents/TypeInput";
import { SelectInput } from "../InputComponents/SelectInput";

export default function Feature() {
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Reference Info
        </h3>
        <TypeInput
          label={"Full Name"}
          value={""}
          required={true}
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
          Emergency Info
        </h3>
        <TypeInput
          label={"Full Name"}
          value={""}
          required={true}
          type={"text"}
        />
        <TypeInput label={"Phone"} value={""} required={true} type={"text"} />
        <SelectInput
          label={"Relation"}
          value={""}
          required={false}
          options={["Select", "Father", "Mother", "Brother", "Other"]}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Additional Notes
        </h3>
        <div className="w-[100%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <textarea
              className="w-full pe-2 py-3 font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center input-color rounded-xl border-2 border-grey"
              rows={6}
              cols={6}
            >
              Any Additional Notes
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
