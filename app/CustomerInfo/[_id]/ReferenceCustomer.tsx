import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function ReferenceCustomer() {
  let { CustomerInfo } = useSelector((state: RootState) => state.CustomerInfo);

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-center gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[100%] h-fit flex flex-col justify-between items-center bg-red-30 ">
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px] font-[600]">
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            Full Name
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">Phone</p>
          <p className="w-[40%] text-start text-[18px] leading-[27px]">
            Address
          </p>
          <p className="w-[15%] text-start text-[18px] leading-[27px]">
            Relation
          </p>
        </div>
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px] font-[400]">
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.ref1Name?CustomerInfo?.ref1Name:"---"}
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.ref1Phone?CustomerInfo?.ref1Phone:"---"}
          </p>
          <p className="w-[40%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.ref1Address?CustomerInfo?.ref1Address:"---"}
          </p>
          <p className="w-[15%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            {CustomerInfo?.ref1Relation?CustomerInfo?.ref1Relation:"---"}
          </p>
        </div>
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px font-[400]">
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.ref2Name?CustomerInfo?.ref2Name:"---"}
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.ref2Phone?CustomerInfo?.ref2Phone:"---"}
          </p>
          <p className="w-[40%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.ref2Address?CustomerInfo?.ref2Address:"---"}
          </p>
          <p className="w-[15%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            {CustomerInfo?.ref2Relation?CustomerInfo?.ref2Relation:"---"}
          </p>
        </div>
      </div>
    </div>
  );
}
