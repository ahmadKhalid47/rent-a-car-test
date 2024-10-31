"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { setotherNote } from "@/app/store/Vehicle";

export default function Others() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let dispatch = useDispatch();

  return (
    <div className="w-full h-fit">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
          <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
            Any Additional Notes
          </span>
          <div className="w-full h-fit flex justify-between items-center relative">
            <textarea
              className="w-full pe-2 py-3 font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
              rows={6}
              cols={6}
              onChange={(e) => dispatch(setotherNote(e.target.value))}
              value={vehicle.otherNote}
              placeholder="Any Additional Notes"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
