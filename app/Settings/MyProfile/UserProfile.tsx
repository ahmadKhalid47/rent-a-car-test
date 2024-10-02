"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function UserProfile() {
  let myProfile: any = useSelector((state: RootState) => state.myProfile);

  return (
    <div className="w-full flex flex-wrap justify-between items-start">
      <TempTypeInfoShow label={"Username"} value={myProfile.username} />
      <TempTypeInfoShow label={"Email"} value={myProfile.email} />
      <TempTypeInfoShow label={"Full Name"} value={myProfile.name} />
      <TempTypeInfoShow label={"Company Name"} value={myProfile.company} />
      <TempTypeInfoShow label={"Plan"} value={myProfile.plan} />
      <TempTypeInfoShow label={"Expiry Date"} value={"dd-mm-yyyy"} />
      <TempTypeInfoShow label={"Phone"} value={myProfile.phone} />
      <TempTypeInfoShow label={"City"} value={myProfile.city} />
    </div>
  );
}

export const TempTypeInfoShow = ({ label, value }: any) => {
  return (
    <div
      className={`w-[100%] sm:w-[43%] h-fit flex justify-start items-start gap-1`}
    >
      <div className="w-full h-fit flex justify-between items-start py-4 border-b-[2px]">
        <span className="font-[400] text-[18px] leading-[27px]">{label}:</span>
        <span className="text-end font-[400] text-[18px] leading-[27px]">
          {value}
        </span>
      </div>
    </div>
  );
};
