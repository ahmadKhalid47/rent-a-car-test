"use client";
import { GoTriangleDown } from "react-icons/go";
import default_interior from "@/public/car-sedan-interior.svg";
import default_exterior from "@/public/car-sedan-exterior.svg";
import { FaTrash } from "react-icons/fa";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import upload from "@/public/Paper Upload.svg";
import { setdamages } from "@/app/store/Vehicle";
import { setAlert, setSeverity } from "@/app/store/Global";
import React, { useEffect, useState } from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import { Thumbs, Thumbs2 } from "@/app/Components/functions/thumbsFromDrag";
import Image from "next/image";

export default function Damages() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  const [exterior, setExterior] = useState(true);
  const [popup, setPopup] = useState(false);
  const [damageType, setDamageType] = useState("");
  const [degree, setDegree] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<any>([]);
  let [damages, setDamages] = useState<any>(vehicle.damages);
  const [marks, setMarks] = useState<any>(vehicle.damages);
  let dispatch = useDispatch();

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
      setFiles([
        Object.assign(filteredFiles[0], {
          preview: URL.createObjectURL(filteredFiles[0]),
        }),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleClick = (e: any, isExterior: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const exterior = isExterior;
    setPopup(true);
    setMarks([...marks, { x, y, exterior }]);
  };

  const cancelPop = () => {
    const array = marks;
    array.pop();
    setMarks(array);
    7;
  };

  function save() {
    let tempObj = {
      ...marks[marks?.length - 1],
      damageType,
      degree,
      description,
      files,
    };
    setDamages([...damages, tempObj]);
    setPopup(false);
  }

  useEffect(() => {
    dispatch(setdamages(damages));
  }, [damages]);

  const handleDelete = (index: number) => {
    const selectedDamage = damages[index];

    // Extract files from the selected damage
    const filesToDelete = selectedDamage.files;

    // Create a new array without the deleted damage
    const updatedDamages = damages.filter((_: any, i: any) => i !== index);

    // Update the state with the new damages array
    setDamages(updatedDamages);

    // Log the deleted damage
    // Dispatch the updated damages array
    dispatch(setdamages(updatedDamages));
  };
  useEffect(() => {
    setDamageType("");
    setDegree("");
    setDescription("");
    setFiles([]);
  }, [popup]);

  let exteriorImg = Configurations?.Configurations?.type.find(
    (item: any) => item.Type === vehicle.type
  )?.exterior;
  let interiorImg = Configurations?.Configurations?.type.find(
    (item: any) => item.Type === vehicle.type
  )?.interior;

  return (
    <div className="w-full h-fit">
      <div className="w-full h-fit">
        <div className="flex flex-wrap justify-start items-start gap-x-[4% w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey pe- px-1 xs:px-3 md:px-11 py-8 relative">
          <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
            Damages
          </span>
          <div className="flex flex-wrap justify-start items-start gap-x-[4% gap-y-0 md:gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] pe- relative">
            <div className="w-[100%] 900:w-[40%] h-full flex flex-col justify-start items-start pb-10">
              <div className="w-[100%] h-fit flex  justify-center items-center  bg-green-20 gap-1 sm:gap-5">
                <button
                  className={`pe-3 md:pe-0 w-fit md:w-[150px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-center gap-3 items-center truncate font-[400] text-[14px] md:text-[16px] text-center ${
                    exterior
                      ? "bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white dark:text-white text-black"
                  }`}
                  onClick={() => setExterior(true)}
                >
                  {exterior ? (
                    <div className="w-[20px] h-[20px] bg-main-blue rounded-full flex justify-center items-center border-[2px] border-white">
                      <div className="w-[10px] h-[10px] dark:bg-dark1 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-[20px] h-[20px] dark:bg-dark1 bg-white rounded-full flex justify-center items-center border-[2px] border-black">
                      <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                    </div>
                  )}
                  Exterior
                </button>
                <button
                  className={`pe-3 md:pe-0 w-fit md:w-[150px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-center gap-3 items-center truncate font-[400] text-[14px] md:text-[16px] text-center ${
                    !exterior
                      ? "bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white dark:text-white text-black"
                  }`}
                  onClick={() => setExterior(false)}
                >
                  {!exterior ? (
                    <div className="w-[20px] h-[20px] bg-main-blue rounded-full flex justify-center items-center border-[2px] border-white">
                      <div className="w-[10px] h-[10px] dark:bg-dark1 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-[20px] h-[20px] dark:bg-dark1 bg-white rounded-full flex justify-center items-center border-[2px] border-black">
                      <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                    </div>
                  )}
                  Interior
                </button>
              </div>
              <div className="w-fit mx-auto mt-10 h-full flex  justify-center items-center p-0">
                <div className="w-[326px] h-fit sm:h-[408px]  relative Damage-Zooming">
                  {exterior ? (
                    <div className="w-[326px] h-[408px] relative">
                      <Image
                        alt=""
                        width={326}
                        height={408}
                        src={exteriorImg || default_exterior.src}
                        className="w-[326px] h-[408px] cursor-pointer bg-white"
                        onClick={(e) => {
                          handleClick(e, true);
                        }}
                      />
                    </div>
                  ) : (
                    <Image
                      alt=""
                      width={326}
                      height={408}
                      src={interiorImg || default_interior.src}
                      className="w-[326px] h-[408px] bg-white"
                      onClick={(e) => {
                        handleClick(e, false);
                      }}
                    />
                  )}
                  {vehicle?.damages?.map((mark: any, index: any) => (
                    <>
                      {exterior ? (
                        mark.exterior ? (
                          <div
                            className={`absolute w-[15px] h-[15px] rounded-full ${
                              mark.degree === "Low"
                                ? "bg-green-400 "
                                : mark.degree === "Medium"
                                ? "bg-yellow-300"
                                : mark.degree === "High"
                                ? "bg-orange-500"
                                : mark.degree === "Very High"
                                ? "bg-red-500"
                                : "bg-gray-400"
                            } text-[8px] flex justify-center items-center truncate font-[600]`}
                            key={index}
                            style={{
                              top: `${mark.y}%`,
                              left: `${mark.x}%`,
                            }}
                          >
                            {index + 1}
                          </div>
                        ) : null
                      ) : !exterior ? (
                        !mark.exterior ? (
                          <div
                            className={`absolute w-[15px] h-[15px] rounded-full ${
                              mark.degree === "Low"
                                ? "bg-green-400 "
                                : mark.degree === "Medium"
                                ? "bg-yellow-300"
                                : mark.degree === "High"
                                ? "bg-orange-500"
                                : mark.degree === "Very High"
                                ? "bg-red-500"
                                : "bg-gray-400"
                            } text-[8px] flex justify-center items-center truncate font-[600]`}
                            key={index}
                            style={{
                              top: `${mark.y}%`,
                              left: `${mark.x}%`,
                            }}
                          >
                            {index + 1}
                          </div>
                        ) : null
                      ) : null}
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[100%] 900:w-[60%] h-full flex flex-col justify-start items-center">
              <div className="w-[100%] h-fit flex flex-col justify-start items-start px-5">
                <div className="w-full h-[60px] flex justify-between items-center py-[3px]">
                  <span className="w-[80px] truncate font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px]">
                    Image
                  </span>
                  <span className="w-[20%] md:w-[45px] text-start  truncate font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px]">
                    No
                  </span>
                  <span className="w-[23%] truncate font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px]">
                    Damage Type
                  </span>
                  <span className="w-[35%] md:w-[100px]  truncate font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px]">
                    Degree
                  </span>
                  <span className="text-transparen truncate font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none text-end">
                    <FaTrash />
                  </span>
                </div>

                {vehicle?.damages?.map((item: any, key: number) => (
                  <div className="w-full h-[60px] mt-1 flex justify-between items-end border-b-[2px]">
                    <Image
                      alt=""
                      width={80}
                      height={50}
                      className="w-[80px] h-[50px] mb-2 truncate font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none rounded-[5px]"
                      src={
                        item?.files[0] instanceof File
                          ? URL.createObjectURL(item?.files[0])
                          : item?.files[0]
                      }
                    />
                    <span className="pb-2 w-[20%] md:w-[45px] text-start truncate font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none">
                      {JSON.stringify(key + 1).padStart(2, "0")}{" "}
                    </span>
                    <span className="pb-2 w-[23%] truncate font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none">
                      {item?.damageType}
                    </span>
                    <span className="pb-2 w-[35%] md:w-[100px] truncate font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none">
                      {item?.degree}
                    </span>
                    <span
                      className="pb-2 truncate font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none text-end hover:scale-[1.3] cursor-pointer"
                      onClick={() => handleDelete(key)}
                    >
                      <FaTrash className="text-red-600 " />
                    </span>
                  </div>
                ))}
                {vehicle.damages?.length === 0 ? (
                  <span className="mx-auto mt-10 md:mt-[35%] truncate font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[24px] text-start">
                    Tap on the vehicle's part to add damage
                  </span>
                ) : null}
              </div>
            </div>
            <div className="absolute left-[40%] hidden 900:block border-e-2 top-0 border-grey h-full"></div>
          </div>
        </div>
      </div>
      {popup ? (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 modal-position modal-animation fixed modal-position modal-animation">
            <Relation value={damageType} action={setDamageType} />
            <div className="w-full sm:w-[181px] h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start truncate font-[400] text-[14px] leading-[17px]">
                Degree
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="pe-10 truncate font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                  onChange={(e) => {
                    setDegree(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
                <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                  <GoTriangleDown className="text-[18px]" />
                </div>
              </div>
            </div>
            <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start truncate font-[400] text-[14px] leading-[17px]">
                Description
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <textarea
                  className="w-full pe-2 py-3 truncate font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                  rows={3}
                  cols={6}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Enter Description"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-1 w-full h-fit dark:bg-dark1 bg-white mt- p">
              <h3 className="truncate font-[400] text-[14px] leading-[17px] dark:text-white text-black w-[100%]">
                Add Images
              </h3>
              <div
                className="w-full h-[110px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center cursor-pointer"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Image src={upload.src} alt="" width={32} height={32} />
                <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
                  Drag & Drop or
                  <span className="text-link-blue cursor-pointer">
                    {" "}
                    choose file{" "}
                  </span>
                  to upload
                </span>
                <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
                  Select JPG, PNG{" "}
                </span>
                <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
                  Maximum size 5MB{" "}
                </span>{" "}
              </div>

              <div className="w-full h-fit flex justify-start items-start mt-5 gap-5 bg-300 py-[2px]">
                <Thumbs2 files={files} setFiles={setFiles} />
              </div>
            </div>
            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
              <button
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  truncate font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  setPopup(false);
                  cancelPop();
                }}
              >
                Cancel
              </button>
              <button
                className="w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  truncate font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                onClick={() => save()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Relation({ value, action }: any) {
  let [other2, setOther2] = useState("");
  let [popUp2, setPopUp2] = useState(false);
  let [options, setoptions] = useState(
    !other2
      ? ["Dent", "Clip", "Scratch", "Other"]
      : ["Dent", "Clip", "Scratch", value, "Other"]
  );
  useEffect(() => {
    if (value === "Other") setPopUp2(true);
    setoptions(
      !other2
        ? ["Dent", "Clip", "Scratch", "Other"]
        : ["Dent", "Clip", "Scratch", value, "Other"]
    );
  }, [value]);

  return (
    <>
      <div className="w-full sm:w-[181px] h-fit flex flex-col justify-start items-start gap-1">
        <label className="flex justify-start gap-1 items-start truncate font-[400] text-[14px] leading-[17px]">
          Damage Type
        </label>
        <div className="w-full h-fit flex justify-between items-center relative">
          <select
            className="pe-10 truncate font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
            required={false}
            value={value}
            onChange={(e) => action(e.target.value)}
          >
            <option value={""}>Select</option>
            {options?.map((item: any, key: number) => (
              <option value={item} key={key}>
                {item ? item : "Select"}
              </option>
            ))}
          </select>
          <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
            <GoTriangleDown className="text-[18px]" />
          </div>
        </div>
      </div>
      {popUp2 && (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[600px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 fixed top-[30vh] -translate-y-[50%]">
            <div
              className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
            >
              <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                {"Add New Damage"}
                <FaAsterisk className="text-[6px]" />
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={true}
                  type={"text"}
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Text Here`}
                  onChange={(e) => {
                    setOther2(e.target.value);
                  }}
                  value={other2}
                />
              </div>
            </div>

            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
              <button
                className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                onClick={() => {
                  setOther2("");
                  setPopUp2(false);
                }}
              >
                <FaTimes />
              </button>
              <button
                className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  action(other2);
                  setPopUp2(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
