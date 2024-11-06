import React from "react";
import { SmallLoader } from "../Loader";

const ConfirmationPopup = ({
  popup,
  onConfirm,
  onCancel,
  deleteLoading,
  isMultiple = false, // New prop to handle single or multiple delete message
}:any) => {
  if (!popup) return null;

  return (
    <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center items-start sm:items-center z-[10]">
      <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15] py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 modal-position modal-animation fixed">
        <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[16px] leading-[17px]">
            {isMultiple
              ? "Are you sure you want to delete selected items?"
              : "Are you sure you want to delete this item?"}
          </label>
        </div>
        <div className="w-full flex justify-end gap-4 items-center pt-4">
          <button
            className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
            onClick={onConfirm}
            disabled={deleteLoading}
          >
            {deleteLoading ? <SmallLoader /> : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
