import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Rental() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[37%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Rental Price Per Hour:
          </p>
          <p className="w-[17%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.rentHour ? vehicleInfo.rentHour : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">
            Rental Price Per Week:
          </p>
          <p className="w-[17%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.rentWeek ? vehicleInfo.rentWeek : "---"}
          </p>
        </div>
      </div>
      <div className="w-[37%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Rental Price Per Day:
          </p>
          <p className="w-[17%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.rentDay ? vehicleInfo.rentDay : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">
            Rental Price Per Month:
          </p>
          <p className="w-[17%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.rentMonth ? vehicleInfo.rentMonth : "---"}
          </p>
        </div>
      </div>
    </div>
  );
}
