"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setConfigurations } from "@/app/store/Configurations";
import axios from "axios";
import ImageModal from "@/app/Components/functions/ImageModal";

export default function Damages({ toggle }: any) {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();

  useEffect(() => {
    async function getData2() {
      try {
        let result: any = await axios.post(`/api/getConfigurations`, {
          createdBy: myProfile._id,
        });
        dispatch(setConfigurations(result?.data?.wholeData));
      } catch (error: any) {
        console.log(error);
      } finally {
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
    <div className="w-full h-full py-4 px-5 flex justify-between items-start">
      {vehicleInfo.damages.length > 0 ? (
        <>
          <div className="w-[35%] h-full flex flex-col justify-center items-start order-[1px] border-grey">
            <div className="w-[130px] h-[180px] flex flex-col justify-start items-start relative">
              <img
                src={toggle ? exteriorImg : interiorImg}
                className="h-full"
              />
              {vehicleInfo.damages.map((item: any, index: any) => (
                <>
                  {!toggle ? (
                    item.exterior === toggle ? (
                      <div
                        className={`absolute w-[15px] h-[15px] rounded-full ${
                          item.degree === "Low"
                            ? "bg-green-400 "
                            : item.degree === "Medium"
                            ? "bg-yellow-300"
                            : item.degree === "High"
                            ? "bg-orange-500"
                            : item.degree === "Very High"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        } text-black text-[8px] flex justify-center items-center font-[600]`}
                        key={index}
                        style={{
                          top: `${item.y}%`,
                          left: `${item.x}%`,
                        }}
                      >
                        {index + 1}
                      </div>
                    ) : null
                  ) : toggle ? (
                    item.exterior === toggle ? (
                      <div
                        className={`absolute w-[15px] h-[15px] rounded-full ${
                          item.degree === "Low"
                            ? "bg-green-400 "
                            : item.degree === "Medium"
                            ? "bg-yellow-300"
                            : item.degree === "High"
                            ? "bg-orange-500"
                            : item.degree === "Very High"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        } text-black text-[8px] flex justify-center items-center font-[600]`}
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
          </div>
          <div className="w-[64%] h-full flex flex-col justify-start items-start overflow-auto scroll2 overscroll-behavior-block">
            <div className="w-full -6px h-[35px] flex justify-between items-center border-b-[2px] mb-1">
              <span className="w-[15%] text-center font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Image
              </span>
              <span className="w-[7%] text-center font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                No
              </span>
              <span className="w-[35%] text-center font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Damage Type
              </span>
              <span className="w-[20%] text-center font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Degree
              </span>
            </div>{" "}
            <div className="w-[100%] h-full-50px flex flex-col justify-start items-start overflow-auto scroll2">
              {vehicleInfo.damages.map(
                (item: any, index: number) =>
                  item.exterior === toggle && (
                    <div className="w-full h-[35px] flex justify-between items-end border-b-[2px]">
                      <div className="w-[15%] truncate flex justify-center items-center">
                        <ImageModal
                          src={item?.files[0]}
                          classes={
                            "w-[25px] h-[25px] my-1 rounded-[5px] cursor-pointer"
                          }
                        />
                      </div>
                      <span className="pb-2 w-[7%] text-center font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none truncate">
                        {JSON.stringify(index + 1).padStart(2, "0")}{" "}
                      </span>
                      <span className="pb-2 w-[35%] text-center font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none truncate">
                        {item?.damageType}
                      </span>
                      <span className="pb-2 w-[20%] text-center font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none truncate">
                        {item?.degree}
                      </span>
                    </div>
                  )
              )}
            </div>
          </div>
        </>
      ) : (
        <span className="py- font-[400] text-[14px] leading-[27px]">
          No Damage Added
        </span>
      )}
    </div>
  );
}
