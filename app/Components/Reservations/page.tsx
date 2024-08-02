"use client";
import { RootState } from "@/app/store";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import Reservations from "../Reservations";

export default function Home() {
  let global = useSelector((state: RootState) => state.Global);
  return (
    <div className="w-full">
      <div className="flex justify-start items-start relative flex-wrap">
        <Sidebar />
        <Nav />
        <div
          className={`${
            global.sidebarShow ? "nav-width" : "nav-closed-width"
          } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
        >
          <Reservations />
        </div>
      </div>
    </div>
  );
}
