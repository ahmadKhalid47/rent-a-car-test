import { FaTimesCircle } from "react-icons/fa";
import { removing } from "./removingFileFromDrag";

interface dataType {
  files: any;
  setFiles: any;
}

export function Thumbs({ files, setFiles }: dataType) {
  return (
    <>
      {files?.map((file: any) => (
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
          <span className="font-[400] text-[10px] leading-[12px] text-grey truncate w-[64px]">
            {file?.name}
          </span>
          <span
            className="cursor-pointer font-[400] text-[14px] leading-[12px] text-red-500 absolute -top-[2px] -right-[2px]"
            onClick={() => removing(file, files, setFiles)}
          >
            <FaTimesCircle />
          </span>
        </div>
      ))}
    </>
  );
}
