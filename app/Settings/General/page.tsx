"use client";
import React from "react";
import Switch from "@mui/material/Switch";
import { GoTriangleDown } from "react-icons/go";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setAlert,
  setcurrentCurrency,
  setunit,
  setSidebarShowR,
  setTheme,
} from "@/app/store/Global";
import axios from "axios";
import { SmallLoader } from "@/app/Components/Loader";
import {
  setAllValues,
  setvatIncludeR,
  setvatPercentageR,
} from "@/app/store/Invoicing";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let Invoicing = useSelector((state: RootState) => state.Invoicing);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [saveloading, setSaveLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [darkModeLoading, setDarkModeLoading] = useState<any>(false);
  const router = useRouter();

  const currencySymbols = [
    { symbol: "$", currency: "US Dollar" },
    { symbol: "€", currency: "Euro" },
    { symbol: "₨", currency: "Pakistani Rupee" },
    { symbol: "£", currency: "British Pound" },
    { symbol: "¥", currency: "Japanese Yen" },
    { symbol: "A$", currency: "Australian Dollar" },
    { symbol: "C$", currency: "Canadian Dollar" },
    { symbol: "CHF", currency: "Swiss Franc" },
    { symbol: "¥", currency: "Chinese Yuan" },
    { symbol: "₹", currency: "Indian Rupee" },
    { symbol: "NZ$", currency: "New Zealand Dollar" },
    { symbol: "kr", currency: "Swedish Krona" },
    { symbol: "$", currency: "Mexican Peso" },
    { symbol: "S$", currency: "Singapore Dollar" },
    { symbol: "HK$", currency: "Hong Kong Dollar" },
    { symbol: "R", currency: "South African Rand" },
    { symbol: "₽", currency: "Russian Ruble" },
    { symbol: "₺", currency: "Turkish Lira" },
    { symbol: "R$", currency: "Brazilian Real" },
    { symbol: "د.إ", currency: "UAE Dirham" },
  ];

  const unitSymbols: any = ["KM", "Miles"];

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
        const result = await axios.post("/api/getInvoicing", {
          createdBy: myProfile._id,
        });
        dispatch(setAllValues(result.data.data[0].data));
      } catch (error) {
        console.log(error);
      }
    }
    if (myProfile._id) getData();
  }, [global.vehicleDataReloader, myProfile._id]);

  async function editItem() {
    let currency = global.currentCurrency;
    let unit = global.unit;
    try {
      setSaveLoading(true);
      await axios.post(`/api/updateInvoicing`, {
        Invoicing,
        createdBy: myProfile._id,
      });
      await axios.post(`/api/updateGeneralSettings`, {
        currency,
        unit,
        createdBy: myProfile._id,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("currency", global.currentCurrency);
        localStorage.setItem("unit", global.unit);
      }
      dispatch(setAlert("Settings Updated Successfully!"));
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
    }
  }

  const [themeToShow, setThemeToShow] = useState<any>();
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setThemeToShow(storedTheme);
  }, [global.theme]);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black `}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] flex justify-start items-end">
          <span className="font-[600] flex flex-col text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] w-[100%] md:w-[50%]">
            General
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Settings"} className="hover:underline">
                Settings
              </Link>{" "}
              / General{" "}
            </span>{" "}
          </span>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5">
          <div className="w-full h-fit">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] w-[100%]">
                    Currency
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px]">
                    You can select default currency here{" "}
                  </span>
                </div>
                <div className="w-[180px] h-[50px] flex justify-center items-center">
                  <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                    <div className="w-full h-fit flex justify-between items-center relative">
                      <select
                        className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                        onChange={(e) => {
                          dispatch(setcurrentCurrency(e.target.value));
                        }}
                        value={global.currentCurrency}
                      >
                        <option value={""}>Select</option>
                        {currencySymbols?.map((item: any, index: number) => (
                          <option value={item.symbol} key={index}>
                            {item.currency} ({item.symbol})
                          </option>
                        ))}
                      </select>
                      <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
<GoTriangleDown className="text-[18px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] w-[100%]">
                    Unit
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px]">
                    You can select default unit here{" "}
                  </span>
                </div>
                <div className="w-[180px] h-[50px] flex justify-center items-center">
                  <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                    <div className="w-full h-fit flex justify-between items-center relative">
                      <select
                        className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                        onChange={(e) => {
                          dispatch(setunit(e.target.value));
                        }}
                        value={global.unit}
                      >
                        <option value={""}>Select</option>
                        {unitSymbols?.map((item: any, index: number) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
<GoTriangleDown className="text-[18px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] w-[100%]">
                    Dark Theme
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px]">
                    Turn on dark mode
                  </span>
                </div>
                <div className="w-[180px] h-[50px] flex justify-center items-center">
                  <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                    <div className="w-full h-fit flex justify-between items-center relative">
                      <select
                        className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                        value={themeToShow}
                        onChange={(e) => {
                          const selectedTheme = e.target.value;
                          dispatch(
                            setTheme(
                              selectedTheme as "light" | "dark" | "system"
                            )
                          );
                          localStorage.setItem("theme", selectedTheme);
                          const systemTheme = window.matchMedia(
                            "(prefers-color-scheme: dark)"
                          ).matches
                            ? "dark"
                            : "light";
                          const themeToApply =
                            selectedTheme === "system"
                              ? systemTheme
                              : selectedTheme;
                          document.documentElement.classList.toggle(
                            "dark",
                            themeToApply === "dark"
                          );
                        }}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                      <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
<GoTriangleDown className="text-[18px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] w-[100%]">
                    VAT Percentage{" "}
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px]">
                    You can change VAT percentage (%){" "}
                  </span>
                </div>
                <div className="w-[180px] h-[50px] flex justify-center items-center">
                  <div className="w-[100%] h-fit flex flex-col justify-center items-center gap-1 relative">
                    <div className="w-full h-fit flex justify-between items-center relative">
                      <input
                        className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                        onChange={(e) => {
                          dispatch(setvatPercentageR(e.target.value));
                        }}
                        value={Invoicing.vatPercentage}
                        type="number"
                      />
                    </div>
                    <div className="absolute right-3">%</div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] w-[100%]">
                    Include VAT Percentage{" "}
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px]">
                    Prices include VAT
                  </span>
                </div>
                <div className="w-[180px] h-[50px] flex justify-center items-center">
                  <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                    <div className="w-full h-fit flex justify-end items-center relative overflow-hidden">
                      <Switch
                        disabled={loading}
                        checked={Invoicing.vatInclude}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          dispatch(setvatIncludeR(event.target.checked));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 ${"justify-end"} items-center gap-4`}
            >
              <button
                onClick={() => {
                  router.push("/Settings");
                }}
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              >
                {loading ? <SmallLoader /> : "Cancel"}
              </button>
              <button
                onClick={() => {
                  editItem();
                }}
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              >
                {saveloading ? <SmallLoader /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
