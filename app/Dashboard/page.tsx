"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function Vehicles() {
  let myProfile: any = useSelector((state: RootState) => state.myProfile);

  return myProfile.admin === true ? (
    <AdminDashboard />
  // null
  ) : myProfile.admin === false ? (
    <UserDashboard />
  ) : null;
}
