"use client";
import React from "react";
import { RootState } from "@/app/store";
import shape from "@/public/ShapeBlack.svg";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setSeverity, setSidebarShowR } from "@/app/store/Global";
import axios from "axios";
import ListView from "./ListView";
import { SmallLoader, MediumLoader } from "../../Components/Loader";
import { setVehicleDataReloader } from "@/app/store/Global";
import Link from "next/link";
import ImportExportButtons from "@/app/Components/functions/ImportExportButtons";
import { CiSearch } from "react-icons/ci";
import SearchEmpty from "@/app/Components/functions/SearchEmpty";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const [loading, setLoading] = useState<any>("");
  const [dataLoading, setDataLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  const [vehiclesData, setVehiclesData] = useState<any[]>([]);
  const [makeData, setMakeData] = useState<any[]>([]);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [popup, setPopup] = useState(false);
  const [Model, setModel] = useState("");
  const [Make, setMake] = useState("");
  // const [ModelReloader, setModelReloader] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const handleClick = () => {
    setPopup(true);
  };

  useEffect(() => {
    async function getData() {
      try {
        setDataLoading(true);
        const result = await axios.post("/api/getModel", {
          createdBy: myProfile._id,
        });
        const result2 = await axios.post("/api/getMake", {
          createdBy: myProfile._id,
        });
        setMakeData(result2?.data?.data);

        if (result?.data?.data) {
          setVehiclesData(result.data.data);
          setFilteredVehicles(result.data.data); // Initialize with full data
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDataLoading(false);
      }
    }
    if (myProfile._id) getData();
  }, [global.vehicleDataReloader, myProfile._id]);

  async function save(action: string) {
    if (Model.trim() === "" || Make.trim() === "") {
      dispatch(setAlert("Please fill the input"));
      dispatch(setSeverity("error"));
      return;
    } else if (
      vehiclesData.find(
        (item) => item.model?.toLowerCase() === Model.trim().toLowerCase()
      )
    ) {
      dispatch(setAlert("This Item Already Exists"));
      dispatch(setSeverity("error"));
      return;
    }

    try {
      setLoading(action);
      let result: any = await axios.post(`/api/saveModel`, {
        make: Make,
        model: Model,
        createdBy: myProfile._id,
      });

      dispatch(setAlert("Model Saved Successfully"));
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      if (action === "close") {
        setPopup(false);
      }
      setModel("");
      setMake("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading("");
    }
  }
  useEffect(() => {
    filterVehicles();
  }, [searchQuery, vehiclesData]);

  function filterVehicles() {
    if (!searchQuery) {
      setFilteredVehicles(vehiclesData);
      return;
    }

    const lowercasedQuery = searchQuery?.toLowerCase();
    const filtered = vehiclesData.filter((vehicle) => {
      const { make, model } = vehicle;

      return(
        make?.toLowerCase().includes(lowercasedQuery)
      ||  model?.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredVehicles(filtered);
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
        <div className="w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-end">
          <span className="flex flex-col font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            Model
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-5 md:leading-[21px]">
              <Link href={"/Configuration"} className="hover:underline">
                Configuration
              </Link>
              {" / "}Model
            </span>
          </span>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
            <button
              className="w-[200px] py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                handleClick();
              }}
              disabled={dataLoading}
            >
              {dataLoading ? <SmallLoader /> : "Add New"}
            </button>
          </div>
        </div>
        <div className="w-full h-fit">
          <div className="w-full h-fit mt-4 flex justify-between items-center">
            <div className="w-[320px] h-fit flex justify-between items-center relative">
              <input
                className="pe-7 ps-7  w-[100%] h-[44px] flex justify-between items-center text-[14px] xs:text-[16px] dark:bg-dark1 bg-white rounded-[5px] border-2 leading-[19px] border-grey placeholder:text-[#808080] truncate"
                placeholder="Search By Model"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
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
            <ImportExportButtons data={vehiclesData} model={"Model"} />
          </div>
          <div className="w-full h-fit mt-2">
            {dataLoading ? (
              <MediumLoader />
            ) : (
              <ListView data={filteredVehicles} makeData={makeData} />
            )}
          </div>
          {popup ? (
            <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
              <div className="w-[90%] sm:w-[600px] h-[430px] border-[1px] border-grey rounded-[10px] mt-0 flex flex-col justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow-lg z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position">
                <div
                  className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                >
                  <label className="flex justify-start gap-1 items-start font-[600] text-[24px] leading-[17px]">
                    Add New Model{" "}
                    <FaAsterisk className="text-[8px] text-red-500" />
                  </label>
                </div>
                <div className="w-full h-fit flex flex-col justify-between items-center relative gap-3">
                  <div className="w-full h-fit flex justify-between items-center relative">
                    <select
                      className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                      required={true}
                      onChange={(e) => {
                        setMake(e.target.value);
                      }}
                      value={Make}
                    >
                      <option value={""}>Select</option>
                      {makeData?.map((item: any, key: number) => (
                        <option value={item?.make} key={key}>
                          {item?.make}
                        </option>
                      ))}
                    </select>
                    <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                      <img
                        src={shape.src}
                        className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                      />
                    </div>
                  </div>

                  <div
                    className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                  >
                    <div className="w-full h-fit flex justify-between items-center relative">
                      <input
                        required={true}
                        type={"text"}
                        className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                        placeholder={`Model Here`}
                        onChange={(e) => {
                          setModel(e.target.value);
                        }}
                        value={Model}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full flex justify-end gap-4 items-center pt-4`}
                >
                  <button
                    className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                    onClick={() => {
                      setPopup(false);
                      setModel("");
                      setMake("");
                    }}
                  >
                    <FaTimes />
                  </button>
                  <button
                    className="w-[200px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                    onClick={() => save("close")}
                    disabled={loading === "" ? false : true}
                  >
                    {loading === "close" ? <SmallLoader /> : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
