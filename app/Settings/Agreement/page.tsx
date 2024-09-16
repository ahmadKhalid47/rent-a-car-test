"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { TempTypeInput } from "@/app/Components/InputComponents/TypeInput";
import { settermsR, setAllValues } from "@/app/store/Agreement";
import { useRouter } from "next/navigation";
import { SmallLoader } from "@/app/Components/Loader";
import axios from "axios";
import React from "react";
import JoditEditor from "jodit-react";

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
  console.log(Agreement?.terms);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={` w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%]  flex justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Agreement
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Settings / Agreement
            </p>
          </h3>
        </div>
        <div className="w-full min-h-[75vh] max-h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5 gap-5">
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full min-h-[60vh] max-h-fit bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
              Terms and Conditions
            </h3>
            {/* <textarea
              className="min-h-[50vh] max-h-fit py-3 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] flex justify-between items-center input-color rounded-xl border-2 border-grey"
              placeholder={`Enter terms and conditions.`}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                handleChange(e);
              }}
              value={Agreement?.terms}
            /> */}
            <JoditEditor
              ref={editor}
              value={Agreement?.terms}
              onChange={(newContent) => {
                dispatch(settermsR(newContent));
              }}
              className="h-fit font-[400] text-[16px] leading-[19px] w-[90%] input-color rounded-xl border-grey"
            />
          </div>
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
  );
}
