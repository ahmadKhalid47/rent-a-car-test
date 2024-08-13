"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { TypeInputWidth } from "../../InputComponents/TypeInput";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { SmallLoader } from "@/app/Components/Loader";

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [loading, setLoading] = useState<any>(false);
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
          className="absolute w-fit z-[100] top-2 right-2 fade-ou capitalize"
        >
          {showError}
        </Alert>
      ) : showSuccess ? (
        <Alert
          variant="filled"
          severity="success"
          className="absolute w-fit z-[100] top-2 right-2 fade-ou capitalize"
        >
          {showSuccess}
        </Alert>
      ) : null}

      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%]  flex justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Add New User
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Users / Add New User
            </p>
          </h3>
        </div>
        <form
          onSubmit={addAgent}
          className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-8 flex flex-col justify-start items-start relative mt-5"
        >
          <div className="w-full h-fit  ">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              <TypeInputWidth
                label={"User Name"}
                value={""}
                required={true}
                type={"text"}
                widthProp="sm:w-[48%]"
              />
              <TypeInputWidth
                label={"Password"}
                value={""}
                required={true}
                type={"text"}
                widthProp="sm:w-[48%]"
              />
              <TypeInputWidth
                label={"Email"}
                value={""}
                required={true}
                type={"email"}
                widthProp="sm:w-[48%]"
              />
            </div>
          </div>

          <div
            className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 ${"justify-end"} items-center`}
          >
            <button
              type="submit"
              className="px-2 md:px-0 w-fit md:w-[240px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
            >
              {loading ? <SmallLoader /> : "Save and Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
