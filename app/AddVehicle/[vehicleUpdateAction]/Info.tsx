"use client";
import React, { useRef } from "react";
import shape from "@/public/ShapeBlack.svg";
import upload from "@/public/Paper Upload.svg";
import { useEffect, useState } from "react";
import { FaAsterisk, FaCircle, FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { TempTypeInput } from "../../Components/InputComponents/TypeInput";
import {
  TempSelectInput,
  TempSelectInputInfo,
  TempSelectInputLink,
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
  setengineVolume,
  setvinNo,
  setfuelCapacity,
  setcolorNameR,
} from "@/app/store/Vehicle";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ClassNames } from "@emotion/react";
import Link from "next/link";

export default function Info() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  let dispatch = useDispatch();

  const [files, setFiles] = useState(vehicle.carImages);
  const [countrySelected, setCountrySelected] = useState(vehicle.country);
  const [makeSelected, setMakeSelected] = useState(vehicle.make);
  useEffect(() => {
    // setFiles(vehicle.carImages);
  }, [vehicle.carImages]);
  useEffect(() => {
    setMakeSelected(vehicle.make);
  }, [vehicle.make]);
  useEffect(() => {
    setCountrySelected(vehicle.country);
  }, [vehicle.country]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes
    const allowedTypes = ["image/jpeg", "image/png"]; // Allowed MIME types for JPG and PNG

    const filteredFiles = acceptedFiles.filter((file: any) => {
      if (!allowedTypes.includes(file.type)) {
        alert(
          `File ${file.name} is not a supported format. Please upload JPG or PNG files.`
        );
        return false;
      }
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 1MB.`);
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
      <span className="w-[64px] font-[400] text-[10px] leading-[12px] text-grey truncate">
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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(vehicle.colorName);
  useEffect(() => {
    setSelectedOption(vehicle.colorName);
  }, [vehicle.colorName]);
  const dropdownRef: any = useRef(null);

  const handleOptionClick = (color: any, colorName: any) => {
    setSelectedOption(colorName);
    dispatch(setcolorR(color));
    dispatch(setcolorNameR(colorName));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear + 1; i >= 1995; i--) {
    years.push(i.toString());
  }

  return (
    <div className="w-full h-fit ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Vehicle Information
        </span>
        <TempSelectInputLink
          setState={setmakeR}
          label={"Make"}
          value={vehicle.make}
          required={true}
          options={Configurations?.Configurations?.make?.map(
            (item: any) => item.make
          )}
          link={"/Configuration/Make"}
        />
        <TempSelectInputLink
          setState={setmodelR}
          label={"Model"}
          value={vehicle.model}
          required={true}
          options={Configurations?.Configurations?.model
            ?.filter((item: any) => item.make === makeSelected)
            .map((item: any) => item.model)}
          link={"/Configuration/Model"}
        />
        <TempSelectInputLink
          setState={settypeR}
          label={"Body Type"}
          value={vehicle.type}
          required={true}
          options={Configurations?.Configurations?.type?.map(
            (item: any) => item.Type
          )}
          link={"/Configuration/Type"}
        />
        <TempSelectInput
          setState={setyearR}
          label={"Making Year"}
          value={vehicle.year}
          required={false}
          options={years}
        />
        <TempTypeInput
          setState={setregistrationR}
          label={"Registration No"}
          value={vehicle.registration}
          required={true}
          type={"text"}
        />
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
          <label className="w-full flex justify-between gap-1 items-start font-[400] text-[14px] leading-[17px]">
            <span className="flex justify-start gap-1 items-start">Color</span>
            <span className="text-[12px]">
              Not found?{" "}
              <Link
                href={"/Configuration/Color"}
                className="text-[#3d84ff] no-underline hover:underline capitalize"
              >
                Add new
              </Link>
            </span>
          </label>

          <div className="w-full h-fit flex justify-between items-center relative circle-edit cursor-default">
            <div
              className="custom-select w-[100%] h-[43px] relative"
              ref={dropdownRef}
            >
              <div
                className=" h-full px-2 rounded-xl border-2 border-grey dark:bg-dark1 input-color flex justify-start items-center gap-2"
                onClick={toggleDropdown}
              >
                <div
                  className="rounded-full w-[20px] h-[18px] dark:bg-dark1 bg-white border-[1px] border-black"
                  style={{
                    backgroundColor: vehicle.color,
                  }}
                ></div>
                {selectedOption || "Select"}
              </div>
              {isOpen && (
                <div className="select-items absolute z-10 bg-white border border-grey rounded-xl w-full max-h-60 overflow-auto">
                  <div
                    className="option p-2 hover:bg-[#007BFF] hover:text-white cursor-pointer flex justify-start items-center gap-2"
                    onClick={() => handleOptionClick("", "")}
                  >
                    <div
                      className="rounded-full w-[20px] h-[18px] dark:bg-dark1 bg-white border-[1px] border-black"
                      style={{
                        backgroundColor: "transparent",
                      }}
                    ></div>
                    Select
                  </div>
                  {Configurations?.Configurations?.color?.map(
                    (item: any, index: any) => (
                      <div
                        key={index}
                        className="option p-2 hover:bg-[#007BFF] hover:text-white cursor-pointer flex justify-start items-center gap-2"
                        onClick={() =>
                          handleOptionClick(item.Color, item.ColorName)
                        }
                      >
                        <div
                          className="rounded-full w-[20px] h-[18px] dark:bg-dark1 bg-white border-[1px] border-black"
                          style={{
                            backgroundColor: item.Color,
                          }}
                        ></div>
                        {item.ColorName}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
              <img
                src={shape.src}
                className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
              />
            </div>
          </div>
        </div>
        <TempSelectInput
          setState={setfuelTypeR}
          label={"Fuel Type"}
          value={vehicle.fuelType}
          required={false}
          options={[
            "Gasoline",
            "Diesel",
            "Hybrid",
            "Electro",
            "Gas",
            "Petrol",
            "Propane (LPG)",
            "Non",
          ]}
        />
        <TempSelectInput
          setState={setfuelCapacity}
          label={"Fuel Tank Capacity"}
          value={vehicle.fuelCapacity}
          required={false}
          options={Array.from({ length: 24 }, (_, i) =>
            ((i + 1) * 5).toString()
          )}
        />
        <TempSelectInput
          setState={settransmissionR}
          label={"Transmission"}
          value={vehicle.transmission}
          required={false}
          options={[
            "Tiptronic",
            "Dual-Clutch Transmission (DCT)",
            "Automatic Transmission (AT)",
            "Manual Transmission (MT)",
            "Continuous Variable Transmission (CVT)",
            "Electric Drive",
          ]}
        />
        <TempTypeInput
          setState={setodometerR}
          label={"Odometer"}
          value={vehicle.odometer}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setengineVolume}
          label={"Engine Volume"}
          value={vehicle.engineVolume}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setvinNo}
          label={"VIN Number"}
          value={vehicle.vinNo}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setpassengersR}
          label={"No. of Seats"}
          value={vehicle.passengers}
          required={false}
          options={Array.from({ length: 60 }, (_, i) => (i + 1).toString())}
        />

        <TempSelectInputLink
          setState={setcountryR}
          label={"Country"}
          value={vehicle.country}
          required={false}
          options={Configurations?.Configurations?.country
            ?.map((item: any) => item.country)
            ?.sort((a: string, b: string) => a.localeCompare(b))}
          link={"/Configuration/Country"}
        />
        <TempSelectInputLink
          setState={setcityR}
          label={"City"}
          value={vehicle.city}
          required={false}
          options={Configurations?.Configurations?.city
            ?.filter((item: any) => item.country === countrySelected)
            ?.map((item: any) => item.city)
            ?.sort((a: string, b: string) => a.localeCompare(b))}
          link={"/Configuration/City"}
        />

        <TempTypeInput
          setState={setpostalCodeR}
          label={"Postal/Zip Code"}
          value={vehicle.postalCode}
          required={false}
          type={"text"}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
        <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
          Add Vehicle Images
        </h3>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <img src={upload.src} />
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px] dark:text-white text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
          <h4 className="font-[400] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px] text-[#515978]">
            Select JPG or PNG
          </h4>
        </div>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          {thumbs}
        </div>
      </div>
      {files.length > 1 ? (
        <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
          <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
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
