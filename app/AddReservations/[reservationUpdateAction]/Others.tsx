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
  let carRentPerDays = isNaN(Number(vehicleData?.rentDay))
    ? 0
    : Number(vehicleData?.rentDay);
  let chauffeurRentPerDays = isNaN(Number(chauffeurData?.rentPerDay))
    ? 0
    : Number(chauffeurData?.rentPerDay);
  let carRentPerHours = isNaN(Number(vehicleData?.rentHour))
    ? 0
    : Number(vehicleData?.rentHour);
  let carRentPerWeeks = isNaN(Number(vehicleData?.rentWeek))
    ? 0
    : Number(vehicleData?.rentWeek);
  let carRentPerMonths = isNaN(Number(vehicleData?.rentMonth))
    ? 0
    : Number(vehicleData?.rentMonth);
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
  function calculateTimeDifference(pickUpTime: string, dropOffTime: string) {
    if (!pickUpTime || !dropOffTime) {
      return 0;
    }
    const [pickUpHours, pickUpMinutes] = pickUpTime.split(":").map(Number);
    const [dropOffHours, dropOffMinutes] = dropOffTime.split(":").map(Number);
    const today = new Date().toDateString();
    const pickUpDateTime = new Date(
      `${today} ${pickUpHours}:${pickUpMinutes}:00`
    );
    const dropOffDateTime = new Date(
      `${today} ${dropOffHours}:${dropOffMinutes}:00`
    );
    const differenceInTime =
      dropOffDateTime.getTime() - pickUpDateTime.getTime();
    const differenceInHours = Math.floor(differenceInTime / (1000 * 60 * 60));
    return differenceInHours;
  }
  const daysBetween = calculateDaysBetween(
    reservation?.PickUpDate,
    reservation?.dropOffDate
  );
  const timeBetween = calculateTimeDifference(
    reservation?.PickUpTime,
    reservation?.dropOffTime
  );
  const weeksBetween = daysBetween / 7;
  const monthsBetween = daysBetween / 30;

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
  function calculateRentPerWeeks(
    daysBetween: any,
    carRentPerWeek: any,
    chauffeurRentPerDay: any,
    discount: any
  ) {
    let rentWithWeeks = daysBetween * carRentPerWeek;
    let chauffeurWithDays = daysBetween * 7 * chauffeurRentPerDay;
    let rent = rentWithWeeks + chauffeurWithDays - discount;
    return rent;
  }
  function calculateRentPerMonths(
    daysBetween: any,
    carRentPerMonth: any,
    chauffeurRentPerDay: any,
    discount: any
  ) {
    let rentWithMonths = daysBetween * carRentPerMonth;
    let chauffeurWithDays = daysBetween * 30 * chauffeurRentPerDay;
    let rent = rentWithMonths + chauffeurWithDays - discount;
    return rent;
  }
  function calculateRentPerHours(
    timeBetween: any,
    carRentPerHour: any,
    chauffeurRentPerDay: any,
    discount: any
  ) {
    let rentWithHours = timeBetween * carRentPerHour;
    let chauffeurWithDays = chauffeurRentPerDay;
    let rent = rentWithHours + chauffeurWithDays - discount;
    return rent;
  }

  function totalRentCalc() {
    if (daysBetween < 1) {
      return calculateRentPerHours(
        timeBetween,
        carRentPerHours,
        chauffeurRentPerDays,
        discount
      );
    } else if (daysBetween % 7 === 0) {
      return calculateRentPerWeeks(
        weeksBetween,
        carRentPerWeeks,
        chauffeurRentPerDays,
        discount
      );
    } else if (daysBetween % 30 === 0) {
      return calculateRentPerMonths(
        monthsBetween,
        carRentPerMonths,
        chauffeurRentPerDays,
        discount
      );
    } else {
      return calculateRentPerDays(
        daysBetween,
        carRentPerDays,
        chauffeurRentPerDays,
        discount
      );
    }
  }

  let totalRent = totalRentCalc();
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
            <span>
              {daysBetween < 1
                ? timeBetween + " Hours"
                : daysBetween % 7 === 0
                ? weeksBetween + " Weeks"
                : daysBetween % 30 === 0
                ? monthsBetween + " Months"
                : daysBetween + " Days"}
            </span>
          </div>
          <div className="w-full flex justify-between items-center h-fit">
            <span>
              Car Rent $
              {daysBetween < 1
                ? carRentPerHours
                : daysBetween % 7 === 0
                ? carRentPerWeeks
                : daysBetween % 30 === 0
                ? carRentPerMonths
                : carRentPerDays}
              ×{" "}
              {daysBetween < 1
                ? timeBetween
                : daysBetween % 7 === 0
                ? weeksBetween
                : daysBetween % 30 === 0
                ? monthsBetween
                : daysBetween}
            </span>
            <span>${carRentPerDays * daysBetween}</span>
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
                  Chauffeur ${chauffeurRentPerDays} ×{" "}
                  {daysBetween < 1 && timeBetween > 0
                    ? daysBetween + 1
                    : daysBetween}
                </span>
                <span>${chauffeurRentPerDays * daysBetween}</span>
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
