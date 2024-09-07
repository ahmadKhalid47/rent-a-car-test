import { formatDate, formatTime } from "@/app/Components/functions/formats";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Generalreservations() {
  let { reservationInfo } = useSelector(
    (state: RootState) => state.reservationInfo
  );

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[40%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Pick Up Address:
          </p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px] truncate">
            {reservationInfo?.PickUpAddress
              ? reservationInfo?.PickUpAddress
              : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px] truncate">
          <p className="font-[400] text-[18px] leading-[27px]">
            Drop Off Address:
          </p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {reservationInfo?.dropOffAddress
              ? reservationInfo?.dropOffAddress
              : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Reservation Date:
          </p>
          <div className="w-[30%] text-start font-[400] text-[18px] leading-[27px] flex justify-start gap-3 items-center">
            {reservationInfo?.reservationDate
              ? reservationInfo?.reservationDate
              : "---"}
          </div>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Security Deposit:
          </p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            $
            {reservationInfo?.securityDeposit
              ? reservationInfo?.securityDeposit
              : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">
            Current Fuel Status:
          </p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {reservationInfo?.fuelStatus ? reservationInfo?.fuelStatus : "---"}%
          </p>
        </div>
      </div>
      <div className="w-[40%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Date & Time: </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {reservationInfo?.PickUpDate
              ? formatDate(reservationInfo?.PickUpDate)
              : "---"}{" "}
            {reservationInfo?.PickUpTime ? formatTime(reservationInfo?.PickUpTime) : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Date & Time: </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {reservationInfo?.dropOffDate
              ? formatDate(reservationInfo?.dropOffDate)
              : "---"}{" "}
            {reservationInfo?.dropOffTime
              ? formatTime(reservationInfo?.dropOffTime)
              : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Amount:</p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            ${reservationInfo?.amount ? reservationInfo?.amount : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">
            Current Odometer (KMPH):
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {reservationInfo?.odometer ? reservationInfo?.odometer : "---"}
          </p>
        </div>
      </div>
    </div>
  );
}
