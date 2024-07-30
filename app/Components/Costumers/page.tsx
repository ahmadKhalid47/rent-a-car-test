"use client";
import { RootState } from "@/app/store";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import Costumers from "../Costumers";
import { useSelector } from "react-redux";

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
          <Costumers />
        </div>
      </div>
    </div>
  );
}
