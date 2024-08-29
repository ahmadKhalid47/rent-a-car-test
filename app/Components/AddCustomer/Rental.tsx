"use client";
import upload from "@/public/Paper Upload.svg";
import { useState } from "react";
import React, { useCallback } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { TypeInput } from "../InputComponents/TypeInput";
import { SelectInput } from "../InputComponents/SelectInput";

export default function Rental() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const thumbs: any = files.map((file: any) => (
    <div
      key={file.name}
      className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative"
    >
      <div className="relative w-[64px] h-[64px] rounded-[10px] border-[1px] border-grey overflow-hidden">
        <img
          src={file.preview}
          alt={file.name}
          className=" w-[64px] h-[64px]"
        />
      </div>
      <span className="font-[400] text-[10px] leading-[12px] text-grey">
        image4.jpg
      </span>
      <span
        className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]"
        onClick={() => removing(file.name)}
      >
        <FaTimesCircle />
      </span>
    </div>
  ));

  function removing(name: any) {
    let array = files;
    array = array.filter((e: any) => {
      return e.name !== name;
    });
    setFiles(array);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TypeInput
          label={"Passport / ID Number"}
          value={""}
          required={false}
          type={"text"}
        />

        <TypeInput
          label={"Valid Until"}
          value={""}
          required={false}
          type={"date"}
        />

        <SelectInput
          label={"Issuing Country/State"}
          value={""}
          required={false}
          options={["Select", "Country1", "Country2"]}
        />

        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <img src={upload.src} />
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
        </div>
        <span className="font-[400] text-[14px] leading-[17px] text-black -mt-4">
          Here you can Upload Passport / ID scans
        </span>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          {thumbs}
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TypeInput
          label={"Driver's License Number"}
          value={""}
          required={false}
          type={"text"}
        />

        <TypeInput
          label={"Valid Until"}
          value={""}
          required={false}
          type={"date"}
        />

        <SelectInput
          label={"Issuing Country/State"}
          value={""}
          required={false}
          options={["Select", "Country1", "Country2"]}
        />

        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <img src={upload.src} />
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
        </div>
        <span className="font-[400] text-[14px] leading-[17px] text-black -mt-4">
          Here you can Upload driving license scans
        </span>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          {thumbs}
        </div>
      </div>
    </div>
  );
}
