"use client";
import d1 from "@/public/dashboard (1).svg";
import d3 from "@/public/dashboard (3).svg";
import d7 from "@/public/dashboard (7).svg";
import d4 from "@/public/ad (1).svg";
import d2 from "@/public/ad (2).svg";
import arrows from "@/public/arrows.svg";
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
import { MdEmail } from "react-icons/md";
import { PaginationComponent } from "@/app/Components/functions/Pagination";
import { GoTriangleDown } from "react-icons/go";

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
  const [page, setPage] = useState(1);
  const { _id } = params;
  const itemsPerPage = 12;
  const [loading, setLoading] = useState<any>(true);
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
    ];

  const [sortedData, setSortedData] = useState<any>(data);
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

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
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
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
          <div className="w-full h-fit flex justify-between items-start">
            <div className="h-fit flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full dark:bg-dark1 bg-white">
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
                <div className="w-full h-fit mt-2">
                  <div className="w-full h-fit overflow-auto rounded-[10px] border-[1px] border-grey relative">
                    <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden mt-0 leading-[17px]">
                      <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
                        <div className="text-start pe-3 flex justify-start gap-3 items-center w-[14%] 1 ps-5 cursor-pointer">
                          Date{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-start pe-3 flex justify-start gap-3 items-center w-[12%] 2 cursor-pointer">
                          No. of Vehicles{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-start pe-3 flex justify-start gap-3 items-center w-[18%] 3 cursor-pointer">
                          Validity Plan{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-start pe-3 flex justify-start gap-3 items-center w-[12%] 4 cursor-pointer">
                          Renewal Date{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-start pe-3 flex justify-start gap-3 items-center w-[14%] 6 cursor-pointer">
                          Discount{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-start pe-3 flex justify-start gap-3 items-center w-[14%] 6 cursor-pointer">
                          Total Amount{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-start pe-3 flex justify-start gap-3 items-center w-[14%] 6 cursor-pointer">
                          Status{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-start flex justify-start items-center w-[10%] pe-5 5">
                          Download
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
