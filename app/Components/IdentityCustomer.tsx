import { FaChevronRight, FaChevronLeft, FaEye, FaTimes } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function GeneralCustomer() {
  let { CustomerInfo } = useSelector((state: RootState) => state.CustomerInfo);
  let [activeField, setActiveField] = useState("passport");
  const [imagePopup, setImagePopup] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [zoomed, setZoomed] = useState<boolean>(false);
  let ImageArray =
    activeField === "passport"
      ? CustomerInfo?.passportImages
      : CustomerInfo?.licenseImages;

  let imageLength =
    activeField === "passport"
      ? CustomerInfo.passportImages?.length
      : CustomerInfo.licenseImages?.length;

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-center gap-x cursor-pointer-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[70%] h-fit flex flex-col justify-between items-center">
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] cursor-pointer border-b-[2px] font-[600]">
          <p className="w-[15%] text-start text-[18px] leading-[27px]">
            Doc Type
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            Number
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            Valid Until
          </p>
          <p className="w-[18%] text-start text-[18px] leading-[27px]">
            Country/State
          </p>
        </div>
        <div
          className="w-[100%] h-fit flex justify-between items-start py-[3px] cursor-pointer border-b-[2px] font-[400]"
          onClick={() => {
            setActiveField("passport");
            setImageIndex(0);
          }}
        >
          <p className="w-[15%] text-start text-[18px] leading-[27px]">
            Passport
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.passportNumber}
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.passportValid}
          </p>
          <p className="w-[18%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            {CustomerInfo?.passportCountry}
            <FaEye
              className={
                activeField === "passport" ? "text-main-blue" : "text-grey"
              }
            />
          </p>
        </div>
        <div
          className="w-[100%] h-fit flex justify-between items-start py-[3px] cursor-pointer border-b-[2px font-[400]"
          onClick={() => {
            setActiveField("license");
            setImageIndex(0);
          }}
        >
          <p className="w-[15%] text-start text-[18px] leading-[27px]">
            License
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.licenseNumber}
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            {CustomerInfo?.licenseValid}
          </p>
          <p className="w-[18%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            {CustomerInfo?.licenseCountry}
            <FaEye
              className={
                activeField !== "passport" ? "text-main-blue" : "text-grey"
              }
            />
          </p>
        </div>
      </div>
      {imagePopup ? (
        <div
          className="w-[100%] h-[100%] flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]"
          onClick={() => {
            setImagePopup(false);
          }}
        >
          <div className="w-[700px] h-[700px] relative overflow-auto scroll">
            <img
              src={ImageArray[imageIndex]}
              className={"w-[100%] h-[100%]"}
              style={{
                transform: `${zoomed ? "scale(1.4)" : "scale(1)"}`,
                cursor: `${zoomed ? "zoom-out" : "zoom-in"}`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(!zoomed);
              }}
            />
          </div>
          <span
            className={`cursor-pointer font-[400] text-[30px] p-1 leading-[12px] text-red-500 absolute top-28 right-28 ${
              zoomed ? "right-3" : ""
            } w-fit shadow bg-white rounded-full`}
            onClick={() => setImagePopup(false)}
          >
            <FaTimes />
          </span>
        </div>
      ) : null}

      <div className="w-[210px] h-[210px] bg-white rounded-[10px] border-[1px] border-grey my-2">
        <img
          src={ImageArray[imageIndex]}
          className={"w-[100%] h-[100%]"}
          onClick={() => {
            setImagePopup(true);
          }}
        />
      </div>
      <div className="w-full flex justify-end items-end">
        <div className="w-[210px] h-[30px] mt-4 text-[20px] flex justify-between items-center">
          <FaChevronLeft
            onClick={() =>
              setImageIndex(imageIndex > 0 ? imageIndex - 1 : imageIndex)
            }
            className={`${imageIndex > 0 ? "" : "text-grey"} cursor-pointer`}
          />
          <FaChevronRight
            onClick={() =>
              setImageIndex(
                imageIndex < imageLength - 1 ? imageIndex + 1 : imageIndex
              )
            }
            className={`${
              imageIndex < imageLength - 1 ? "" : "text-grey"
            } cursor-pointer`}
          />
        </div>
      </div>
    </div>
  );
}
