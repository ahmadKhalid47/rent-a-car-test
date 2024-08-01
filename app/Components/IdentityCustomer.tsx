import { FaEye } from "react-icons/fa";

export default function GeneralCustomer() {
  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-center gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[70%] h-fit flex flex-col justify-between items-center">
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px] font-[600]">
          <p className="w-[15%] text-start text-[18px] leading-[27px]">
            Doc Type
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            Number
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            Valid Until
          </p>
          <p className="w-[18%] text-start text-[18px] leading-[27px]">
            Country/State
          </p>
        </div>
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px] font-[400]">
          <p className="w-[15%] text-start text-[18px] leading-[27px]">
            Passport
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            673409290265
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            12-01-2023
          </p>
          <p className="w-[18%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            America
            <FaEye className="text-grey" />
          </p>
        </div>
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px font-[400]">
          <p className="w-[15%] text-start text-[18px] leading-[27px]">
            License
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            673409290265
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            12-01-2023
          </p>
          <p className="w-[18%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            America
            <FaEye className="text-grey" />
          </p>
        </div>
      </div>
      <div className="w-[210px] h-[210px] bg-white rounded-[10px] border-[1px] border-grey my-2"></div>
    </div>
  );
}
