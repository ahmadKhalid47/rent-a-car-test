import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Rental() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  let global = useSelector((state: RootState) => state.Global);

  return (
    <div className="w-full h-full py-4 px-5 flex justify-start flex-col items-start gap-2 overflow-auto">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Rent Per Hour</span>
          <span>
            {vehicleInfo?.rentHour
              ? `${global.currentCurrency} ` +
                vehicleInfo?.rentHour.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Rent Per Day</span>
          <span>
            {vehicleInfo?.rentDay
              ? `${global.currentCurrency} ` +
                vehicleInfo?.rentDay.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Rent Per Week</span>
          <span>
            {vehicleInfo?.rentWeek
              ? `${global.currentCurrency} ` +
                vehicleInfo?.rentWeek.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Rent Per Month</span>
          <span>
            {vehicleInfo?.rentMonth
              ? `${global.currentCurrency} ` +
                vehicleInfo?.rentMonth.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Mileage Limit Per Day
          </span>
          <span>
            {vehicleInfo?.mlDay
              ? `${global.currentCurrency} ` +
                vehicleInfo?.mlDay.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Mileage Limit Per Week
          </span>
          <span>
            {vehicleInfo?.mlWeek
              ? `${global.currentCurrency} ` +
                vehicleInfo?.mlWeek.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Mileage Limit Per Month
          </span>
          <span>
            {vehicleInfo?.mlMonth
              ? `${global.currentCurrency} ` +
                vehicleInfo?.mlMonth.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Excess Mileage Fee 
          </span>
          <span>
            {vehicleInfo?.mlFee
              ? `${global.currentCurrency} ` +
                vehicleInfo?.mlFee.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Late Return Fee Per Hour
          </span>
          <span>
            {vehicleInfo?.lateHour
              ? `${global.currentCurrency} ` +
                vehicleInfo?.lateHour.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Late Return Fee Per Day
          </span>
          <span>
            {vehicleInfo?.lateDay
              ? `${global.currentCurrency} ` +
                vehicleInfo?.lateDay.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
    </div>
  );
}
