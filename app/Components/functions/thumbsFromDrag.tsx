import Image from "next/image";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface dataType {
  files: any;
  setFiles: any;
}

export function Thumbs({ files, setFiles }: dataType) {
  let dispatch = useDispatch();

  function removing(file: any, files: any, setFiles: any) {
    let array = files;
    array = array.filter((e: any) => {
      if (typeof e === "string") {
        return e !== file;
      } else if (typeof e === "object" && e !== null) {
        return e.path !== file.path && e.preview !== file.preview;
      }
      return true;
    });
    dispatch(setFiles(array));
  }

  return (
    <>
      {files?.length
        ? files?.map((file: any) => (
            <div
              key={file.name}
              className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative"
            >
              <div className="relative w-[64px] h-[64px] rounded-[10px] border-[1px] border-grey overflow-hidden">
                <Image
                  width={64}
                  height={64}
                  src={file.preview ? file.preview : file}
                  alt={file.name}
                  className="w-[64px] h-[64px]"
                />
              </div>
              <span className="w-[64px] font-[400] text-[10px] leading-[12px] text-grey truncate">
                {file?.name}
              </span>
              <span
                className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]"
                onClick={() => removing(file, files, setFiles)}
              >
                <FaTimesCircle />
              </span>
            </div>
          ))
        : null}
    </>
  );
}

export function Thumbs2({ files, setFiles }: dataType) {

  function removing(file: any, files: any, setFiles: any) {
    let array = files;
    array = array.filter((e: any) => {
      if (typeof e === "string") {
        return e !== file;
      } else if (typeof e === "object" && e !== null) {
        return e.path !== file.path && e.preview !== file.preview;
      }
      return true;
    });
    setFiles(array);
  }

  return (
    <>
      {files?.length
        ? files?.map((file: any) => (
            <div
              key={file.name}
              className="w-fit h-fit flex flex-col justify-center items-center gap-[5px] relative"
            >
              <div className="relative w-[64px] h-[64px] rounded-[10px] border-[1px] border-grey overflow-hidden">
                <img
                  src={file.preview ? file.preview : file}
                  alt={file.name}
                  className="w-[64px] h-[64px]"
                />
              </div>
              <span className="w-[64px] font-[400] text-[10px] leading-[12px] text-grey truncate">
                {file?.name}
              </span>
              <span
                className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]"
                onClick={() => removing(file, files, setFiles)}
              >
                <FaTimesCircle />
              </span>
            </div>
          ))
        : null}
    </>
  );
}
