"use client";
import bar from "@/public/car.svg";
import Link from "next/link";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function Sidebar() {
  let global = useSelector((state: RootState) => state.Global);
  console.log(global);

  return (
    <div
      className={`${
        global.sidebarShow ? "w-[300px]" : "w-[120px]"
      } sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-0`}
    >
      <div className="w-full h-[90px] bg-white flex justify-center items-cente border-b-[2px]">
        <Link href={"/Components/Home"} className="w-fit h-fit">
          <img
            src={bar.src}
            className={`${
              global.sidebarShow ? "w-[124px] h-[37px]" : "w-[87px] h-[25px]"
            } mt-[30px]`}
          />
        </Link>
      </div>
    </div>
  );
}
