"use client";
import React from "react";
import vip from "@/public/vip.svg";
import upload from "@/public/Paper Upload.svg";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TempTypeInput } from "../../Components/InputComponents/TypeInput";
import { TempSelectInput } from "../../Components/InputComponents/SelectInput";
import {
  setalternativePhoneR,
  setcityR,
  setcountryR,
  setcustomerImageR,
  setcustomerTypeR,
  setdateOfBirthR,
  setemailAddressR,
  setgenderR,
  setisVipR,
  setnameR,
  setnationalityR,
  setphoneR,
  setpostalCodeR,
  setstateR,
  setstreetAddressR,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { CountryStateCity } from "../../Components/functions/CountryStateCity";
import { setAlert, setSeverity } from "@/app/store/Global";
import { Thumbs } from "@/app/Components/functions/thumbsFromDrag";
import Image from "next/image";

export default function Info() {
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) => state.Customer);

  const onDrop = useCallback((acceptedFiles: any) => {
    const maxFileSize = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"];

    const filteredFiles = acceptedFiles?.filter((file: any) => {
      if (!allowedTypes?.includes(file.type)) {
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

    if (filteredFiles?.length > 0) {
      dispatch(
        setcustomerImageR([
          Object.assign(filteredFiles[0], {
            preview: URL.createObjectURL(filteredFiles[0]),
          }),
        ])
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const { countries, states, cities } = CountryStateCity(
    customer.country,
    customer.state
  );

  return (
    <div className="w-full h-fit">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          General Information
        </span>

        <TempSelectInput
          setState={setcustomerTypeR}
          label={"Customer Type"}
          value={customer.customerType}
          required={false}
          options={["Individual", "Corporate"]}
        />
        <TempTypeInput
          setState={setnameR}
          label={"Full Name"}
          value={customer.name}
          required={true}
          type={"text"}
        />
        <TempSelectInput
          setState={setgenderR}
          label={"Gender"}
          value={customer.gender}
          required={false}
          options={["Male", "Female", "Custom"]}
        />

        <TempTypeInput
          setState={setdateOfBirthR}
          label={"Date of Birth"}
          value={customer.dateOfBirth}
          required={false}
          type={"date"}
        />

        <TempTypeInput
          setState={setnationalityR}
          label={"Nationality"}
          value={customer.nationality}
          required={false}
          type={"text"}
        />
        <TempTypeInput
          setState={setemailAddressR}
          label={"Email Address"}
          value={customer.emailAddress}
          required={false}
          type={"email"}
        />
        <TempTypeInput
          setState={setphoneR}
          label={"Phone"}
          value={customer.phone}
          required={false}
          type={"number"}
        />
        <TempTypeInput
          setState={setalternativePhoneR}
          label={"Alternative Phone"}
          value={customer.alternativePhone}
          required={false}
          type={"number"}
        />

        <TempTypeInput
          setState={setstreetAddressR}
          label={"Street Address"}
          value={customer.streetAddress}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setcountryR}
          label={"Country"}
          value={customer.country}
          required={false}
          options={countries.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setstateR}
          label={"State/Province"}
          value={customer.state}
          required={false}
          options={states.map((item: any) => item.label)}
        />
        <TempSelectInput
          setState={setcityR}
          label={"City"}
          value={customer.city}
          required={false}
          options={cities.map((item: any) => item.label)}
        />
        <TempTypeInput
          setState={setpostalCodeR}
          label={"Postal/Zip Code"}
          value={customer.postalCode}
          required={false}
          type={"text"}
        />
        <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit flex flex-col justify-start items-start gap-0 sm:gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[0px] sm:text-[14px] leading-[0px] sm:leading-[17px] text-transparent">
            VIP Client
          </label>
          <div className="w-full h-fit flex justify-between items-center relative">
            <div className="pe- font-[400] text-[14px] leading-[17px] ps-2 w-[100%] h-[43px] flex  justify-start gap-2 items-center dark:bg-dark1 bg-white">
              <input
                type="checkbox"
                checked={customer.isVip}
                className="mr-2 font-[400] text-[16px] leading-[19px] ps-2 w-[19px] h-[19px] flex justify-between items-center dark:bg-dark1 bg-white rounded-xl border-2 border-grey"
                onChange={(e) => dispatch(setisVipR(e.target.checked))}
              />
              <img
                src={vip.src}
                className="dark:filter dark:brightness-[0] dark:invert"
              />
              It’s VIP Client
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-8 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-10 pb-8 md:pb-10 pt-8 md:pt-8">
        <h3 className="font-[600] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
          Add Image
        </h3>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Image
            src={upload.src}
            alt=""
            width={32}
            height={32}
            priority={true}
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
            Maximum size 5MB{" "}
          </span>{" "}
        </div>

        <div className="w-full h-fit flex justify-start items-center gap-5 py-[2px]">
          <Thumbs files={customer.customerImage} setFiles={setcustomerImageR} />
        </div>
      </div>
    </div>
  );
}
