"use client";
import vip from "@/public/vip.svg";
import upload from "@/public/Paper Upload.svg";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TypeInput } from "../InputComponents/TypeInput";
import { SelectInput } from "../InputComponents/SelectInput";

export default function Info() {
  const [files, setFiles] = useState<any>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
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
          label={"Customer ID"}
          value={""}
          required={false}
          type={"text"}
        />
        <SelectInput
          label={"Customer Type"}
          value={""}
          required={true}
          options={["Select", "Type1", "Type2"]}
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

        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-0 sm:gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[0px] sm:text-[14px] leading-[0px] sm:leading-[17px] text-transparent">
            VIP Client
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <div className="pe- font-[400] text-[14px] leading-[17px] ps-2 w-[100%] h-[43px] flex  justify-start gap-2 items-center bg-white ">
              <input
                type="checkbox"
                className="mr-2 font-[400] text-[16px] leading-[19px] ps-2 w-[19px] h-[19px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
              />
              <img src={vip.src} />
              It’s VIP Client
            </div>
          </div>
        </div>
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
            Select JPG or PNG
          </h4>
        </div>

        <div className="w-full h-fit flex justify-start items-center gap-5">
          {thumbs}
        </div>
      </div>
    </div>
  );
}
