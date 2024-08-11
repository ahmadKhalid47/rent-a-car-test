import React from "react";
import { FaAsterisk } from "react-icons/fa";

interface TypeInput {
  label: string;
  value: any;
  required: boolean;
  type: string;
}

export const TypeInput: React.FC<TypeInput> = ({
  label,
  value,
  required,
  type,
}) => {
  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
        <input
          required={required}
          type={type}
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey truncate"
          placeholder={`Enter ${label}`}
        />
      </div>
    </div>
  );
};

interface TypeInputWidth {
  label: string;
  value: any;
  required: boolean;
  type: string;
  widthProp: string;
}

export const TypeInputWidth: React.FC<TypeInputWidth> = ({
  label,
  value,
  required,
  type,
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
        <input
          required={required}
          type={type}
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey truncate"
          placeholder={`Enter ${label}`}
        />
      </div>
    </div>
  );
};
