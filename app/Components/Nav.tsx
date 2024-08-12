"use client";
import bar from "@/public/Layer_1 bar.svg";
import account from "@/public/account.svg";
import bell from "@/public/Icon.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setSidebarShowR, setSidebarShowTempR } from "../store/Global";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

export default function Nav() {
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  let dispatch = useDispatch();
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false))
    } else {
      dispatch(setSidebarShowR(true))
    }
  },[isMobile])

  let global = useSelector((state: RootState) => state.Global);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width-resp xl:nav-width" : "nav-closed-width"
      } h-[90px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px] flex justify-between items-center border-b-[2px] z-[20] float-end fixed bg-white right-0 transitions`}
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
          } h-full`}
        />
      </button>
      <div className="w-[300px] h-fit flex justify-end items-center gap-1 md:gap-4">
        <div className="w-[25px] sm:w-[50px] h-[30px] md:h-[50px] bg-light-grey rounded-lg md:rounded-2xl text-[30px] flex justify-center border-2 border-grey items-center">
          <img src={bell.src} className="w-[24px] h-[24px]" />
        </div>
        <div className="w-[25px] sm:w-[50px] h-[30px] md:h-[50px] bg-light-grey rounded-lg md:rounded-2xl text-[30px] flex justify-center border-2 border-grey items-center">
          <img src={account.src} className="w-[26px] h-[26px]" />
        </div>
      </div>
    </div>
  );
}
