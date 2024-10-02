"use client";
import React from "react";
import account from "@/public/account.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setLoginPageR,
  setMyProfileReloader,
  setSidebarShowR,
} from "@/app/store/Global";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";
import { Alert } from "@mui/material";
import { SmallLoader } from "@/app/Components/Loader";
import {
  setprofilePicR,
  setusernameR,
  setfirstNameR,
  setlastNameR,
  setphoneR,
  setemailR,
  setaddressR,
} from "@/app/store/myProfile";
import { TempTypeInputWidth } from "@/app/Components/InputComponents/TypeInput";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Diversity1TwoTone } from "@mui/icons-material";

export default function UserProfile() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [loading, setLoading] = useState<any>(false);
  const [saveloading, setSaveLoading] = useState<any>(false);
  const [selectedPic, setSelectedPic] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  async function editItem(user: any) {
    try {
      let res: AxiosResponse<any, any> | null = null;
      if (myProfile?.profilePic[0] instanceof File) {
        const formData = new FormData();
        formData.append("files", myProfile.profilePic[0]);
        res = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setSaveLoading(true);
      let result: any = await axios.post(`/api/updateRegistration/${user}`, {
        ...myProfile,
        profilePic: res?.data?.message[0],
      });
      console.log(result);
      await axios.post(`/api/changeToken`, {
        username: myProfile.username,
        admin: myProfile.admin,
      });
      dispatch(setMyProfileReloader(global.myProfileReloader + 1));
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
    }
  }
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]; // get the first selected file
    if (file) {
      setSelectedPic(URL.createObjectURL(file)); // create a URL for the selected image
    }
  };

  console.log(myProfile);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      {showError ? (
        <Alert
          variant="filled"
          severity="error"
          className="absolute w-fit z-[100] top-2 right-2 alert-animation capitalize"
        >
          {showError}
        </Alert>
      ) : showSuccess ? (
        <Alert
          variant="filled"
          severity="success"
          className="absolute w-fit z-[100] top-2 right-2 alert-animation capitalize"
        >
          {showSuccess}
        </Alert>
      ) : null}

      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%]  flex justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            My Profile
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px]">
              <Link href={"/Settings"} className="hover:underline">
                Settings
              </Link>{" "}
              / My Profile
            </p>{" "}
          </h3>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5">
          <div className="w-full h-fit">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              <div className="w-full h-fit py-4 flex justify-between items-center">
                <div className="w-[50%] h-full flex justify-start items-center gap-6">
                  <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full border-2 border-grey dark:bg-dark2 bg-light-grey relative">
                    <img
                      src={
                        selectedPic?.length > 0
                          ? selectedPic
                          : myProfile?.profilePic === ""
                          ? account.src
                          : myProfile?.profilePic
                      }
                      className="w-full h-full flex justify-center items-center dark:bg-dark2 bg-light-grey rounded-full"
                    />
                    <div className="text-[25px] text-main-blue dark:bg-dark1 bg-white w-fit h-fit rounded-full absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] z-[10] flex justify-center items-center overflow-hidden">
                      <FaPlusCircle className="dark:bg-white text-main-blue" />
                      <input
                        onChange={(e) => {
                          dispatch(setprofilePicR(e.target.files));
                          handleImageChange(e);
                        }}
                        multiple={false}
                        type="file"
                        className="w-[200%] h-[200%] absolute top-0 opacity-0"
                      />
                    </div>
                  </div>
                  <div className="w-[50%] flex flex-col justify-center items-start">
                    <span className="font-[600] text-[14px] xs:text-[20px] leading-7 sm:leading-[30px]">
                      {myProfile?.firstName} {myProfile?.lastName}
                    </span>
                    <span className="font-[500] text-[14px] xs:text-[16px] leading-7 sm:leading-[30px]">
                      {myProfile?.email}
                    </span>
                  </div>
                </div>
                <div className="w-[50%] h-full flex justify-start items-center gap-6">
                  <div
                    className={`w-full h-fit md:h-[100px] flex flex-wrap gap-y-2 ${"justify-end"} items-center`}
                  >
                    <button
                      onClick={() => {
                        router.push("/");
                        dispatch(setLoginPageR(false));
                      }}
                      className="px-2 md:px-0 w-fit md:w-[260px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                    >
                      {loading ? <SmallLoader /> : "Change Password"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-wrap justify-between items-start">
                <TempTypeInfoShow
                  label={"Username"}
                  value={myProfile.username}
                />
                <TempTypeInfoShow label={"Email"} value={myProfile.email} />
                <TempTypeInfoShow label={"Full Name"} value={myProfile.name} />
                <TempTypeInfoShow
                  label={"Company Name"}
                  value={myProfile.company}
                />
                <TempTypeInfoShow label={"Plan"} value={myProfile.plan} />
                <TempTypeInfoShow label={"Expiry Date"} value={"dd-mm-yyyy"} />
                <TempTypeInfoShow label={"Phone"} value={myProfile.phone} />
                <TempTypeInfoShow label={"City"} value={myProfile.city} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
