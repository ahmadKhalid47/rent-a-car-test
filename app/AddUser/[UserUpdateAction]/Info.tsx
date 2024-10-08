"use client";
import React from "react";
import upload from "@/public/Paper Upload.svg";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TempSelectInput } from "../../Components/InputComponents/SelectInput";
import {
  setcityR,
  setcompanyR,
  setcountryR,
  setemailR,
  setnameR,
  setpasswordR,
  setphoneR,
  setplanR,
  setprofilePicR,
  setstateR,
  setusernameR,
  setverifyPasswordR,
} from "@/app/store/userProfile";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CountryStateCity } from "../../Components/functions/CountryStateCity";
import {
  TempTypeInput,
  TempTypeInputLimit,
} from "../../Components/InputComponents/TypeInput";
import { useParams } from "next/navigation";

export default function Info() {
  let dispatch = useDispatch();
  let User = useSelector((state: RootState) => state.userProfile);
  const [files, setFiles] = useState<any>(User.profilePic);
  const params = useParams();
  const { UserUpdateAction } = params;
  console.log(User.profilePic[0]);

  useEffect(() => {
    setFiles(User.profilePic);
  }, [User.profilePic[0]]);
  const onDrop = useCallback((acceptedFiles: any) => {
    const maxFileSize = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"];
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
      setFiles([
        Object.assign(filteredFiles[0], {
          preview: URL.createObjectURL(filteredFiles[0]),
        }),
      ]);
    }
  }, []);

  const thumbs: any = files?.map(
    (file: any) =>
      file && (
        <div
          key={file?.name}
          className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative"
        >
          <div className="relative w-[64px] h-[64px] rounded-[10px] border-[1px] border-grey overflow-hidden">
            <img
              src={file?.preview ? file.preview : file}
              alt={file?.name}
              className=" w-[64px] h-[64px]"
            />
          </div>
          <span className="w-[64px] font-[400] text-[10px] leading-[12px] text-grey truncate">
            {file?.name}
          </span>
          <span
            className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]"
            onClick={() => removing()}
          >
            <FaTimesCircle />
          </span>
        </div>
      )
  );

  function removing() {
    setFiles([]);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
  useEffect(() => {
    dispatch(setprofilePicR(files));
  }, [files]);

  let { countries, states, cities } = CountryStateCity(
    User.country,
    User.state
  );

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setnameR}
          label={"Full Name"}
          value={User.name}
          required={false}
          type={"text"}
        />
        <TempTypeInputLimit
          setState={setusernameR}
          label={"Username"}
          value={User.username}
          required={true}
          type={"text"}
          minLength={6}
          maxLength={30}
        />
        <TempTypeInput
          setState={setcompanyR}
          label={"Company"}
          value={User.company}
          required={false}
          type={"text"}
        />
        <TempTypeInputLimit
          setState={setemailR}
          label={"Email"}
          value={User.email}
          required={true}
          type={"email"}
          minLength={6}
          maxLength={30}
        />
        <TempTypeInput
          setState={setphoneR}
          label={"Phone"}
          value={User.phone}
          required={false}
          type={"number"}
        />
        <TempSelectInput
          setState={setcountryR}
          label={"Country"}
          value={User.country}
          required={false}
          options={countries.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setstateR}
          label={"State"}
          value={User.state}
          required={false}
          options={states.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setcityR}
          label={"City"}
          value={User.city}
          required={false}
          options={cities.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setplanR}
          label={"Plan Validity"}
          value={User.plan}
          required={false}
          options={["Trial", "1 Month", "3 Months", "6 Months", "1 Year"]}
        />
        {UserUpdateAction === "AddNew" && (
          <>
            <TempTypeInputLimit
              setState={setpasswordR}
              label={"Password"}
              value={User.password}
              required={true}
              type={"password"}
              minLength={6}
              maxLength={30}
            />
            <TempTypeInputLimit
              setState={setverifyPasswordR}
              label={"Verify Password"}
              value={User.verifyPassword}
              required={true}
              type={"password"}
              minLength={6}
              maxLength={30}
            />
          </>
        )}
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
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  dark:text-white text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
          <h4 className="font-[400] text-[14px] leading-[17px] text-[#515978]">
            Select JPG or PNG{" "}
          </h4>
        </div>

        <div className="w-full h-fit flex justify-start items-center gap-5 py-[2px]">
          {User?.profilePic[0] !== "noProfile" && thumbs}
        </div>
      </div>
    </div>
  );
}
