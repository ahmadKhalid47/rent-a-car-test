"use client";
import React from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";

export default function Sidebar() {
  let myProfile: any = useSelector((state: RootState) => state.myProfile);

  return myProfile.admin === true ? (
    <AdminSidebar />
  ) : myProfile.admin === false ? (
    <UserSidebar />
  ) : null;
}
