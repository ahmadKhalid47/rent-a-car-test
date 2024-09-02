import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Other() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[100%] h-fit font-[400] text-[18px] leading-[27px]">
        {vehicleInfo.otherNote ? vehicleInfo.otherNote : "No Additional Note Added"}
      </div>
    </div>
  );
}
