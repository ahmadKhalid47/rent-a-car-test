"use client";
import React from "react";
import account from "@/public/account.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAlert,
  setLoginPageR,
  setMyProfileReloader,
  setSeverity,
  setSidebarShowR,
} from "@/app/store/Global";
import { useState } from "react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";
import { Alert } from "@mui/material";
import { MediumLoader, SmallLoader } from "@/app/Components/Loader";
import { setprofilePicR } from "@/app/store/myProfile";
import { TempTypeInputWidth } from "@/app/Components/InputComponents/TypeInput";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Diversity1TwoTone } from "@mui/icons-material";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";
import { FaAsterisk } from "react-icons/fa6";

export default function Profile() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [loading, setLoading] = useState<any>(false);
  const [saveloading, setSaveLoading] = useState<any>(false);
  const [selectedPic, setSelectedPic] = useState<any>("");
  const [oldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [editPopup, setEditPopup] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const router = useRouter();
  async function editPassword(e: any) {
    e.preventDefault();
    console.log(oldPassword);
    console.log(newPassword);
    if (oldPassword === newPassword) {
      dispatch(
        setAlert("New password cannot be the same as the old password.")
      );
      dispatch(setSeverity("error"));
      return;
    }

    try {
      setEditLoading(true);
      let result: any = await axios.post(`/api/updatePassword`, {
        oldPassword,
        newPassword,
        _id: myProfile._id,
      });
      console.log(result?.data);
      if (result?.data?.success) {
        dispatch(setAlert("Password Updated Successfully!"));
        setEditPopup(false);
      } else {
        dispatch(setAlert(result?.data?.error));
        dispatch(setSeverity("error"));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setEditLoading(false);
    }
  }
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission on Enter key
    }
  };

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
          <span className="flex flex-col font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            My Profile
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px]">
              <Link href={"/Settings"} className="hover:underline">
                Settings
              </Link>{" "}
              / My Profile
            </span>{" "}
          </span>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5">
          <div className="w-full h-fit">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8 relative">
              <div className="w-full h-fit py-4 flex justify-between items-center">
                <div className="w-[50%] h-full flex justify-start items-center gap-6">
                  <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full border-2 border-grey dark:bg-dark2 bg-light-grey relative">
                    <img
                      src={
                        selectedPic?.length > 0
                          ? selectedPic
                          : !myProfile?.profilePic || myProfile?.profilePic === "noProfile"
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
                      {myProfile?.name}
                      {/* {myProfile?.lastName} */}
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
                        setEditPopup(true);
                        setOldPassword("");
                        setNewPassword("");
                      }}
                      className="px-2 md:px-0 w-fit md:w-[260px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                    >
                      {loading ? <SmallLoader /> : "Change Password"}
                    </button>
                  </div>
                </div>
              </div>

              



              {myProfile.admin === true ? (
                <AdminProfile />
              ) : myProfile.admin === false ? (
                <UserProfile />
              ) : (
                <MediumLoader />
              )}

              


              {editPopup ? (
                <form
                  onSubmit={editPassword}
                  onKeyDown={handleKeyDown}
                  className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute bg-red-600 top-0 left-0 flex justify-center item-center sm:items-center z-[10]"
                >
                  <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 absolute ">
                    <div
                      className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                    >
                      <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                        {"Old Password"}
                        <FaAsterisk className="text-[6px]" />
                      </label>
                      <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                        <input
                          required={true}
                          type={"password"}
                          minLength={6}
                          maxLength={30}
                          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                          placeholder={`Enter Text Here`}
                          onChange={(e) => {
                            setOldPassword(e.target.value);
                          }}
                          value={oldPassword}
                        />
                      </div>
                    </div>
                    <div
                      className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                    >
                      <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                        {"New Password"}
                        <FaAsterisk className="text-[6px] text-red-600" />
                      </label>
                      <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                        <input
                          required={true}
                          type={"password"}
                          minLength={6}
                          maxLength={30}
                          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                          placeholder={`Enter Text Here`}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          value={newPassword}
                        />
                      </div>
                    </div>

                    <div
                      className={`w-full flex justify-end gap-4 items-center pt-4`}
                    >
                      <button
                        className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                        onClick={() => {
                          setEditPopup(false);
                        }}
                      >
                        <FaTimes />
                      </button>
                      <button
                        className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                        disabled={editLoading}
                        type="submit"
                      >
                        {editLoading ? <SmallLoader /> : "Update and Close"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
