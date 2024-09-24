"use client";
import dynamic from "next/dynamic";
import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { settermsR, setAllValues } from "@/app/store/Agreement";
import { useRouter } from "next/navigation";
import { SmallLoader } from "@/app/Components/Loader";
import axios from "axios";
import React from "react";

// Dynamically import JoditEditor to disable SSR
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  let Agreement = useSelector((state: RootState) => state.Agreement);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const router = useRouter();
  const [loading, setLoading] = useState<any>(false);
  const [saveloading, setSaveLoading] = useState<any>(false);
  const editor = useRef(null);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getAgreement");
        dispatch(setAllValues(result.data.data[0].data));
        console.log(result.data.data[0].data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [global.vehicleDataReloader]);

  async function editItem() {
    try {
      setSaveLoading(true);
      await axios.post(`/api/updateAgreement`, { Agreement });
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
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
        <div className="w-[100%] flex justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            Agreement
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] dark:text-white text-black">
              Settings / Agreement
            </p>
          </h3>
        </div>
        <div className="w-full min-h-[75vh] max-h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5 gap-5">
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full min-h-[60vh] max-h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8 text-black">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black ">
              Terms and Conditions
            </h3>
            <JoditEditor
              ref={editor}
              value={Agreement?.terms}
              onChange={(newContent) => {
                dispatch(settermsR(newContent));
              }}
              className="h-fit font-[400] text-[16px] leading-[19px] w-[90%] dark:bg-dark1 input-color rounded-xl border-grey"
            />
          </div>
          <div
            className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 justify-end items-center gap-4`}
          >
            <button
              onClick={() => {
                router.push("/Settings");
              }}
              className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
            >
              {loading ? <SmallLoader /> : "Cancel"}
            </button>
            <button
              onClick={() => {
                editItem();
              }}
              className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
            >
              {saveloading ? <SmallLoader /> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
