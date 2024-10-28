"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import shape from "@/public/Shape2.svg";
import ListViewChauffeur from "./ListViewChauffeur";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MediumLoader } from "../Components/Loader";
import { useHandleExport } from "../Components/functions/exportFunction";
import SearchEmpty from "../Components/functions/SearchEmpty";
import { CiFilter, CiSearch } from "react-icons/ci";

export default function chauffeurs() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const router = useRouter();
  const [showLess, setShowLess] = useState(true);
  const [loading, setLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  const [chauffeursData, setchauffeursData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredchauffeur, setFilteredchauffeur] = useState<any[]>([]);
  const [advanceFilters, setAdvanceFilters] = useState<any>([
    {
      key: "gender",
      keyValue: "",
    },
    {
      key: "city",
      keyValue: "",
    },
    {
      key: "postalCode",
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
        const result = await axios.post("/api/getchauffeur", {
          createdBy: myProfile._id,
        });

        if (result?.data?.data) {
          setchauffeursData(result.data.data);
          setFilteredchauffeur(result.data.data); // Initialize with full data
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
  }, [myProfile._id, global.vehicleDataReloader]);

  useEffect(() => {
    filterchauffeur();
  }, [searchQuery, chauffeursData]);

  function filterchauffeur() {
    if (!searchQuery) {
      setFilteredchauffeur(chauffeursData);
      return;
    }

    const lowercasedQuery = searchQuery?.toLowerCase();
    const filtered = chauffeursData.filter((vehicle) => {
      const { data } = vehicle;
      const { name, phone } = data;

      return (
        name?.toLowerCase().includes(lowercasedQuery) ||
        phone?.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredchauffeur(filtered);
  }

  function advanceFilterchauffeurs() {
    let filtered: any = chauffeursData;

    const lowercasedQuery = searchQuery?.toLowerCase();
    filtered = chauffeursData.filter((vehicle) => {
      const { data } = vehicle;
      const { name, phone, emailAddress, city } = data;

      return (
        name?.toLowerCase().includes(lowercasedQuery) ||
        emailAddress?.toLowerCase().includes(lowercasedQuery) ||
        city?.toLowerCase().includes(lowercasedQuery) ||
        phone?.toLowerCase().includes(lowercasedQuery)
      );
    });

    advanceFilters.forEach(({ key, keyValue }: any) => {
      if (keyValue) {
        const lowercasedQuery = keyValue?.toLowerCase();
        filtered = filtered.filter((vehicle: any) => {
          const keyValueInVehicle = vehicle.data[key]?.toLowerCase();

          if (key === "gender") {
            // Check if status is not equal
            return keyValueInVehicle === lowercasedQuery;
          }

          // For other keys, continue with includes check
          return keyValueInVehicle?.includes(lowercasedQuery);
        });
      }
    });

    setFilteredchauffeur(filtered);
  }
  useEffect(() => {
    advanceFilterchauffeurs();
    console.log(status);
  }, [advanceFilters, status]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.trim());
    setAdvanceFilters([
      {
        key: "gender",
        keyValue: "",
      },
      {
        key: "city",
        keyValue: "",
      },
      {
        key: "postalCode",
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
            All Chauffeurs
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-5 md:leading-[21px]">
              Chauffeurs / All Chauffeurs
            </span>
          </span>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("/AddChauffeur/AddNew");
              }}
            >
              Add New chauffeur
            </button>
          </div>
        </div>
        <div className="h-[44px] w-full flex justify-between gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey mt-4">
          <div className="h-[44px] w-fit flex justify-start gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
            <div className="w-[320px] h-fit flex justify-between items-center relative">
              <input
                className="pe-7 ps-7  w-[100%] h-[44px] flex justify-between items-center text-[14px] xs:text-[16px] dark:bg-dark1 bg-white rounded-[5px] border-2 leading-[19px] border-grey placeholder:text-[#808080] truncate"
                placeholder="Search By Name, Phone, Email, etc"
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
            {/* <div className="w-[144px] h-fit ">
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="truncate pe-3 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-6 w-[100%] h-[44px] flex justify-between items-center dark:bg-dark1 bg-white rounded-[5px] border-2 border-grey "
                  onChange={(e) => {
                    setAdvanceFilters((prevFilters: any) =>
                      prevFilters.map((filter: any) =>
                        filter.key === "type"
                          ? { ...filter, keyValue: e.target.value }
                          : filter
                      )
                    );
                  }}
                  value={
                    advanceFilters.find((filter: any) => filter.key === "type")
                      ?.keyValue || ""
                  }
                >
                  <option value="">Type</option>
                  {Array.from(
                    new Set(chauffeursData.map((item) => item.data.type))
                  ).map((type) => (
                    <option key={type} value={type}>
                      {type}
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
            </div> */}
            <div className="w-[144px] h-fit ">
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="truncate pe-3 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-6 w-[100%] h-[44px] flex justify-between items-center dark:bg-dark1 bg-white rounded-[5px] border-2 border-grey "
                  onChange={(e) => {
                    setAdvanceFilters((prevFilters: any) =>
                      prevFilters.map((filter: any) =>
                        filter.key === "gender"
                          ? { ...filter, keyValue: e.target.value }
                          : filter
                      )
                    );
                  }}
                  value={
                    advanceFilters.find(
                      (filter: any) => filter.key === "gender"
                    )?.keyValue || ""
                  }
                >
                  <option value="">Gender</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Custom"}>Custom</option>
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
            {/* <div className="w-[100%] xs:w-[48%] lg:w-[30%]  h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Gender
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 bg-white rounded-xl border-2 border-grey"
                  onChange={(e) => {
                    setAdvanceFilters((prevFilters: any) =>
                      prevFilters.map((filter: any) =>
                        filter.key === "gender"
                          ? { ...filter, keyValue: e.target.value }
                          : filter
                      )
                    );
                  }}
                  value={
                    advanceFilters.find(
                      (filter: any) => filter.key === "gender"
                    )?.keyValue || ""
                  }
                >
                  <option value="">Select</option>
                  {Array.from(
                    new Set(chauffeursData.map((item) => item.data.gender))
                  ).map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
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
            <div className="w-[100%] xs:w-[48%] lg:w-[30%]  h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Postal/Zip Code
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 bg-white rounded-xl border-2 border-grey"
                  onChange={(e) => {
                    setAdvanceFilters((prevFilters: any) =>
                      prevFilters.map((filter: any) =>
                        filter.key === "postalCode"
                          ? { ...filter, keyValue: e.target.value }
                          : filter
                      )
                    );
                  }}
                  value={
                    advanceFilters.find(
                      (filter: any) => filter.key === "postalCode"
                    )?.keyValue || ""
                  }
                >
                  <option value="">Select</option>
                  {Array.from(
                    new Set(chauffeursData.map((item) => item.data.postalCode))
                  ).map((postalCode) => (
                    <option key={postalCode} value={postalCode}>
                      {postalCode}
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
            <div className="w-[100%] xs:w-[48%] lg:w-[30%]  h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                City
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 bg-white rounded-xl border-2 border-grey"
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
                    advanceFilters.find((filter: any) => filter.key === "city")
                      ?.keyValue || ""
                  }
                >
                  <option value="">Select</option>
                  {Array.from(
                    new Set(chauffeursData.map((item) => item.data.city))
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
            </div> */}
            <div className="h-[24px] w-full flex justify-end gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
              <button
                className="hover:no-underline w-[112px] h-[44px] rounded-[6px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] flex justify-center items-center leading-[0px]"
                onClick={() => {
                  handleExport(chauffeursData?.map((item: any) => item.data));
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
            <ListViewChauffeur data={filteredchauffeur} />
          )}
        </div>
      </div>
    </div>
  );
}
