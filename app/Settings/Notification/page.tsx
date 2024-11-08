"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import axios from "axios";
import { Switch } from "@mui/material";

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const [newCar, setNewCar] = useState(false);
  const [newChauffeur, setNewChauffeur] = useState(false);
  const [newCustomer, setNewCustomer] = useState(false);
  const [newReservation, setNewReservation] = useState(false);
  const [reservationComplete, setReservationComplete] = useState(false);
  const [reservationPending, setReservationPending] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getSortedLeanData", {
          createdBy: myProfile._id,
          modelName: "notificationSetting",
        });

        setNewCar(result?.data?.data?.newCar);
        setNewChauffeur(result?.data?.data?.newChauffeur);
        setNewCustomer(result?.data?.data?.newCustomer);
        setNewReservation(result?.data?.data?.newReservation);
        setReservationComplete(result?.data?.data?.reservationComplete);
        setReservationPending(result?.data?.data?.reservationPending);
      } finally {
      }
    }
    if (myProfile._id) getData();
  }, [myProfile._id]);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%]  flex justify-start items-end">
          <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
            Notifications
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              Settings / Notifications
            </span>
          </span>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5">
          <div className="w-full h-fit">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
                    New Car
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] dark:text-white text-black">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="w-[100px] h-[50px] flex justify-center items-center">
                  <SwitchCom
                    valueKey={"newCar"}
                    value={newCar}
                    setValue={setNewCar}
                  />
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
                    New Chauffeur
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] dark:text-white text-black">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="w-[100px] h-[50px] flex justify-center items-center">
                  <SwitchCom
                    valueKey={"newChauffeur"}
                    value={newChauffeur}
                    setValue={setNewChauffeur}
                  />
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
                    New Customer
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] dark:text-white text-black">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="w-[100px] h-[50px] flex justify-center items-center">
                  <SwitchCom
                    valueKey={"newCustomer"}
                    value={newCustomer}
                    setValue={setNewCustomer}
                  />
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
                    New Reservation
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] dark:text-white text-black">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="w-[100px] h-[50px] flex justify-center items-center">
                  <SwitchCom
                    valueKey={"newReservation"}
                    value={newReservation}
                    setValue={setNewReservation}
                  />
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
                    Reservation Complete
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] dark:text-white text-black">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="w-[100px] h-[50px] flex justify-center items-center">
                  <SwitchCom
                    valueKey={"reservationComplete"}
                    value={reservationComplete}
                    setValue={setReservationComplete}
                  />
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] dark:text-white text-black w-[100%]">
                    Reservation Pending
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] dark:text-white text-black">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="w-[100px] h-[50px] flex justify-center items-center">
                  <SwitchCom
                    valueKey={"reservationPending"}
                    value={reservationPending}
                    setValue={setReservationPending}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SwitchCom({ valueKey, value, setValue }: any) {
  const [loading, setLoading] = useState(false);

  async function setSetting(value: any) {
    try {
      setLoading(true);
      await axios.post(`/api/updateNotification`, {
        value: value,
        valueKey: valueKey,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Switch
      disabled={loading}
      checked={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.checked);
        setSetting(event.target.checked);
      }}
    />
  );
}
