"use client";
import shape from "@/public/ShapeBlack.svg";
import upload from "@/public/Paper Upload.svg";
import { useEffect, useState } from "react";
import { FaAsterisk, FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import { TempTypeInput, TempTypeInputInfo } from "../../Components/InputComponents/TypeInput";
import {
  TempSelectInput,
  TempSelectInputInfo,
} from "../../Components/InputComponents/SelectInput";
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
  setthumbnailImage,
} from "@/app/store/Vehicle";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Info() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  let dispatch = useDispatch();

  const [files, setFiles] = useState(vehicle.carImages);
  const [countrySelected, setCountrySelected] = useState(vehicle.country);
  const [makeSelected, setMakeSelected] = useState(vehicle.make);
  const [colorOnHover, setColorOnHover] = useState("");
  useEffect(() => {
    setFiles(vehicle.carImages);
  }, [vehicle.carImages]);
  useEffect(() => {
    setMakeSelected(vehicle.make);
  }, [vehicle.make]);
  useEffect(() => {
    setCountrySelected(vehicle.country);
  }, [vehicle.country]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
    const allowedTypes = ["image/jpeg", "image/png"]; // Allowed MIME types for JPG and PNG

    const filteredFiles = acceptedFiles.filter((file: any) => {
      if (!allowedTypes.includes(file.type)) {
        alert(
          `File ${file.name} is not a supported format. Please upload JPG or PNG files.`
        );
        return false;
      }
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    setFiles((prevFiles: any) => [
      ...prevFiles,
      ...filteredFiles.map((file: any) =>
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
          src={file.preview ? file.preview : file}
          alt={file.name}
          className=" w-[64px] h-[64px]"
        />
      </div>
      <span className="font-[400] text-[10px] leading-[12px] text-grey truncate w-[64px]">
        {file?.name}
      </span>
      <span
        className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]"
        onClick={() => removing(file)}
      >
        <FaTimesCircle />
      </span>
    </div>
  ));
  function removing(file: any) {
    let array = files;
    array = array.filter((e: any) => {
      // If the element is a string, it will be compared to the URL in the `file` object
      if (typeof e === "string") {
        return e !== file;
      }
      // If the element is an object, compare the `path` or `preview` properties
      else if (typeof e === "object" && e !== null) {
        return e.path !== file.path && e.preview !== file.preview;
      }
      return true;
    });
    setFiles(array);
    if (vehicle.thumbnailImage + 1 >= files.length) {
      dispatch(setthumbnailImage(files.length - 2));
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    dispatch(setCarImages(files));
  }, [files]);

  return (
    <div className="w-full h-fit ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempSelectInput
          setState={setmakeR}
          label={"Make"}
          value={vehicle.make}
          // required={false}
          required={true}
          options={Configurations?.Configurations?.make?.map(
            (item: any) => item.make
          )}
        />
        <TempSelectInput
          setState={setmodelR}
          label={"Model"}
          value={vehicle.model}
          // required={false}
          required={true}
          options={Configurations?.Configurations?.model
            ?.filter((item: any) => item.make === makeSelected)
            .map((item: any) => item.model)}
        />
        <TempSelectInput
          setState={settypeR}
          label={"Type"}
          value={vehicle.type}
          // required={false}
          required={true}
          options={Configurations?.Configurations?.type?.map(
            (item: any) => item.Type
          )}
        />
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Year
            <FaAsterisk className="text-[6px]" />
          </label>
          <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
            <input
              required
              type="number"
              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey truncate"
              placeholder="Enter Year"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) {
                  dispatch(setyearR(value));
                }
              }}
              value={vehicle.year}
              min={1900}
              max={2200}
            />
          </div>
        </div>

        <TempTypeInput
          setState={setregistrationR}
          label={"Registration No"}
          value={vehicle.registration}
          // required={false}
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
              // required={false}
              required={true}
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
              className="rounded-full w-[20px] h-[18px] bg-red-5 absolute left-2 top-[12.5px] border-2 border-grey bg-white"
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
          // required={false}
          required={true}
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
          // required={false}
          required={true}
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
          // required={false}
          required={true}
          type={"number"}
        />
        <TempSelectInput
          setState={setpassengersR}
          label={"Passengers"}
          value={vehicle.passengers}
          // required={false}
          required={true}
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9+"]}
        />
        <TempSelectInput
          setState={setcountryR}
          label={"Country"}
          value={vehicle.country}
          // required={false}
          required={true}
          options={Configurations?.Configurations?.country?.map(
            (item: any) => item.country
          )}
        />
        <TempSelectInput
          setState={setcityR}
          label={"City"}
          value={vehicle.city}
          // required={false}
          required={true}
          options={Configurations?.Configurations?.city
            ?.filter((item: any) => item.country === countrySelected)
            .map((item: any) => item.city)}
        />
        <TempTypeInput
          setState={setpostalCodeR}
          label={"Postal/Zip Code"}
          value={vehicle.postalCode}
          // required={false}
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
        {/* <div className="w-full h-fit flex justify-center items-center gap-2">
          <div className="w-[300px] border- h-[1px] bg-grey flex justify-center items-center"></div>
          <span className="font-[400] text-[14px] leading-[17px]">OR</span>
          <div className="w-[300px] border- h-[1px] bg-grey flex justify-center items-center"></div>
        </div> */}
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          {thumbs}
        </div>
      </div>
      {files.length > 1 ? (
        <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
          <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] text-black w-[100%]">
            Select Thumbnail Image
          </h3>
          <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
            {files.map((file: any, index: number) => (
              <div
                key={file.name}
                className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative"
              >
                <div
                  className={`relative rounded-[10px] overflow-hidden cursor-pointer border-black ${
                    vehicle.thumbnailImage === index
                      ? "border-[6px] border-main-blue w-[80px] h-[80px]"
                      : "border-[1px] border-grey w-[64px] h-[64px]"
                  }`}
                  onClick={() => dispatch(setthumbnailImage(index))}
                >
                  <img
                    src={file.preview ? file.preview : file}
                    alt={file.name}
                    className="w-[100%] h-[100%]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}{" "}
    </div>
  );
}
