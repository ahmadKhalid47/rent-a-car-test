"use client";
import shape from "@/public/ShapeBlack.svg";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import checkBlue from "@/public/checkBlue.svg";
import checkBlack from "@/public/checkBlack.png";
import CarExterior from "@/public/car-sedan-exterior.png";
import CarInterior from "@/public/car-sedan-interior (1).png";
import { FaTimesCircle } from "react-icons/fa";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import upload from "@/public/Paper Upload.svg";

export default function Damages() {
  const [exterior, setExterior] = useState(true);
  const [popup, setPopup] = useState(false);

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
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
        onClick={() => removing(file.name)}
      >
        <FaTimesCircle />
      </span>
    </div>
  ));

  function removing(name: any) {
    let array = files;
    array = array.filter((e: any) => {
      return e.name !== name;
    });
    setFiles(array);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [marks, setMarks] = useState<any>([]);

  const handleClick1 = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const exterior = true;
    setPopup(true);
    setMarks([...marks, { x, y, exterior }]);
  };
  const handleClick2 = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const exterior = false;
    setPopup(true);
    setMarks([...marks, { x, y, exterior }]);
  };
  const cancelPop = () => {
    const array = marks;
    array.pop();
    setMarks(array);
  };

  return (
    <div className="w-full h-fit">
      <div className="w-full h-fit  ">
        <div className="flex flex-wrap justify-start items-start gap-x-[4% gap-y-0 md:gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey pe- py-8 bg-red-30 relative">
          <div className="w-[100%] 900:w-[50%] h-full flex flex-col justify-start items-start pb-10 bg-red-30">
            <div className="w-[100%] h-fit flex  justify-center items-center  bg-green-20 gap-1 sm:gap-5">
              <button
                className={`pe-3 md:pe-0 w-fit md:w-[150px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color border-2 border-grey flex justify-start gap-5 ps-3 md:ps-5 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
                  exterior ? "text-main-blue" : ""
                }`}
                onClick={() => setExterior(!exterior)}
              >
                {exterior ? (
                  <img src={checkBlue.src} />
                ) : (
                  <img src={checkBlack.src} />
                )}
                Exterior
              </button>
              <button
                className={`pe-3 md:pe-0 w-fit md:w-[150px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color border-2 border-grey flex justify-start gap-5 ps-3 md:ps-5 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
                  !exterior ? "text-main-blue" : ""
                }`}
                onClick={() => setExterior(!exterior)}
              >
                {!exterior ? (
                  <img src={checkBlue.src} />
                ) : (
                  <img src={checkBlack.src} />
                )}
                Interior
              </button>
            </div>
            <div className="w-fit mx-auto mt-10 h-full flex  justify-center items-center p-0">
              <div className="w-[326px] h-fit sm:h-[408px]  relative Damage-Zooming">
                {exterior ? (
                  <div className="w-[326px] h-[408px] relative">
                    <img
                      src={CarExterior.src}
                      className="w-[326px] h-[408px] cursor-pointer"
                      onClick={handleClick1}
                    />
                  </div>
                ) : (
                  <img
                    src={CarInterior.src}
                    className="w-[326px] h-[408px]"
                    onClick={handleClick2}
                  />
                )}
                {marks.map((mark: any, index: any) => (
                  <>
                    {exterior ? (
                      mark.exterior ? (
                        <div
                          className={`absolute w-[15px] h-[15px] rounded-full bg-red-600 text-white text-[8px] flex justify-center items-center font-[600]`}
                          key={index}
                          style={{
                            top: mark.y,
                            left: mark.x,
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
                            top: mark.y,
                            left: mark.x,
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
                <p className="w-[30%] md:w-[50px]  font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px] text-start">
                  No
                </p>
                <p className="w-[40%] md:w-[30%  font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px] text-center">
                  Damage Type
                </p>
                <p className="w-[30%] md:w-[80px]  font-[600] text-[12px] xs:text-[14px] md:text-[18px] leading-[27px] text-end">
                  Degree
                </p>
              </div>
              <p className="mx-auto mt-10 md:mt-[45%] font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[24px] text-start">
                Tap on the vehicle's part to add damage
              </p>
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
                <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
                  <option value="">Dent</option>
                  <option value="">Clip</option>
                  <option value="">Scratch</option>
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
                <select className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey">
                  <option value="">low</option>
                  <option value="">low</option>
                  <option value="">low</option>
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
                  value={"Enter Description"}
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
                  Drag & Drop or
                  <span className="text-link-blue cursor-pointer">
                    choose file
                  </span>
                  to upload
                </h4>
                <h4 className="font-[400] text-[14px] leading-[17px] text-[#515978]">
                  Select JPG or PNG
                </h4>
              </div>

              <div className="w-full h-fit flex justify-start items-start mt-5 gap-5 bg-300 overflow-auto">
                {thumbs}
                <div className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative red-200">
                  <div className="relative w-[64px] h-[64px] rounded-[10px] border-[1px] border-grey overflow-hidden flex justify-center items-center">
                    <FaPlusCircle className="font-[600] text-[20px] bg-white text-main-blue" />
                  </div>
                </div>
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
                onClick={() => setPopup(false)}
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
