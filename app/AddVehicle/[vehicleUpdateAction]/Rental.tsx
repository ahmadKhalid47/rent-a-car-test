"use client";
import { TypeInput, TempTypeInput } from "../../Components/InputComponents/TypeInput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  setrentHour,
  setrentDay,
  setrentWeek,
  setrentMonth,
} from "@/app/store/Vehicle";

export default function Rental() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
 
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setrentHour}
          label={"Rental Price Per Hour"}
          value={vehicle.rentHour}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setrentDay}
          label={"Rental Price Per Day"}
          value={vehicle.rentDay}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setrentWeek}
          label={"Rental Price Per Week"}
          value={vehicle.rentWeek}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setrentMonth}
          label={"Rental Price Per Month"}
          value={vehicle.rentMonth}
          required={false}
          type={"number"}
        />
      </div>
    </div>
  );
}
