import React from "react";
import { FaAsterisk } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { Popover, Button } from "antd";
import "antd/dist/reset.css";

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

interface TypeInputInfo {
  label: string;
  value: any;
  required: boolean;
  type: string;
}

export const TypeInputInfo: React.FC<TypeInputInfo> = ({
  label,
  value,
  required,
  type,
}) => {
  const content = <div>Some content for the popover. </div>;

  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
      <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
        <Popover
          content={content}
          // title="Popover Title"
          trigger={"click"}
          className="text-[16px] font-[900] absolute right-3"
        >
          <GrCircleInformation />
        </Popover>
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
