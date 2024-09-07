"use client";
import upload from "@/public/Paper Upload.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { formatId } from "@/app/Components/functions/formats";
import { SmallLoader } from "@/app/Components/Loader";
import { useFileDrop } from "@/app/Components/functions/onDragFromDrag";
import { useDropzone } from "react-dropzone";
import { Thumbs } from "@/app/Components/functions/thumbsFromDrag";
import { TempTypeInput } from "@/app/Components/InputComponents/TypeInput";
import {
  setAllValues,
  setfuelCompletion,
  setfuelImagesCompletion,
  setodometerCompletion,
  setodometerImagesCompletion,
} from "@/app/store/reservations";

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
  const [fuelFiles, setfuelFiles] = useState<any>(
    reservation?.fuelImagesCompletion
  );
  const [odometerFiles, setodometerFiles] = useState<any>(
    reservation?.odometerImagesCompletion
  );
  useEffect(() => {
    setfuelFiles(reservation?.fuelImagesCompletion);
  }, [reservation?.fuelImagesCompletion]);
  useEffect(() => {
    setodometerFiles(reservation?.odometerImagesCompletion);
  }, [reservation?.odometerImagesCompletion]);

  const onDropFuel = useFileDrop(
    (files: any[]) => setfuelFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );
  const onDropodometer = useFileDrop(
    (files: any[]) =>
      setodometerFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );

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

  useEffect(() => {
    dispatch(setfuelImagesCompletion(fuelFiles));
  }, [fuelFiles]);
  useEffect(() => {
    dispatch(setodometerImagesCompletion(odometerFiles));
  }, [odometerFiles]);

  console.log(reservation);

  return (
    <>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setfuelCompletion}
          label={"Fuel Status %"}
          value={reservation?.fuelCompletion}
          required={false}
          type={"number"}
        />
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootPropsFuel()}
        >
          <input {...getInputPropsFuel()} />
          <img src={upload.src} />
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
        </div>
        <span className="font-[400] text-[14px] leading-[17px] text-black -mt-4">
          Here you can Upload Image of Fuel Status
        </span>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs files={fuelFiles} setFiles={setfuelFiles} />
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setodometerCompletion}
          label={"Odometer"}
          value={reservation?.odometerCompletion}
          required={false}
          type={"number"}
        />
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootPropsodometer()}
        >
          <input {...getInputPropsodometer()} />
          <img src={upload.src} />
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
        </div>
        <span className="font-[400] text-[14px] leading-[17px] text-black -mt-4">
          Here you can Upload Image of Odometer
        </span>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs files={odometerFiles} setFiles={setodometerFiles} />
        </div>
      </div>
    </>
  );
}
