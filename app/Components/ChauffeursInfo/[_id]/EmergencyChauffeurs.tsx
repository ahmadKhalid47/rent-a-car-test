import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function EmergencyChauffeurs() {
  let { chauffeurInfo } = useSelector(
    (state: RootState) => state.chauffeurInfo
  );

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-center gap-x-[5%] gap-y-8 pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[100%] h-fit flex flex-col justify-between items-center bg-red-30 ">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-full">
          Emergency Info
        </h3>
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px] font-[600]">
          <p className="w-[30%] text-start text-[18px] leading-[27px]">
            Emergency Contact Name
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            Emergency Phone
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            Relationship
          </p>
        </div>

        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px font-[400]">
          <p className="w-[30%] text-start text-[18px] leading-[27px]">
            {chauffeurInfo?.emergencyContactName
              ? chauffeurInfo?.emergencyContactName
              : "---"}
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            {chauffeurInfo?.emergencyContactPhone
              ? chauffeurInfo?.emergencyContactPhone
              : "---"}
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            {chauffeurInfo?.emergencyContactRelation
              ? chauffeurInfo?.emergencyContactRelation
              : "---"}
          </p>
        </div>
      </div>
      <div className="w-[100%] h-fit flex flex-col justify-between items-center bg-red-">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-full">
          Reference Info
        </h3>

        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px] font-[600]">
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            Full Name
          </p>
          <p className="w-[23%] text-start text-[18px] leading-[27px]">Phone</p>
          <p className="w-[22%] text-start text-[18px] leading-[27px]">
            Address
          </p>
          <p className="w-[16%] text-start text-[18px] leading-[27px]">
            Relation
          </p>
        </div>
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px] font-[400]">
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            {chauffeurInfo?.refName ? chauffeurInfo?.refName : "---"}
          </p>
          <p className="w-[23%] text-start text-[18px] leading-[27px]">
            {chauffeurInfo?.refPhone ? chauffeurInfo?.refPhone : "---"}
          </p>
          <p className="w-[22%] text-start text-[18px] leading-[27px]">
            {chauffeurInfo?.refAddress ? chauffeurInfo?.refAddress : "---"}
          </p>
          <p className="w-[16%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            {chauffeurInfo?.refRelation ? chauffeurInfo?.refRelation : "---"}
          </p>
        </div>
      </div>
      <div className="w-[100%] h-fit flex flex-col justify-between items-center bg-red-30 ">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black w-full">
          Additional Notes
        </h3>
        <div className="w-[100%] h-fit font-[400] text-[18px] leading-[27px]">
          {chauffeurInfo?.additional
            ? chauffeurInfo?.additional
            : "No Additional Note Added"}
        </div>
      </div>
    </div>
  );
}
