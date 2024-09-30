"use client";
import bar from "@/public/Layer_1 bar.svg";
import account from "@/public/account.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setAlert,
  setcurrentCurrency,
  setSidebarShowR,
  setSidebarShowTempR,
  setTheme,
} from "../store/Global";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  set_idR,
  setaddressR,
  setadminR,
  setemailR,
  setfirstNameR,
  setlastNameR,
  setphoneR,
  setprofilePicR,
  setusernameR,
  setuserR,
} from "../store/myProfile";
import {
  setprofilePicR as setCompanyLogo,
  setprofilePic2R as setCompanyLogo2,
} from "../store/companyProfile";
import { Logout, Person2Outlined, Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";

export default function Nav() {
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
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
    if (storedTheme) {
      dispatch(setTheme(storedTheme as "light" | "dark"));
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
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
        setLoading(true);
        const result = await axios.post(
          `/api/getRegistration/${myProfile.user}`,
          {
            username: myProfile.user,
            email: myProfile.email,
          }
        );
        dispatch(setprofilePicR(result?.data?.data?.profilePic));
        dispatch(setemailR(result?.data?.data?.email));
        dispatch(setphoneR(result?.data?.data?.phone));
        dispatch(setfirstNameR(result?.data?.data?.firstName));
        dispatch(setlastNameR(result?.data?.data?.lastName));
        dispatch(setaddressR(result?.data?.data?.address));
        dispatch(setusernameR(result?.data?.data.username));
        dispatch(setadminR(result?.data?.data.admin));
        dispatch(set_idR(result?.data?.data._id));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const result = await axios.post("/api/getcompanyProfile", {
  //         createdBy: myProfile._id,
  //       });
  //       const profilePic = result?.data?.data?.profilePic;
  //       const profilePic2 = result?.data?.data?.profilePic2;
  //       dispatch(setCompanyLogo([profilePic]));
  //       dispatch(setCompanyLogo2([profilePic2]));
  //     } catch (error) {
  //       console.error("Error fetching company profile:", error);
  //     }
  //   }
  //   if (myProfile._id) getData();
  // }, [myProfile._id,global.companyProfileReloader]);
  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getcompanyProfile", {
          createdBy: myProfile._id,
          // createdBy: "66bb08c424d4ea013c61db3d",
        });
        const profilePic = result?.data?.data?.profilePic;
        const profilePic2 = result?.data?.data?.profilePic2;
        if (typeof window !== "undefined") {
          localStorage.setItem("companyLogo", profilePic);
          localStorage.setItem("companyLogo2", profilePic2);
          dispatch(setCompanyLogo([profilePic]));
          dispatch(setCompanyLogo2([profilePic2]));
        }
      } catch (error) {
        console.error("Error fetching company profile:", error);
      }
    }
    if (typeof window !== "undefined") {
      const storedLogo = localStorage.getItem("companyLogo");
      const storedLogo2 = localStorage.getItem("companyLogo2");
      if (storedLogo && storedLogo2) {
        dispatch(setCompanyLogo([storedLogo]));
        dispatch(setCompanyLogo2([storedLogo2]));
      } else {
        if (myProfile._id) getData();
      }
    }
  }, [myProfile._id, global.companyProfileReloader]);

  useEffect(() => {
    let currencyInLS: any = undefined;
    async function getData() {
      try {
        const result = await axios.post("/api/getGeneralSettings", {
          createdBy: myProfile._id,
        });
        dispatch(
          setcurrentCurrency(
            result.data.data[0].currency ? result.data.data[0].currency : "$"
          )
        );
        if (typeof window !== "undefined") {
          localStorage.setItem("currency", result.data.data[0].currency);
          let value = localStorage.getItem("currency");
          currencyInLS = value;
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (typeof window !== "undefined") {
      let value = localStorage.getItem("currency");
      currencyInLS = value;
    }
    if (!currencyInLS && myProfile._id) {
      getData();
    }
    dispatch(setcurrentCurrency(currencyInLS ? currencyInLS : "$"));
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
  async function pushToSettings() {
    router.push("/Settings");
  }
  useEffect(() => {
    let timer: any;
    if (global.alert) {
      timer = setTimeout(() => {
        dispatch(setAlert(null));
      }, 4000); // Hide after 3 seconds
    }

    return () => {
      clearTimeout(timer); // Clean up the timer
    };
  }, [global.alert, dispatch]);
  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width-resp xl:nav-width" : "nav-closed-width"
      } h-[90px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px] flex justify-between items-center border-b-[2px] z-[20] float-end fixed dark:bg-dark1 bg-white right-0 transitions`}
    >
      {global.alert ? (
        <Alert
          variant="filled"
          severity="success"
          className="fixed w-[200px] z-[100] top-2 right-2 alert-animation capitalize"
        >
          {global.alert}
        </Alert>
      ) : null}

      <button
        onClick={() => {
          dispatch(setSidebarShowR(!global.sidebarShow));
          dispatch(setSidebarShowTempR(!global.sidebarShowTemp));
        }}
      >
        <img
          src={bar.src}
          className={`${
            global.sidebarShow ? "w-[90px] 400:w-[70px] 500:w-full" : "w-full"
          } h-full dark:filter dark:brightness-[0] dark:invert cursor-pointer`}
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
              myProfile?.profilePic !== "" ? myProfile?.profilePic : account.src
            }
            className={`${
              myProfile?.profilePic ? "w-[100%] h-[100%]" : "w-[24px] h-[24px]"
            } cursor-pointer`}
          />
          {isOpen && (
            <div className="w-[250px] z-10 dark:bg-dark2 bg-light-grey rounded-lg shadow absolute top-[60px] overflow-hidden right-0 text-[14px] dark:text-white text-black flex flex-col justify-center items-center py-3">
              <button
                className="w-[90%] px-4 py-3 dark:hover:bg-slate-500 hover:bg-gray-200 flex justify-between gap-2 items-center rounded-[10px]"
                onClick={pushToProfile}
              >
                My Profile
                <Person2Outlined />
              </button>
              <button
                className="w-[90%] px-4 py-3 dark:hover:bg-slate-500 hover:bg-gray-200 flex justify-between gap-2 items-center rounded-[10px]"
                onClick={pushToSettings}
              >
                Settings
                <Settings />
              </button>
              <div className="mx-auto mt-2 mb-2 w-[100%] h-[0px] border-t-[1px] border-[#d9d9d9]"></div>
              <button
                className="w-[90%] px-4 py-3 dark:hover:bg-slate-500 hover:bg-gray-200 flex justify-between gap-2 items-center rounded-[10px]"
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
