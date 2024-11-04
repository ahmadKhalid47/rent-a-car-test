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
import { renameKeys, useHandleExport } from "../Components/functions/exportFunction";
import { FaTimesCircle } from "react-icons/fa";
import SearchEmpty from "../Components/functions/SearchEmpty";
import { CiFilter, CiSearch } from "react-icons/ci";

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
  const [status, setStatus] = useState<any>("");
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
          setFilteredreservations(result.data.data);
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
        vehicleName?.toLowerCase()?.includes(lowercasedQuery) ||
        city?.toLowerCase()?.includes(lowercasedQuery) ||
        amount?.toLowerCase()?.includes(lowercasedQuery) ||
        duration?.toLowerCase()?.includes(lowercasedQuery) ||
        customerName?.toLowerCase()?.includes(lowercasedQuery)
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
        vehicleName?.toLowerCase()?.includes(lowercasedQuery) ||
        city?.toLowerCase()?.includes(lowercasedQuery) ||
        amount?.toLowerCase()?.includes(lowercasedQuery) ||
        duration?.toLowerCase()?.includes(lowercasedQuery) ||
        customerName?.toLowerCase()?.includes(lowercasedQuery)
      );
    });
    advanceFilters.forEach(({ key, keyValue }: any) => {
      if (keyValue) {
        const lowercasedQuery = keyValue?.toLowerCase();
        filtered = filtered.filter((vehicle: any) => {
          const keyValueInVehicle = vehicle.data[key]?.toLowerCase();

          if (key === "status") {
            return keyValueInVehicle === lowercasedQuery;
          }

          return keyValueInVehicle?.includes(lowercasedQuery);
        });
      }
    });

    setFilteredreservations(filtered);
  }
  useEffect(() => {
    advanceFilterVehicles();
  }, [advanceFilters, status]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value?.trim());
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
  const handleExport = useHandleExport();
  const keyMap = {
    customer_id: "customer_id",
    customerName: "Customer Name",
    chauffeur_id: "chauffeur_id",
    chauffeurName: "Chauffeur Name",
    vehicle_id: "vehicle_id",
    vehicleName: "Vehicle Name",
    reservationDate: "Reservation Date",
    odometer: "Odometer",
    fuelStatus: "Fuel Status",
    securityDeposit: "Security Deposit",
    country: "Country",
    city: "City",
    PickUpAddress: "Pick Up Address",
    PickUpDate: "Pick Up Date",
    PickUpTime: "Pick Up Time",
    dropOffAddress: "Drop Off Address",
    dropOffDate: "Drop Off Date",
    dropOffTime: "Drop Off Time",
    discount: "Discount",
    withChauffeur: "With Chauffeur",
    duration: "duration",
    durationinDays: "Duration In Days",
    vatInclude: "Vat Include",
    amount: "Amount",
    carTotal: "Car Total Rent",
    chauffeurTotal: "Chauffeur Total Rent",
    fuelCompletion: "Fuel On Completion",
    fuelImagesCompletion: "Fuel Images On Completion",
    odometerCompletion: "Odometer On Completion",
    odometerImagesCompletion: "Odometer Images On Completion",
    damages: "Damages",
    status: "Status",
  };

  const renamedArray = renameKeys(reservationsData, keyMap);

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
            All Reservations
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              Reservations / All Reservations
            </span>
          </span>
          <div className="flex justify-end items-center w-[100%] md:w-[50%] h-[44px]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("/AddReservations/AddNew");
              }}
            >
              Add New Reservation
            </button>
          </div>
        </div>

        <div className="h-[44px] w-full flex justify-between gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey mt-4">
          <div className="h-[44px] w-fit flex justify-start gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
            <div className="w-[320px] h-fit flex justify-between items-center relative">
              <input
                className="pe-7 ps-7  w-[100%] h-[44px] flex justify-between items-center text-[14px] xs:text-[16px] dark:bg-dark1 bg-white rounded-[5px] border-2 leading-[19px] border-grey placeholder:text-[#808080] truncate"
                placeholder="Search By Vehicle, Customer, Chauffeur, etc"
                onChange={handleSearchQueryChange}
                value={searchQuery}
              ></input>
              {searchQuery && (
                <SearchEmpty
                  classes={"right-2 text-[24px"}
                  setState={setSearchQuery}
                />
              )}
              <div className="absolute left-2 text-[#808080]">
                <CiSearch />
              </div>
            </div>
            <div className="w-[144px] h-fit">
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="truncate pe-3 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-6 w-[100%] h-[44px] flex justify-between items-center dark:bg-dark1 bg-white rounded-[5px] border-2 border-grey "
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
                  <option value="">Duration</option>
                  {Array.from(
                    new Set(reservationsData.map((item) => item.data.duration))
                  ).map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
                <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-[5px]] flex justify-center items-center pointer-events-none">
                  <img
                    src={shape.src}
                    className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <div className="absolute left-2 text-[#808080]">
                  <CiFilter />
                </div>
              </div>
            </div>
            <div className="w-[144px] h-fit">
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="truncate pe-3 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-6 w-[100%] h-[44px] flex justify-between items-center dark:bg-dark1 bg-white rounded-[5px] border-2 border-grey "
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
                  <option value="">Status</option>
                  {Array.from(
                    new Set(reservationsData.map((item) => item.data.status))
                  ).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-[5px]] flex justify-center items-center pointer-events-none">
                  <img
                    src={shape.src}
                    className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                  />
                </div>
                <div className="absolute left-2 text-[#808080]">
                  <CiFilter />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-y-2 1400:flex-nowrap h-fit justify-between items-center">
            <div className="h-[24px] w-full flex justify-end gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
              <button
                className="hover:no-underline w-[112px] h-[44px] rounded-[6px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] flex justify-center items-center leading-[0px]"
                onClick={() => {
                  handleExport(
                    renamedArray?.map((item: any) => {
                      const { vehicle_id, chauffeur_id, customer_id, ...rest } =
                        item.data;
                      return rest;
                    })
                  );
                }}
              >
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-fit -mt-3">
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
