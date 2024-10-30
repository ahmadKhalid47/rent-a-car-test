"use client";
import React from "react";
import { TempTypeInput } from "../../Components/InputComponents/TypeInput";
import { TempSelectInput } from "../../Components/InputComponents/SelectInput";
import {
  setrefNameR,
  setrefPhoneR,
  setrefAddressR,
  setrefRelationR,
  addReference,
  removeReference,
} from "@/app/store/chauffeur";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

export default function ReferenceComp() {
  let chauffeur = useSelector((state: RootState) => state.chauffeur);
  let dispatch = useDispatch();

  return (
    <>
      {chauffeur?.reference.map((contact: any, index: any) => (
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
          {chauffeur?.reference.length - 1 !== index && (
            <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1 mt-5">
              <button
                className="flex justify-center gap-3 items-center w-[200px] py-2 md:py-0 h-fit md:h-[43px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  dispatch(removeReference(index));
                }}
              >
                <FiMinusCircle className="text-[25px]" />
                Remove
              </button>
            </div>
          )}
        </>
      ))}
      {chauffeur?.reference.length < 4 && (
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1 mt-5">
          <button
            className="flex justify-center gap-3 items-center w-[200px] py-2 md:py-0 h-fit md:h-[43px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
            onClick={() => {
              dispatch(addReference());
            }}
          >
            <FiPlusCircle className="text-[25px]" />
            Add More
          </button>
        </div>
      )}
    </>
  );
}
