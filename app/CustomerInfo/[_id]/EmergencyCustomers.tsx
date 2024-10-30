import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function EmergencyCustomers() {
  let { CustomerInfo } = useSelector(
    (state: RootState) => state.CustomerInfo
  );

  return (
    <div className="w-full h-full py-3 px-5 flex justify-start flex-col items-start gap-1 overflow-auto">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">
            Contact Number
          </span>
          {CustomerInfo?.emergency?.map((item: any, index: any) => (
            <span className="w-full">{item?.emergencyName}</span>
          ))}
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Relation</span>
          {CustomerInfo?.emergency?.map((item: any, index: any) => (
            <span className="w-full">
              {item?.emergencyRelation}
            </span>
          ))}
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">
            Emergency Phone
          </span>
          {CustomerInfo?.emergency?.map((item: any, index: any) => (
            <span className="w-full">{item?.emergencyPhone}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
