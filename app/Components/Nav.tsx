"use client";
import bar from "@/public/Layer_1 bar.svg";
import account from "@/public/account.svg";
import bell from "@/public/Icon.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSidebarShowR, setSidebarShowTempR } from "../store/Global";
import { RootState } from "../store";
export default function Nav() {
  let global = useSelector((state: RootState) => state.Global);

  let dispatch = useDispatch();
  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } h-[90px] pe-[50px] ps-[20px] flex justify-between items-center border-b-[2px] z-[10] float-end fixed bg-white right-0 transitions`}
    >
      <button
        onClick={() => {
          dispatch(setSidebarShowR(!global.sidebarShow));
          dispatch(setSidebarShowTempR(!global.sidebarShowTemp));
        }}
      >
        <img src={bar.src} />
      </button>

      <div className="w-[300px] h-fit flex justify-end items-center gap-4">
        <div className="w-[50px] h-[50px] bg-light-grey rounded-2xl text-[30px] flex justify-center border-2 border-grey items-center">
          <img src={bell.src} className="w-[24px] h-[24px]" />
        </div>
        <div className="w-[50px] h-[50px] bg-light-grey rounded-2xl text-[30px] flex justify-center border-2 border-grey items-center">
          <img src={account.src} className="w-[26px] h-[26px]" />
        </div>
      </div>
    </div>
  );
}
