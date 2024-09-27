"use client";
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
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      {vehicleInfo.damages.length > 0 ? (
        <>
          <div className="w-[250px] h-[300px] flex flex-col justify-start items-start relative bg-green-300">
            <img
              src={
                vehicleInfo.damages[damageIndex]?.exterior
                  ? exteriorImg
                  : interiorImg
              }
              className="w-[250px] h-[300px] bg-white"
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
          <div className="w-[40%] h-fit flex flex-col justify-start items-start  ">
            <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
              <span className="py-2 w-[50px]  font-[600] text-[18px] leading-[27px] text-start">
                No
              </span>
              <span className="py-2 w-[40%]  font-[600] text-[18px] leading-[27px] text-start">
                Damage Type
              </span>
              <span className="py-2 w-[150px]  font-[600] text-[18px] leading-[27px] text-start">
                Position
              </span>
              <span className="py-2 w-[100px]  font-[600] text-[18px] leading-[27px] text-start">
                Degree
              </span>
            </div>
            {vehicleInfo.damages.map((item: any, index: number) => (
              <div
                className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px] cursor-pointer"
                onClick={() => {
                  setdamageIndex(index);
                }}
              >
                <span className="py-2 w-[50px]  font-[400] text-[18px] leading-[27px] text-start">
                  {index + 1}
                </span>
                <span className="py-2 w-[40%]  font-[400] text-[18px] leading-[27px] text-start">
                  {item.damageType}
                </span>
                <span className="py-2 w-[150px]  font-[400] text-[18px] leading-[27px] text-start">
                  {item.exterior ? "Exterior" : "Interior"}
                </span>
                <span className="py-2 flex justify-between items-center w-[100px]  font-[400] text-[18px] leading-[27px] text-start">
                  {item.degree}
                  <FaEye
                    className={
                      index === damageIndex ? "text-main-blue" : "text-grey"
                    }
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="w-[250px] h-[100%] flex flex-col justify-start items-start">
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
                onClick={() => {
                  setImagePopup(true);
                }}
              />
            </div>

            <div className="w-full h-[30px] mx-auto mt-4 text-[20px] flex justify-between items-center">
              <FaChevronLeft
                onClick={() =>
                  setImageIndex(imageIndex > 0 ? imageIndex - 1 : imageIndex)
                }
                className={`${
                  imageIndex > 0 ? "" : "text-grey"
                } cursor-pointer`}
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
        </>
      ) : (
        <span className="py-2 font-[400] text-[18px] leading-[27px]">
          No Damage Added
        </span>
      )}
    </div>
  );
}
