"use client";
import car from "@/public/PaymentCar.svg";
import { TempTypeInputWidth } from "../InputComponents/TypeInput";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { setdiscount } from "@/app/store/reservations";

interface dataType {
  customerData: any;
  chauffeurData: any;
  vehicleData: any;
}

export default function Others({
  customerData,
  chauffeurData,
  vehicleData,
}: dataType) {
  let reservation = useSelector((state: RootState) => state.reservation);
  console.log(customerData, chauffeurData, vehicleData);

  return (
    <div className="w-full h-full  ">
      <div className="flex flex-col justify-start items-center gap-x-[4%] gap-y-0 xs:gap-y-3 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-8 py-8">
        <img src={car.src} className="mt-2" />
        <h3 className="font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black text-center w-full">
          Payment Calculation
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

          {chauffeurData ? (
            <>
              <div className="w-full flex justify-between items-center h-fit">
                <span>Chauffeur</span>
                <span>${chauffeurData?.rentPerDay}</span>
              </div>
              <div className="border-b-[1px] border-grey w-full "></div>
            </>
          ) : null}

          <div className="w-full flex justify-between items-center h-fit">
            <span>Taxes</span>
            <span>$0.00</span>
          </div>
          <div className="border-b-[1px] border-grey w-full "></div>

          <TempTypeInputWidth
            setState={setdiscount}
            label={"Any Discount"}
            value={reservation.discount}
            required={false}
            type={"number"}
            widthProp="sm:w-[284px]"
          />
          <div className="border-b-[1px] border-grey w-full "></div>

          {reservation?.discount ? (
            <div className="w-full flex justify-between items-center h-fit">
              <span>Discount</span>
              <span>${reservation?.discount}</span>
            </div>
          ) : null}
          <div className="w-full flex justify-between items-center h-fit">
            <span>Total</span>
            <span>$0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
