"use client";
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
import { FormEvent, useState } from "react";
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

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [loading, setLoading] = useState<any>(false);
  const [saveloading, setSaveLoading] = useState<any>(false);
  const [selectedPic, setSelectedPic] = useState<any>("");
  const [username, setusername] = useState<any>(myProfile?.username);
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  const addAgent = async (event: FormEvent<HTMLFormElement>) => {
    if (typeof window === "undefined") {
      return;
    }
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    try {
      setLoading(true);
      let result: any = await axios.post(`/api/addAgent`, formDataObj);
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
    }
  };

  async function editItem(username: any) {
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
      let result: any = await axios.post(
        `/api/updateRegistration/${username}`,
        {
          ...myProfile,
          profilePic: res?.data?.message[0],
        }
      );
      console.log(res?.data?.message);
      setusername(myProfile.username);
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
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
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
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            My Profile
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Settings / My Profile
            </p>
          </h3>
        </div>
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5">
          <div className="w-full h-fit">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              <div className="w-full h-fit py-4 flex justify-between items-center">
                <div className="w-[50%] h-full flex justify-start items-center gap-6">
                  <div className="w-[100px] h-[100px] flex justify-center items-center bg-light-grey rounded-full border-2 border-grey bg-light-grey relative">
                    <img
                      src={
                        selectedPic?.length > 0
                          ? selectedPic
                          : myProfile?.profilePic === ""
                          ? account.src
                          : myProfile?.profilePic
                      }
                      className="w-full h-full flex justify-center items-center bg-light-grey rounded-full"
                    />
                    <div className="text-[20px] text-main-blue bg-white w-fit h-fit rounded-full absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] z-[10] flex justify-center items-center overflow-hidden">
                      <FaPlusCircle />
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
                      Alexa Rawles
                    </span>
                    <span className="font-[500] text-[14px] xs:text-[16px] leading-7 sm:leading-[30px]">
                      alexarawles@gmail.com
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
                  className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                >
                  {loading ? <SmallLoader /> : "Cancel"}
                </button>
                <button
                  onClick={() => {
                    editItem(username);
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