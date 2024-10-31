"use client";
import upload from "@/public/Paper Upload.svg";
import React, { useCallback, useEffect, useState } from "react";
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
  setadditionalR,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { setAlert, setSeverity } from "@/app/store/Global";

export default function Reference() {
  let customer = useSelector((state: RootState) => state.Customer);
  let dispatch = useDispatch();
  let [other, setOther] = useState("");
  let [other2, setOther2] = useState("");
  let [popUp, setPopUp] = useState(false);
  let [popUp2, setPopUp2] = useState(false);

  useEffect(() => {
    if (customer.refRelation === "Other") setPopUp(true);
  }, [customer.refRelation]);

  useEffect(() => {
    if (customer.emergencyContactRelation === "Other") setPopUp2(true);
  }, [customer.emergencyContactRelation]);
  const onDrop = useCallback((acceptedFiles: any) => {
    const maxFileSize = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"]; // Allowed MIME types for JPG and PNG

    const filteredFiles = acceptedFiles.filter((file: any) => {
      if (!allowedTypes.includes(file.type)) {
        dispatch(
          setAlert(
            `File ${file.name} is not a supported format. Please upload JPG or PNG files.`
          )
        );
        dispatch(setSeverity("error"));

        return false;
      }
      if (file.size > maxFileSize) {
        dispatch(
          setAlert(`File ${file.name} is too large. Maximum size is 5MB.`)
        );
        dispatch(setSeverity("error"));
        return false;
      }
      return true;
    });

    if (filteredFiles.length > 0) {
      // Replace the current file with the new one
      // setFiles([
      //   Object.assign(filteredFiles[0], {
      //     preview: URL.createObjectURL(filteredFiles[0]),
      //   }),
      // ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    <div className="w-full h-fit">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Reference Information{" "}
        </span>
        <TempTypeInput
          setState={setref1NameR}
          label={"Full Name"}
          value={customer.refName}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setref1PhoneR}
          label={"Phone"}
          value={customer.refPhone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setref1AddressR}
          label={"Address"}
          value={customer.refAddress}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setref1RelationR}
          label={"Relation"}
          value={customer.refRelation}
          required={false}
          options={
            !other
              ? ["Father", "Mother", "Brother", "Other"]
              : ["Father", "Mother", "Brother", customer.refRelation, "Other"]
          }
        />
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full mt-1 -mb-2 b">
          Upload {customer.idCard ? "ID Card" : "Passport"}*
        </span>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <img src={upload.src} />
          <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Select JPG, PNG
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Maximum size 5MB
          </span>
        </div>
      </div>
      <div className="flex justify-start gap-3 items-center w-[100%] mt-5">
        <button
          className="flex justify-center gap-3 items-center w-[200px] py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
          // onClick={() => {
          //   dispatch(setotherR(!customer.other));
          // }}
        >
          {customer.other ? (
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
              value={customer.additional}
              placeholder="Any Additional Notes"
            >
              Any Additional Notes
            </textarea>
          </div>
        </div>
      </div>
      {popUp && (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position">
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
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position">
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
