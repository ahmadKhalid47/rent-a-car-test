
import { FaAsterisk } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { GoTriangleDown } from "react-icons/go";

interface SelectInput {
  label: string;
  value: any;
  required: boolean;
  options: any;
  setState: any;
}

export const SelectInput: React.FC<SelectInput> = ({
  label,
  value,
  required,
  options,
  setState,
}) => {
  return (
    <div className="w-[100%] sm:w-[48%] h-fit flex flex-col justify-start items-start gap-1 dark:text-white text-black">
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
          required={required}
          onChange={(e) => {
            setState(e.target.value);
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
        <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <GoTriangleDown className="text-[18px]" />
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
  setState: any;
}

export const SelectInputWidth: React.FC<SelectInputWidth> = ({
  label,
  value,
  required,
  options,
  widthProp,
  setState,
}) => {
  return (
    <div
      className={`w-[100%] ${widthProp} h-fit flex flex-col justify-start items-start gap-1`}
    >
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
          required={required}
          onChange={(e) => {
            setState(e.target.value);
          }}
          value={value}
        >
          <option value={""}>Select</option>
          {options?.map((item: any, key: number) => (
            <option value={item} key={key}>
              {item ? item : "Select"}
            </option>
          ))}{" "}
        </select>
        <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <GoTriangleDown className="text-[18px]" />
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
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
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
        <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <GoTriangleDown className="text-[18px]" />
        </div>
      </div>
    </div>
  );
};
// Link
interface TempSelectInputLink {
  setState: any;
  label: string;
  value: any;
  required: boolean;
  options: any;
  link: any;
}
export const TempSelectInputLink: React.FC<TempSelectInputLink> = ({
  setState,
  label,
  value,
  required,
  options,
  link,
}) => {
  let dispatch = useDispatch();

  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
      <label className="w-full flex justify-between gap-1 items-start font-[400] text-[14px] leading-[17px]">
        <span className="flex justify-start gap-1 items-start">
          {label}
          {required && <FaAsterisk className="text-[6px]" />}
        </span>
        <span className="text-[8px]">
          Not found?{" "}
          <Link
            href={link}
            className="text-[#3d84ff] no-underline hover:underline capitalize"
          >
            Add new!
          </Link>
        </span>
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
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
        <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <GoTriangleDown className="text-[18px]" />
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
      className={`w-[100%] ${widthProp} h-fit flex flex-col justify-start items-start gap-1`}
    >
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <select
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
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
        <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
          <GoTriangleDown className="text-[18px]" />
        </div>
      </div>
    </div>
  );
};
