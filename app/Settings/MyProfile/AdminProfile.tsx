"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import {
  setMyProfileReloader,
  setSidebarShowR,
} from "@/app/store/Global";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { SmallLoader } from "@/app/Components/Loader";
import {
  setusernameR,
  setfirstNameR,
  setlastNameR,
  setphoneR,
  setemailR,
  setaddressR,
} from "@/app/store/myProfile";
import { TempTypeInputWidth } from "@/app/Components/InputComponents/TypeInput";
import { useRouter } from "next/navigation";

export default function AdminProfile() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [loading, setLoading] = useState<any>(false);
  const [saveloading, setSaveLoading] = useState<any>(false);
  const router = useRouter();

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
console.log("admin");

  return (
    <>
      <TempTypeInputWidth
        setState={setusernameR}
        label={"Username"}
        value={myProfile.username}
        required={false}
        type={"text"}
        widthProp="sm:w-[30.66%]"
      />
      <TempTypeInputWidth
        setState={setfirstNameR}
        label={"First Name"}
        value={myProfile.firstName}
        required={false}
        type={"text"}
        widthProp="sm:w-[30.66%]"
      />
      <TempTypeInputWidth
        setState={setlastNameR}
        label={"Last Name"}
        value={myProfile.lastName}
        required={false}
        type={"text"}
        widthProp="sm:w-[30.66%]"
      />
      <TempTypeInputWidth
        setState={setphoneR}
        label={"Phone"}
        value={myProfile.phone}
        required={false}
        type={"number"}
        widthProp="sm:w-[30.66%]"
      />
      <TempTypeInputWidth
        setState={setemailR}
        label={"Email"}
        value={myProfile.email}
        required={false}
        type={"email"}
        widthProp="sm:w-[30.66%]"
      />
      <TempTypeInputWidth
        setState={setaddressR}
        label={"Address"}
        value={myProfile.address}
        required={false}
        type={"text"}
        widthProp="sm:w-[30.66%]"
      />
      <div
        className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 ${"justify-end"} items-center gap-4`}
      >
        <button
          onClick={() => {
            router.push("/Settings");
          }}
          className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
        >
          {loading ? <SmallLoader /> : "Cancel"}
        </button>
        <button
          onClick={() => {
            editItem(myProfile.user);
          }}
          className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
        >
          {saveloading ? <SmallLoader /> : "Save"}
        </button>
      </div>
    </>
  );
}
