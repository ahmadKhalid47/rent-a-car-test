import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Additional() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);

  return (
    <div className="w-[100%] h-fit flex justify-start flex-wrap items-start gap-x-[12.5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      {vehicleInfo.features.length > 0 ? (
        vehicleInfo.features.map((item: string, index: number) => (
          <div
            key={index}
            className="w-[25%] h-fit flex justify-center items-start py-[3px] border-b-[2px]"
          >
            <p className="font-[400] text-[18px] leading-[27px]">{item}</p>
          </div>
        ))
      ) : (
        <p className="font-[400] text-[18px] leading-[27px]">
          No Feature Added
        </p>
      )}
    </div>
  );
}
