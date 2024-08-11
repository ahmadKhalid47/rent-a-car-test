import React from "react";
import shape from "@/public/ShapeBlack.svg";
import { FaAsterisk } from "react-icons/fa";

interface SelectInput {
  label: string;
  value: any;
  required: boolean;
  options: any;
}

export const SelectInput: React.FC<SelectInput> = ({
  label,
  value,
  required,
  options,
}) => {
  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
        <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
          {options?.map((item: any) => (
            <option value="">{item}</option>
          ))}
        </select>
        <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <img src={shape.src} className="w-[10.5px]" />
        </div>
      </div>
    </div>
  );
};

interface SelectInputWidth {
  label: string;
  value: any;
  required: boolean;
  options: any;
  widthProp: string;
}

export const SelectInputWidth: React.FC<SelectInputWidth> = ({
  label,
  value,
  required,
  options,
  widthProp,
}) => {
  return (
    <div
      className={`w-[100%] ${widthProp} h-fit bg-red-30 flex flex-col justify-start items-start gap-1`}
    >
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
        <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
          {options?.map((item: any) => (
            <option value="">{item}</option>
          ))}
        </select>
        <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <img src={shape.src} className="w-[10.5px]" />
        </div>
      </div>
    </div>
  );
};
