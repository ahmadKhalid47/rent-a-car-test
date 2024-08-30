"use client";
import shape from "@/public/ShapeBlack.svg";
import upload from "@/public/Paper Upload.svg";
import { useEffect, useState } from "react";
import { FaAsterisk, FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import { TempTypeInput, TempTypeInputInfo } from "../InputComponents/TypeInput";
import {
  TempSelectInput,
  TempSelectInputInfo,
} from "../InputComponents/SelectInput";
import {
  setvehicleIdR,
  setmakeR,
  setmodelR,
  settypeR,
  setyearR,
  setregistrationR,
  setcolorR,
  setfuelTypeR,
  settransmissionR,
  setodometerR,
  setpassengersR,
  setcountryR,
  setcityR,
  setpostalCodeR,
  setCarImages,
} from "@/app/store/Vehicle";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Info() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  let dispatch = useDispatch();

  const [files, setFiles] = useState(vehicle.carImages);
  const [makeSelected, setMakeSelected] = useState(vehicle.make);
  useEffect(() => {
    setFiles(vehicle.carImages);
  }, [vehicle.carImages]);
  useEffect(() => {
    setMakeSelected(vehicle.make);
  }, [vehicle.make]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  console.log();
  const thumbs: any = files.map((file: any) => (
    <div
      key={file.name}
      className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative"
    >
      <div className="relative w-[64px] h-[64px] rounded-[10px] border-[1px] border-grey overflow-hidden">
        <img
          src={file.preview ? file.preview : file}
          alt={file.name}
          className=" w-[64px] h-[64px]"
        />
      </div>
      <span className="font-[400] text-[10px] leading-[12px] text-grey">
        {file?.name}
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
  useEffect(() => {
    dispatch(setCarImages(files));
  }, [files]);
  console.log(Configurations?.Configurations?.model);
  console.log(
    Configurations?.Configurations?.model
      ?.filter((item: any) => item.make === makeSelected)
      .map((item: any) => item.model)
  );

  return (
    <div className="w-full h-fit ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        {/* <TempTypeInput
          setState={setvehicleIdR}
          label={"Vehicle ID"}
          value={vehicle.vehicleId}
          required={false}
          type={"text"}
        /> */}
        <TempSelectInput
          setState={setmakeR}
          label={"Make"}
          value={vehicle.make}
          required={true}
          options={Configurations?.Configurations?.make?.map(
            (item: any) => item.make
          )}
        />
        <TempSelectInput
          setState={setmodelR}
          label={"Model"}
          value={vehicle.model}
          required={true}
          options={Configurations?.Configurations?.model
            ?.filter((item: any) => item.make === makeSelected)
            .map((item: any) => item.model)}
        />
        <TempSelectInput
          setState={settypeR}
          label={"Type"}
          value={vehicle.type}
          required={true}
          // required={false}
          options={Configurations?.Configurations?.type?.map(
            (item: any) => item.Type
          )}
        />
        <TempSelectInput
          setState={setyearR}
          label={"Year"}
          value={vehicle.year}
          required={true}
          // required={false}
          options={[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]}
        />
        <TempTypeInput
          setState={setregistrationR}
          label={"Registration No"}
          value={vehicle.registration}
          required={true}
          // required={false}
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
              required={true}
              // required={false}
              onChange={(e) => {
                dispatch(setcolorR(e.target.value));
              }}
              value={vehicle.color}
            >
              <option value="">Select</option>
              {Configurations?.Configurations?.color?.map(
                (item: any, key: number) => (
                  <option value={item.Color} key={key}>
                    {item.Color}
                  </option>
                )
              )}
            </select>
            <div
              className="rounded-full w-[19px] h-[12px] bg-red-5 absolute left-2 top-[15.5px]"
              style={{
                backgroundColor: vehicle.color,
              }}
            ></div>
            <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img src={shape.src} className="w-[10.5px]" />
            </div>
          </div>
        </div>
        <TempSelectInput
          setState={setfuelTypeR}
          label={"Fuel Type"}
          value={vehicle.fuelType}
          required={true}
          // required={false}
          options={[
            "Gasoline",
            "Diesel",
            "Electric",
            "Hybrid",
            "Plug-in Hybrid",
            "Ethanol",
            "Natural Gas",
            "Hydrogen",
            "Biodiesel",
            "Propane (LPG)",
            "Methanol",
            "Coal",
            "Wood",
            "Solar",
            "Compressed Air",
            "Steam",
            "Nuclear",
            "Biogas",
            "Algae-based fuels",
            "Ammonia",
            "Jet Fuel",
          ]}
        />
        <TempSelectInput
          setState={settransmissionR}
          label={"Transmission"}
          value={vehicle.transmission}
          required={true}
          // required={false}
          options={[
            "Automatic",
            "Manual",
            "CVT (Continuously Variable Transmission)",
            "DSG (Direct-Shift Gearbox)",
            "Dual-Clutch",
            "Semi-Automatic",
            "AMT (Automated Manual Transmission)", // Similar to Semi-Automatic but more distinct
            "Torque Converter Automatic",
            "Tiptronic", // A type of automatic transmission with manual override
            "Sequential Manual", // Often used in racing vehicles
            "Hydraulic Automatic",
            "Hydrostatic Transmission",
            "Electric Drive", // Common in electric vehicles, where the transmission is often simplified or non-existent
            "Infinitely Variable Transmission (IVT)", // Similar to CVT but with different mechanical principles
            "Preselector Gearbox", // An older type of manual transmission
            "Synchromesh Manual", // A type of manual transmission that makes shifting smoother
            "Single-Speed Transmission",
          ]}
        />
        <TempTypeInput
          setState={setodometerR}
          label={"Odometer (KMPH)"}
          value={vehicle.odometer}
          required={true}
          // required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setpassengersR}
          label={"Passengers"}
          value={vehicle.passengers}
          required={true}
          // required={false}
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9+"]}
        />
        <TempSelectInput
          setState={setcountryR}
          label={"Country"}
          value={vehicle.country}
          required={true}
          // required={false}
          options={["Country1", "Country2"]}
        />
        <TempSelectInput
          setState={setcityR}
          label={"City"}
          value={vehicle.city}
          required={true}
          // required={false}
          options={["City1", "City2"]}
        />
        <TempTypeInput
          setState={setpostalCodeR}
          label={"Postal/Zip Code"}
          value={vehicle.postalCode}
          required={true}
          // required={false}
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
          {thumbs}
        </div>
      </div>
    </div>
  );
}
