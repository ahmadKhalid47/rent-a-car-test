"use client";
import React from "react";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setSidebarShowR, setSeverity } from "@/app/store/Global";
import Info from "./Info";
import axios, { AxiosResponse } from "axios";
import { resetState, setAllValues } from "@/app/store/userProfile";
import { useParams, useRouter } from "next/navigation";
import { MediumLoader, SmallLoader } from "../../Components/Loader";
import Link from "next/link";
import {
  checkPasswordStrength,
  PasswordStrength,
} from "@/app/Components/functions/strengthChecker";
import { FaAsterisk, FaTimes } from "react-icons/fa";

export default function AddUser() {
  const params = useParams();
  const { UserUpdateAction } = params;
  let global = useSelector((state: RootState) => state.Global);
  let User: any = useSelector((state: RootState) => state.userProfile);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [loading, setLoading] = useState<any>(false);
  const [showSuccess, setShowSuccess] = useState(null);
  const [showError, setShowError] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0);
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [editPopup, setEditPopup] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [strength, setStrength] = useState<PasswordStrength>({
    criteria: {
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      specialCharacter: false,
    },
    score: 0,
    message: "",
    guide: "",
  });

  let dispatch = useDispatch();
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  async function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (User.verifyPassword.trim() !== User.password.trim()) {
      dispatch(setAlert("Passwords did not matched"));
      dispatch(setSeverity("error"));
      return;
    }
    if (strength?.score < 3) {
      dispatch(setAlert("Your password is weak"));
      dispatch(setSeverity("error"));
      return;
    }
    try {
      setLoading(true);
      let res: AxiosResponse<any, any> | null = null;
      if (User?.profilePic[0] instanceof File) {
        const formData = new FormData();
        formData.append("files", User.profilePic[0]);
        res = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      let result: any = await axios.post(`/api/saveUser`, {
        ...User,
        profilePic: res?.data?.message,
      });

      if (result?.data?.success) {
        setShowSuccess(result?.data?.success);
        setShowError(null);
        router.push("/Users");
      } else {
        setShowError(result?.data?.error);
        dispatch(setAlert(result?.data?.error));
        dispatch(setSeverity("error"));
        setShowSuccess(null);
      }
      dispatch(setAlert("User Saved Successfully"));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(
          `/api/getUserInfo/${UserUpdateAction}`
        );
        if (result?.data?.data) {
          dispatch(setAllValues(result?.data?.data));
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
        setDeleteTrigger(deleteTrigger + 1);
      }
    }
    if (UserUpdateAction !== "AddNew") {
      getData();
    }
    return () => {
      if (UserUpdateAction !== "AddNew") {
        dispatch(resetState());
      }
    };
  }, []);

  async function updateData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(User.profilePic);
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("files", User.profilePic[0]);
      let res: AxiosResponse<any, any> | null = null;
      if (User?.profilePic[0] instanceof File) {
        res = await axios.post("/api/uploadWithCondition", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await axios.post(`/api/updateUser/${UserUpdateAction}`, {
        ...User,
        profilePic: res?.data?.message,
      });
      router.push("/Users");
      dispatch(setAlert("User Updated Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
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
    if (strength?.score < 3) {
      dispatch(setAlert("Your password is weak"));
      dispatch(setSeverity("error"));
      return;
    }
    try {
      setEditLoading(true);
      let result: any = await axios.post(`/api/updatePasswordByAdmin`, {
        oldPassword,
        newPassword,
        _id: User._id,
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
    const handleChange = () => {
      setStrength(checkPasswordStrength(User.password));
    };
    UserUpdateAction === "AddNew" && handleChange();
  }, [User.password]);

  const handleChange = (e: any) => {
    const pwd = e.target.value;
    setStrength(checkPasswordStrength(pwd));
  };

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
          <span className="flex flex-col font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            Add New User
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-5 md:leading-[21px]">
              <Link href={"/Users"} className="hover:underline">
                Users
              </Link>
              {" / "}
              Add New User
            </span>
          </span>
        </div>
        {UserUpdateAction !== "AddNew" && (
          <div
            className={`w-full h-fit flex justify-end items-center bg-red-30`}
          >
            <button
              onClick={() => {
                setEditPopup(true);
                setOldPassword("");
                setNewPassword("");
                setStrength({
                  criteria: {
                    length: false,
                    lowercase: false,
                    uppercase: false,
                    number: false,
                    specialCharacter: false,
                  },
                  score: 0,
                  message: "",
                  guide: "",
                });
              }}
              className="px-2 md:px-0 w-fit md:w-[260px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
            >
              Change Password
            </button>
          </div>
        )}
        <form
          onSubmit={UserUpdateAction === "AddNew" ? saveData : updateData}
          onKeyDown={handleKeyDown}
          className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-8 flex flex-col justify-start items-start relative mt-5"
        >
          <Info />
          <div
            className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-1 md:gap-3 justify-end items-center`}
          >
            <button
              className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={(e) => {
                e.preventDefault();
                dispatch(resetState());
              }}
            >
              Reset
            </button>
            {UserUpdateAction !== "AddNew" ? (
              <>
                {loading ? (
                  <div className="h-fit md:h-[44px] flex justify-center items-center px-5">
                    <MediumLoader />
                  </div>
                ) : (
                  <>
                    <button
                      className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                      type="submit"
                    >
                      {loading ? <SmallLoader /> : "Update"}
                    </button>
                  </>
                )}
              </>
            ) : (
              <button
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                type="submit"
              >
                {loading ? <SmallLoader /> : "Save"}
              </button>
            )}
          </div>
        </form>

        {editPopup ? (
          <form
            onSubmit={editPassword}
            onKeyDown={handleKeyDown}
            className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-center sm:items-center z-[10]"
          >
            <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 absolute ">
              <div
                className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
              >
                <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                  {"Admin Password"}
                  <FaAsterisk className="text-[6px]" />
                </label>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                  <input
                    required={true}
                    type={"password"}
                    minLength={6}
                    maxLength={30}
                    className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                    placeholder={`Enter Admin Password`}
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
                  {"User New Password"}
                  <FaAsterisk className="text-[6px]" />
                </label>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                  <input
                    required={true}
                    type={"password"}
                    minLength={6}
                    maxLength={30}
                    className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                    placeholder={`Enter New Password`}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      handleChange(e);
                    }}
                    value={newPassword}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start mt-4">
                  {Object.entries(strength.criteria).map(([key, isMet]) => (
                    <label key={key} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={isMet}
                        readOnly
                        className={isMet ? "text-green-600" : "text-red-600"}
                      />
                      <span
                        className={`ml-2 ${
                          isMet ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                        {/* {isMet ? "✔️" : "❌"} */}
                      </span>
                    </label>
                  ))}
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
  );
}
