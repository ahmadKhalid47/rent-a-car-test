"use client";
import { TempTypeInput, TypeInput } from "../../Components/InputComponents/TypeInput";
import { SelectInput, TempSelectInput } from "../../Components/InputComponents/SelectInput";
import {
  setemergencyContactNameR,
  setemergencyContactPhoneR,
  setemergencyContactRelationR,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Insurances() {
  let customer = useSelector((state: RootState) => state.Customer);

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setemergencyContactNameR}
          label={"Emergency Contact Name"}
          value={customer.emergencyContactName}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setemergencyContactRelationR}
          label={"Relation"}
          value={customer.emergencyContactRelation}
          required={false}
          options={["Father", "Mother", "Brother", "Other"]}
        />
        <TempTypeInput
          setState={setemergencyContactPhoneR}
          label={"Emergency Phone"}
          value={customer.emergencyContactPhone}
          required={false}
          type={"number"}
        />
      </div>
    </div>
  );
}
