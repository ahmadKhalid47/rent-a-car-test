"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import shape from "@/public/Shape2.svg";
import ListViewReservations from "./ListViewReservations";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MediumLoader } from "../Components/Loader";
import { useHandleExport } from "../Components/functions/exportFunction";
import { FaTimesCircle } from "react-icons/fa";
import SearchEmpty from "../Components/functions/SearchEmpty";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const router = useRouter();
  const [showLess, setShowLess] = useState(true);
  const [loading, setLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredreservations, setFilteredreservations] = useState<any[]>([]);
  const [advanceFilters, setAdvanceFilters] = useState<any>([
    {
      key: "status",
      keyValue: "",
    },
    {
      key: "city",
      keyValue: "",
    },
    {
      key: "duration",
      keyValue: "",
    },
  ]);

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
        setLoading(true);
        const result = await axios.post("/api/getreservation", {
          createdBy: myProfile._id,
        });

        if (result?.data?.data) {
          setreservationsData(result.data.data);
          setFilteredreservations(result.data.data); // Initialize with full data
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

  useEffect(() => {
    filterreservations();
  }, [searchQuery, reservationsData]);

  function filterreservations() {
    if (!searchQuery) {
      setFilteredreservations(reservationsData);
      return;
    }

    const lowercasedQuery = searchQuery?.toLowerCase();
    const filtered = reservationsData.filter((vehicle) => {
      const { data } = vehicle;
      const {
        chauffeurName,
        vehicleName,
        customerName,
        city,
        amount,
        duration,
      } = data;

      return (
        vehicleName?.toLowerCase().includes(lowercasedQuery) ||
        city?.toLowerCase().includes(lowercasedQuery) ||
        amount?.toLowerCase().includes(lowercasedQuery) ||
        duration?.toLowerCase().includes(lowercasedQuery) ||
        customerName?.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredreservations(filtered);
  }
  function advanceFilterVehicles() {
    let filtered: any = reservationsData;
    const lowercasedQuery = searchQuery?.toLowerCase();
    filtered = reservationsData.filter((vehicle) => {
      const { data } = vehicle;
      const {
        chauffeurName,
        vehicleName,
        customerName,
        city,
        amount,
        duration,
      } = data;

      return (
        vehicleName?.toLowerCase().includes(lowercasedQuery) ||
        city?.toLowerCase().includes(lowercasedQuery) ||
        amount?.toLowerCase().includes(lowercasedQuery) ||
        duration?.toLowerCase().includes(lowercasedQuery) ||
        customerName?.toLowerCase().includes(lowercasedQuery)
      );
    });
    advanceFilters.forEach(({ key, keyValue }: any) => {
      if (keyValue) {
        const lowercasedQuery = keyValue?.toLowerCase();
        filtered = filtered.filter((vehicle: any) => {
          const keyValueInVehicle = vehicle.data[key]?.toLowerCase();

          if (key === "status") {
            // Check if status is not equal
            return keyValueInVehicle === lowercasedQuery;
          }

          // For other keys, continue with includes check
          return keyValueInVehicle?.includes(lowercasedQuery);
        });
      }
    });

    setFilteredreservations(filtered);
  }

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.trim());
    setAdvanceFilters([
      {
        key: "status",
        keyValue: "",
      },
      {
        key: "city",
        keyValue: "",
      },
      {
        key: "duration",
        keyValue: "",
      },
    ]);
  }
  const handleExport = useHandleExport(); // Use the hook to get the handleExport function

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-end">
          <span className="flex flex-col font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            All Reservations
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-5 md:leading-[21px]">
              Reservations / All Reservations
            </span>
          </span>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("/AddReservations/AddNew");
              }}
            >
              Add New Reservation
            </button>
          </div>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-4 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          <div className="w-full h-fit">
            <h3 className="font-[400] text-[14px] xs:text-[16px] leading-[19px] dark:text-white text-black pb-">
              Search
            </h3>
            <div className="w-full h-fit flex justify-between items-center relative">
              <input
                className="px-2 w-[75%] md:w-[82%] h-[43px] flex justify-between items-center text-[14px] xs:text-[16px] dark:bg-dark1 bg-white rounded-xl border-2 leading-[19px] border-grey placeholder:placeholder-color"
                placeholder="Search By Vehicle, Customer..."
                onChange={handleSearchQueryChange}
                value={searchQuery}
              ></input>
              {searchQuery && (
                <SearchEmpty
                  classes={"left-[72%] md:left-[79%] w-[2%] text-[20px]"}
                  setState={setSearchQuery}
                />
              )}
              <button
                className="w-[24%] md:w-[17%] px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  advanceFilterVehicles();
                }}
              >
                Search
              </button>
            </div>
          </div>
          {!showLess ? (
            <div className="w-full flex flex-wrap gap-y-2 1400:flex-nowrap h-fit justify-between items-center">
              <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[32%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  Status
                </label>
                <div className="w-full h-fit flex justify-between items-center relative">
                  <select
                    className="placeholder-color pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 bg-white rounded-xl border-2 border-grey"
                    onChange={(e) => {
                      setAdvanceFilters((prevFilters: any) =>
                        prevFilters.map((filter: any) =>
                          filter.key === "status"
                            ? { ...filter, keyValue: e.target.value }
                            : filter
                        )
                      );
                    }}
                    value={
                      advanceFilters.find(
                        (filter: any) => filter.key === "status"
                      )?.keyValue || ""
                    }
                  >
                    <option value="">Select</option>
                    {Array.from(
                      new Set(reservationsData.map((item) => item.data.status))
                    ).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <img
                      src={shape.src}
                      className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[32%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  City
                </label>
                <div className="w-full h-fit flex justify-between items-center relative">
                  <select
                    className="placeholder-color pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 bg-white rounded-xl border-2 border-grey"
                    onChange={(e) => {
                      setAdvanceFilters((prevFilters: any) =>
                        prevFilters.map((filter: any) =>
                          filter.key === "city"
                            ? { ...filter, keyValue: e.target.value }
                            : filter
                        )
                      );
                    }}
                    value={
                      advanceFilters.find(
                        (filter: any) => filter.key === "city"
                      )?.keyValue || ""
                    }
                  >
                    <option value="">Select</option>
                    {Array.from(
                      new Set(reservationsData.map((item) => item.data.city))
                    ).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <img
                      src={shape.src}
                      className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[32%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  Duration
                </label>
                <div className="w-full h-fit flex justify-between items-center relative">
                  <select
                    className="placeholder-color pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 bg-white rounded-xl border-2 border-grey"
                    onChange={(e) => {
                      setAdvanceFilters((prevFilters: any) =>
                        prevFilters.map((filter: any) =>
                          filter.key === "duration"
                            ? { ...filter, keyValue: e.target.value }
                            : filter
                        )
                      );
                    }}
                    value={
                      advanceFilters.find(
                        (filter: any) => filter.key === "duration"
                      )?.keyValue || ""
                    }
                  >
                    <option value="">Select</option>
                    {Array.from(
                      new Set(
                        reservationsData.map((item) => item.data.duration)
                      )
                    ).map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                  <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <img
                      src={shape.src}
                      className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <h3
            className="font-[400] text-[14px] xs:text-[16px] leading-[19px] dark:text-white text-black pb-1 underline hover:no-underline cursor-pointer"
            onClick={() => setShowLess(!showLess)}
          >
            {showLess ? "Advanced Filters" : "Show Less"}
          </h3>
        </div>
        <div className="w-full h-fit mt-4">
          <div className="h-[24px] w-full flex justify-end gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
            <button
              className="hover:no-underline w-fit px-3 md:px-6 h-[24px] rounded-[6px] bg-main-blue text-white font-[500] text-[12px] md:text-[14px] flex justify-center items-center leading-[0px]"
              onClick={() => {
                handleExport(reservationsData?.map((item: any) => item.data));
              }}
            >
              Export
            </button>
          </div>

          {loading ? (
            <MediumLoader />
          ) : (
            <ListViewReservations data={filteredreservations} />
          )}
        </div>
      </div>
    </div>
  );
}
