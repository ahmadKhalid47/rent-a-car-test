"use client";
import React from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";
import { SideBarLoader } from "./Loader";
import { setSidebarShowR } from "../store/Global";
import Link from "next/link";
import Logo from "@/public/CarRentalDashboard.svg";
import Image from "next/image";

export default function Sidebar() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();

  return (
    <div
      className={`${
        global.sidebarShow ? "w-[250px] sm:w-[250px]" : "w-[70px]"
      } sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-[100] dark:bg-dark1 bg-white xl:z-0 transitions`}
      onMouseEnter={() => dispatch(setSidebarShowR(true))}
      onMouseLeave={() =>
        dispatch(setSidebarShowR(global.sidebarShowTemp ? true : false))
      }
    >
      <div className="w-full h-[90px] dark:bg-dark1 bg-white flex justify-center border-b-[2px] transitions">
        <div className="w-full h-full flex justify-center items-center">
          <Link href={"/Dashboard"} className="w-fit h-fit">
            <Image
              alt=""
              width={global.sidebarShow ? 172 : 60}
              height={global.sidebarShow ? 60 : 25}
              
              src={Logo.src}
            />
          </Link>
        </div>
      </div>

      {myProfile.admin === true ? (
        <AdminSidebar />
      ) : myProfile.admin === false ? (
        <UserSidebar />
      ) : (
        <SideBarLoader />
      )}
    </div>
  );
}
