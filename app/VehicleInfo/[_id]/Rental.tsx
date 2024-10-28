import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Rental() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  let global = useSelector((state: RootState) => state.Global);

  return (
    <div className="w-full h-full py-4 px-5 flex justify-start flex-col items-start gap-1 overflow-auto">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[45%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Rent Per Hour</span>
          <span >
            {vehicleInfo.rentHour
              ? `${global.currentCurrency} ` +
                vehicleInfo.rentHour.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[45%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Rent Per Day</span>
          <span >
            {vehicleInfo.rentDay
              ? `${global.currentCurrency} ` +
                vehicleInfo.rentDay.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[45%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Rent Per Week</span>
          <span >
            {vehicleInfo.rentWeek
              ? `${global.currentCurrency} ` +
                vehicleInfo.rentWeek.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[45%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Rent Per Month</span>
          <span >
            {vehicleInfo.rentMonth
              ? `${global.currentCurrency} ` +
                vehicleInfo.rentMonth.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
    </div>
  );
}
