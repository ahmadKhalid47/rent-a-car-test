"use client";
import { TempTypeInput, TypeInput } from "../../Components/InputComponents/TypeInput";
import {
  SelectInput,
  TempSelectInput,
} from "../../Components/InputComponents/SelectInput";
import {
  setref1NameR,
  setref1PhoneR,
  setref1AddressR,
  setref1RelationR,
  setref2NameR,
  setref2PhoneR,
  setref2AddressR,
  setref2RelationR,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Feature() {
  let customer = useSelector((state: RootState) => state.Customer);

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Reference 1
        </h3>

        <TempTypeInput
          setState={setref1NameR}
          label={"Full Name"}
          value={customer.ref1Name}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setref1PhoneR}
          label={"Phone"}
          value={customer.ref1Phone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setref1AddressR}
          label={"Address"}
          value={customer.ref1Address}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setref1RelationR}
          label={"Relation"}
          value={customer.ref1Relation}
          required={false}
          options={["Father", "Mother", "Brother", "Other"]}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
          Reference 2
        </h3>

        <TempTypeInput
          setState={setref2NameR}
          label={"Full Name"}
          value={customer.ref2Name}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setref2PhoneR}
          label={"Phone"}
          value={customer.ref2Phone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setref2AddressR}
          label={"Address"}
          value={customer.ref2Address}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setref2RelationR}
          label={"Relation"}
          value={customer.ref2Relation}
          required={false}
          options={["Father", "Mother", "Brother", "Other"]}
        />
      </div>
    </div>
  );
}
