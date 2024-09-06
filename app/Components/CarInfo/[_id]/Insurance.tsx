import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Insurance() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[37%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Insurance Policy No:
          </p>
          <p className="w-[33%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.insuranceNo ? vehicleInfo.insuranceNo : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">
            Insurance Expiry Date:
          </p>
          <p className="w-[33%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.insuranceExpiry ? vehicleInfo.insuranceExpiry : "---"}
          </p>
        </div>
      </div>
      <div className="w-[37%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">
            Insurance Provider:
          </p>
          <p className="w-[43%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.insuranceProvider
              ? vehicleInfo.insuranceProvider
              : "---"}
          </p>
        </div>
      </div>
    </div>
  );
}
