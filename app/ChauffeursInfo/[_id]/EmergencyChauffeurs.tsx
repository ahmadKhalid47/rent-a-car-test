import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function EmergencyChauffeurs() {
  let { chauffeurInfo } = useSelector(
    (state: RootState) => state.chauffeurInfo
  );

  return (
    <div className="w-full h-full py-3 px-5 flex justify-start flex-col items-start gap-1 overflow-auto">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Contact Number</span>
          <span className="w-full">{chauffeurInfo?.emergencyContactName}</span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Relation</span>
          <span className="w-full">
            {chauffeurInfo?.emergencyContactRelation}
          </span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Emergency Phone</span>
          <span className="w-full">{chauffeurInfo?.emergencyContactPhone}</span>
        </div>
      </div>
    </div>
  );
}
