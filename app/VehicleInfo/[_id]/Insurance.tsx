import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Insurance() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  const [currentIndex, setCurrentIndex] = useState(0);
  let global = useSelector((state: RootState) => state.Global);

  return (
    <div className="w-full h-full py-3 px-5 flex justify-start flex-col items-start gap-1 overflow-auto">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Policy No</span>
          <span>
            {vehicleInfo?.insNo
              ? vehicleInfo?.insNo.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Start Date </span>
          <span>
            {vehicleInfo?.insStart
              ? vehicleInfo?.insStart.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Valid Until </span>
          <span>
            {vehicleInfo?.insEnd
              ? vehicleInfo?.insEnd.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Company</span>
          <span>
            {vehicleInfo?.insCompany
              ? vehicleInfo?.insCompany.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Charge Payable</span>
          <span>
            {vehicleInfo?.insPayable
              ? `${global.currentCurrency} ` +
                vehicleInfo?.insPayable.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Charge Deductible
          </span>
          <span>
            {vehicleInfo?.insDeductible
              ? `${global.currentCurrency} ` +
                vehicleInfo?.insDeductible.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">
            Recurring Period
          </span>
          <span>
            {vehicleInfo?.insRecurringPeriod
              ? vehicleInfo?.insRecurringPeriod.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
        <div className="w-[47%] flex justify-between items-center">
          <span className="dark:text-white text-[#555555]">Recurring Date</span>
          <span>
            {vehicleInfo?.insRecurringDate
              ? vehicleInfo?.insRecurringDate.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>
      <div className="w-[100%] h-fit dark:text-white text-black text-[14px] font-[400] flex justify-between items-center mt-2">
        <div className="relative w-full h-[157px] flex justify-center items-center">
          {vehicleInfo?.insImage?.length && (
            <img
              src={vehicleInfo?.insImage[currentIndex]}
              className="w-[250px] h-[157px] rounded-[10px]"
            />
          )}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
            onClick={() => {
              setCurrentIndex(
                (prev) =>
                  (prev - 1 + vehicleInfo?.insImage?.length) %
                  vehicleInfo?.insImage?.length
              );
            }}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
            onClick={() => {
              setCurrentIndex(
                (prev) => (prev + 1) % vehicleInfo?.insImage?.length
              );
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-start items-center">
        <div className="w-[100%] flex justify-start gap-2 items-center">
          <span className="dark:text-white text-[#555555]">Remarks</span>
          <span>
            {vehicleInfo?.insRemarks
              ? vehicleInfo?.insRemarks.toLocaleString("en-US")
              : "---"}
          </span>
        </div>
      </div>{" "}
    </div>
  );
}
