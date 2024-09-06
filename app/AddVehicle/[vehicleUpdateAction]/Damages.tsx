"use client";
import shape from "@/public/ShapeBlack.svg";
import { useState, useEffect } from "react";
import { FaTimesCircle, FaTrash } from "react-icons/fa";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import upload from "@/public/Paper Upload.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setdamages, setdamageImagesToDelete } from "@/app/store/Vehicle";
import { useDispatch } from "react-redux";

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
          src={file.preview}
          alt={file.name}
          className=" w-[64px] h-[64px]"
        />
      </div>
      <span className="font-[400] text-[10px] leading-[12px] text-grey">
        image4.jpg
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
  }

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

    // Extract files from the selected damage
    const filesToDelete = selectedDamage.files;

    // Dispatch the entire array of files to be deleted
    dispatch(setdamageImagesToDelete(filesToDelete));

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
      <div className="w-full h-fit  ">
        <div className="flex flex-wrap justify-start items-start gap-x-[4% gap-y-0 md:gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey pe- py-8 bg-red-30 relative">
          <div className="w-[100%] 900:w-[50%] h-full flex flex-col justify-start items-start pb-10 bg-red-30">
            <div className="w-[100%] h-fit flex  justify-center items-center  bg-green-20 gap-1 sm:gap-5">
              <button
                className={`pe-3 md:pe-0 w-fit md:w-[150px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-start gap-3 ps-3 md:ps-5 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
                  exterior ? "bg-main-blue text-white" : "bg-white text-black"
                }`}
                onClick={() => setExterior(true)}
              >
                {exterior ? (
                  // <img src={checkBlue.src} />
                  <div className="w-[20px] h-[20px] bg-main-blue rounded-full flex justify-center items-center border-[2px] border-white">
                    <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-[20px] h-[20px] bg-white rounded-full flex justify-center items-center border-[2px] border-black">
                    <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
                  </div>
                )}
                Exterior
              </button>
              <button
                className={`pe-3 md:pe-0 w-fit md:w-[150px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-start gap-3 ps-3 md:ps-5 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
                  !exterior ? "bg-main-blue text-white" : "bg-white text-black"
                }`}
                onClick={() => setExterior(false)}
              >
                {!exterior ? (
                  <div className="w-[20px] h-[20px] bg-main-blue rounded-full flex justify-center items-center border-[2px] border-white">
                    <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-[20px] h-[20px] bg-white rounded-full flex justify-center items-center border-[2px] border-black">
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
                    <img
                      src={exteriorImg}
                      className="w-[326px] h-[408px] cursor-pointer"
                      onClick={(e) => {
                        handleClick(e, true);
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={interiorImg}
                    className="w-[326px] h-[408px]"
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
                          className={`absolute w-[15px] h-[15px] rounded-full bg-red-600 text-white text-[8px] flex justify-center items-center font-[600]`}
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
                          className={`absolute w-[15px] h-[15px] rounded-full bg-red-600 text-white text-[8px] flex justify-center items-center font-[600]`}
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
          <div className="w-[100%] 900:w-[50%] h-full flex flex-col justify-start items-center bg-blue-30 ps-">
            <div className="w-[90%] h-fit flex flex-col justify-start items-start px-5 ">
              <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
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
              {vehicle?.damages?.map((item: any, key: number) => (
                <div className="w-full h-fit flex justify-between items-start border-b-[2px">
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
              {vehicle.damages.length === 0 ? (
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
        <div className="w-full h-full bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10">
            <div className="w-full sm:w-[181px] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Damage Type
              </label>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
                  onChange={(e) => {
                    setDamageType(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="Dent">Dent</option>
                  <option value="Clip">Clip</option>
                  <option value="Scratch">Scratch</option>
                </select>
                <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                  <img src={shape.src} className="w-[10.5px]" />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-[181px] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Degree
              </label>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <select
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
                  onChange={(e) => {
                    setDegree(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                  <img src={shape.src} className="w-[10.5px]" />
                </div>
              </div>
            </div>
            <div className="w-[100%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Description
              </label>
              <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                <textarea
                  className="w-full pe-2 py-3 font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center input-color rounded-xl border-2 border-grey"
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
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-1 w-full h-fit bg-white mt- p">
              <h3 className="font-[400] text-[14px] leading-[17px] text-black w-[100%]">
                Add Images
              </h3>
              <div
                className="w-full h-[110px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <img src={upload.src} />
                <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
                  Drag & Drop or{" "}
                  <span className="text-link-blue cursor-pointer">
                    choose file
                  </span>{" "}
                  to upload
                </h4>
                <h4 className="font-[400] text-[14px] leading-[17px] text-[#515978]">
                  Select JPG or PNG
                </h4>
              </div>

              <div className="w-full h-fit flex justify-start items-start mt-5 gap-5 bg-300 overflow-auto">
                {thumbs}
              </div>
            </div>
            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
              <button
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
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
  );
}
