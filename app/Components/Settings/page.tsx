"use client";
import { RootState } from "@/app/store";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import Settings from "../Settings";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";

export default function Home() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  return (
    // <div className="w-full">
    //   <div className="flex justify-start items-start relative flex-wrap">
    //     <Sidebar />
    //     <Nav />
        <div
          className={`${
            global.sidebarShow ? "nav-width" : "nav-closed-width"
          } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
        >
          <Settings />
        </div>
    //   </div>
    // </div>
  );
}
