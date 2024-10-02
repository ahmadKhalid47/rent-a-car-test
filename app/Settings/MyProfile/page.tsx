"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";
import { MediumLoader } from "@/app/Components/Loader";

export default function AddUser() {
  let myProfile: any = useSelector((state: RootState) => state.myProfile);

  return myProfile.admin === true ? (
    <AdminProfile />
  ) : myProfile.admin === false ? (
    <UserProfile />
  ) : (
    <MediumLoader />
  );
}
