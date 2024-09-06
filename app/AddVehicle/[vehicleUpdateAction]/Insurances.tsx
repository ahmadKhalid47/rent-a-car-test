"use client";
import { TypeInput, TempTypeInput } from "../../Components/InputComponents/TypeInput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  setinsuranceNo,
  setinsuranceProvider,
  setinsuranceExpiry,
} from "@/app/store/Vehicle";

export default function Insurances() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setinsuranceNo}
          label={"Insurance Policy No"}
          value={vehicle.insuranceNo}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setinsuranceProvider}
          label={"Insurance Provider"}
          value={vehicle.insuranceProvider}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setinsuranceExpiry}
          label={"Insurance Expiry Date"}
          value={vehicle.insuranceExpiry}
          required={false}
          type={"date"}
        />

        {/* <TypeInput
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
        /> */}
      </div>
    </div>
  );
}
