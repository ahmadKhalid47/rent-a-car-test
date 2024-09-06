"use client";
import upload from "@/public/Paper Upload.svg";
import { useEffect, useState } from "react";
import React, { useCallback } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { TempTypeInput, TypeInput } from "../../Components/InputComponents/TypeInput";
import {
  SelectInput,
  TempSelectInput,
} from "../../Components/InputComponents/SelectInput";
import {
  setpassportNumberR,
  setpassportValidR,
  setpassportCountryR,
  setpassportImagesR,
  setlicenseNumberR,
  setlicenseValidR,
  setlicenseCountryR,
  setlicenseImagesR,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { removing } from "../../Components/functions/removingFileFromDrag";
import { Thumbs } from "../../Components/functions/thumbsFromDrag";
import { useFileDrop } from "../../Components/functions/onDragFromDrag";
import { Country, State, City } from "country-state-city";

export default function Rental() {
  let customer = useSelector((state: RootState) => state.Customer);
  const [passfiles, setPassFiles] = useState<any>(customer?.passportImages);
  const [licfiles, setLicFiles] = useState<any>(customer?.licenseImages);
  let dispatch = useDispatch();
  useEffect(() => {
    setPassFiles(customer.passportImages);
  }, [customer.passportImages]);

  useEffect(() => {
    setLicFiles(customer.licenseImages);
  }, [customer.licenseImages]);

  const onDropPass = useFileDrop(
    (files: any[]) => setPassFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );
  const {
    getRootProps: getRootPropsPass,
    getInputProps: getInputPropsPass,
    // isDragActive,
  } = useDropzone({
    onDrop: onDropPass,
  });
  useEffect(() => {
    dispatch(setpassportImagesR(passfiles));
  }, [passfiles]);

  const onDropLic = useFileDrop(
    (files: any[]) => setLicFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );
  const {
    getRootProps: getRootPropsLic,
    getInputProps: getInputPropsLic,
    // isDragActive,
  } = useDropzone({
    onDrop: onDropLic,
  });
  useEffect(() => {
    dispatch(setlicenseImagesR(licfiles));
  }, [licfiles]);

  const countries: any = Country.getAllCountries().map((country: any) => ({
    value: country.isoCode,
    label: country.name,
  }));

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setpassportNumberR}
          label={"Passport / ID Number"}
          value={customer.passportNumber}
          required={false}
          type={"number"}
        />

        <TempTypeInput
          setState={setpassportValidR}
          label={"Valid Until"}
          value={customer.passportValid}
          required={false}
          type={"date"}
        />

        <TempSelectInput
          setState={setpassportCountryR}
          label={"Issuing Country/State"}
          value={customer.passportCountry}
          required={false}
          options={countries.map((item: any) => item.label)}
        />

        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootPropsPass()}
        >
          <input {...getInputPropsPass()} />

          <img src={upload.src} />
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
        </div>
        <span className="font-[400] text-[14px] leading-[17px] text-black -mt-4">
          Here you can Upload Passport / ID scans
        </span>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs files={passfiles} setFiles={setPassFiles} />
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <TempTypeInput
          setState={setlicenseNumberR}
          label={"Driver's License Number"}
          value={customer.licenseNumber}
          required={false}
          type={"number"}
        />

        <TempTypeInput
          setState={setlicenseValidR}
          label={"Valid Until"}
          value={customer.licenseValid}
          required={false}
          type={"date"}
        />

        <TempSelectInput
          setState={setlicenseCountryR}
          label={"Issuing Country/State"}
          value={customer.licenseCountry}
          required={false}
          options={countries.map((item: any) => item.label)}
        />

        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
          {...getRootPropsLic()}
        >
          <input {...getInputPropsLic()} />
          <img src={upload.src} />
          <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </h4>
        </div>
        <span className="font-[400] text-[14px] leading-[17px] text-black -mt-4">
          Here you can Upload driving license scans
        </span>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs files={licfiles} setFiles={setLicFiles} />
        </div>
      </div>
    </div>
  );
}
