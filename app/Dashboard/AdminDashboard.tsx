"use client";
import React from "react";
import arrows from "@/public/arrows.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useEffect, useState } from "react";
import d1 from "@/public/admin dashboard (1).svg";
import d2 from "@/public/admin dashboard (2).svg";
import d3 from "@/public/admin dashboard (3).svg";
import d4 from "@/public/admin dashboard (4).svg";
import d5 from "@/public/admin dashboard (5).svg";
import axios from "axios";
import { TextLoader } from "../Components/Loader";
import { MdEmail } from "react-icons/md";
import { FaEllipsisH } from "react-icons/fa";
import { PaginationComponent } from "../Components/functions/Pagination";
import { sort } from "../Components/functions/sortFunction";
import Image from "next/image";
import { useFetchData } from "../Components/functions/apiCalling";
import RevenueChart from "../Components/functions/Graphs";
import { GoTriangleDown } from "react-icons/go";
import Link from "next/link";

export default function AdminDashboard() {
  const data: any = [
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Basic",
        expiryDate: "dd/mm/yyyy",
        daysRemaining: "10 Days",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Basic",
        expiryDate: "dd/mm/yyyy",
        daysRemaining: "10 Days",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Basic",
        expiryDate: "dd/mm/yyyy",
        daysRemaining: "10 Days",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Basic",
        expiryDate: "dd/mm/yyyy",
        daysRemaining: "10 Days",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Basic",
        expiryDate: "dd/mm/yyyy",
        daysRemaining: "10 Days",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Basic",
        expiryDate: "dd/mm/yyyy",
        daysRemaining: "10 Days",
      },
    },
  ];
  const global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  const dispatch = useDispatch();
  const [sortedData, setSortedData] = useState<any>(data);
  const [sortOrder, setSortOrder] = useState<{
    [key: string]: "asc" | "desc";
  }>({});
  useEffect(() => {
    setSortedData(data);
  }, []);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const itemsPerPage = 12;
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [reservationLoading, setreservationLoading] = useState<any>(true);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useFetchData({
    apiName: "getSortedLeanData",
    modelName: "vehicle",
    createdBy: myProfile._id,
    setData: setVehiclesData,
    setLoading: setvehicleLoading,
  });

  const rentOutVehicles = VehiclesData.filter(
    (item: any) => item.rentOut === true
  );

  useEffect(() => {
    async function getData() {
      try {
        setreservationLoading(true);
        const result = await axios.post("/api/getUser", {
          createdBy: myProfile._id,
        });
        setreservationsData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setreservationLoading(false);
      }
    }
    if (myProfile._id) getData();
  }, [global.vehicleDataReloader, myProfile._id]);

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const Box = ({ img, loading, value, label }: any) => {
    return (
      <div className="w-[345px] h-[108px] flex justify-between items-center gap-x-[5%] gap-y-[5%] ps-4 pe-5 rounded-[10px] border-[1px] border-grey box-gradient relative">
        <div className="">
          <div className="font-[400] text-[15px] sm:text-[20px] leading-[18px] sm:leading-[27px]">
            {label}
          </div>
          <div className="font-[400] text-[15px] sm:text-[30px] leading-[18px] sm:leading-[39px] h-[39px]">
            {!loading ? value : <TextLoader />}
          </div>
        </div>
        <div className="w-[65px] h-[65px] rounded-[10px] flex justify-center items-center">
          <Image src={img.src} alt="" width={50} height={50} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="h-[44px] w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-center">
          <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
            Hello!👋 Super Admin.
          </span>
        </div>
        <div className="w-full h-fit flex flex-col justify-start items-start gap-5">
          <div className="w-[100%] flex justify-start items-start flex-col">
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 relative">
              <Box
                img={d5}
                loading={reservationLoading}
                value={0}
                label="Total Users"
              />
              <Box
                img={d4}
                loading={reservationLoading}
                value={0}
                label="Active Users"
              />
              <Box
                img={d3}
                loading={reservationLoading}
                value={0}
                label="Inactive Users"
              />
              <Box
                img={d2}
                loading={reservationLoading}
                value={0}
                label="Monthly Revenue"
              />
              <Box
                img={d1}
                loading={reservationLoading}
                value={0}
                label="Total Revenue"
              />
            </div>
          </div>
          <div className="w-[100%] flex justify-start items-start flex-col border-[1px] border-light-grey rounded-[16px]">
            <div className="w-[100%] flex justify-between items-center pt-6 px-5 -mb-4">
              <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[20px] leading-none dark:text-white text-black">
                Revenue Summary
              </span>
              <div className="w-[100%] sm:w-[200px] h-fit flex flex-col justify-start items-start gap-1 dark:text-white text-black me-7">
                <div className="w-full h-fit flex justify-between items-center relative">
                  <select className="pe-6 font-[400] text-[14px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 bg-white rounded-xl border-[1px] border-grey">
                    <option value="">Jan 2024 - Jun 2024</option>
                    <option value="">July 2024 - Dec 2024</option>
                  </select>
                  <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <GoTriangleDown className="text-[18px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex justify-start flex-wrap items-start relative">
              <RevenueChart />
            </div>
          </div>
          <div className="w-full h-fit flex justify-between items-start">
            <div className="h-fit flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full dark:bg-dark1 bg-white">
              <div className="w-full flex flex-col justify-start items-start h-fit">
                <div className="w-full flex justify-between items-end h-fit">
                  <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[20px] leading-none dark:text-white text-black">
                    Renewals Due Soon{" "}
                  </span>
                  <Link
                    href="#"
                    className="w-fit text-[14px] font-[400] leading-[12px] hover:underline"
                  >
                    View More
                  </Link>
                </div>
                <div className="w-full h-fit mt-2">
                  <div className="w-full h-fit overflow-auto rounded-[10px] border-[1px] border-grey relative">
                    <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden mt-0 leading-[17px]">
                      <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
                        <div
                          className="text-start pe-3 flex justify-start gap-3 items-center w-[14%] 1 ps-5 cursor-pointer"
                          onClick={() =>
                            sort(
                              "make",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Name{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-start gap-3 items-center w-[12%] 2 cursor-pointer"
                          onClick={() =>
                            sort(
                              "registration",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Username{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-start gap-3 items-center w-[18%] 3 cursor-pointer"
                          onClick={() =>
                            sort(
                              "year",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Email{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-start gap-3 items-center w-[12%] 4 cursor-pointer"
                          onClick={() =>
                            sort(
                              "type",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Plan Type{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-start gap-3 items-center w-[14%] 6 cursor-pointer"
                          onClick={() =>
                            sort(
                              "color",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Renewal Date{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-start gap-3 items-center w-[14%] 6 cursor-pointer"
                          onClick={() =>
                            sort(
                              "color",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Days Remaining{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-start flex justify-start items-center w-[10%] pe-5 5">
                          Actions{" "}
                        </div>
                      </div>
                      {paginatedData?.length < 1 ? (
                        <span className="p-3">No Vehicles found.</span>
                      ) : (
                        paginatedData.map((item: any, index: number) => (
                          <div key={index} className="w-full">
                            <div
                              className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize dark:bg-dark1 bg-white border-b-2 border-grey`}
                            >
                              <div className="text-start pe-3 break-words w-[14%] 1 ps-5">
                                {item?.data?.name}
                              </div>
                              <div className="text-start pe-3 break-words w-[12%] 2">
                                {item?.data?.username}
                              </div>
                              <div className="text-start pe-3 break-words w-[18%] 3">
                                {item?.data?.email}
                              </div>
                              <div className="text-start pe-3 break-words w-[12%] 4">
                                {item?.data?.companyDate}
                              </div>
                              <div className="text-start pe-3 break-words w-[14%] 6">
                                {item?.data?.expiryDate}
                              </div>
                              <div className="text-start pe-3 break-words w-[14%] 6">
                                {item?.data?.daysRemaining}
                              </div>
                              <div
                                className="flex justify-start items-center w-[10%] pe-5 5 h-full gap-1"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                }}
                              >
                                <span className="bg-main-blue text-white px-2 py-[2px] text-[12px] rounded-[5px]">
                                  Renew
                                </span>
                                <MdEmail className="text-main-dark-blue hover:scale-[1.3] cursor-pointer text-[18px]" />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <PaginationComponent
                    totalPages={totalPages}
                    page={page}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
