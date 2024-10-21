"use client";
import React from "react";
import upload from "@/public/Paper Upload.svg";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  TempTypeInput,
  TypeInput,
} from "../../Components/InputComponents/TypeInput";
import vip from "@/public/vip.svg";
import {
  SelectInput,
  TempSelectInput,
} from "../../Components/InputComponents/SelectInput";
import {
  setalternativePhoneR,
  setcityR,
  setcountryR,
  setchauffeurImageR,
  setdateOfBirthR,
  setemailAddressR,
  setgenderR,
  setnameR,
  setnationalityR,
  setphoneR,
  setpostalCodeR,
  setstateR,
  setstreetAddressR,
  setrentPerDayR,
} from "@/app/store/chauffeur";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CountryStateCity } from "../../Components/functions/CountryStateCity";
import { setAlert, setSeverity } from "@/app/store/Global";

export default function Info() {
  let dispatch = useDispatch();

  let chauffeur = useSelector((state: RootState) => state.chauffeur);
  const [files, setFiles] = useState<any>(chauffeur.chauffeurImage);
  useEffect(() => {
    setFiles(chauffeur?.chauffeurImage);
  }, [chauffeur.chauffeurImage[0]]);
  const onDrop = useCallback((acceptedFiles: any) => {
    const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes
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
          setAlert(`File ${file.name} is too large. Maximum size is 1MB.`)
        );
        dispatch(setSeverity("error"));
        return false;
      }
      return true;
    });

    if (filteredFiles.length > 0) {
      // Replace the current file with the new one
      setFiles([
        Object.assign(filteredFiles[0], {
          preview: URL.createObjectURL(filteredFiles[0]),
        }),
      ]);
    }
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
        {file.name}
      </span>
      <span
        className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]"
        onClick={() => removing()}
      >
        <FaTimesCircle />
      </span>
    </div>
  ));

  function removing() {
    setFiles([]);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
  useEffect(() => {
    dispatch(setchauffeurImageR(files));
  }, [files]);

  let { countries, states, cities } = CountryStateCity(
    chauffeur.country,
    chauffeur.state
  );

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          General Information
        </span>

        <TempTypeInput
          setState={setnameR}
          label={"Full Name"}
          value={chauffeur.name}
          required={true}
          type={"text"}
        />
        <TempSelectInput
          setState={setgenderR}
          label={"Gender"}
          value={chauffeur.gender}
          required={false}
          options={["Male", "Female", "Custom"]}
        />

        <TempTypeInput
          setState={setdateOfBirthR}
          label={"Date of Birth"}
          value={chauffeur.dateOfBirth}
          required={false}
          type={"date"}
        />

        <TempTypeInput
          setState={setnationalityR}
          label={"Nationality"}
          value={chauffeur.nationality}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setemailAddressR}
          label={"Email Address"}
          value={chauffeur.emailAddress}
          required={false}
          type={"email"}
        />
        <TempTypeInput
          setState={setphoneR}
          label={"Phone"}
          value={chauffeur.phone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setalternativePhoneR}
          label={"Alternative Phone"}
          value={chauffeur.alternativePhone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setrentPerDayR}
          label={"Rent Per Day"}
          value={chauffeur.rentPerDay}
          required={true}
          type={"number"}
        />
        <TempTypeInput
          setState={setstreetAddressR}
          label={"Street Address"}
          value={chauffeur.streetAddress}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setcountryR}
          label={"Country"}
          value={chauffeur.country}
          required={false}
          options={countries.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setstateR}
          label={"State/Province"}
          value={chauffeur.state}
          required={false}
          options={states.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setcityR}
          label={"City"}
          value={chauffeur.city}
          required={false}
          options={cities.map((item: any) => item.label)}
        />
        <TempTypeInput
          setState={setpostalCodeR}
          label={"Postal/Zip Code"}
          value={chauffeur.postalCode}
          required={false}
          type={"text"}
        />
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
        <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
          Add Image
        </h3>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
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
            Select JPG, PNG {" "}
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Maximum size 1MB{" "}
          </span>{" "}
        </div>

        <div className="w-full h-fit flex justify-start items-center gap-5 py-[2px]">
          {thumbs}
        </div>
      </div>
    </div>
  );
}
