"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { GoTriangleDown } from "react-icons/go";
import ListViewUser from "./ListViewUser";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MediumLoader } from "../Components/Loader";
import {
  renameKeys2,
  useHandleExport,
} from "../Components/functions/exportFunction";
import SearchEmpty from "../Components/functions/SearchEmpty";
import Link from "next/link";
import { CiFilter, CiSearch } from "react-icons/ci";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const router = useRouter();
  const [loading, setLoading] = useState<any>(true);

  const [UsersData, setUsersData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUser, setFilteredUser] = useState<any[]>([]);
  const [advanceFilters, setAdvanceFilters] = useState<any>([
    {
      key: "subscription",
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
        const result = await axios.post("/api/getUser", {
          createdBy: myProfile._id,
        });

        if (result?.data?.data) {
          setUsersData(result.data?.data);
          setFilteredUser(result.data?.data);
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
    filterUser();
  }, [searchQuery, UsersData]);

  function filterUser() {
    if (!searchQuery) {
      setFilteredUser(UsersData);
      return;
    }

    const lowercasedQuery = searchQuery?.toLowerCase();
    const filtered = UsersData.filter((vehicle) => {
      const { name, username, email, city, company } = vehicle;

      return (
        name?.toLowerCase()?.includes(lowercasedQuery) ||
        username?.toLowerCase()?.includes(lowercasedQuery) ||
        email?.toLowerCase()?.includes(lowercasedQuery) ||
        city?.toLowerCase()?.includes(lowercasedQuery) ||
        company?.toLowerCase()?.includes(lowercasedQuery) ||
        username?.toLowerCase()?.includes(lowercasedQuery)
      );
    });
    setFilteredUser(filtered);
  }

  function advanceFilterVehicles() {
    let filtered: any = UsersData;

    const lowercasedQuery = searchQuery?.toLowerCase();
    filtered = UsersData.filter((vehicle) => {
      const { name, phone } = vehicle;

      return (
        name?.toLowerCase()?.includes(lowercasedQuery) ||
        phone?.toLowerCase()?.includes(lowercasedQuery)
      );
    });

    advanceFilters.forEach(({ key, keyValue }: any) => {
      if (keyValue) {
        const lowercasedQuery = keyValue?.toLowerCase();
        filtered = filtered.filter((vehicle: any) => {
          const keyValueInVehicle = vehicle[key]?.toLowerCase();

          if (key === "city") {
            return keyValueInVehicle === lowercasedQuery;
          }

          return keyValueInVehicle?.includes(lowercasedQuery);
        });
      }
    });

    setFilteredUser(filtered);
  }
  useEffect(() => {
    advanceFilterVehicles();
  }, [advanceFilters, status]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value?.trim());
    setAdvanceFilters([
      {
        key: "subscription",
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
  const handleExport = useHandleExport();
  const keyMap = {
    _id: "_id",
    profilePic: "Profile Pic",
    username: "User Name",
    firstName: "First Name",
    lastName: "Last Name",
    name: "Name",
    phone: "Phone",
    email: "Email",
    address: "Address",
    company: "Company",
    country: "Country",
    state: "State",
    city: "City",
    plan: "Plan",
    password: "password",
    verifyPassword: "Verify Password",
    admin: "admin",
    expiryDate: "Expiry Date",
    createdBy: "Created By",
    createdAt: "Created At",
    active: "Active",
  };

  const renamedArray = renameKeys2(UsersData, keyMap);

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
            All Users
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Users"} className="hover:underline">
                Users{" "}
              </Link>
              {" / "}
              All Users{" "}
            </span>
          </span>
          <div className="flex justify-end items-center w-[100%] md:w-[50%] h-[44px]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("/AddUser/AddNew");
              }}
            >
              Add New User
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
            <div className="w-[150px] h-fit">
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="truncate pe-3 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-6 w-[100%] h-[44px] flex justify-between items-center dark:bg-dark1 bg-white rounded-[5px] border-2 border-grey "
                  onChange={(e) => {
                    setAdvanceFilters((prevFilters: any) =>
                      prevFilters.map((filter: any) =>
                        filter.key === "subscription"
                          ? { ...filter, keyValue: e.target.value }
                          : filter
                      )
                    );
                  }}
                  value={
                    advanceFilters.find(
                      (filter: any) => filter.key === "subscription"
                    )?.keyValue || ""
                  }
                >
                  <option value="">Subscription</option>
                  {Array.from(
                    new Set(UsersData.map((item) => item.subscription))
                  ).map((subscription) => (
                    <option key={subscription} value={subscription}>
                      {subscription}
                    </option>
                  ))}
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
                  <option value="">City</option>
                  {Array.from(new Set(UsersData.map((item) => item.city))).map(
                    (city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    )
                  )}
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
                  handleExport(
                    renamedArray?.map((item: any) => {
                      const { _id, __v, admin, password, fptoken, ...rest } =
                        item;
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
          {loading ? <MediumLoader /> : <ListViewUser data={filteredUser} />}
        </div>
      </div>
    </div>
  );
}
