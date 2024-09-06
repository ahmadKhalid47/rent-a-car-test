"use client";
import car from "@/public/PaymentCar.svg";
import { TempTypeInputWidth } from "../../Components/InputComponents/TypeInput";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setdiscount, setduration, setamount } from "@/app/store/reservations";
import chauffeurInfoSlice from "../../store/chauffeurInfo";
import { useEffect } from "react";

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
  let dispatch = useDispatch();
  let reservation = useSelector((state: RootState) => state.reservation);
  let carRent = isNaN(Number(vehicleData?.rentDay))
    ? 0
    : Number(vehicleData?.rentDay);
  let chauffeurRent = isNaN(Number(chauffeurData?.rentPerDay))
    ? 0
    : Number(chauffeurData?.rentPerDay);
  let discount = isNaN(Number(reservation.discount))
    ? 0
    : Number(reservation.discount);

  function calculateDaysBetween(pickUpDate: any, dropOffDate: any) {
    if (!pickUpDate || !dropOffDate) {
      return 0;
    }
    const pickUp = new Date(pickUpDate);
    const dropOff = new Date(dropOffDate);
    const differenceInTime = dropOff.getTime() - pickUp.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.ceil(differenceInDays);
  }

  const daysBetween = calculateDaysBetween(
    reservation?.PickUpDate,
    reservation?.dropOffDate
  );
  useEffect(() => {
    dispatch(setduration(JSON.stringify(daysBetween)));
  }, [daysBetween]);

  function calculateRentPerDays(
    daysBetween: any,
    carRentPerDay: any,
    chauffeurRentPerDay: any,
    discount: any
  ) {
    let rentWithDays = daysBetween * carRentPerDay;
    let chauffeurWithDays = daysBetween * chauffeurRentPerDay;
    let rent = rentWithDays + chauffeurWithDays - discount;
    return rent;
  }

  let totalRent = calculateRentPerDays(
    daysBetween,
    carRent,
    chauffeurRent,
    discount
  );

  useEffect(() => {
    dispatch(setamount(JSON.stringify(totalRent)));
  }, [totalRent]);

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
            <span>{daysBetween} Days</span>
          </div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>
              Car Rent ${carRent} × {daysBetween}
            </span>
            <span>${carRent * daysBetween}</span>
          </div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>VAT 24%</span>
            <span>$0.00</span>
          </div>
          <div className="border-b-[1px] border-grey w-full "></div>

          {reservation?.withChauffeur ? (
            <>
              <div className="w-full flex justify-between items-center h-fit">
                <span>
                  Chauffeur ${chauffeurRent} × {daysBetween}
                </span>
                <span>${chauffeurRent * daysBetween}</span>
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
            widthProp="sm:w-full"
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
            <span>${isNaN(totalRent) ? 0 : totalRent}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
