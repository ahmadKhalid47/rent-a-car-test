"use client";
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

export default function CarInfoMainPage() {
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  let [activeButton, setActiveButton] = useState("General");
  let global = useSelector((state: RootState) => state.Global);
  const [showError, setShowError] = useState(null);
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  const [imageIndex, setImageIndex] = useState<any>(
    vehicleInfo?.thumbnailImage
  );
  let dispatch = useDispatch();
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
        let result: any = await axios.get(`/api/getVehicleInfo/${_id}`);
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
              <h3 className="font-[600] text-[25px] leading-[38px] text-black">
                {vehicleInfo.make} {vehicleInfo.model}
              </h3>
              <div className="flex justify-between items-start">
                <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
                  Vehicles / All Vehicles / {vehicleInfo.make}{" "}
                  {vehicleInfo.model}
                </p>
              </div>
            </div>
            <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative overflow-hidden">
              <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px] bg-">
                <div className="w-full h-fit flex justify-start gap-[5%] items-center px- bg-white rounded-[10px] border-2 border-grey py-7 px-6 ">
                  <div className="w-fit flex justify-start items-center gap-1">
                    <div className="h-[464px] fex justify-start flex-col items-center gap-[8px] overflow-y-auto overflow-x-hidden scroll">
                      {vehicleInfo?.carImages?.map(
                        (item: string, index: number) => (
                          <>
                            {index !== imageIndex ? (
                              <div
                                className="w-[110px] h-[110px] mb-[8px] flex justify-center overflow-hidden items-center bg-white rounded-[10px] border-2 border-grey"
                                onClick={() => {
                                  setImageIndex(index);
                                }}
                                key={index}
                              >
                                <img src={item} className="w-full h-full" />
                              </div>
                            ) : null}
                          </>
                        )
                      )}
                    </div>
                    <div className="w-[464px] h-[464px] flex justify-between items-start rounded-[10px] overflow-hidden border-[1px] border-grey bg-white ms-1">
                      <img
                        src={vehicleInfo.carImages[imageIndex]}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="w-[35%] flex justify-start flex-col items-start gap-1 bg-green-">
                    <h3 className="font-[600] text-[36px] leading-[54px] text-black">
                      {vehicleInfo.make} {vehicleInfo.model}
                    </h3>
                    <p className="font-[400] text-[28px] leading-[42px] text-black">
                      {vehicleInfo.registration}
                    </p>
                    <div className="w-[80%] flex justify-between items-center">
                      <div className="flex justify-start items-center gap-2 w-[50%] pe-5">
                        <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                          Year:
                        </p>
                        <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                          {vehicleInfo.year}
                        </p>
                      </div>
                      <div className="flex justify-start items-center gap-2 w-[50%]">
                        <p className="font-[400] text-[20px] leading-[30px] w-[35%]">
                          Type:
                        </p>
                        <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                          {vehicleInfo.type}
                        </p>
                      </div>
                    </div>
                    <div className="w-[80%] flex justify-between items-center">
                      <div className="flex justify-start items-start h-fit gap-2 w-[50%] pe-5">
                        <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                          Color:
                        </p>
                        <div className="font-[400] text-[20px] leading-[30px] w-[50%] mt-2">
                          <div
                            className="w-[32px] h-[18px] rounded-[5px]"
                            style={{
                              backgroundColor: vehicleInfo.color,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-start items-center gap-2 w-[50%]">
                        <p className="font-[400] text-[20px] leading-[30px] w-[35%]">
                          City:
                        </p>
                        <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                          {vehicleInfo.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-fit bg-white  border-2 border-grey mt-5 rounded-[10px] px-5 py-1">
                  <div className="w-full h-fit flex justify-between items-center mt-3 border-b-2 border-grey pb-3">
                    <div
                      className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                        activeButton === "General"
                          ? "text-white bg-main-blue font-[500]"
                          : " text-black "
                      } font-[400] text-[18px] leading-[22px]`}
                      onClick={() => setActiveButton("General")}
                    >
                      General Info
                    </div>
                    <div
                      className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                        activeButton === "Rental"
                          ? "text-white bg-main-blue font-[500]"
                          : " text-black "
                      } font-[400] text-[18px] leading-[22px]`}
                      onClick={() => setActiveButton("Rental")}
                    >
                      Rental Info
                    </div>
                    <div
                      className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                        activeButton === "Insurance"
                          ? "text-white bg-main-blue font-[500]"
                          : " text-black "
                      } font-[400] text-[18px] leading-[22px]`}
                      onClick={() => setActiveButton("Insurance")}
                    >
                      Insurance Info
                    </div>
                    <div
                      className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                        activeButton === "Additional"
                          ? "text-white bg-main-blue font-[500]"
                          : " text-black "
                      } font-[400] text-[18px] leading-[22px]`}
                      onClick={() => setActiveButton("Additional")}
                    >
                      Features
                    </div>
                    <div
                      className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                        activeButton === "Damages"
                          ? "text-white bg-main-blue font-[500]"
                          : " text-black "
                      } font-[400] text-[18px] leading-[22px]`}
                      onClick={() => setActiveButton("Damages")}
                    >
                      Damages
                    </div>
                    <div
                      className={`w-[16%] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                        activeButton === "Others"
                          ? "text-white bg-main-blue font-[500]"
                          : " text-black "
                      } font-[400] text-[18px] leading-[22px]`}
                      onClick={() => setActiveButton("Others")}
                    >
                      Others
                    </div>
                  </div>
                  <div className="w-full h-[380px] flex justify-center items-start gap-8">
                    {activeButton === "General" ? (
                      <>
                        <General />
                      </>
                    ) : activeButton === "Rental" ? (
                      <>
                        <Rental />
                      </>
                    ) : activeButton === "Insurance" ? (
                      <>
                        <Insurance />
                      </>
                    ) : activeButton === "Damages" ? (
                      <>
                        <Damages />
                      </>
                    ) : activeButton === "Additional" ? (
                      <>
                        <Additional />
                      </>
                    ) : activeButton === "Others" ? (
                      <>
                        <Other />
                      </>
                    ) : null}
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
