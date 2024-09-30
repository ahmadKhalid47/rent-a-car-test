import React from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function Loader() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center absolute top-0">
      <div className="loader"></div>
    </div>
  );
}

export function MediumLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
}

export function TextLoader() {
  return (
    <div className="w-full h-full flex justify-start items-center">
      <div className="loader"></div>
    </div>
  );
}

export function SmallLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="loader2">
        <div className="dot" />
      </div>
    </div>
  );
}

export function SideBarLoader() {
  const global = useSelector((state: RootState) => state.Global);

  return (
    <>
      <style jsx>{`
        .skeleton {
          background-color: #e0e0e0;
          border-radius: 10px;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

      <div
        className={`${
          global.sidebarShow ? "w-[250px] sm:w-[300px]" : "w-[70px]"
        } sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-[100] dark:bg-dark1 bg-white xl:z-0 transitions`}
      >
        <div className="w-full h-[90px] dark:bg-dark1 bg-white flex justify-center border-b-[2px] transitions">
          <div
            className={`skeleton ${
              global.sidebarShow ? "w-[124px] h-[40px]" : "w-[60px] h-[25px]"
            } mt-[30px]`}
          />
        </div>
        <div
          className={`w-full h-[calc(100vh-90px)] pt-7 ${
            global.sidebarShow ? "px-3 sm:px-3" : "px-1"
          } flex flex-col justify-start items-center gap-[2px] overflow-auto transitions`}
        >
          <div className={`skeleton w-full h-[49px]`} />
          <div className={`skeleton w-full h-[49px]`} />
          <div className={`skeleton w-full h-[49px]`} />
          <div className={`skeleton w-full h-[49px]`} />
        </div>
      </div>
    </>
  );
}
