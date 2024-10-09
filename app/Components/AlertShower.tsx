"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setAlert,
  setSeverity,
} from "../store/Global";
import { useEffect } from "react";
import { Alert } from "@mui/material";

export default function AlertShower() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  

  useEffect(() => {
    let timer: any;
    if (global.alert) {
      timer = setTimeout(() => {
        dispatch(setAlert(null));
        dispatch(setSeverity("success"));
      }, 4000); // Hide after 3 seconds
    }

    return () => {
      clearTimeout(timer); // Clean up the timer
    };
  }, [global.alert, dispatch]);

  return (
    <div
      className={`w-[100vw] h-[90px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px] flex justify-between items-center z-[20] float-end fixed bg-transparent right-0 transitions`}
    >
      {global.alert ? (
        <Alert
          variant="filled"
          severity={global.severity as "success" | "error" | "info" | "warning"}
          className="fixed w-fit z-[100] top-2 right-2 alert-animation capitalize"
        >
          {global.alert}
        </Alert>
      ) : null}
    </div>
  );
}
