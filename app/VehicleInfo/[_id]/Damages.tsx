"use client";
import React from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { setConfigurations } from "@/app/store/Configurations";
import axios from "axios";
import image404 from "@/public/image404.png";

export default function Damages() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  const [damageIndex, setdamageIndex] = useState<any>(0);
  const [imageIndex, setImageIndex] = useState<any>(0);
  const [imagePopup, setImagePopup] = useState<boolean>(false);
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [imageLength, setImageLength] = useState<any>(
    vehicleInfo.damages[damageIndex]?.files?.length
  );
  const [loading, setLoading] = useState<any>(false);

  let dispatch = useDispatch();

  useEffect(() => {
    setImageLength(vehicleInfo.damages[damageIndex]?.files?.length);
    setImageIndex(0);
  }, [damageIndex]);

  useEffect(() => {
    async function getData2() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getConfigurations`, {
          createdBy: myProfile._id,
        });
        dispatch(setConfigurations(result?.data?.wholeData));
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (myProfile._id) getData2();
  }, [myProfile._id]);
  let exteriorImg = Configurations?.Configurations?.type?.find(
    (item: any) => item.Type === vehicleInfo.type
  )?.exterior;
  let interiorImg = Configurations?.Configurations?.type?.find(
    (item: any) => item.Type === vehicleInfo.type
  )?.interior;

  return (
    <div className="w-full h-full py-4 px-5 flex justify-start items-start gap-1 overflow-auto">
      {vehicleInfo.damages.length > 0 ? (
        <>
          <div className="w-[70px h-[120px] flex flex-col justify-start items-start relative">
            <img
              src={
                vehicleInfo.damages[damageIndex]?.exterior
                  ? exteriorImg
                  : interiorImg
              }
              className="w-[70px h-[120px] bg-white"
            />
            {vehicleInfo.damages.map((item: any, index: any) => (
              <>
                {vehicleInfo.damages[damageIndex]?.exterior ? (
                  item.exterior ? (
                    <div
                      className={`absolute w-[15px] h-[15px] rounded-full ${
                        index === damageIndex
                          ? "bg-main-blue"
                          : "bg-grey-of-text"
                      } text-white text-[8px] flex justify-center items-center font-[600]`}
                      key={index}
                      style={{
                        top: `${item.y}%`,
                        left: `${item.x}%`,
                      }}
                    >
                      {index + 1}
                    </div>
                  ) : null
                ) : !vehicleInfo.damages[damageIndex]?.exterior ? (
                  !item.exterior ? (
                    <div
                      className={`absolute w-[15px] h-[15px] rounded-full ${
                        index === damageIndex
                          ? "bg-main-blue"
                          : "bg-grey-of-text"
                      } text-white text-[8px] flex justify-center items-center font-[600]`}
                      key={index}
                      style={{
                        top: `${item.y}%`,
                        left: `${item.x}%`,
                      }}
                    >
                      {index + 1}
                    </div>
                  ) : null
                ) : null}
              </>
            ))}
          </div>
          <div className="w-[80%]  h-fit flex flex-col justify-start items-start">
            <div className="w-full h-[25px] flex justify-between items-center border-b-[2px">
              <span className="w-[30px] font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Image
              </span>
              <span className="w-[20%] md:w-[25px]  font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                No
              </span>
              <span className="w-[20%] font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Type
              </span>
              <span className="w-[15%] font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Position
              </span>
              <span className="w-[20%] md:w-[100px]  font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Degree
              </span>
              <span className="text-transparent font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none text-end">
                <FaEye />
              </span>
            </div>{" "}
            {vehicleInfo.damages.map((item: any, index: number) => (
              // <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px] cursor-pointer">
              //   <span className="py-2 w-[50px]  font-[400] text-[14px] leading-[27px] text-start">
              //     {index + 1}
              //   </span>
              //   <span className="py-2 w-[40%]  font-[400] text-[14px] leading-[27px] text-start">
              //     {item.damageType}
              //   </span>
              //   <span className="py-2 w-[150px]  font-[400] text-[14px] leading-[27px] text-start">
              //     {item.exterior ? "Exterior" : "Interior"}
              //   </span>
              //   <span className="py-2 flex justify-between items-center w-[100px]  font-[400] text-[14px] leading-[27px] text-start">
              //     {item.degree}
              //     <FaEye
              //       className={
              //         index === damageIndex ? "text-main-blue" : "text-grey"
              //       }
              //     />
              //   </span>
              // </div>
              <div className="w-full h-[30px] mt-1 flex justify-between items-end border-b-[2px]">
                <img
                  className="w-[30px] h-[20px] mb-1 font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none rounded-[5px]"
                  src={item?.files[0]}
                />
                <span className="pb-2 w-[20%] md:w-[25px] font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none">
                  {JSON.stringify(index + 1).padStart(2, "0")}{" "}
                </span>
                <span className="pb-2 w-[20%] font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none">
                  {item?.damageType}
                </span>
                <span className="pb-2 w-[15%] font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none">
                  {item?.exterior ? "Exterior" : "Interior"}
                </span>
                <span className="pb-2 w-[20%] md:w-[100px] font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none">
                  {item?.degree}
                </span>
                <span className="pb-2 font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none text-end hover:scale-[1.3] cursor-pointer">
                  <FaEye />
                </span>
              </div>
            ))}
          </div>

          {/* <div className="w-[250px] h-[100%] flex flex-col justify-start items-start">
            {imagePopup ? (
              <div
                className="w-[100%] h-[100%] flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]"
                onClick={() => {
                  setImagePopup(false);
                }}
              >
                <div className="w-[700px] h-[700px] relative overflow-auto scroll border-2 border-black">
                  <div className="w-[700px] h-[700px] relative overflow-auto scroll border-2 border-black">
                    <img
                      src={
                        vehicleInfo.damages[damageIndex]?.files[imageIndex] ||
                        image404.src
                      }
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
                    className={`cursor-pointer font-[400] text-[30px] p-1 leading-[12px] text-red-500 absolute top-3 right-3 w-fit shadow dark:bg-dark1 bg-white rounded-full`}
                    onClick={() => setImagePopup(false)}
                  >
                    <FaTimes />
                  </span>
                </div>
              </div>
            ) : null}
            <div className="w-[100%] h-[300px] flex justify-center items-center mx-auto">
              <img
                src={
                  vehicleInfo.damages[damageIndex]?.files[imageIndex] ||
                  image404.src
                }
                className={"w-[100%] h-[100%]"}
              />
            </div>
          </div> */}
        </>
      ) : (
        <span className="py- font-[400] text-[14px] leading-[27px]">
          No Damage Added
        </span>
      )}
    </div>
  );
}
