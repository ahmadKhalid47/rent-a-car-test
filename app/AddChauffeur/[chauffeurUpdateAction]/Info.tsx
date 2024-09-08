"use client";
import upload from "@/public/Paper Upload.svg";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TempTypeInput, TypeInput } from "../../Components/InputComponents/TypeInput";
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

export default function Info() {
  let dispatch = useDispatch();

  let chauffeur = useSelector((state: RootState) => state.chauffeur);
  const [files, setFiles] = useState<any>(chauffeur.chauffeurImage);
  useEffect(() => {
    setFiles(chauffeur?.chauffeurImage); 
  }, [chauffeur.chauffeurImage[0]]);
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
      <span className="font-[400] text-[10px] leading-[12px] text-grey">
        image4.jpg
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
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setnameR}
          label={"Full Name"}
          value={chauffeur.name}
          required={true}
          // required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setgenderR}
          label={"Gender"}
          value={chauffeur.gender}
          required={true}
          // required={false}
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
          required={true}
          // required={false}
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
          required={false}
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
          required={true}
          // required={false}
          options={countries.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setstateR}
          label={"State/Province"}
          value={chauffeur.state}
          required={true}
          // required={false}
          options={states.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setcityR}
          label={"City"}
          value={chauffeur.city}
          required={true}
          // required={false}
          options={cities.map((item: any) => item.label)}
        />
        <TempTypeInput
          setState={setpostalCodeR}
          label={"Postal/Zip Code"}
          value={chauffeur.postalCode}
          required={true}
          // required={false}
          type={"text"}
        />
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
            Select JPG or PNG{" "}
          </h4>
        </div>

        <div className="w-full h-fit flex justify-start items-center gap-5">
          {thumbs}
        </div>
      </div>
    </div>
  );
}
