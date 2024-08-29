"use client";
import upload from "@/public/Paper Upload.svg";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TypeInput } from "../InputComponents/TypeInput";
import { SelectInput } from "../InputComponents/SelectInput";

export default function Info() {
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
          label={"Chauffeur ID"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput
          label={"Full Name"}
          value={""}
          required={true}
          type={"text"}
        />
        <SelectInput
          label={"Gender"}
          value={""}
          required={true}
          options={["Select", "Male", "Female"]}
        />
        <TypeInput
          label={"Date of Birth"}
          value={""}
          required={false}
          type={"date"}
        />
        <SelectInput
          label={"Nationality"}
          value={""}
          required={false}
          options={["Select", "Nationality1", "Nationality2"]}
        />
        <TypeInput
          label={"Email Address"}
          value={""}
          required={false}
          type={"email"}
        />
        <TypeInput label={"Phone"} value={""} required={true} type={"text"} />
        <TypeInput
          label={"Alternative Phone"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput
          label={"Rent Per Day"}
          value={""}
          required={false}
          type={"text"}
        />
        <TypeInput
          label={"Street Address"}
          value={""}
          required={false}
          type={"text"}
        />
        <SelectInput
          label={"Country"}
          value={""}
          required={true}
          options={["Select", "Country1", "Country2"]}
        />
        <SelectInput
          label={"State/Province"}
          value={""}
          required={true}
          options={["Select", "State1", "State2"]}
        />
        <SelectInput
          label={"City"}
          value={""}
          required={true}
          options={["Select", "City1", "City2"]}
        />
        <TypeInput
          label={"Postal/Zip Code"}
          value={""}
          required={true}
          type={"text"}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
        <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] text-black w-[100%]">
          Add Image
        </h3>
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
          <h4 className="font-[400] text-[14px] leading-[17px] text-[#515978]">
            Select JPG or PNG{" "}
          </h4>
        </div>

        <div className="w-full h-fit flex justify-start items-center gap-5">
          {thumbs}
        </div>
      </div>
    </div>
  );
}
