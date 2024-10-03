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
        className={`w-full h-[calc(100vh-90px)] pt-7 ${
          global.sidebarShow ? "px-3 sm:px-3" : "px-1"
        } flex flex-col justify-start items-center gap-[2px] overflow-auto transitions`}
      >
        <div className={`skeleton w-full h-[49px]`} />
        <div className={`skeleton w-full h-[49px]`} />
        <div className={`skeleton w-full h-[49px]`} />
        <div className={`skeleton w-full h-[49px]`} />
      </div>
    </>
  );
}
