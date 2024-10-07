import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Insurance() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);

  return (
    <div className="w-full h-full py-4 px-5">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[100%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Insurance Policy No
          </span>
          <span className="">
            {vehicleInfo.insuranceNo ? vehicleInfo.insuranceNo : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[100%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Insurance Expiry Date
          </span>
          <span className="">
            {vehicleInfo.insuranceExpiry ? vehicleInfo.insuranceExpiry : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center mt-1">
        <div className="w-[100%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Insurance Provider
          </span>
          <span className="">
            {vehicleInfo.insuranceProvider
              ? vehicleInfo.insuranceProvider
              : "---"}
          </span>
        </div>
      </div>
    </div>
  );
}
