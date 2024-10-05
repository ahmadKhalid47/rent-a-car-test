"use client";
import React, { useState } from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { SmallLoader } from "@/app/Components/Loader";
import { useRouter } from "next/navigation";
import { setAlert, setMyProfileReloader } from "@/app/store/Global";
import axios, { AxiosResponse } from "axios";

export default function UserProfile() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<any>(false);
  const [saveloading, setSaveLoading] = useState<any>(false);

  async function editItem(user: any) {
    try {
      setSaveLoading(true);
      let res: AxiosResponse<any, any> | null = null;
      if (myProfile?.profilePic && myProfile?.profilePic[0] instanceof File) {
        const formData = new FormData();
        formData.append("files", myProfile.profilePic[0]);
        res = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
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
      dispatch(setAlert("Profile Updated Successfully!"));
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-wrap justify-between items-start">
      <TempTypeInfoShow label={"Username"} value={myProfile.username} />
      <TempTypeInfoShow label={"Email"} value={myProfile.email} />
      <TempTypeInfoShow label={"Full Name"} value={myProfile.name} />
      <TempTypeInfoShow label={"Company Name"} value={myProfile.company} />
      <TempTypeInfoShow label={"Plan"} value={myProfile.plan} />
      <TempTypeInfoShow label={"Expiry Date"} value={"dd-mm-yyyy"} />
      <TempTypeInfoShow label={"Phone"} value={myProfile.phone} />
      <TempTypeInfoShow label={"City"} value={myProfile.city} />
      {myProfile?.profilePic && myProfile?.profilePic[0] instanceof File && (
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
      )}
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
