import React from "react";
import shape from "@/public/ShapeBlack.svg";
import { FaAsterisk } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { Popover, Button } from "antd";
import "antd/dist/reset.css";
import { useDispatch } from "react-redux";

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
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
          required={required}
        >
          {options?.map((item: any, key: number) => (
            <option value="" key={key}>
              {item}
            </option>
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
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
          required={required}
        >
          {options?.map((item: any, key: number) => (
            <option value="" key={key}>
              {item}
            </option>
          ))}
        </select>
        <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <img src={shape.src} className="w-[10.5px]" />
        </div>
      </div>
    </div>
  );
};

interface SelectInputInfo {
  label: string;
  value: any;
  required: boolean;
  options: any;
}

export const SelectInputInfo: React.FC<SelectInputInfo> = ({
  label,
  value,
  required,
  options,
}) => {
  const content = <div>Some content for the popover. {label} </div>;
  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
      <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
        <Popover
          content={content}
          //title="Popover Title"
          trigger={"click"}
          className="text-[16px] font-[900] absolute right-3"
        >
          <GrCircleInformation />
        </Popover>
      </label>
      <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
          required={required}
        >
          {options?.map((item: any, key: number) => (
            <option value="" key={key}>
              {item}
            </option>
          ))}
        </select>
        <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <img src={shape.src} className="w-[10.5px]" />
        </div>
      </div>
    </div>
  );
};

// Temp
interface TempSelectInput {
  setState: any;
  label: string;
  value: any;
  required: boolean;
  options: any;
}

export const TempSelectInput: React.FC<TempSelectInput> = ({
  setState,
  label,
  value,
  required,
  options,
}) => {
  let dispatch = useDispatch();

  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
          required={required}
          onChange={(e) => {
            dispatch(setState(e.target.value));
          }}
          value={value}
        >
          <option value={""}>Select</option>
          {options?.map((item: any, key: number) => (
            <option value={item} key={key}>
              {item ? item : "Select"}
            </option>
          ))}
        </select>
        <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <img src={shape.src} className="w-[10.5px]" />
        </div>
      </div>
    </div>
  );
};

interface TempSelectInputWidth {
  setState: any;
  label: string;
  value: any;
  required: boolean;
  options: any;
  widthProp: string;
}

export const TempSelectInputWidth: React.FC<TempSelectInputWidth> = ({
  setState,
  label,
  value,
  required,
  options,
  widthProp,
}) => {
  let dispatch = useDispatch();

  return (
    <div
      className={`w-[100%] ${widthProp} h-fit bg-red-30 flex flex-col justify-start items-start gap-1`}
    >
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
          required={required}
          onChange={(e) => {
            dispatch(setState(e.target.value));
          }}
          value={value}
        >
          <option value={""}>Select</option>
          {options?.map((item: any, key: number) => (
            <option value={item} key={key}>
              {item ? item : "Select"}
            </option>
          ))}
        </select>
        <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <img src={shape.src} className="w-[10.5px]" />
        </div>
      </div>
    </div>
  );
};

interface TempSelectInputInfo {
  setState: any;
  label: string;
  value: any;
  required: boolean;
  options: any;
}

export const TempSelectInputInfo: React.FC<TempSelectInputInfo> = ({
  setState,
  label,
  value,
  required,
  options,
}) => {
  let dispatch = useDispatch();
  const content = <div>Some content for the popover. {label} </div>;
  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
      <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
        {/* <Popover
          content={content}
          //title="Popover Title"
          trigger={"click"}
          className="text-[16px] font-[900] absolute right-3"
        >
          <GrCircleInformation />
        </Popover> */}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
          required={required}
          onChange={(e) => {
            dispatch(setState(e.target.value));
          }}
          value={value}
        >
          {options?.map((item: any, key: number) => (
            <option value={item} key={key}>
              {item ? item : "Select"}
            </option>
          ))}
        </select>
        <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <img src={shape.src} className="w-[10.5px]" />
        </div>
      </div>
    </div>
  );
};
