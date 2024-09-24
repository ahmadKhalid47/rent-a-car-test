"use client";
import bar from "@/public/Layer_1 bar.svg";
import account from "@/public/account.svg";
import bell from "@/public/Icon.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setcurrentCurrency,
  setSidebarShowR,
  setSidebarShowTempR,
  setTheme,
} from "../store/Global";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import axios from "axios";
import {
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
import { Logout } from "@mui/icons-material";

export default function Nav() {
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const [loading, setLoading] = useState<any>(false);
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

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getcompanyProfile");
        const profilePic = result?.data?.data?.profilePic;
        const profilePic2 = result?.data?.data?.profilePic2;
        // if (typeof window !== "undefined") {
        //   localStorage.setItem("companyLogo", profilePic);
        //   localStorage.setItem("companyLogo2", profilePic2);
        dispatch(setCompanyLogo([profilePic]));
        dispatch(setCompanyLogo2([profilePic2]));
        // }
      } catch (error) {
        console.error("Error fetching company profile:", error);
      }
    }
    // if (typeof window !== "undefined") {
    //   const storedLogo = localStorage.getItem("companyLogo");
    //   const storedLogo2 = localStorage.getItem("companyLogo2");
    //   if (storedLogo && storedLogo2) {
    //     dispatch(setCompanyLogo([storedLogo]));
    //     dispatch(setCompanyLogo2([storedLogo2]));
    //   } else {
    getData();
    //   }
    // }
  }, [global.companyProfileReloader]);

  useEffect(() => {
    let currencyInLS: any = undefined;
    async function getData() {
      try {
        const result = await axios.post("/api/getGeneralSettings");
        dispatch(setcurrentCurrency(result.data.data[0].currency));
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
    if (!currencyInLS) {
      getData();
    }
    dispatch(setcurrentCurrency(currencyInLS));
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  async function logout() {
    try {
      await axios.post("/api/logOut");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      window.location.reload();
    }
  }

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width-resp xl:nav-width" : "nav-closed-width"
      } h-[90px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px] flex justify-between items-center border-b-[2px] z-[20] float-end fixed dark:bg-dark1 bg-white right-0 transitions`}
    >
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
          } h-full dark:filter dark:brightness-[0] dark:invert`}
        />
      </button>
      <div className="w-[300px] h-fit flex justify-end items-center gap-1 md:gap-4 relative">
        {/* <div className="w-[25px] sm:w-[50px] h-[30px] md:h-[50px] dark:bg-dark2 bg-light-grey rounded-lg md:rounded-2xl text-[30px] flex justify-center border-2 border-grey items-center">
          <img src={bell.src} className="w-[24px] h-[24px]" />
        </div> */}
        <div
          className="w-[25px] sm:w-[50px] h-[30px] md:h-[50px] dark:bg-dark2 bg-light-grey rounded-lg md:rounded-2xl text-[30px] flex justify-center border-2 border-grey items-center overflow-hidden"
          onClick={() => {
            toggleDropdown();
          }}
        >
          <img
            src={
              myProfile?.profilePic !== "" ? myProfile?.profilePic : account.src
            }
            className={`${
              myProfile?.profilePic ? "w-[100%] h-[100%]" : "w-[24px] h-[24px]"
            }`}
          />
          {isOpen && (
            <div className="z-10 dark:bg-dark2 bg-light-grey rounded-lg shadow absolute top-[60px] overflow-hidden right-0 text-md dark:text-white text-black flex flex-col justify-start items-start">
              <button
                className="px-4 py-2 dark:hover:bg-slate-500 dark:hover:bg-slate-500 hover:bg-gray-200 w-full flex justify-start gap-2 items-center"
                onClick={() => {
                  logout();
                }}
              >
                Logout <Logout />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
