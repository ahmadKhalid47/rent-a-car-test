"use client";
import shape from "@/public/ShapeBlack.svg";
import carsGroupCar1 from "@/public/carGroupCar (5).svg";
import carsGroupCar2 from "@/public/carGroupCar (1).svg";
import carsGroupCar3 from "@/public/carGroupCar (4).svg";
import carsGroupCar4 from "@/public/carGroupCar (3).svg";
import carsGroupCar5 from "@/public/carGroupCar (2).svg";
import upload from "@/public/Paper Upload.svg";
import { useState } from "react";
import { FaAsterisk, FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { TypeInput, TypeInputInfo } from "../InputComponents/TypeInput";
import { SelectInput, SelectInputInfo } from "../InputComponents/SelectInput";

export default function Info() {
  const [alreadyFiles, setAlreadyFiles] = useState([
    { preview: carsGroupCar1, name: "car1" },
    { preview: carsGroupCar2, name: "car2" },
    { preview: carsGroupCar3, name: "car3" },
    { preview: carsGroupCar4, name: "car4" },
    { preview: carsGroupCar5, name: "car5" },
  ]);
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

  const thumbsAlready: any = alreadyFiles.map((file: any) => (
    <div
      key={file.name}
      className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative"
    >
      <div className="relative w-[64px] h-[64px] rounded-[10px] border-grey overflow-hidden">
        <img
          src={file.preview.src}
          alt={file.name}
          className=" w-[64px] h-[64px]"
        />
      </div>
      <span className="font-[400] text-[10px] leading-[12px] text-grey">
        image4.jpg
      </span>
      <span
        className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px] z-[100]"
        onClick={() => removingAlready(file.name)}
      >
        <FaTimesCircle />
      </span>
    </div>
  ));
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
  function removingAlready(name: any) {
    let array = alreadyFiles;
    array = array.filter((e: any) => {
      return e.name !== name;
    });
    setAlreadyFiles(array);
  }
  function removing(name: any) {
    let array = files;
    array = array.filter((e: any) => {
      return e.name !== name;
    });
    setFiles(array);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full h-fit ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TypeInput
          label={"Vehicle ID"}
          value={""}
          name={"vehicleID"}
          required={false}
          type={"text"}
        />
        <SelectInput
          label={"Make"}
          value={""}
          name={"make"}
          required={true}
          options={["Select", "Make1", "Make2"]}
        />

        <SelectInput
          label={"Model"}
          value={""}
          name={"model"}
          required={true}
          options={["Select", "Model1", "Model2"]}
        />

        <SelectInput
          label={"Type"}
          value={""}
          name={"type"}
          required={true}
          options={["Select", "Type1", "Type2"]}
        />

        <SelectInput
          label={"Year"}
          value={""}
          name={"year"}
          required={true}
          options={["Select", "Year1", "Year2"]}
        />
        <TypeInput
          label={"Registration No"}
          value={""}
          name={"registrationNo"}
          required={true}
          type={"text"}
        />

        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Color
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative">
            <select
              className="ps-7 font-[400] text-[16px] leading-[19px] px-5 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              name={"color"}
              required={true}
            >
              <option value="">Select</option>
              <option value="">Red</option>
              <option value="">Red</option>
              <option value="">Red</option>
            </select>
            <div className="rounded-full w-[19px] h-[12px] bg-red-500 absolute left-2 top-[15.5px]"></div>
            <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>

        <SelectInput
          label={"Fuel Type"}
          value={""}
          name={"fuelType"}
          required={true}
          options={["Select", "Type1", "Type2"]}
        />

        <SelectInput
          label={"Transmission"}
          value={""}
          name={"transmission"}
          required={true}
          options={["Select", "Transmission1", "Transmission2"]}
        />
        <TypeInputInfo
          label={"Odometer (KMPH)"}
          value={""}
          name={"odometer"}
          required={true}
          type={"text"}
        />

        <SelectInputInfo
          label={"Passengers"}
          value={""}
          name={"passengers"}
          required={true}
          options={["Select", "Passengers1", "Passengers2"]}
        />

        <SelectInput
          label={"Country"}
          value={""}
          name={"country"}
          required={true}
          options={["Select", "Country1", "Country2"]}
        />
        <SelectInput
          label={"City"}
          value={""}
          name={"city"}
          required={true}
          options={["Select", "City1", "City2"]}
        />

        <TypeInputInfo
          label={"Postal/Zip Code"}
          value={""}
          name={"postalCode"}
          required={true}
          type={"text"}
        />
      </div>

      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
        <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] text-black w-[100%]">
          Add Vehicle Images
        </h3>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <img src={upload.src} />
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px] text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
          <h4 className="font-[400] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px] text-[#515978]">
            Select JPG or PNG
          </h4>
        </div>
        <div className="w-full h-fit flex justify-center items-center gap-2">
          <div className="w-[300px] border- h-[1px] bg-grey flex justify-center items-center"></div>
          <span className="font-[400] text-[14px] leading-[17px]">OR</span>
          <div className="w-[300px] border- h-[1px] bg-grey flex justify-center items-center"></div>
        </div>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          {thumbsAlready}
          {thumbs}
        </div>
      </div>
    </div>
  );
}
