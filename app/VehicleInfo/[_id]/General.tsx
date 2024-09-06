import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function General() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[37%] h-fit flex flex-col justify-start items-start bg-red-30 ">

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Make:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.make}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Year:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.year}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Color:</p>
          <div className="w-[25%] text-start font-[400] text-[18px] leading-[27px] flex justify-start gap-3 items-center">
            {vehicleInfo.color}
            <div
              className="w-[32px] h-[18px] rounded-[5px]"
              style={{
                backgroundColor: vehicleInfo.color,
              }}
            ></div>
          </div>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Transmission:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.transmission}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Passengers:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.passengers}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">City:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.city}
          </p>
        </div>
      </div>
      <div className="w-[37%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Registration No:
          </p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.registration}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Model:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.model}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Type:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.type}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Fuel Type:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.fuelType}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Odometer (KMPH):
          </p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.odometer}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">Country:</p>
          <p className="w-[25%] text-start font-[400] text-[18px] leading-[27px]">
            {vehicleInfo.country}
          </p>
        </div>
      </div>
    </div>
  );
}
