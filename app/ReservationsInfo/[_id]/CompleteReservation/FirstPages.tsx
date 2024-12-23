"use client";
import Image from "next/image";
import React from "react";
import upload from "@/public/Paper Upload.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import { useFileDrop } from "@/app/Components/functions/onDragFromDrag";
import { useDropzone } from "react-dropzone";
import { Thumbs } from "@/app/Components/functions/thumbsFromDrag";
import { TempTypeInput } from "@/app/Components/InputComponents/TypeInput";
import {
  setfuelCompletion,
  setfuelImagesCompletion,
  setodometerCompletion,
  setodometerImagesCompletion,
} from "@/app/store/reservations";
import { TempSelectInput } from "@/app/Components/InputComponents/SelectInput";

export default function FirstPage() {
  let reservation = useSelector((state: RootState) => state.reservation);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  const onDropFuel = useFileDrop((files: any[]) => {
    const uniqueFiles = files.filter(
      (file) =>
        !reservation?.fuelImagesCompletion.some(
          (existingFile: any) => existingFile.name === file.name
        )
    );
    if (uniqueFiles?.length > 0) {
      dispatch(
        setfuelImagesCompletion([
          ...reservation?.fuelImagesCompletion,
          ...uniqueFiles,
        ])
      );
    }
  });

  const onDropodometer = useFileDrop((files: any[]) => {
    const uniqueFiles = files.filter(
      (file) =>
        !reservation?.odometerImagesCompletion.some(
          (existingFile: any) => existingFile.name === file.name
        )
    );
    if (uniqueFiles?.length > 0) {
      dispatch(
        setodometerImagesCompletion([
          ...reservation?.odometerImagesCompletion,
          ...uniqueFiles,
        ])
      );
    }
  });

  const { getRootProps: getRootPropsFuel, getInputProps: getInputPropsFuel } =
    useDropzone({
      onDrop: onDropFuel,
    });
  const {
    getRootProps: getRootPropsodometer,
    getInputProps: getInputPropsodometer,
  } = useDropzone({
    onDrop: onDropodometer,
  });

  return (
    <>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempSelectInput
          setState={setfuelCompletion}
          label={"Fuel Status %"}
          value={reservation?.fuelCompletion}
          required={false}
          options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        />
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center cursor-pointer"
          {...getRootPropsFuel()}
        >
          <input {...getInputPropsFuel()} />
          <Image
            src={upload.src}
            alt=""
            width={32}
            height={32}
            
          />
          <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Select JPG, PNG{" "}
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Maximum size 1 MB{" "}
          </span>{" "}
        </div>
        <span className="font-[400] text-[14px] leading-[17px] dark:text-white text-black -mt-4">
          Here you can Upload Image of Fuel Status
        </span>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs
            files={reservation?.fuelImagesCompletion}
            setFiles={setfuelImagesCompletion}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setodometerCompletion}
          label={"Odometer"}
          value={reservation?.odometerCompletion}
          required={false}
          type={"number"}
        />
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center cursor-pointer"
          {...getRootPropsodometer()}
        >
          <input {...getInputPropsodometer()} />
          <Image
            src={upload.src}
            alt=""
            width={32}
            height={32}
            
          />
          <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Select JPG, PNG{" "}
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Maximum size 1 MB{" "}
          </span>{" "}
        </div>
        <span className="font-[400] text-[14px] leading-[17px] dark:text-white text-black -mt-4">
          Here you can Upload Image of Odometer
        </span>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs
            files={reservation?.odometerImagesCompletion}
            setFiles={setodometerImagesCompletion}
          />
        </div>
      </div>
    </>
  );
}
