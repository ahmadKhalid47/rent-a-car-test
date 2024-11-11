"use client";
import d1 from "@/public/dashboard (1).svg";
import d3 from "@/public/dashboard (3).svg";
import d7 from "@/public/dashboard (7).svg";
import d4 from "@/public/ad (1).svg";
import d2 from "@/public/ad (2).svg";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams } from "next/navigation";
import image404 from "@/public/image404.png";
import Link from "next/link";
import { setUserInfo } from "@/app/store/UserInfo";
import { TextLoader } from "@/app/Components/Loader";
import Image from "next/image";
import { useFetchData } from "@/app/Components/functions/apiCalling";
import { formatCreatedAtDate } from "@/app/Components/functions/formats";
import General from "@/app/Components/InfoComponents/General";

export default function UserInfoMainPage() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);

  let { UserInfo } = useSelector((state: RootState) => state.UserInfo);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getUserInfo/${_id}`);
        if (result?.data?.data) {
          dispatch(setUserInfo(result?.data?.data));
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [CustomersData, setCustomersData] = useState<any[]>([]);
  const [CustomerLoading, setCustomerLoading] = useState<any>(true);
  const [ChauffeursData, setChauffeursData] = useState<any[]>([]);
  const [ChauffeurLoading, setChauffeurLoading] = useState<any>(true);
  const [reservationLoading, setreservationLoading] = useState<any>(true);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  
  useFetchData({
    apiName: "getSortedLeanData",
    modelName: "vehicle",
    createdBy: UserInfo?._id,
    setData: setVehiclesData,
    setLoading: setvehicleLoading,
  });
  useFetchData({
    apiName: "getSortedLeanData",
    modelName: "customer",
    createdBy: UserInfo?._id,
    setData: setCustomersData,
    setLoading: setCustomerLoading,
  });
  useFetchData({
    apiName: "getSortedLeanData",
    modelName: "chauffeur",
    createdBy: UserInfo?._id,
    setData: setChauffeursData,
    setLoading: setChauffeurLoading,
  });
  useFetchData({
    apiName: "getSortedLeanData",
    modelName: "reservation",
    createdBy: UserInfo?._id,
    setData: setreservationsData,
    setLoading: setreservationLoading,
  });


  const completedReservations = reservationsData.filter(
    (item: any) => item.data.status === "complete"
  );

  const totalAmount = completedReservations.reduce(
    (sum: any, record: any) => sum + Number(record.data.amount),
    0
  );

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="w-full h-[200px">
          <span className="font-[600] text-[25px] leading-[38px] dark:text-white text-black">
            {UserInfo?.name ? UserInfo?.name : "---"}
          </span>
          <div className="flex justify-between items-start">
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Users"} className="hover:underline">
                Users / All Users
              </Link>
              {" / "}
              {UserInfo?.name ? UserInfo?.name : "---"}
            </span>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-5 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative overflow-hidden">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-4 rounded-[10px] py-7 border-[1px] border-grey dark:bg-dark1 bg-white px-10">
            <div className="w-full h-fit flex justify-between items-star rounded-[10px]">
              <div className="w-[36%] flex justify-center items-center">
                <div className="w-[267px] h-[267px] flex justify-between items-start rounded-full overflow-hidden border-[1px] border-grey dark:bg-dark1 bg-white">
                  <img
                    src={UserInfo?.customerImage || image404.src}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="w-[64%] flex justify-start flex-col items-start gap-3">
                <div className="w-full h-fit flex justify-between items-start py-1 border-b-2 border-color">
                  <div className="flex flex-col justify-start items-start h-fit">
                    <span className="w-full font-[600] text-[36px] leading-none dark:text-white text-black  mt-[3px]">
                      {UserInfo?.name}
                      <div className="font-[400] text-[12px] xs:text-[14px] md:text-[12px] leading-none h-fit py-1">
                        Created Date: {formatCreatedAtDate(UserInfo?.createdAt)}
                      </div>{" "}
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-[150px] h-[48px] bg-light-grey border-[1px] border-light-grey rounded-[3px] overflow-hidden text-center text-[14px] xs:text-[16px] md:text-[21px] font-[500] complete-status">
                    Active{" "}
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Username{" "}
                    </span>
                    <span>{UserInfo?.username}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Company
                    </span>
                    <span>{UserInfo?.company || "---"}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Phone
                    </span>
                    <span>{UserInfo?.phone}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Email
                    </span>
                    <span>{UserInfo?.email}</span>
                  </div>
                </div>{" "}
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      State/Province
                    </span>
                    <span>{UserInfo?.state}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">City</span>
                    <span>{UserInfo?.city}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      No. of Vehicles
                    </span>
                    <span>{UserInfo?.noOfVehicles || "---"}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Country
                    </span>
                    <span>{UserInfo?.country}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center bg-yellow-00 -mt-[6px]">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Last Renewal Date
                    </span>
                    <span>21-10-2024</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Validity Plan
                    </span>
                    <span className="w-[60px] h-[27px] flex justify-center items-center border-[1px] border-grey rounded-[3px] bg-light-grey">
                      1 Month
                    </span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center bg-yellow-00 -mt-[6px]">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Renewal Date
                    </span>
                    <span>21-10-2024</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Days to Expire
                    </span>
                    <span className="w-[60px] h-[27px] flex justify-center items-center border-[1px] border-grey rounded-[3px] bg-light-grey">
                      30
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
