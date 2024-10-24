"use client";
import React, { useEffect, useState } from "react";
import {
  TempTypeInput,
  TypeInput,
} from "../../Components/InputComponents/TypeInput";
import {
  SelectInput,
  TempSelectInput,
} from "../../Components/InputComponents/SelectInput";
import {
  setref1NameR,
  setref1PhoneR,
  setref1AddressR,
  setref1RelationR,
  setref2NameR,
  setref2PhoneR,
  setref2AddressR,
  setref2RelationR,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { Popover } from "antd";
import "antd/dist/reset.css";

export default function Feature() {
  let customer = useSelector((state: RootState) => state.Customer);
  let dispatch = useDispatch();
  let [other, setOther] = useState("");
  let [other2, setOther2] = useState("");
  let [popUp, setPopUp] = useState(false);
  let [popUp2, setPopUp2] = useState(false);

  useEffect(() => {
    if (customer.ref1Relation === "Other") setPopUp(true);
  }, [customer.ref1Relation]);

  useEffect(() => {
    if (customer.ref2Relation === "Other") setPopUp2(true);
  }, [customer.ref2Relation]);
  const content = <div>Some content for the popover. </div>;

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <div className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black">
          <h3 className="w-fit flex justify-start items-center gap-5 font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black relative">
            Reference 1
            <Popover
              content={content}
              title="Reference 1"
              trigger={"click"}
              className="text-[16px]"
            >
              <GrCircleInformation />
            </Popover>
          </h3>
        </div>

        <TempTypeInput
          setState={setref1NameR}
          label={"Full Name"}
          value={customer.ref1Name}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setref1PhoneR}
          label={"Phone"}
          value={customer.ref1Phone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setref1AddressR}
          label={"Address"}
          value={customer.ref1Address}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setref1RelationR}
          label={"Relation"}
          value={customer.ref1Relation}
          required={false}
          options={
            !other
              ? ["Father", "Mother", "Brother", "Other"]
              : ["Father", "Mother", "Brother", customer.ref1Relation, "Other"]
          }
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <div className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black">
          <h3 className="w-fit flex justify-start items-center gap-5 font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black relative">
            Reference 2
            <Popover
              content={content}
              title="Reference 2"
              trigger={"click"}
              className="text-[16px]"
            >
              <GrCircleInformation />
            </Popover>
          </h3>
        </div>

        <TempTypeInput
          setState={setref2NameR}
          label={"Full Name"}
          value={customer.ref2Name}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setref2PhoneR}
          label={"Phone"}
          value={customer.ref2Phone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setref2AddressR}
          label={"Address"}
          value={customer.ref2Address}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setref2RelationR}
          label={"Relation"}
          value={customer.ref2Relation}
          required={false}
          options={
            !other2
              ? ["Father", "Mother", "Brother", "Other"]
              : ["Father", "Mother", "Brother", customer.ref2Relation, "Other"]
          }
        />
      </div>
      {popUp && (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position">
            <div
              className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
            >
              <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                {"Add New"}
                <FaAsterisk className="text-[6px]" />
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={true}
                  type={"text"}
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Text Here`}
                  onChange={(e) => {
                    setOther(e.target.value);
                  }}
                  value={other}
                />
              </div>
            </div>

            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
              <button
                className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                onClick={() => {
                  setOther("");
                  setPopUp(false);
                }}
              >
                <FaTimes />
              </button>
              <button
                className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  dispatch(setref1RelationR(other));
                  setPopUp(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {popUp2 && (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position">
            <div
              className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
            >
              <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                {"Add New"}
                <FaAsterisk className="text-[6px]" />
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={true}
                  type={"text"}
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Text Here`}
                  onChange={(e) => {
                    setOther2(e.target.value);
                  }}
                  value={other2}
                />
              </div>
            </div>

            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
              <button
                className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                onClick={() => {
                  setOther2("");
                  setPopUp2(false);
                }}
              >
                <FaTimes />
              </button>
              <button
                className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  dispatch(setref2RelationR(other2));
                  setPopUp2(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
