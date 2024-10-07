import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Other() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);

  return (
    <div className="w-[100%] h-full overflow-auto flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] py-4 px-5 border-grey">
      <div className="w-[100%] h-fit font-[400] text-[14px] leading-[27px] text-justify">
        {vehicleInfo.otherNote
          ? vehicleInfo.otherNote
          : "No Additional Note Added"}
      </div>
    </div>
  );
}
