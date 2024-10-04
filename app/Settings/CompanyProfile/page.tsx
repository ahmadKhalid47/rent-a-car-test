"use client";
import React from "react";
import account from "@/public/account.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setcompanyProfileReloader, setSidebarShowR } from "@/app/store/Global";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";
import { Alert } from "@mui/material";
import { SmallLoader } from "@/app/Components/Loader";
import { setprofilePic2R, setprofilePicR } from "@/app/store/companyProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  let companyProfile: any = useSelector(
    (state: RootState) => state.companyProfile
  );
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [loading, setLoading] = useState<any>(false);
  const [saveloading, setSaveLoading] = useState<any>(false);
  const [selectedPic, setSelectedPic] = useState<any>("");
  const [selectedPic2, setSelectedPic2] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  async function editItem() {
    try {
      setSaveLoading(true);
      let res: AxiosResponse<any, any> | null = null;
      const formData = new FormData();
      formData.append("files", companyProfile.profilePic[0]);
      res = await axios.post("/api/uploadWithCondition", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let res2: AxiosResponse<any, any> | null = null;
      const formData2 = new FormData();
      formData2.append("files", companyProfile.profilePic2[0]);
      res2 = await axios.post("/api/uploadWithCondition", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await axios.post(`/api/updatecompanyProfile`, {
        profilePic: res?.data?.message[0],
        profilePic2: res2?.data?.message[0],
        createdBy: myProfile._id,
      });
      localStorage.setItem("companyLogo", res?.data?.message[0]);
      localStorage.setItem("companyLogo2", res2?.data?.message[0]);
      dispatch(setcompanyProfileReloader(global.companyProfileReloader + 1));
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
    }
  }
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPic(URL.createObjectURL(file));
    }
  };
  const handleImageChange2 = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPic2(URL.createObjectURL(file));
    }
  };
  console.log(companyProfile);

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
            Company Profile
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px]">
              <Link href={"/Settings"} className="hover:underline">
                Settings
              </Link>{" "}
              / Company Profile
            </p>{" "}
          </h3>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5">
          <div className="w-full h-fit">
            <div className="flex flex-wrap justify-start items-start gap-x-8 gap-y-5 w-full h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black ">
                Update Brand Logos
              </h3>
              <div className="w-[250px] h-[250px] flex justify-center items-center dark:bg-dark1 bg-white rounded-ful relative">
                <img
                  src={
                    selectedPic?.length > 0
                      ? selectedPic
                      : companyProfile?.profilePic === ""
                      ? account.src
                      : companyProfile?.profilePic
                  }
                  className="w-full h-full flex justify-center items-center bg-light-grey rounded-ful"
                />
                <div className="text-[50px] text-main-blue dark:bg-dark1 bg-white w-fit h-fit rounded-full absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] z-[10] flex justify-center items-center overflow-hidden">
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
              {/* <div className="w-[250px] h-[250px] flex justify-center items-center dark:bg-dark1 bg-white rounded-ful relative">
                <img
                  src={
                    selectedPic2?.length > 0
                      ? selectedPic2
                      : companyProfile?.profilePic2 === ""
                      ? account.src
                      : companyProfile?.profilePic2
                  }
                  className="w-full h-full flex justify-center items-center bg-light-grey rounded-ful"
                />
                <div className="text-[50px] text-main-blue dark:bg-dark1 bg-white w-fit h-fit rounded-full absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] z-[10] flex justify-center items-center overflow-hidden">
                  <FaPlusCircle className="dark:bg-white text-main-blue" />
                  <input
                    onChange={(e) => {
                      dispatch(setprofilePic2R(e.target.files));
                      handleImageChange2(e);
                    }}
                    multiple={false}
                    type="file"
                    className="w-[200%] h-[200%] absolute top-0 opacity-0"
                  />
                </div>
              </div> */}
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
                    editItem();
                  }}
                  className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                >
                  {saveloading ? <SmallLoader /> : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
