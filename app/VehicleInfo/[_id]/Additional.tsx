import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Additional() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);

  return (
    <div className="w-[100%] h-full flex justify-start flex-wrap items-start gap-1 py-4 px-5 border-grey overflow-auto scroll2">
      <div className="h-fit w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-start gap-x-[10%] items-center flex-wrap gap-y-1">
        {vehicleInfo.features.length > 0 ? (
          [
            ...vehicleInfo.features,
          ].map((item: string, index: number) => (
            <div
              key={index}
              className="w-[45%]  h-fit flex justify-start items-start py-[0px] border-b-[2px] truncate"
            >
              <span>
                {index + 1}
                {". "}
                {item}
              </span>
            </div>
          ))
        ) : (
          <span>No Feature Added</span>
        )}
      </div>
    </div>
  );
}
