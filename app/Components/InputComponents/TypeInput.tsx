import { FaAsterisk } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface TypeInput {
  label: string;
  setState: any;
  value: any;
  required: boolean;
  type: string;
  widthProp: string;
}

export const TypeInput: React.FC<TypeInput> = ({
  label,
  setState,
  value,
  required,
  type,
  widthProp,
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
        <input
          required={required}
          type={type}
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
          placeholder={`Enter ${label}`}
          onChange={(e) => {
            setState(e.target.value);
          }}
          value={value}
        />
      </div>
    </div>
  );
};

interface TypeInputWidth {
  label: string;
  setState: any;
  value: any;
  required: boolean;
  type: string;
  widthProp: string;
}

export const TypeInputWidth: React.FC<TypeInputWidth> = ({
  label,
  setState,
  value,
  required,
  type,
  widthProp,
}) => {
  return (
    <div
      className={`w-[100%] ${widthProp} h-fit flex flex-col justify-start items-start gap-1 dark:text-white text-black`}
    >
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <input
          required={required}
          type={type}
          value={value}
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
          placeholder={`Enter ${label}`}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

// Temp
interface TempTypeInput {
  label: string;
  setState: any;
  value: any;
  required: boolean;
  type: string;
}

export const TempTypeInput: React.FC<TempTypeInput> = ({
  label,
  setState,
  value,
  required,
  type,
}) => {
  let dispatch = useDispatch();

  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <input
          required={required}
          type={type}
          autoComplete="new-password"
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
          placeholder={`Enter ${label}`}
          onChange={(e) => {
            dispatch(setState(e.target.value));
          }}
          value={value}
        />
      </div>
    </div>
  );
};

// Sign
interface TempTypeInputSign {
  label: string;
  setState: any;
  value: any;
  required: boolean;
  type: string;
  sign: string;
}

export const TempTypeInputSign: React.FC<TempTypeInputSign> = ({
  label,
  setState,
  value,
  required,
  type,
  sign,
}) => {
  let dispatch = useDispatch();

  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <input
          required={required}
          type={type}
          autoComplete="new-password"
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
          placeholder={`Enter ${label}`}
          onChange={(e) => {
            dispatch(setState(e.target.value));
          }}
          value={value}
        />
        <div className="absolute right-3 text-[#808080]">{sign}</div>
      </div>
    </div>
  );
};

interface TempTypeInputLimit {
  label: string;
  setState: any;
  value: any;
  required: boolean;
  type: string;
  minLength: any;
  maxLength: any;
}
export const TempTypeInputLimit: React.FC<TempTypeInputLimit> = ({
  label,
  setState,
  value,
  required,
  type,
  minLength,
  maxLength,
}) => {
  let dispatch = useDispatch();

  return (
    <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
        {label}
        {required && <FaAsterisk className="text-[6px]" />}
      </label>
      <div className="w-full h-fit flex justify-between items-center relative">
        <input
          required={required}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete="new-password"
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
          placeholder={`Enter ${label}`}
          onChange={(e) => {
            dispatch(setState(e.target.value));
          }}
          value={value}
        />
      </div>
    </div>
  );
};

interface TempTypeInputWidth {
  label: string;
  setState: any;
  value: any;
  required: boolean;
  type: string;
  widthProp: string;
}

export const TempTypeInputWidth: React.FC<TempTypeInputWidth> = ({
  label,
  setState,
  value,
  required,
  type,
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
        <input
          required={required}
          type={type}
          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
          placeholder={`Enter ${label}`}
          onChange={(e) => {
            dispatch(setState(e.target.value));
          }}
          value={value}
        />
      </div>
    </div>
  );
};
