"use client";
import React from "react";
import { setadditionalR } from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import ReferenceComp from "./ReferenceComp";

export default function Reference() {
  let Customer = useSelector((state: RootState) => state.Customer);
  let dispatch = useDispatch();

  return (
    <div className="w-full h-fit">
      <ReferenceComp />
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Any Additional Notes{" "}
        </span>
        <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
          <div className="w-full h-fit flex justify-between items-center relative">
            <textarea
              className="w-full pe-2 py-3 font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
              rows={6}
              cols={6}
              onChange={(e) => dispatch(setadditionalR(e.target.value))}
              value={Customer.additional}
              placeholder="Any Additional Notes"
            >
              Any Additional Notes
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
