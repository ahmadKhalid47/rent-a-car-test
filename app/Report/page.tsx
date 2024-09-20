"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { handleExport } from "../Components/functions/exportFunction";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [gridView, setGridView] = useState(false);
  const [showLess, setShowLess] = useState(true);
  const [loading, setLoading] = useState<any>(true);
  const [showSuccess, setShowSuccess] = useState(null);
  const [showError, setShowError] = useState(null);
  const [vehiclesData, setVehiclesData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);
  const [advanceFilters, setAdvanceFilters] = useState<any>([
    {
      key: "year",
      keyValue: "",
    },
    {
      key: "type",
      keyValue: "",
    },
    {
      key: "city",
      keyValue: "",
    },
    {
      key: "color",
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
        const result = await axios.post("/api/getVehicle");

        if (result?.data?.data) {
          setVehiclesData(result.data.data);
          setFilteredVehicles(result.data.data); // Initialize with full data
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [global.vehicleDataReloader]);

  useEffect(() => {
    filterVehicles();
  }, [searchQuery, vehiclesData]);

  function filterVehicles() {
    if (!searchQuery) {
      setFilteredVehicles(vehiclesData);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = vehiclesData.filter((vehicle) => {
      const { data } = vehicle;
      const { registration, city, make, model } = data;

      const carName = `${make} ${model}`.toLowerCase();
      return (
        registration.toLowerCase().includes(lowercasedQuery) ||
        city.toLowerCase().includes(lowercasedQuery) ||
        carName.includes(lowercasedQuery)
      );
    });
    setFilteredVehicles(filtered);
  }

  function advanceFilterVehicles() {
    let filtered: any = vehiclesData;

    advanceFilters.forEach(({ key, keyValue }: any) => {
      if (keyValue) {
        const lowercasedQuery = keyValue.toLowerCase();
        filtered = filtered.filter((vehicle: any) => {
          const keyValueInVehicle = vehicle.data[key]?.toLowerCase();
          return keyValueInVehicle?.includes(lowercasedQuery);
        });
      }
    });

    setFilteredVehicles(filtered);
  }

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.trim());
  }

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Report
          </h3>
        </div>
        <div className=" w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          <div className="w-full h-fit">
            <h3 className="font-[400] text-[14px] xs:text-[16px] leading-[19px] text-black pb-">
              Search
            </h3>
            <div className="w-full h-fit flex justify-between items-center">
              <input
                className="px-2 w-[75%] md:w-[82%] h-[43px] flex justify-between items-center text-[14px] xs:text-[16px] bg-white rounded-xl border-2 leading-[19px] border-grey placeholder:"
                placeholder="Search By Car Name, Reg No, City..."
                onChange={handleSearchQueryChange}
              ></input>
              <button
                className=" w-[24%] md:w-[17%] px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
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
              <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[24%] h-fit ">
                <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                  Year
                </h3>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                  <select
                    className="pe-10 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey "
                    onChange={(e) => {
                      setAdvanceFilters((prevFilters: any) =>
                        prevFilters.map((filter: any) =>
                          filter.key === "year"
                            ? { ...filter, keyValue: e.target.value }
                            : filter
                        )
                      );
                    }}
                  >
                    <option value="">Select</option>
                    {Array.from(
                      new Set(vehiclesData.map((item) => item.data.year))
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none"></div>
                </div>{" "}
              </div>
              <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[24%] h-fit ">
                <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                  Type
                </h3>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                  <select
                    className="pe-10 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey "
                    onChange={(e) => {
                      setAdvanceFilters((prevFilters: any) =>
                        prevFilters.map((filter: any) =>
                          filter.key === "type"
                            ? { ...filter, keyValue: e.target.value }
                            : filter
                        )
                      );
                    }}
                  >
                    <option value="">Select</option>
                    {Array.from(
                      new Set(vehiclesData.map((item) => item.data.type))
                    ).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none"></div>
                </div>
              </div>
              <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[24%] h-fit ">
                <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                  City
                </h3>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                  <select
                    className="pe-10 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey "
                    onChange={(e) => {
                      setAdvanceFilters((prevFilters: any) =>
                        prevFilters.map((filter: any) =>
                          filter.key === "city"
                            ? { ...filter, keyValue: e.target.value }
                            : filter
                        )
                      );
                    }}
                  >
                    <option value="">Select</option>
                    {Array.from(
                      new Set(vehiclesData.map((item) => item.data.city))
                    ).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none"></div>
                </div>
              </div>
              <div className="w-[100%] xs:w-[48%] lg:w-[30%] 1400:w-[24%] h-fit ">
                <h3 className="font-[400] text-[12px] xs:text-[14px] leading-[17px] text-black pb-[2px] ">
                  Color
                </h3>
                <div className="w-full h-fit flex justify-between items-center relative">
                  <select
                    className="ps-7 font-[400] text-[14px] xs:text-[16px] leading-[19px] px-5 w-[100%] h-[43px] flex justify-between items-center bg-white rounded-xl border-2 border-grey "
                    onChange={(e) => {
                      setAdvanceFilters((prevFilters: any) =>
                        prevFilters.map((filter: any) =>
                          filter.key === "color"
                            ? { ...filter, keyValue: e.target.value }
                            : filter
                        )
                      );
                    }}
                  >
                    <option value="">Select</option>
                    {Array.from(
                      new Set(vehiclesData.map((item) => item.data.color))
                    ).map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  <div
                    className="rounded-full w-[19px] h-[12px] bg-red-5 absolute left-2 top-[15.5px]"
                    style={{
                      backgroundColor: advanceFilters[3].keyValue,
                    }}
                  ></div>
                  <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none"></div>
                </div>
              </div>
            </div>
          ) : null}

          <h3
            className="font-[400] text-[14px] xs:text-[16px] leading-[19px] text-black pb-1 underline hover:no-underline cursor-pointer"
            onClick={() => setShowLess(!showLess)}
          >
            {showLess ? "Advanced Filters" : "Show Less"}
          </h3>
        </div>
        <div className="w-full h-fit mt-4">
          <h3
            className={`w-full flex justify-end items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] text-main-blue`}
          >
            <span
              className="underline cursor-pointer text-main-blue hover:no-underline"
              onClick={() => {
                // handleExport(data?.map((item: any) => item.data));
              }}
            >
              Export
            </span>
          </h3>
          <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2 bg-red-300 relative">
            <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start bg-light-grey overflow-hidden mt-0 leading-[17px]">
              <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Total Revenue
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Registration No
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Total Revenue
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Registration No
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Total Revenue
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Registration No
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Total Revenue
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Registration No
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Total Revenue
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Registration No
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Total Revenue
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%] cursor-pointer">
                  Registration No
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
