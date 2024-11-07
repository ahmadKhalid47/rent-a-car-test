"use client";
import upload from "@/public/Paper Upload.svg";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import React, { useEffect, useState } from "react";
import {
  addReference,
  removeReference,
  updateReference,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { Thumbs } from "@/app/Components/functions/thumbsFromDrag";
import { useDropzone } from "react-dropzone";
import { useFileDrop } from "@/app/Components/functions/onDragFromDrag";
import Image from "next/image";

export default function ReferenceComp() {
  let Customer = useSelector((state: RootState) => state.Customer);
  let dispatch = useDispatch();

  const handleInputChange = (e: any, index: any, field: any) => {
    const updatedReference = {
      ...Customer?.reference[index],
      [field]: e,
    };
    dispatch(updateReference({ index, reference: updatedReference }));
  };

  return (
    <>
      {Customer?.reference?.map((reference: any, index: any) => (
        <>
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-whit mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
              Reference Information{" "}
            </span>

            <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Reference Name
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={false}
                  type={"text"}
                  autoComplete="new-password"
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Reference Name`}
                  value={reference?.refName}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "refName")
                  }
                />
              </div>
            </div>
            <Relation
              value={reference?.refRelation}
              action={handleInputChange}
              index={index}
            />
            <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Reference Phone
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={false}
                  type={"number"}
                  pattern="[0-9]*"
                  autoComplete="new-password"
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Reference Phone`}
                  value={reference?.refPhone}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "refPhone")
                  }
                />
              </div>
            </div>
            <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Reference Address
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={false}
                  type={"text"}
                  autoComplete="new-password"
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Reference Address`}
                  value={reference?.refAddress}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "refAddress")
                  }
                />
              </div>
            </div>
            <ImageUpload
              value={reference?.refImages}
              action={handleInputChange}
              index={index}
            />
          </div>
          {Customer?.reference?.length - 1 !== index && (
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
      {Customer?.reference?.length < 4 && (
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



function ImageUpload({ value, action, index }: any) {
  const [otherfiles, setOtherFiles] = useState<any>(value);
  useEffect(() => {
    setOtherFiles(value);
  }, [value]);

  const onDropOther = useFileDrop(
    (files: any[]) =>
      setOtherFiles((prevFiles: any) => [...prevFiles, ...files]) 
  );
  const { getRootProps: getRootPropsOther, getInputProps: getInputPropsOther } =
    useDropzone({
      onDrop: onDropOther,
    });
  useEffect(() => {
    action(otherfiles, index, "refImages");
  }, [otherfiles]);

  return (
    <>
      <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full mt-1 -mb-2 b">
        Upload Image*
      </span>

      <div
        className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px cursor-pointer"
        {...getRootPropsOther()}
      >
        <input {...getInputPropsOther()} />
                  <Image
            src={upload.src}
            alt=""
            width={32}
            height={32}
            priority={true}
          />
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
      <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
        <Thumbs files={otherfiles} setFiles={setOtherFiles} />
      </div>
    </>
  );
}


export function Relation({ value, action, index }: any) {
  let [other2, setOther2] = useState("");
  let [popUp2, setPopUp2] = useState(false);
  let [options, setoptions] = useState(
    !other2
      ? ["Father", "Mother", "Brother", "Other"]
      : ["Father", "Mother", "Brother", value, "Other"]
  );
  useEffect(() => {
    if (value === "Other") setPopUp2(true);
    setoptions(
      !other2
        ? ["Father", "Mother", "Brother", "Other"]
        : ["Father", "Mother", "Brother", value, "Other"]
    );
  }, [value]);

  return (
    <>
      <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
        <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
          Relation
        </label>
        <div className="w-full h-fit flex justify-between items-center relative">
          <select
            className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
            required={false}
            value={value}
            onChange={(e) => action(e.target.value, index, "refRelation")}
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
      {popUp2 && (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position modal-animation">
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
                  action(other2, index, "refRelation");
                  setPopUp2(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
