import { FaEye } from "react-icons/fa";
export default function ReferenceChauffeurs() {
  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-center gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
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
            John Smith
          </p>
          <p className="w-[23%] text-start text-[18px] leading-[27px]">
            438 397 3075
          </p>
          <p className="w-[22%] text-start text-[18px] leading-[27px]">
            Abc 23456
          </p>
          <p className="w-[16%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            Father
          </p>
        </div>
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px font-[400]">
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            Lina Smith
          </p>
          <p className="w-[23%] text-start text-[18px] leading-[27px]">
            438 397 3075
          </p>
          <p className="w-[22%] text-start text-[18px] leading-[27px]">
            Abc 23456
          </p>
          <p className="w-[16%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            Mother
          </p>
        </div>
      </div>
    </div>
  );
}
