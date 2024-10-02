"use client";
import React from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import arrows from "@/public/arrows.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useEffect, useState } from "react";
import d1 from "@/public/ad (1).svg";
import d2 from "@/public/ad (2).svg";
import d3 from "@/public/ad (3).svg";
import axios from "axios";
import { TextLoader } from "../Components/Loader";
import Link from "next/link";
import { handleExport } from "../Components/functions/exportFunction";
import { Pagination, Stack } from "@mui/material";
import { FaEllipsisH } from "react-icons/fa";

export default function AdminDashboard() {
  const data: any = [
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
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
  // }, [data]);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const itemsPerPage = 12;
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [reservationLoading, setreservationLoading] = useState<any>(true);
  const [configurationsLoading, setConfigurationsLoading] = useState<any>(true);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const [Configurations, setConfigurationsData] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  useEffect(() => {
    async function getData() {
      try {
        setvehicleLoading(true);
        const result = await axios.post("/api/getVehicle", {
          createdBy: myProfile._id,
        });
        setVehiclesData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setvehicleLoading(false);
      }
    }
    if (myProfile._id) getData();
  }, [myProfile._id]);
  const activeVehicles = VehiclesData.filter(
    (item: any) => item.rentOut === false && item.active === true
  );
  const rentOutVehicles = VehiclesData.filter(
    (item: any) => item.rentOut === true
  );

  useEffect(() => {
    async function getData() {
      try {
        setreservationLoading(true);
        const result = await axios.post("/api/getreservation", {
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
  const completedReservations = reservationsData.filter(
    (item: any) => item.data.status === "complete"
  );

  const currentDate = new Date().toISOString().split("T")[0]; // Formats date as YYYY-MM-DD
  const completedReservationsToday = completedReservations.filter(
    (item: any) => item.data.completeDate === currentDate
  );
  const reservationsMadeToday = reservationsData.filter(
    (item: any) => item.data.reservationDate === currentDate
  );
  const totalAmount = completedReservations.reduce(
    (sum, record) => sum + Number(record.data.amount),
    0
  );
  const totalAmountToday = completedReservationsToday.reduce(
    (sum, record) => sum + Number(record.data.amount),
    0
  );

  useEffect(() => {
    async function getData2() {
      try {
        setConfigurationsLoading(true);
        let result: any = await axios.post(`/api/getConfigurations`, {
          createdBy: myProfile._id,
        });
        setConfigurationsData(result?.data?.wholeData);
      } catch (error: any) {
        console.log(error);
      } finally {
        setConfigurationsLoading(false);
      }
    }
    if (myProfile._id) getData2();
  }, [myProfile._id]);

  // Slice the data for the current page
  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // General sorting function
  const sort = (key: string) => {
    const newSortOrder =
      currentSortKey === key
        ? sortOrder[key] === "asc"
          ? "desc"
          : "asc" // Toggle sort order for the same key
        : "asc"; // Default to "asc" for a new key

    const sorted = [...sortedData].sort((a: any, b: any) => {
      let fieldA =
        key === "vehicleId" ? JSON.parse(a?.data?.[key]) : a?.data?.[key];
      let fieldB = b?.data?.[key];

      if (typeof fieldA === "string") {
        fieldA = fieldA.toLowerCase();
      }
      if (typeof fieldB === "string") {
        fieldB = fieldB.toLowerCase();
      }

      if (newSortOrder === "asc") {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

    setSortedData(sorted);
    setSortOrder((prev) => ({ ...prev, [key]: newSortOrder }));
    setCurrentSortKey(key);
  };
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  function PaginationRounded() {
    return (
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          shape="rounded"
          page={page}
          onChange={handleChange}
          sx={{
            "& .MuiPaginationItem-root": {
              "&.Mui-selected": {
                backgroundColor: "#0094DA",
                color: "white",
                "&:hover": {
                  opacity: 0.8,
                },
              },
            },
            "& .MuiPaginationItem-previousNext": {
              color: "#878787",
              "&:hover": {
                opacity: 0.8,
              },
            },
          }}
        />
      </Stack>
    );
  }
  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            Admin Dashboard
          </h3>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          <div className="w-[100%] flex justify-start items-start flex-col">
            <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
              Users Details
            </h3>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative">
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d1.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? VehiclesData.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Total Users{" "}
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d2.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? activeVehicles.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Active Users
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <img src={d3.src} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? rentOutVehicles.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Expired Users{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex justify-between items-start">
            <div className="h-fit flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-6 py-6">
              <div className="w-full flex flex-col justify-start items-start h-fit">
                <h1 className="font-[400] text-[18px] xs:text-[24px] leading-2 xs:leading-[20px]">
                  Near To Expire{" "}
                </h1>
                <div className="w-full h-fit mt-2">
                  <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey relative">
                    <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden mt-0 leading-[17px]">
                      <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[16%] 1 ps-5 cursor-pointer"
                          onClick={() => sort("make")}
                        >
                          Name <img src={arrows.src} />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[16%] 2 cursor-pointer"
                          onClick={() => sort("registration")}
                        >
                          Username <img src={arrows.src} />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[20%] 3 cursor-pointer"
                          onClick={() => sort("year")}
                        >
                          Email <img src={arrows.src} />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[18%] 4 cursor-pointer"
                          onClick={() => sort("type")}
                        >
                          Company <img src={arrows.src} />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[16%] 6 cursor-pointer"
                          onClick={() => sort("color")}
                        >
                          Expiry Date <img src={arrows.src} />
                        </div>
                        <div className="text-center flex justify-center items-center w-[10%] pe-5 5">
                          Actions{" "}
                        </div>
                      </div>
                      {paginatedData.length < 1 ? (
                        <span className="p-3">
                          No Vehicles found.
                        </span>
                      ) : (
                        paginatedData.map((item: any, index: number) => (
                          <div key={index} className="w-full">
                            <div
                              className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center ${
                                index % 2 !== 0
                                  ? "dark:bg-dark2 bg-light-grey"
                                  : "dark:bg-dark1 bg-white"
                              } border-b-2 border-grey`}
                            >
                              <h5 className="text-start pe-3 break-words w-[16%] 1 ps-5">
                                {item?.data?.name}
                              </h5>
                              <h5 className="text-start pe-3 break-words w-[16%] 2">
                                {item?.data?.username}
                              </h5>
                              <h5 className="text-start pe-3 break-words w-[20%] 3">
                                {item?.data?.email}
                              </h5>
                              <h5 className="text-start pe-3 break-words w-[18%] 4">
                                {item?.data?.companyDate}
                              </h5>
                              <h5 className="text-start pe-3 break-words w-[16%] 6">
                                {item?.data?.expiryDate}
                              </h5>
                              <div
                                className="flex justify-center items-center w-[10%] pe-5 5 h-full"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                }}
                              >
                                <FaEllipsisH className="text-main-blue hover:scale-[1.3] cursor-pointer" />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="w-full h-[32px] mt-10 flex justify-between items-center">
                    <div className="font-[400] text-[12px] sm:text-[14px] leading-[17px] text-[#878787]">
                      Showing{" "}
                      {paginatedData.length ? (page - 1) * itemsPerPage + 1 : 0}{" "}
                      - {Math.min(page * itemsPerPage, data.length)} of{" "}
                      {data.length} data
                    </div>
                    <div className="font-[600] text-[10px] sm:text-[14px] leading-[17px]">
                      <PaginationRounded />
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
