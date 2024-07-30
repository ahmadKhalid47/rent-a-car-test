"use client";
import shape from "@/public/ShapeBlack.svg";
import carsGroup from "@/public/carsGroup.svg";
import carsGroupCar1 from "@/public/carGroupCar (5).svg";
import carsGroupCar2 from "@/public/carGroupCar (1).svg";
import carsGroupCar3 from "@/public/carGroupCar (4).svg";
import carsGroupCar4 from "@/public/carGroupCar (3).svg";
import carsGroupCar5 from "@/public/carGroupCar (2).svg";
import upload from "@/public/Paper Upload.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GridViewRounded } from "@mui/icons-material";
import { RootState } from "@/app/store";
import { FaAsterisk, FaTimes, FaTimesCircle } from "react-icons/fa";
import Other from "../Other";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Info() {
  let global = useSelector((state: RootState) => state.Global);
  const [gridView, setGridView] = useState(true);
  const [showLess, setShowLess] = useState(true);

  const [files, setFiles] = useState([
    {alreadyPresent:true, preview: carsGroupCar1, name: "car1" },
    {alreadyPresent:true, preview: carsGroupCar2, name: "car2" },
    {alreadyPresent:true, preview: carsGroupCar3, name: "car3" },
    {alreadyPresent:true, preview: carsGroupCar4, name: "car4" },
    {alreadyPresent:true, preview: carsGroupCar5, name: "car5" },
  ]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  console.log(files);
  const thumbs: any = files.map((file: any) => (
    <div
      key={file.name}
      className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative"
    >
      <div
        className={`relative w-[64px] h-[64px] rounded-[10px] ${
          file.alreadyPresent ? "" : "border-[1px]"
        } border-grey overflow-hidden`}
      >
        <img
          src={file.alreadyPresent ? file.preview.src : file.preview}
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
  console.log(files);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-10 pb-5 pt-7">
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Vehicle ID
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
              value={12345}
            />
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Make
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Model
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Type
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Year
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">2024</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
            Registration No
            <FaAsterisk className="text-[6px]" />
            <span className="font-[900] absolute right-3">ⓘ</span>
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
              value={12345}
            />
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Color
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative">
            <select className="ps-7 font-[400] text-[16px] leading-[19px] px-5 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey ">
              <option value="">Red</option>
              <option value="">Red</option>
              <option value="">Red</option>
              <option value="">Red</option>
            </select>
            <div className="rounded-full w-[19px] h-[12px] bg-red-500 absolute left-2 top-[15.5px]"></div>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Fuel Type
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Petrol</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Transmission
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Auto</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
            Odometer (KMPH)
            <FaAsterisk className="text-[6px]" />
            <span className="font-[900] absolute right-3">ⓘ</span>
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
              value={"KMPH"}
            />
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="w-full flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] relative">
            Passengers
            <FaAsterisk className="text-[6px]" />
            <span className="font-[900] absolute right-3">ⓘ</span>
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Country
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <div className="w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            City
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
              <option value="">Select</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
              <option value="">Sedan</option>
            </select>
            <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-8 rounded-[10px] border-2 border-grey px-10 pb-10 pt-8">
        <h3 className="font-[600] text-[20px] leading-[23px] text-black w-[50%]">
          Add Vehicle Images
        </h3>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <img src={upload.src} />
          <h4 className="font-[600] text-[14px] leading-[17px] text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
          <h4 className="font-[400] text-[14px] leading-[17px] text-[#515978]">
            Select JPG or PNG{" "}
          </h4>
        </div>
        <div className="w-full h-fit flex justify-center items-center gap-2">
          <div className="w-[300px] border- h-[1px] bg-grey flex justify-center items-center"></div>
          <span className="font-[400] text-[14px] leading-[17px]">OR</span>
          <div className="w-[300px] border- h-[1px] bg-grey flex justify-center items-center"></div>
        </div>
        <div className="w-full h-fit flex justify-start items-center gap-5">
          {/* <div className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative">
            <div className="relative w-[64px] h-[64px]">
              <img src={carsGroupCar1.src} alt="" />
            </div>
            <span className="font-[400] text-[10px] leading-[12px] text-grey">
              image.jpg
            </span>
            <span className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]">
              <FaTimesCircle />
            </span>
          </div>
          <div className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative">
            <div className="relative w-[64px] h-[64px]">
              <img src={carsGroupCar2.src} alt="" />
            </div>
            <span className="font-[400] text-[10px] leading-[12px] text-grey">
              image1.jpg
            </span>
            <span className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]">
              <FaTimesCircle />
            </span>
          </div>
          <div className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative">
            <div className="relative w-[64px] h-[64px]">
              <img src={carsGroupCar3.src} alt="" />
            </div>
            <span className="font-[400] text-[10px] leading-[12px] text-grey">
              image2.jpg
            </span>
            <span className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]">
              <FaTimesCircle />
            </span>
          </div>
          <div className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative">
            <div className="relative w-[64px] h-[64px]">
              <img src={carsGroupCar4.src} alt="" />
            </div>
            <span className="font-[400] text-[10px] leading-[12px] text-grey">
              image3.jpg
            </span>
            <span className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]">
              <FaTimesCircle />
            </span>
          </div>
          <div className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative">
            <div className="relative w-[64px] h-[64px]">
              <img src={carsGroupCar5.src} alt="" />
            </div>
            <span className="font-[400] text-[10px] leading-[12px] text-grey">
              image4.jpg
            </span>
            <span className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]">
              <FaTimesCircle />
            </span>
          </div> */}
          {thumbs}
        </div>
      </div>
    </div>
  );
}
