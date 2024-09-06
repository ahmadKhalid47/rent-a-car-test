"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import shape from "@/public/Shape2.svg";
import list from "@/public/Group 110 (1).svg";
import listBlack from "@/public/Group 110.svg";
import ListView from "./ListView";
import GridView from "./GridView";
import { GridViewRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MediumLoader } from "../Components/Loader";

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

  const router = useRouter();
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
        const result = await axios.get("/api/getVehicle", {
          headers: { "Cache-Control": "no-store" },
        });

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
            All Vehicles
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Vehicles / All Vehicles
            </p>
          </h3>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
            <div className="w-fit h-fit flex justify-end items-end gap-3">
              <button
                className={`w-[44px] flex justify-center items-center py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] ${
                  !gridView
                    ? "bg-main-blue text-white"
                    : "bg-light-grey border-2 border-grey"
                } font-[500] xs:text-[12px] md:text-[12px] text-[20px] leading-[30px] text-center`}
                onClick={() => setGridView(false)}
              >
                {!gridView ? (
                  <img src={list.src} />
                ) : (
                  <img src={listBlack.src} />
                )}
              </button>
              <button
                className={`w-[44px] flex justify-center items-center py-2 md:py-0 h-[35px] md:h-[44px] rounded-[10px] ${
                  gridView
                    ? "bg-main-blue text-white"
                    : "bg-light-grey border-2 border-grey"
                }  font-[500] xs:text-[0px] md:text-[2px] text-[20px] leading-[30px] text-center`}
                onClick={() => setGridView(true)}
              >
                <GridViewRounded />
              </button>
            </div>
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("/AddVehicle/AddNew");
              }}
            >
              Add New Vehicle
            </button>
          </div>
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
                  <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <img src={shape.src} className="w-[10.5px]" />
                  </div>
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
                    {/* {filteredVehicles.map((item) => (
                    <option value={item.data.type}>{item.data.type}</option>
                  ))} */}
                    {Array.from(
                      new Set(vehiclesData.map((item) => item.data.type))
                    ).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <img src={shape.src} className="w-[10.5px]" />
                  </div>
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
                    {/* {filteredVehicles.map((item) => (
                    <option value={item.data.city}>{item.data.city}</option>
                  ))} */}
                    {Array.from(
                      new Set(vehiclesData.map((item) => item.data.city))
                    ).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <img src={shape.src} className="w-[10.5px]" />
                  </div>
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
                    {/* {filteredVehicles.map((item) => (
                    <option value={item.data.color}>{item.data.color}</option>
                  ))} */}
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
                  <div className="w-[30px] h-[35px] bg-white absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                    <img src={shape.src} className="w-[10.5px]" />
                  </div>
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
        <div className="w-full h-fit">
          {loading ? (
            <MediumLoader />
          ) : gridView ? (
            <GridView data={filteredVehicles} />
          ) : (
            <ListView data={filteredVehicles} />
          )}
        </div>
      </div>
    </div>
  );
}
