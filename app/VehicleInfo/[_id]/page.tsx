"use client";
import React, { useRef } from "react";
import General from "./General";
import Rental from "./Rental";
import Insurance from "./Insurance";
import Additional from "./Additional";
import Other from "./Other";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import Damages from "./Damages";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams } from "next/navigation";
import { setVehicleInfo } from "@/app/store/vehicleInfo";
import image404 from "@/public/image404.png";
import Link from "next/link";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ListViewreservation from "@/app/Reservations/ListViewReservations";
import { MediumLoader } from "@/app/Components/Loader";
import ListViewRecentReservations from "./ListViewRecentReservations";

export default function CarInfoMainPage() {
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  let [activeButton, setActiveButton] = useState("General");
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let global = useSelector((state: RootState) => state.Global);
  const [showError, setShowError] = useState(null);
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const [imageIndex, setImageIndex] = useState<any>(
    vehicleInfo?.thumbnailImage
  );
  let dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useEffect(() => {
    setImageIndex(vehicleInfo?.thumbnailImage);
  }, [vehicleInfo?.thumbnailImage, vehicleInfo]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getVehicleInfo/${_id}`);
        if (result?.data?.data) {
          dispatch(setVehicleInfo(result?.data?.data?.data));
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await axios.post("/api/getReservationsOfVehicle", {
          createdBy: myProfile._id,
          vehicle_id: _id,
        });

        if (result?.data?.data) {
          setreservationsData(result.data.data);
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (myProfile._id) getData();
  }, [global.vehicleDataReloader, myProfile._id]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -100, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 100, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {!vehicleInfo ? null : (
        <div className="w-fit h-fit mt-[90px] pt-5">
          <div
            className={`${
              global.sidebarShow ? "nav-width" : "nav-closed-width"
            } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
          >
            <div className="w-full h-[200px ">
              <span className="font-[600] text-[25px] leading-[38px] dark:text-white text-black ">
                {vehicleInfo?.make} {vehicleInfo?.model}
              </span>
              <div className="flex justify-between items-start">
                <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-5 md:leading-[21px]">
                  <Link href={"/Vehicles"} className="hover:underline">
                    Vehicles / All Vehicles
                  </Link>
                  {" / "}
                  {vehicleInfo?.make} {vehicleInfo?.model}
                </span>
              </div>
            </div>
            <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-5 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative overflow-hidden">
              <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-4 rounded-[10px] py-7 border-[1px] border-grey dark:bg-dark1 px-10">
                <div className="w-full h-fit flex justify-between items-star rounded-[10px]">
                  <div className="w-[41%] select-none flex flex-col justify-start items-start gap-1">
                    <div className="w-[100%] h-[300px] flex justify-between items-start rounded-[10px] overflow-hidden border-[1px] border-grey dark:bg-dark1 bg-white ms-1">
                      <img
                        src={vehicleInfo?.carImages[imageIndex] || image404.src}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="w-[100%] h-[70px] relative flex justify-center">
                      <div
                        className="w-full-70px h-[70px] flex justify-start items-center gap-[8px] overflow-x-auto whitespace-nowrap scroll"
                        ref={containerRef}
                      >
                        <div className="w-[30px] h-full absolute left-0 top-0 flex items-center justify-center">
                          <FaChevronLeft
                            className="cursor-pointer w-[28px] h-[28px] p-[8px] border-[1px] border-grey bg-light-grey text-black rounded-full flex justify-center items-center"
                            onClick={scrollLeft}
                          />
                        </div>
                        <div className="flex justify-start items-center gap-[8px]">
                          {vehicleInfo?.carImages.map(
                            (item: string, index: number) =>
                              index !== imageIndex && (
                                <div
                                  className="w-[67px] h-[67px] cursor-pointer flex justify-center overflow-hidden items-center dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey"
                                  onClick={() => setImageIndex(index)}
                                  key={index}
                                >
                                  <img
                                    src={item}
                                    className="w-[67px] h-[67px]"
                                  />
                                </div>
                              )
                          )}
                        </div>
                        <div className="w-[30px] h-full absolute right-0 top-0 flex items-center justify-center">
                          <FaChevronRight
                            className="cursor-pointer w-[28px] h-[28px] p-[8px] border-[1px] border-grey bg-light-grey text-black rounded-full flex justify-center items-center"
                            onClick={scrollRight}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50%] flex justify-start flex-col items-start gap-3">
                    <span className="complete-status border-[1px] px-3 rounded-[5px]">
                      active
                    </span>
                    <div className="w-full h-fit flex justify-between items-start py-1 border-b-2 border-color">
                      <span className="w-full font-[600] text-[36px] leading-none dark:text-white text-black  mt-[3px]">
                        {vehicleInfo?.make}
                        {vehicleInfo?.model}
                      </span>
                      <div className="flex flex-col justify-start items-start w-[160px] h-fit">
                        <div className="flex justify-start items-center w-[160px] h-[35px] bg-[#F6F6F6] border-[1px] border-black rounded-[5px] overflow-hidden">
                          <div className="w-[35px] h-[35px] bg-[#054B86]"></div>
                          <span className="font-[600] flex justify-center items-center text-center text-[14px] xs:text-[16px] md:text-[20px] text-black w-[100%]">
                            {vehicleInfo?.registration}
                          </span>
                        </div>
                        <div className="font-[400] text-[12px] xs:text-[14px] md:text-[12px] leading-none h-fit py-1">
                          VIN: {vehicleInfo?.vinNo}
                        </div>
                      </div>
                    </div>

                    <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Making Year
                        </span>
                        <span className="">{vehicleInfo?.year}</span>
                      </div>
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          No. Of Seats
                        </span>
                        <span className="">{vehicleInfo?.passengers}</span>
                      </div>
                    </div>
                    <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Transmission
                        </span>
                        <span className="">
                          {vehicleInfo?.transmission?.split(" ")[0]}
                        </span>
                      </div>
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Engine Volume
                        </span>
                        <span className="">{vehicleInfo?.engineVolume}</span>
                      </div>
                    </div>
                    <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Color
                        </span>
                        <div className="flex justify-start items-center gap-2 capitalize">
                          <div
                            className="w-[32px] h-[18px] rounded-[5px] "
                            style={{
                              backgroundColor: vehicleInfo?.color,
                            }}
                          ></div>
                          {/* {vehicleInfo?.colorName} */}
                        </div>
                      </div>
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Fuel Type
                        </span>
                        <span className="">{vehicleInfo?.fuelType}</span>
                      </div>
                    </div>
                    <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Odometer
                        </span>
                        <span className="w-[78px] h-[19px] bg-gradient-to-b from-white to-[rgb(229,230,231)] border-[1px] border-[rgb(128,130,133)] text-black flex justify-center items-center">
                          {vehicleInfo?.odometer
                            ?.padStart(6, "0")
                            .split("")
                            .map((item: any, index: any) => (
                              <>
                                <span className="border-[rgb(147,149,152)] text-center flex justify-center items-center w-[13px]">
                                  {item}
                                </span>
                                {index !== 5 && (
                                  <div className="h-[19px] w-[1px] bg-[rgb(147,149,152)] rounded-[100%] "></div>
                                )}
                              </>
                            ))}
                        </span>
                      </div>
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Fuel Capacity
                        </span>
                        <span className="">{vehicleInfo?.fuelCapacity}</span>
                      </div>
                    </div>
                    <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          City
                        </span>
                        <span className="">{vehicleInfo?.city}</span>
                      </div>
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Country
                        </span>
                        <span className="">{vehicleInfo?.country}</span>
                      </div>
                    </div>
                    <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Body Type
                        </span>
                        <span className="">{vehicleInfo?.type}</span>
                      </div>
                      <div className="w-[45%] flex justify-between items-center">
                        <span className="dark:text-white text-[#555555]">
                          Category Type
                        </span>
                        <span className="">{vehicleInfo?.Category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-fit dark:bg-dark1 mt-5 flex justify-between items-center">
                  <div className="w-[48%] h-fit flex flex-col items-start gap-2">
                    <span className="font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black ">
                      Additional Information
                    </span>
                    <div className="w-[100%]  bg-green-00 rounded-[10px] border-2 border-grey h-[340px] 47px flex flex-col justify-start items-start gap-8 overflow-hidden scroll">
                      <General />
                    </div>
                  </div>
                  <div className="w-[48%] h-fit flex flex-col items-start gap-2">
                    <span className="font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black ">
                      Maintenance
                    </span>
                    <div className="w-[100%] rounded-[10px] border-2 border-grey h-[340px] flex flex-col justify-center items-start gap-8 overflow-auto scroll"></div>
                  </div>
                </div>
                <div className="w-full h-fit dark:bg-dark1 mt-5 flex justify-between items-center">
                  <div className="w-[100%] h-fit flex flex-col items-start gap-2">
                    <span className="font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black ">
                      Damages
                    </span>
                    <div className="w-[100%]  bg-green-00 rounded-[10px] border-2 border-grey h-[340px] 47px flex flex-col justify-start items-start gap-8 overflow-hidden scroll">
                      <Damages />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-4 rounded-[10px] py-7 border-[1px] border-grey dark:bg-dark1 px-10">
                <div className="w-full h-fit dark:bg-dark1 flex justify-between items-center">
                  <div className="w-[100%] h-fit flex flex-col items-start gap-2">
                    <span className="font-[600] text-[15px] xs:text-[24px] leading-[24px] pb-2 dark:text-white text-black ">
                      Recent Reservations
                    </span>
                    <div className="w-[100%]">
                      {loading ? (
                        <MediumLoader />
                      ) : (
                        <ListViewRecentReservations data={reservationsData} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-4 rounded-[10px] py-7 border-[1px] border-grey dark:bg-dark1 px-10">
                <div className="w-full h-fit dark:bg-dark1 flex justify-between items-center">
                  <div className="w-[100%] h-fit flex flex-col items-start gap-2">
                    <span className="font-[600] text-[15px] xs:text-[24px] leading-[24px] pb-2 dark:text-white text-black ">
                      Maintenance{" "}
                    </span>
                    <div className="w-[100%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
