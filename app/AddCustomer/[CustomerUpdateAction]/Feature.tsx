"use client";
import React from "react";
import {
  addContact,
  removeContact,
  updateContact,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/reset.css";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { Relation } from "@/app/AddChauffeur/[chauffeurUpdateAction]/Feature";

export default function Feature() {
  let customer = useSelector((state: RootState) => state.Customer);
  let dispatch = useDispatch();

  const handleInputChange = (e: any, index: any, field: any) => {
    const updatedContact = {
      ...customer?.emergency[index],
      [field]: e,
    };
    dispatch(updateContact({ index, contact: updatedContact }));
  };

  return (
    <div className="w-full h-fit">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Emergency Information{" "}
        </span>
        {customer?.emergency.map((contact: any, index: any) => (
          <>
            <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Emergency Contact Name
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={false}
                  type={"text"}
                  autoComplete="new-password"
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Emergency Contact Name`}
                  value={contact.emergencyName}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "emergencyName")
                  }
                />
              </div>
            </div>
            <Relation
              value={contact.emergencyRelation}
              action={handleInputChange}
              index={index}
            />
            <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Emergency Phone
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={false}
                  type={"number"}
                  pattern="[0-9]*"
                  autoComplete="new-password"
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Emergency Phone`}
                  value={contact.emergencyPhone}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "emergencyPhone")
                  }
                />
              </div>
            </div>
            {customer?.emergency.length - 1 !== index && (
              <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1 mt-5">
                <button
                  className="flex justify-center gap-3 items-center w-[200px] py-2 md:py-0 h-fit md:h-[43px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                  onClick={() => {
                    dispatch(removeContact(index));
                  }}
                >
                  <FiMinusCircle className="text-[25px]" />
                  Remove
                </button>
              </div>
            )}
          </>
        ))}

        {customer?.emergency.length < 4 && (
          <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1 mt-5">
            <button
              className="flex justify-center gap-3 items-center w-[200px] py-2 md:py-0 h-fit md:h-[43px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                dispatch(addContact());
              }}
            >
              <FiPlusCircle className="text-[25px]" />
              Add More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
