"use client";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import bar from "@/public/Layer_1 bar.svg";
import account from "@/public/account.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setAlert,
  setSeverity,
  setcurrentCurrency,
  setunit,
  setSidebarShowR,
  setSidebarShowTempR,
  setTheme,
} from "../store/Global";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  set_idR,
  setAllValues,
  setprofilePicR,
  setuserR,
} from "../store/myProfile";
import { Logout, Person2Outlined, Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { setConfigurations } from "../store/Configurations";
import Image from "next/image";

export default function Nav() {
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const themeToApply = storedTheme === "system" ? systemTheme : storedTheme;

    if (themeToApply) {
      dispatch(setTheme(themeToApply as "light" | "dark"));
      document.documentElement.classList.toggle(
        "dark",
        themeToApply === "dark"
      );
    }
  }, []);

  useEffect(() => {
    async function verifyTokenApi() {
      try {
        let userData = await axios.post("/api/verifyToken");
        dispatch(setuserR(userData?.data?.msg.username));
      } catch (err) {}
    }
    verifyTokenApi();
  }, []);

  let myProfile: any = useSelector((state: RootState) => state.myProfile);

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post(
          `/api/getRegistration/${myProfile.user}`,
          {
            username: myProfile.user,
            email: myProfile.email,
          }
        );
        dispatch(setprofilePicR(result?.data?.data?.profilePic));
        dispatch(set_idR(result?.data?.data._id));
        dispatch(setAllValues(result?.data?.data));
      } catch (error) {
        console.log(error);
      }
    }
    if (
      myProfile.user &&
      myProfile.username !== undefined &&
      myProfile.email !== undefined
    ) {
      getData();
    }
  }, [myProfile.user, global.myProfileReloader]);

  useEffect(() => {
    let currencyInLS: string | null = null;
    let unitInLS: string | null = null;

    async function fetchData() {
      try {
        const result = await axios.post("/api/getGeneralSettings", {
          createdBy: myProfile._id,
        });
        const data = result.data.data[0];

        const currency = data.currency || "$";
        const unit = data.unit || "$";

        dispatch(setcurrentCurrency(currency));
        dispatch(setunit(unit));

        if (typeof window !== "undefined") {
          localStorage.setItem("currency", currency);
          localStorage.setItem("unit", unit);
          currencyInLS = currency;
          unitInLS = unit;
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (typeof window !== "undefined") {
      currencyInLS = localStorage.getItem("currency");
      unitInLS = localStorage.getItem("unit");
    }

    if ((!currencyInLS || !unitInLS) && myProfile._id) {
      fetchData();
    } else {
      dispatch(setcurrentCurrency(currencyInLS || "$"));
      dispatch(setunit(unitInLS || "$"));
    }
  }, [myProfile._id]);


  async function logout() {
    try {
      await axios.post("/api/logOut");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      window.location.reload();
    }
  }
  async function pushToProfile() {
    router.push("/Settings/MyProfile");
  }

  async function pushToSettings(e: any) {
    router.push("/Settings");
  }

  useEffect(() => {
    async function getData2() {
      try {
        let result: any = await axios.post(`/api/getConfigurations`, {
          createdBy: myProfile._id,
        });
        dispatch(setConfigurations(result?.data?.wholeData));
      } catch (error: any) {
        console.log(error);
      }
    }

    if (myProfile._id) getData2();
  }, [myProfile._id]);

  const showToast = () => {
    const options: ToastOptions = {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      pauseOnFocusLoss: false,
    };
    if (global.severity === "success") {
      toast.success(global.alert, options);
    } else {
      toast.error(global.alert, options);
    }
  };
  useEffect(() => {
    let timer: any;
    if (global.alert) {
      showToast();
      timer = setTimeout(() => {
        dispatch(setAlert(null));
        dispatch(setSeverity("success"));
      }, 4000); // Hide after 3 seconds
    }

    return () => {
      clearTimeout(timer);
    };
  }, [global.alert, dispatch]);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width-resp xl:nav-width" : "nav-closed-width"
      } h-[90px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px] flex justify-between items-center border-b-[2px] z-[20] float-end fixed dark:bg-dark1 bg-white right-0 transitions`}
    >
      <div className="absolute">
        <ToastContainer />
      </div>
      <button
        onClick={() => {
          dispatch(setSidebarShowR(!global.sidebarShow));
          dispatch(setSidebarShowTempR(!global.sidebarShowTemp));
        }}
      >
        <Image
          src={bar.src}
          alt=""
          width={0}
          height={0}
          className={`${
            global.sidebarShow ? "w-[90px] 400:w-[70px] 500:w-full" : "w-full"
          } h-full dark:filter dark:brightness-[0] dark:invert cursor-pointer hover:opacity-80`}
        />
      </button>
      <div className="w-[300px] h-fit flex justify-end items-center gap-1 md:gap-4 relative">
        <div
          className="w-[25px] sm:w-[50px] h-[30px] md:h-[50px] dark:bg-dark2 bg-light-grey rounded-lg md:rounded-2xl text-[30px] flex justify-center border-2 border-grey items-center overflow-hidden"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <img
            src={
              myProfile?.profilePic && myProfile?.profilePic !== "noProfile"
                ? myProfile?.profilePic[0] instanceof File
                  ? URL.createObjectURL(myProfile?.profilePic[0])
                  : myProfile?.profilePic
                : account.src
            }
            className={`w-[100%] h-[100%] cursor-pointer`}
          />
          {isOpen && (
            <div className="w-[250px] z-10 dark:bg-dark2 bg-light-grey rounded-lg absolute top-[60px] overflow-hidden right-0 text-[14px] dark:text-white text-black flex flex-col justify-center items-center py-3">
              <button
                className="w-[90%] px-4 py-3 dark:hover:bg-slate-500 hover:bg-gray-200 flex justify-between gap-2 items-center rounded-[10px]"
                onClick={() => {
                  pushToProfile();
                }}
              >
                My Profile
                <Person2Outlined />
              </button>
              <button
                className="w-[90%] px-4 py-3 dark:hover:bg-slate-500 hover:bg-gray-200 flex justify-between gap-2 items-center rounded-[10px]"
                onClick={(e) => {
                  pushToSettings(e);
                }}
              >
                Settings
                <Settings />
              </button>
              <div className="mx-auto mt-2 mb-2 w-[100%] h-[0px] border-t-[1px] border-[#d9d9d9]"></div>
              <button
                className="w-[90%] px-4 py-3 dark:hover:bg-[#FF8C00] hover:bg-[#FF8C00] hover:text-white flex justify-between gap-2 items-center rounded-[10px]"
                onClick={logout}
              >
                Logout <Logout className="translate-x-[2px]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
