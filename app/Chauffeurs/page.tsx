"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { GoTriangleDown } from "react-icons/go";
import ListViewChauffeur from "./ListViewChauffeur";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MediumLoader } from "../Components/Loader";
import {
  renameKeys,
  useHandleExport,
} from "../Components/functions/exportFunction";
import SearchEmpty from "../Components/functions/SearchEmpty";
import { CiFilter, CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useFetchData } from "../Components/functions/apiCalling";

export default function chauffeurs() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const router = useRouter();
  const [loading, setLoading] = useState<any>(true);
  const [chauffeursData, setchauffeursData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredchauffeur, setFilteredchauffeur] = useState<any[]>([]);
  const [status, setStatus] = useState<any>("");
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
      key: "rentPerDay",
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

  useFetchData({
    modelName: "chauffeur",
    createdBy: myProfile._id,
    setData: setchauffeursData,
    setFilteredData: setFilteredchauffeur,
    setLoading: setLoading,
  });

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
        name?.toLowerCase()?.includes(lowercasedQuery) ||
        phone?.toLowerCase()?.includes(lowercasedQuery)
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
        name?.toLowerCase()?.includes(lowercasedQuery) ||
        emailAddress?.toLowerCase()?.includes(lowercasedQuery) ||
        city?.toLowerCase()?.includes(lowercasedQuery) ||
        phone?.toLowerCase()?.includes(lowercasedQuery)
      );
    });

    advanceFilters.forEach(({ key, keyValue }: any) => {
      if (keyValue) {
        const lowercasedQuery = keyValue?.toLowerCase();
        filtered = filtered.filter((vehicle: any) => {
          const keyValueInVehicle = vehicle.data[key]?.toLowerCase();

          if (key === "gender") {
            return keyValueInVehicle === lowercasedQuery;
          }

          return keyValueInVehicle?.includes(lowercasedQuery);
        });
      }
    });
    if (status === "On Trip") {
      filtered = filtered.filter((vehicle: any) => {
        return vehicle?.rentOut === true;
      });
    } else if (status === "In Active") {
      filtered = filtered.filter((vehicle: any) => {
        return vehicle?.active === false;
      });
    } else if (status === "Available") {
      filtered = filtered.filter((vehicle: any) => {
        return vehicle?.active === true && !vehicle?.rentOut;
      });
    }

    setFilteredchauffeur(filtered);
  }
  useEffect(() => {
    advanceFilterchauffeurs();
  }, [advanceFilters, status]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value?.trim());
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
        key: "rentPerDay",
        keyValue: "",
      },
    ]);
  }
  const handleExport = useHandleExport();

  const keyMap = {
    name: "Name",
    gender: "Gender",
    dateOfBirth: "Date Of Birth",
    nationality: "Nationality",
    emailAddress: "Email Address",
    phone: "Phone",
    alternativePhone: "Alternative Phone",
    rentPerDay: "Rent Per Day",
    streetAddress: "Street Address",
    country: "Country",
    state: "State",
    city: "City",
    postalCode: "Postal Code",
    chauffeurImage: "Chauffeur Image",
    reference: "Reference",
    emergency: "Emergency",
    additional: "Additional",
    passportNumber: "Passport Number",
    passportValid: "Passport Valid",
    passportCountry: "Passport Country",
    passportImages: "Passport Images",
    licenseNumber: "License Number",
    licenseValid: "License Valid",
    licenseCountry: "License Country",
    licenseImages: "License Images",
    other: "Other",
    otherNumber: "Other Number",
    otherValid: "Other Valid",
    otherCountry: "Other Country",
    otherImages: "Other Images",
    employmentType: "Employment Type",
    drivingExp: "Driving Exp",
    availability: "Availability",
    idCard: "Id Card",
    createdBy: "Created By",
    createdAt: "Created At",
    active: "Active",
  };

  const renamedArray = renameKeys(chauffeursData, keyMap);

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
            All Chauffeurs
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Chauffeurs"} className="hover:underline">
                Chauffeurs
              </Link>
              {" / "}
              All Chauffeur
            </span>
          </span>

          <div className="flex justify-end items-center w-[100%] md:w-[50%] h-[44px]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("/AddChauffeur/AddNew");
              }}
            >
              Add Chauffeur
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
            <div className="w-[144px] h-fit">
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="truncate pe-3 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-6 w-[100%] h-[44px] flex justify-between items-center dark:bg-dark1 bg-white rounded-[5px] border-2 border-grey "
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  value={status}
                >
                  <option value="">Status</option>
                  <option value={"In Active"}>In Active</option>
                  <option value={"Available"}>Available</option>
                  <option value={"On Trip"}>On Trip</option>
                </select>
                <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-[5px]] flex justify-center items-center pointer-events-none">
                  <GoTriangleDown className="text-[18px]" />
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
                  <GoTriangleDown className="text-[18px]" />
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
                  handleExport(renamedArray?.map((item: any) => item.data));
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
