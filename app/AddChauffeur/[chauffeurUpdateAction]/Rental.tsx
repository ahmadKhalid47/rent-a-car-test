"use client";
import React from "react";
import upload from "@/public/Paper Upload.svg";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import {
  TempTypeInput,
  TypeInput,
} from "../../Components/InputComponents/TypeInput";
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
  setidCardR,
  setotherNumberR,
  setotherValidR,
  setotherCountryR,
  setotherImagesR,
  setotherR,
} from "@/app/store/chauffeur";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { removing } from "../../Components/functions/removingFileFromDrag";
import { Thumbs } from "../../Components/functions/thumbsFromDrag";
import { useFileDrop } from "../../Components/functions/onDragFromDrag";
import { Country, State, City } from "country-state-city";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

export default function Rental() {
  let chauffeur = useSelector((state: RootState) => state.chauffeur);
  const [passfiles, setPassFiles] = useState<any>(chauffeur?.passportImages);
  const [licfiles, setLicFiles] = useState<any>(chauffeur?.licenseImages);
  const [otherfiles, setOtherFiles] = useState<any>(chauffeur?.otherImages);
  let dispatch = useDispatch();
  useEffect(() => {
    setPassFiles(chauffeur.passportImages);
  }, [chauffeur.passportImages]);

  useEffect(() => {
    setLicFiles(chauffeur.licenseImages);
  }, [chauffeur.licenseImages]);

  useEffect(() => {
    setOtherFiles(chauffeur.otherImages);
  }, [chauffeur.otherImages]);

  const onDropPass = useFileDrop(
    (files: any[]) => setPassFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );
  const { getRootProps: getRootPropsPass, getInputProps: getInputPropsPass } =
    useDropzone({
      onDrop: onDropPass,
    });
  useEffect(() => {
    dispatch(setpassportImagesR(passfiles));
  }, [passfiles]);

  const onDropLic = useFileDrop(
    (files: any[]) => setLicFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );
  const { getRootProps: getRootPropsLic, getInputProps: getInputPropsLic } =
    useDropzone({
      onDrop: onDropLic,
    });
  useEffect(() => {
    dispatch(setlicenseImagesR(licfiles));
  }, [licfiles]);

  const onDropOther = useFileDrop(
    (files: any[]) =>
      setOtherFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );
  const { getRootProps: getRootPropsOther, getInputProps: getInputPropsOther } =
    useDropzone({
      onDrop: onDropOther,
    });
  useEffect(() => {
    dispatch(setotherImagesR(otherfiles));
  }, [otherfiles]);

  const countries: any = Country.getAllCountries().map((country: any) => ({
    value: country.isoCode,
    label: country.name,
  }));

  return (
    <div className="w-full h-fit">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Passport or ID Card Info
        </span>
        <div className="w-[100%] h-fit flex justify-start items-start gap-6 text-[14px]">
          <div className="w-fit h-fit flex justify-start items-end gap-1 leading-none">
            <input
              type="radio"
              id="document1"
              name="document"
              value="Passport"
              className="w-[18px] h-[18px]"
              checked={!chauffeur.idCard}
              onChange={(e) => {
                dispatch(setidCardR(e.target.value === "ID Card"));
              }}
            />
            <label htmlFor="document1">Passport</label>
          </div>
          <div className="w-fit h-fit flex justify-start items-end gap-1 leading-none">
            <input
              type="radio"
              id="document2"
              name="document"
              value="ID Card"
              className="w-[18px] h-[18px]"
              checked={chauffeur.idCard}
              onChange={(e) => {
                dispatch(setidCardR(e.target.value === "ID Card"));
              }}
            />
            <label htmlFor="document2">ID Card</label>
          </div>
        </div>

        <TempTypeInput
          setState={setpassportNumberR}
          label={`${chauffeur.idCard ? "ID" : "Passport"} Number`}
          value={chauffeur.passportNumber}
          required={false}
          type={"number"}
        />

        <TempTypeInput
          setState={setpassportValidR}
          label={"Valid Until"}
          value={chauffeur.passportValid}
          required={false}
          type={"date"}
        />

        <TempSelectInput
          setState={setpassportCountryR}
          label={"Issuing Country/State"}
          value={chauffeur.passportCountry}
          required={false}
          options={countries.map((item: any) => item.label)}
        />

        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full mt-1 -mb-2 b">
          Upload {chauffeur.idCard ? "ID Card" : "Passport"}*
        </span>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px cursor-pointer"
          {...getRootPropsPass()}
        >
          <input {...getInputPropsPass()} />
          <img src={upload.src} />
          <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Select JPG, PNG
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Maximum size 5MB
          </span>
        </div>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs files={passfiles} setFiles={setPassFiles} />
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Driving License Information
        </span>
        <TempTypeInput
          setState={setlicenseNumberR}
          label={"Driver's License Number"}
          value={chauffeur.licenseNumber}
          required={false}
          type={"number"}
        />

        <TempTypeInput
          setState={setlicenseValidR}
          label={"Valid Until"}
          value={chauffeur.licenseValid}
          required={false}
          type={"date"}
        />

        <TempSelectInput
          setState={setlicenseCountryR}
          label={"Issuing Country/State"}
          value={chauffeur.licenseCountry}
          required={false}
          options={countries.map((item: any) => item.label)}
        />
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full mt-1 -mb-2 b">
          Upload Driving License*
        </span>

        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px cursor-pointer"
          {...getRootPropsLic()}
        >
          <input {...getInputPropsLic()} />
          <img src={upload.src} />
          <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Select JPG, PNG
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Maximum size 5MB
          </span>
        </div>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs files={licfiles} setFiles={setLicFiles} />
        </div>
      </div>
      <div className="flex justify-start gap-3 items-center w-[100%] mt-5">
        <button
          className="flex justify-center gap-3 items-center w-[200px] py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
          onClick={() => {
            dispatch(setotherR(!chauffeur.other));
          }}
        >
          {chauffeur.other ? (
            <>
              <FiMinusCircle className="text-[25px]" />
              Cancel
            </>
          ) : (
            <>
              <FiPlusCircle className="text-[25px]" />
              Add Other
            </>
          )}
        </button>
      </div>
      {chauffeur.other && (
        <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
          <span className="flex justify-start gap-4 items-center font-[600] text-[20px] w-full my-1 c">
            Other Information
            {/* <span className="font-[400] text-[14px]">Name this field</span> */}
          </span>
          <TempTypeInput
            setState={setotherNumberR}
            label={"Number"}
            value={chauffeur.otherNumber}
            required={false}
            type={"number"}
          />

          <TempTypeInput
            setState={setotherValidR}
            label={"Valid Until"}
            value={chauffeur.otherValid}
            required={false}
            type={"date"}
          />

          <TempSelectInput
            setState={setotherCountryR}
            label={"Issuing Country/State"}
            value={chauffeur.otherCountry}
            required={false}
            options={countries.map((item: any) => item.label)}
          />
          <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full mt-1 -mb-2 b">
            Upload Image*
          </span>

          <div
            className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px cursor-pointer"
            {...getRootPropsOther()}
          >
            <input {...getInputPropsOther()} />
            <img src={upload.src} />
            <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
              Drag & Drop or
              <span className="text-link-blue cursor-pointer">
                {" "}
                choose file{" "}
              </span>
              to upload
            </span>
            <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
              Select JPG, PNG
            </span>
            <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
              Maximum size 5MB
            </span>
          </div>
          <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
            <Thumbs files={otherfiles} setFiles={setOtherFiles} />
          </div>
        </div>
      )}
    </div>
  );
}
