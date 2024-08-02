"use client";
import car from "@/public/PaymentCar.svg";

export default function Others() {
  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-col justify-start items-center gap-x-[4%] gap-y-3 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey px-8 py-8">
        <img src={car.src} className="mt-2" />
        <h3 className="font-[600] text-[24px] leading-[36px] text-black text-center w-full">
          Payment Calculation{" "}
        </h3>
        <div className="w-full h-fit mt-1 rounded-[10px] border-[1px] border-grey font-[400] text-[14px] leading-[17px] pt-5 pb-3 px-4 flex flex-col justify-start items-center gap-y-3 ">
          <div className="w-full flex justify-between items-center h-fit">
            <span>Rental Period</span>
            <span>0 Days</span>
          </div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>Per Day $0×0</span>
            <span>$0.00</span>
          </div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>VAT 24%</span>
            <span>$0.00</span>
          </div>
          <div className="border-b-[1px] border-grey w-full "></div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>Chauffeur</span>
            <span>$0.00</span>
          </div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>VAT 24%</span>
            <span>$0.00</span>
          </div>
          <div className="border-b-[1px] border-grey w-full "></div>

          <div className="w-full flex justify-between items-center h-fit">
            <span>Taxes</span>
            <span>$0.00</span>
          </div>
          <div className="border-b-[1px] border-grey w-full "></div>

          <div className="w-full flex flex-wrap justify-center items-center h-fit gap-1">
            <span className="w-full text-start">Any Discount</span>
            <div className="w-[284px] h-[43px] flex justify-center items-center border-[1px] border-grey rounded-[10px] input-color">
              $0.00
            </div>
          </div>
          <div className="border-b-[1px] border-grey w-full "></div>

          <div className="w-full flex justify-between items-center h-fit">
            <span>Discount</span>
            <span>$0.00</span>
          </div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>Total</span>
            <span>$0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
