"use client";
import React from "react";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setSidebarShowR } from "@/app/store/Global";
import Info from "./Info";
import axios, { AxiosResponse } from "axios";
import { resetState, setAllValues } from "@/app/store/chauffeur";
import { useParams, useRouter } from "next/navigation";
import { SmallLoader } from "../../Components/Loader";
import Link from "next/link";

export default function AddUser() {
  const params = useParams();
  const { UserUpdateAction } = params;
  let global = useSelector((state: RootState) => state.Global);
  let User: any = useSelector((state: RootState) => state.userProfile);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [loading, setLoading] = useState<any>(false);
  const [showSuccess, setShowSuccess] = useState(null);
  const [showError, setShowError] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0);
  const router = useRouter();

  let dispatch = useDispatch();
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  async function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (User.verifyPassword.trim() !== User.password.trim()) {
      dispatch(setAlert("Passwords did not matched"));
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
      } else {
        setShowError(result?.data?.error);
        setShowSuccess(null);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      // router.push("/Users");
    }
  }
  useEffect(() => {
    dispatch(resetState());
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(
          `/api/getUserInfo/${UserUpdateAction}`
        );
        if (result?.data?.data) {
          dispatch(setAllValues(result?.data?.data?.data));
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
  }, []);
  console.log(User);

  async function updateData(action: string) {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("files", User.UserImage[0]);
      const res = await axios.post("/api/uploadWithCondition", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const formData2 = new FormData();
      for (let i = 0; i < User.passportImages.length; i++) {
        formData2.append("files", User.passportImages[i]);
      }
      const res2 = await axios.post("/api/uploadWithCondition", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const formData3 = new FormData();
      for (let i = 0; i < User.licenseImages.length; i++) {
        formData3.append("files", User.licenseImages[i]);
      }
      const res3 = await axios.post("/api/uploadWithCondition", formData3, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await axios.post(`/api/updateUser/${UserUpdateAction}`, {
        ...User,
        UserImage: res?.data?.message,
        passportImages: res2?.data?.message,
        licenseImages: res3?.data?.message,
      });

      if (action === "close") {
        router.push("/Users");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

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
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            Add New User
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px]">
              <Link href={"/Users"} className="hover:underline">
                Users
              </Link>
              {" / "}
              Add New User
            </p>
          </h3>
        </div>
        <form
          onSubmit={saveData}
          onKeyDown={handleKeyDown}
          className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-8 flex flex-col justify-start items-start relative mt-5"
        >
          <Info />
          <div
            className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 justify-between items-center`}
          >
            <div className="w-[50%] flex justify-start item-center gap-1 md:gap-3">
              <button
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(resetState());
                }}
              >
                Reset
              </button>
            </div>
            <button
              className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
