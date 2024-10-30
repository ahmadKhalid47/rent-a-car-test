"use client";
import React from "react";
import { TempTypeInput } from "../../Components/InputComponents/TypeInput";
import { TempSelectInput } from "../../Components/InputComponents/SelectInput";
import {
  setrefNameR,
  setrefPhoneR,
  setrefAddressR,
  setrefRelationR
} from "@/app/store/chauffeur";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

export default function ReferenceComp() {
  let chauffeur = useSelector((state: RootState) => state.chauffeur);
  
  return (
    <>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-whit mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Reference Information{" "}
        </span>
        <TempTypeInput
          setState={setrefNameR}
          label={"Full Name"}
          value={chauffeur.refName}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setrefPhoneR}
          label={"Phone"}
          value={chauffeur.refPhone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setrefAddressR}
          label={"Address"}
          value={chauffeur.refAddress}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setrefRelationR}
          label={"Relation"}
          value={chauffeur.refRelation}
          required={false}
          options={["Father", "Mother", "Brother", "Other"]}
        />
      </div>
      <div className="flex justify-start gap-3 items-center w-[100%] mt-5">
        <button className="flex justify-center gap-3 items-center w-[200px] py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
          {chauffeur.other ? (
            <>
              <FiMinusCircle className="text-[25px]" />
              Cancel
            </>
          ) : (
            <>
              <FiPlusCircle className="text-[25px]" />
              Add More
            </>
          )}
        </button>
      </div>
    </>
  );
}
