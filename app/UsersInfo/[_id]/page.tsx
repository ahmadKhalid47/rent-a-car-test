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
  useEffect(() => {
    async function getData() {
      try {
        setvehicleLoading(true);
        const result = await axios.post("/api/getSortedLeanData", {
          createdBy: UserInfo?._id,
          modelName: "vehicle",
        });

        setVehiclesData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setvehicleLoading(false);
      }
    }
    if (UserInfo?._id) getData();
  }, [UserInfo?._id]);

  const [CustomersData, setCustomersData] = useState<any[]>([]);
  const [CustomerLoading, setCustomerLoading] = useState<any>(true);
  useEffect(() => {
    async function getData() {
      try {
        setCustomerLoading(true);
        const result = await axios.post("/api/getSortedLeanData", {
          createdBy: UserInfo?._id,
          modelName: "customer",
        });
        setCustomersData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setCustomerLoading(false);
      }
    }
    if (UserInfo?._id) getData();
  }, [UserInfo?._id]);

  const [ChauffeursData, setChauffeursData] = useState<any[]>([]);
  const [ChauffeurLoading, setChauffeurLoading] = useState<any>(true);
  useEffect(() => {
    async function getData() {
      try {
        setChauffeurLoading(true);
        const result = await axios.post("/api/getSortedLeanData", {
          createdBy: UserInfo._id,
          modelName: "chauffeur",
        });
        setChauffeursData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setChauffeurLoading(false);
      }
    }
    if (UserInfo?._id) getData();
  }, [UserInfo?._id]);

  const [reservationLoading, setreservationLoading] = useState<any>(true);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        setreservationLoading(true);
        const result = await axios.post("/api/getSortedLeanData", {
          createdBy: UserInfo?._id,
          modelName: "reservation",
        });

        setreservationsData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setreservationLoading(false);
      }
    }
    if (UserInfo?._id) getData();
  }, [global.vehicleDataReloader, UserInfo?._id]);

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
        <div className="w-full h-[200px  px-6">
          <span className="font-[600] text-[25px] leading-[38px] dark:text-white text-black capitalize">
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
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] mt-5 relative">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px]">
            <div className="w-full h-fit flex justify-start gap-[7%] items-center dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey py-7 px-6">
              {/* _______ */}
              <div className="w-full flex justify-between items-center px-6 py-[20px]">
                <div className="">
                  <div className="w-[155px] h-[155px] rounded-2xl ">
                    <img
                      alt=""
                      src={
                        UserInfo?.profilePic[0]?.includes("http")
                          ? UserInfo?.profilePic[0]
                          : image404.src
                      }
                      style={{ width: "100%", height: "100%" }}
                      className="rounded-[10px]"
                    />
                  </div>
                </div>
                <div className="w-[80%] flex justify-between items-center">
                  <div className="w-[47%]">
                    <div className="w-full flex justify-between">
                      <div className="font-[400] text-[18px]">Full Name:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.name}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>

                    <div className="w-full flex justify-between">
                      <div className="font-[400] text-[18px]">Company:</div>

                      <div className="font-[400] text-[18px]">
                        {UserInfo?.company}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>
                    <div className="w-full flex justify-between">
                      <div className="font-[400] text-[18px]">City:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.city}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>
                    <div className="w-full flex justify-between">
                      <div className="font-[400] text-[18px]">Phone:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.phone}
                      </div>
                    </div>
                  </div>
                  <div className="w-[47%]">
                    <div className="w-full flex justify-between">
                      <div className="font-[400] text-[18px]">Username:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.username}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>

                    <div className="w-full flex justify-between">
                      <div className="font-[400] text-[18px]">Country:</div>

                      <div className="font-[400] text-[18px]">
                        {UserInfo?.country}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>
                    <div className="w-full flex justify-between">
                      <div className="font-[400] text-[18px]">Email:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.email}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>
                    <div className="w-full flex justify-between">
                      <div className="font-[400] text-[18px]">
                        Plan Validity:
                      </div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.plan}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit dark:bg-dark1 bg-white  border-2 border-grey mt-5 rounded-[10px] py-10 px-12">
              <div className="w-full h-fit flex flex-wrap justify-start items-start gap-8 overflow-auto scroll">
                <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                  <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                    <Image alt="" width={40} height={40} src={d7.src} />
                  </div>
                  <div>
                    <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                      {!vehicleLoading ? VehiclesData?.length : <TextLoader />}
                    </div>
                    <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                      Total Vehicles{" "}
                    </div>
                  </div>
                </div>
                <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                  <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                    <Image alt="" width={40} height={40} src={d3.src} />
                  </div>
                  <div>
                    <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                      {!reservationLoading ? (
                        reservationsData?.length
                      ) : (
                        <TextLoader />
                      )}
                    </div>
                    <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                      Total Reservations{" "}
                    </div>
                  </div>
                </div>
                <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                  <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                    <Image alt="" width={40} height={40} src={d4.src} />
                  </div>
                  <div>
                    <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                      {!CustomerLoading ? (
                        CustomersData?.length
                      ) : (
                        <TextLoader />
                      )}
                    </div>
                    <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                      Total Customers{" "}
                    </div>
                  </div>
                </div>
                <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                  <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                    <Image alt="" width={40} height={40} src={d2.src} />
                  </div>
                  <div>
                    <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                      {!ChauffeurLoading ? (
                        ChauffeursData?.length
                      ) : (
                        <TextLoader />
                      )}
                    </div>
                    <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                      Total Chauffeurs{" "}
                    </div>
                  </div>
                </div>
                <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                  <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                    <Image alt="" width={40} height={40} src={d1.src} />
                  </div>
                  <div>
                    <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                      {!reservationLoading ? (
                        `${global.currentCurrency} ` +
                        totalAmount.toLocaleString("en-US")
                      ) : (
                        <TextLoader />
                      )}
                    </div>
                    <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                      Total Revenue
                    </div>
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
