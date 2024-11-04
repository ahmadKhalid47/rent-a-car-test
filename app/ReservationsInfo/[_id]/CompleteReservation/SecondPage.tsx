"use client";
import React from "react";
import upload from "@/public/Paper Upload.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import shape from "@/public/ShapeBlack.svg";
import { FaTimesCircle, FaTrash } from "react-icons/fa";
import { useCallback } from "react";
import { setdamages, setdamageImagesToDelete } from "@/app/store/reservations";
import { setConfigurations } from "@/app/store/Configurations";
import { setVehicleInfo } from "@/app/store/vehicleInfo";
import image404 from "@/public/image404.png";
import { MediumLoader } from "@/app/Components/Loader";
import { setAlert, setSeverity } from "@/app/store/Global";
import { Thumbs, Thumbs2 } from "@/app/Components/functions/thumbsFromDrag";

export default function SecondPage() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  let reservation = useSelector((state: RootState) => state.reservation);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let { Configurations } = useSelector(
    (state: RootState) => state.Configurations
  );
  const [exterior, setExterior] = useState(true);
  const [popup, setPopup] = useState(false);
  const [damageType, setDamageType] = useState("");
  const [degree, setDegree] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<any>([]);
  let [damages, setDamages] = useState<any>(reservation?.damages);
  const [marks, setMarks] = useState<any>(reservation?.damages);
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

    setFiles((prevFiles: any) => [
      ...prevFiles,
      ...filteredFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
      ...marks[marks.length - 1],
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

    const filesToDelete = selectedDamage.files;

    dispatch(setdamageImagesToDelete(filesToDelete));

    const updatedDamages = damages.filter((_: any, i: any) => i !== index);

    setDamages(updatedDamages);

    dispatch(setdamages(updatedDamages));
  };
  useEffect(() => {
    setDamageType("");
    setDegree("");
    setFiles([]);
  }, [popup]);

  useEffect(() => {
    async function getData2() {
      try {
        let result: any = await axios.post(`/api/getConfigurations`, {createdBy: myProfile._id});
        dispatch(setConfigurations(result?.data?.wholeData));
      } catch (error: any) {
        console.log(error);
      } finally {
      }
    }
    getData2();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        let result: any = await axios.post(
          `/api/getVehicleInfo/${reservation?.vehicle_id}`
        );
        if (result?.data?.data) {
          dispatch(setVehicleInfo(result?.data?.data?.data));
        } else {
        }
      } catch (error: any) {
        console.log(error);
      } finally {
      }
    }
    if (reservation.vehicle_id) {
      getData();
    }
  }, [reservation.vehicle_id]);


  let exteriorImg = Configurations
    ? Configurations.type?.find((item: any) => item.Type === vehicleInfo?.type)
        ?.exterior
    : "";

  let interiorImg = Configurations
    ? Configurations.type?.find((item: any) => item.Type === vehicleInfo?.type)
        ?.interior
    : "";

  return (
    <>
      <div className="w-full p-0 h-fit">
        <div className="w-full h-fit p-0">
          <div className="flex flex-wrap justify-start items-start gap-x-[4% gap-y-0 md:gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey pe- py-8 relative">
            <div className="w-[100%] 900:w-[50%] h-full flex flex-col justify-start items-start pb-10">
              <div className="w-[100%] h-fit flex  justify-center items-center  bg-green-20 gap-1 sm:gap-5">
                <button
                  className={`pe-3 md:pe-0 w-fit md:w-[150px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-start gap-3 ps-3 md:ps-5 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
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
                  className={`pe-3 md:pe-0 w-fit md:w-[150px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-start gap-3 ps-3 md:ps-5 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
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
                      {exteriorImg ? (
                        <img
                          src={exteriorImg}
                          className="w-[326px] h-[408px] cursor-pointer bg-white"
                          onClick={(e) => {
                            handleClick(e, true);
                          }}
                        />
                      ) : (
                        <MediumLoader />
                      )}
                    </div>
                  ) : (
                    <>
                      {interiorImg ? (
                        <img
                          src={interiorImg}
                          className="w-[326px] h-[408px] bg-white"
                          onClick={(e) => {
                            handleClick(e, false);
                          }}
                        />
                      ) : (
                        <MediumLoader />
                      )}
                    </>
                  )}
                  {reservation?.damages?.map((mark: any, index: any) => (
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
                            } text-[8px] flex justify-center items-center font-[600]`}
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
                            } text-[8px] flex justify-center items-center font-[600]`}
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
            <div className="w-[100%] 900:w-[50%] h-full flex flex-col justify-start items-center">
              <div className="w-[90%] h-fit flex flex-col justify-start items-start px-5">
                <div className="w-full h-fit flex justify-between items-start py-[3px]">
                  <p className="w-[20%] md:w-[25px]  font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px] text-start">
                    No
                  </p>
                  <p className="w-[30%] font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px] text-center">
                    Damage Type
                  </p>
                  <p className="w-[20%] font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px] text-center">
                    Position
                  </p>
                  <p className="w-[30%] md:w-[80px]  font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px] text-end">
                    Degree
                  </p>
                  <p className="text-transparent font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none text-end">
                    <FaTrash />
                  </p>
                </div>
                {reservation?.damages?.map((item: any, key: number) => (
                  <div className="w-full h-fit flex justify-between items-start">
                    <p className="w-[20%] md:w-[25px] font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none text-start">
                      {JSON.stringify(key + 1).padStart(2, "0")}{" "}
                    </p>
                    <p className="w-[30%] font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none text-center">
                      {item?.damageType}
                    </p>
                    <p className="w-[20%] font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none text-center">
                      {item?.exterior ? "Exterior" : "Interior"}
                    </p>
                    <p className="w-[30%] md:w-[80px] font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none text-end">
                      {item?.degree}
                    </p>
                    <p
                      className="font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-none text-end cursor-pointer"
                      onClick={() => handleDelete(key)}
                    >
                      <FaTrash />
                    </p>
                  </div>
                ))}
                {reservation?.damages.length === 0 ? (
                  <p className="mx-auto mt-10 md:mt-[45%] font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[24px] text-start">
                    Tap on the vehicle's part to add damage
                  </p>
                ) : null}
              </div>
            </div>
            <div className="absolute left-[50%] hidden 900:block border-e-2 top-0 border-grey h-full"></div>
          </div>
        </div>
        {popup ? (
          <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
            <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 modal-position modal-animation fixed modal-position modal-animation">
              <div className="w-full sm:w-[181px] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  Damage Type
                </label>
                <div className="w-full h-fit flex justify-between items-center relative">
                  <select
                    className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                    onChange={(e) => {
                      setDamageType(e.target.value);
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Dent">Dent</option>
                    <option value="Clip">Clip</option>
                    <option value="Scratch">Scratch</option>
                  </select>
                  <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <img
                      src={shape.src}
                      className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-[181px] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  Degree
                </label>
                <div className="w-full h-fit flex justify-between items-center relative">
                  <select
                    className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
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
                    <img
                      src={shape.src}
                      className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  Description
                </label>
                <div className="w-full h-fit flex justify-between items-center relative">
                  <textarea
                    className="w-full pe-2 py-3 font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                    rows={3}
                    cols={6}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Enter Description"
                  ></textarea>
                </div>
              </div> */}
              <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-1 w-full h-fit dark:bg-dark1 bg-white mt- p">
                <h3 className="font-[400] text-[14px] leading-[17px] dark:text-white text-black w-[100%]">
                  Add Images
                </h3>
                <div
                  className="w-full h-[110px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
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
                    Select JPG, PNG{" "}
                  </span>
                  <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
                    Maximum size 5MB{" "}
                  </span>{" "}
                  <h4 className="font-[400] text-[14px] leading-[17px] text-[#515978]">
                    Select JPG or PNG
                  </h4>
                </div>

                <div className="w-full h-fit flex justify-start items-start mt-5 gap-5 bg-300 overflow-auto py-[2px]">
                  <Thumbs2 files={files} setFiles={setFiles} />
                </div>
              </div>
              <div
                className={`w-full flex justify-end gap-4 items-center pt-4`}
              >
                <button
                  className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                  onClick={() => {
                    setPopup(false);
                    cancelPop();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                  onClick={() => save()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
