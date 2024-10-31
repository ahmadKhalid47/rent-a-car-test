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
  setCategoryR,
  setOwnershipR,
  setDrivetrainR,
} from "@/app/store/Vehicle";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ClassNames } from "@emotion/react";
import Link from "next/link";
import { setAlert, setSeverity } from "@/app/store/Global";

export default function Info() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  let dispatch = useDispatch();

  const [files, setFiles] = useState(vehicle?.carImages);
  const [countrySelected, setCountrySelected] = useState(vehicle.country);
  const [makeSelected, setMakeSelected] = useState(vehicle.make);
  const [CategorySelected, setCategorySelected] = useState(vehicle.Category);
  useEffect(() => {
    setFiles(vehicle?.carImages);
  }, [vehicle?.carImages]);
  useEffect(() => {
    setCategorySelected(vehicle.Category);
  }, [vehicle.Category]);
  useEffect(() => {
    setMakeSelected(vehicle.make);
  }, [vehicle.make]);
  useEffect(() => {
    setCountrySelected(vehicle.country);
  }, [vehicle.country]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const maxFileSize = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"]; // Allowed MIME types for JPG and PNG

    const filteredFiles = acceptedFiles.filter((file: any) => {
      if (!allowedTypes.includes(file.type)) {
        dispatch(
          setAlert(
            `File ${file.name} is not a supported format. Please upload JPG or PNG files.`
          )
        );
        dispatch(setSeverity("error"));
        return false;
      }
      if (file.size > maxFileSize) {
        dispatch(
          setAlert(`File ${file.name} is too large. Maximum size is 5MB.`)
        );
        dispatch(setSeverity("error"));

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
  console.log("newFiles", files, vehicle?.carImages);

  const thumbs: any = vehicle?.carImages?.map((file: any) => (
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
    dispatch(setCarImages(array));
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    const newFiles = files.filter(
      (file: any) =>
        !vehicle?.carImages.some((image: any) => image.path === file.path)
    );
console.log("newFiles", newFiles);

    if (newFiles.length) {
      dispatch(setCarImages([...vehicle?.carImages, ...newFiles]));
    }
  }, [files, vehicle?.carImages, dispatch]);

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
  const standardColors = [
    { Color: "#000000", ColorName: "Black" },
    { Color: "#808080", ColorName: "Gray" },
    { Color: "#C0C0C0", ColorName: "Silver" },
    { Color: "#FFFFFF", ColorName: "White" },
    { Color: "#FF0000", ColorName: "Red" },
    { Color: "#0000FF", ColorName: "Blue" },
    { Color: "#008000", ColorName: "Green" },
    { Color: "#FFFF00", ColorName: "Yellow" },
    { Color: "#FFA500", ColorName: "Orange" },
    { Color: "#A52A2A", ColorName: "Brown" },
    { Color: "#F5F5DC", ColorName: "Beige" },
    { Color: "#FFD700", ColorName: "Gold" },
    { Color: "#800080", ColorName: "Purple" },
  ];

  return (
    <div className="w-full h-fit ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Vehicle Information
        </span>
        <TempSelectInputLink
          setState={setCategoryR}
          label={"Category"}
          value={vehicle.Category}
          // required={true}
          required={false}
          options={Configurations?.Configurations?.Category?.map(
            (item: any) => item.Category
          )}
          link={"/Configuration/Category"}
        />
        <TempSelectInputLink
          setState={setmakeR}
          label={"Make"}
          value={vehicle.make}
          // required={true}
          required={false}
          options={Configurations?.Configurations?.make
            ?.filter((item: any) => item.Category.trim() === CategorySelected)
            .map((item: any) => item.make)}
          link={"/Configuration/Make"}
        />
        <TempSelectInputLink
          setState={setmodelR}
          label={"Model"}
          value={vehicle.model}
          // required={true}
          required={false}
          options={Configurations?.Configurations?.model
            ?.filter((item: any) => item.make.trim() === makeSelected)
            .map((item: any) => item.model)}
          link={"/Configuration/Model"}
        />
        <TempSelectInputLink
          setState={settypeR}
          label={"Body Type"}
          value={vehicle.type}
          // required={true}
          required={false}
          options={Configurations?.Configurations?.type?.map(
            (item: any) => item.Type
          )}
          link={"/Configuration/Type"}
        />
        <TempSelectInput
          setState={setyearR}
          label={"Making Year"}
          value={vehicle.year}
          // required={true}
          required={false}
          options={years}
        />
        <TempTypeInput
          setState={setregistrationR}
          label={"Registration No"}
          value={vehicle.registration}
          // required={true}
          required={false}
          type={"text"}
        />
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-1">
          <label className="w-full flex justify-between gap-1 items-start font-[400] text-[14px] leading-[17px]">
            <span className="flex justify-start gap-1 items-start">
              Color
              <FaAsterisk className="text-[6px]" />
            </span>
            <span className="text-[8px]">
              Not found?{" "}
              <Link
                href={"/Configuration/Color"}
                className="text-[#3d84ff] no-underline hover:underline capitalize"
              >
                Add new!
              </Link>
            </span>
          </label>

          <div className="w-full h-fit flex justify-between items-center relative circle-edit cursor-default">
            <div className="w-full h-fit flex justify-between items-center absolute z-[-10] left-0 top-0">
              <select
                className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                // required={true}
                required={false}
                value={vehicle.color}
                onChange={(e) => {
                  dispatch(setcolorR(e.target.value));
                }}
              >
                <option value={""}></option>
                <option value={vehicle.color}></option>
              </select>
              <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                <img
                  src={shape.src}
                  className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                />
              </div>
            </div>
            <div
              className="custom-select w-[100%] h-[43px] relative"
              ref={dropdownRef}
            >
              <div
                className=" h-full px-2 rounded-xl leading-none border-2 border-grey dark:bg-dark1 input-color flex justify-start items-center gap-2"
                onClick={toggleDropdown}
              >
                <div
                  className="rounded-[5px] w-[33px] h-[18px] dark:bg-dark1 bg-white "
                  style={{
                    backgroundColor: vehicle.color,
                  }}
                ></div>
                {selectedOption || "Select"}
              </div>
              {isOpen && (
                <div className="select-items absolute z-10 bg-white border border-grey rounded-xl w-full max-h-60 overflow-auto">
                  <div
                    className="option p-2 leading-none hover:bg-[#007BFF] hover:text-white cursor-pointer flex justify-start items-center gap-2"
                    onClick={() => handleOptionClick("", "")}
                  >
                    <div
                      className="rounded-[5px] w-[33px] h-[18px] dark:bg-dark1 bg-white "
                      style={{
                        backgroundColor: "transparent",
                      }}
                    ></div>
                    Select
                  </div>
                  {standardColors?.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="option p-2 leading-none hover:bg-[#007BFF] hover:text-white cursor-pointer flex justify-start items-center gap-2"
                      onClick={() =>
                        handleOptionClick(item.Color, item.ColorName)
                      }
                    >
                      <div
                        className="rounded-[5px] w-[33px] h-[18px] dark:bg-dark1 bg-white "
                        style={{
                          backgroundColor: item.Color,
                        }}
                      ></div>
                      {item.ColorName}
                    </div>
                  ))}
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
                          className="rounded-[5px] w-[33px] h-[18px] dark:bg-dark1 bg-white "
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
          // required={true}
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
          // required={true}
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
          // required={true}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setengineVolume}
          label={"Engine Volume"}
          value={vehicle.engineVolume}
          // required={true}
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
          // required={true}
          required={false}
          options={Array.from({ length: 60 }, (_, i) => (i + 1).toString())}
        />
        <TempSelectInputLink
          setState={setOwnershipR}
          label={"Ownership"}
          value={vehicle.Ownership}
          // required={true}
          required={false}
          options={Configurations?.Configurations?.Ownership?.map(
            (item: any) => item.Ownership
          )?.sort((a: string, b: string) => a.localeCompare(b))}
          link={"/Configuration/Ownership"}
        />
        <TempSelectInput
          setState={setDrivetrainR}
          label={"Drivetrain"}
          value={vehicle.Drivetrain}
          // required={true}
          required={false}
          options={[
            "All Wheel Drive (AWD)",
            "Front Wheel Drive (FWD)",
            "Rear Wheel Drive (RWD)",
          ]}
        />
        <TempSelectInputLink
          setState={setcountryR}
          label={"Country"}
          value={vehicle.country}
          // required={true}
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
          // required={true}
          required={false}
          options={Configurations?.Configurations?.city
            ?.filter((item: any) => item.country === countrySelected)
            ?.map((item: any) => item.city)
            ?.sort((a: string, b: string) => a.localeCompare(b))}
          link={"/Configuration/City"}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
        <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
          Add Vehicle Images
        </h3>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <img src={upload.src} />
          <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Select JPG, PNG{" "}
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Maximum size 5MB{" "}
          </span>{" "}
        </div>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          {thumbs}
        </div>
      </div>
      {vehicle?.carImages?.length > 1 ? (
        <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
          <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
            Select Thumbnail Image
          </h3>
          <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
            {vehicle?.carImages?.map((file: any, index: number) => (
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
