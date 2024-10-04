"use client";
import React from "react";
import vip from "@/public/vip.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { TempTypeInput } from "@/app/Components/InputComponents/TypeInput";
import {
  setvatPercentageR,
  setvatIncludeR,
  setpaymentInfoR,
  setadditionalInfoR,
  settermsR,
  setAllValues,
} from "@/app/store/Invoicing";
import { useRouter } from "next/navigation";
import { SmallLoader } from "@/app/Components/Loader";
import axios from "axios";
import Link from "next/link";

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let Invoicing = useSelector((state: RootState) => state.Invoicing);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const router = useRouter();
  const [loading, setLoading] = useState<any>(false);
  const [saveloading, setSaveLoading] = useState<any>(false);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;

    // Split the user's input into lines
    const lines = input.split("\n");

    // Remove existing numbering before adding new numbers
    const cleanLines = lines.map((line) => line.replace(/^\d+\.\s*/, ""));

    // Add line numbers
    const numberedLines = cleanLines
      .map((line, index) => {
        // Only add a number if there's content on the line
        return line.trim() ? `${index + 1}. ${line}` : "";
      })
      .join("\n");

    dispatch(settermsR(numberedLines));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle backspace so that it doesn't get stuck on numbers
    if (e.key === "Backspace") {
      const { selectionStart, selectionEnd } = e.currentTarget;
      const lines = Invoicing?.terms.split("\n");
      const currentLine = lines[selectionStart ? selectionStart - 1 : 0];

      // If backspace is pressed on an empty line number, allow the number to be deleted
      if (currentLine && currentLine.match(/^\d+\.\s*$/)) {
        e.preventDefault(); // Prevent the default behavior
        const newText =
          Invoicing?.terms.substring(0, selectionStart - currentLine.length) +
          Invoicing?.terms.substring(selectionEnd);
        dispatch(settermsR(newText));
      }
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getInvoicing", {
          createdBy: myProfile._id,
        });
        dispatch(setAllValues(result.data.data[0].data));
        console.log(result.data.data[0].data);
      } catch (error) {
        console.log(error);
      }
    }
    if (myProfile._id) getData();
  }, [global.vehicleDataReloader, myProfile._id]);

  async function editItem() {
    try {
      setSaveLoading(true);
      await axios.post(`/api/updateInvoicing`, {
        Invoicing,
        createdBy: myProfile._id,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
    }
  }

  function lengthMeasure(content: any) {
    let contentArray = content.split("").length;
    console.log(contentArray);
    return contentArray;
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
          <span className="flex flex-col font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            Invoicing
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px]">
              <Link href={"/Settings"} className="hover:underline">
                Settings
              </Link>{" "}
              / Invoicing
            </span>{" "}
          </span>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5 gap-5">
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black ">
              Payment Information{" "}
            </h3>
            <div className="flex justify-start items-center gap-x-[4%] gap-y-5 w-full h-fit">
              <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  {"Payment Method"}
                </label>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                  <textarea
                    className="py-3 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                    placeholder={`Enter Payment Method`}
                    rows={6}
                    cols={6}
                    value={Invoicing.paymentInfo}
                    onChange={(e) => {
                      dispatch(setpaymentInfoR(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black ">
              Additional Information
            </h3>
            <div className="flex justify-start items-center gap-x-[4%] gap-y-5 w-full h-fit">
              <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="w-full flex justify-between gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  {"Additional information in invoice."}
                  <span
                    className={`flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] ${
                      lengthMeasure(
                        Invoicing?.additionalInfo
                          ? Invoicing.additionalInfo
                          : ""
                      ) === 250
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {lengthMeasure(
                      Invoicing?.additionalInfo ? Invoicing.additionalInfo : ""
                    )}
                    / 250
                  </span>
                </label>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                  <textarea
                    className="py-3 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                    placeholder={`Enter Additional information in invoice.`}
                    rows={6}
                    cols={6}
                    maxLength={250}
                    onChange={(e) => {
                      dispatch(setadditionalInfoR(e.target.value));
                    }}
                    value={Invoicing?.additionalInfo}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full h-fit dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black ">
              Terms and Conditions
            </h3>
            <div className="flex justify-start items-center gap-x-[4%] gap-y-5 w-full h-fit">
              <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="w-full flex justify-between gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  {"Please specify terms and conditions."}
                  <span
                    className={`flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px] ${
                      lengthMeasure(Invoicing?.terms ? Invoicing.terms : "") ===
                      700
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {lengthMeasure(Invoicing?.terms ? Invoicing.terms : "")} /
                    700
                  </span>
                </label>

                <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                  <textarea
                    className="py-3 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                    placeholder={`Enter terms and conditions.`}
                    rows={6}
                    cols={6}
                    maxLength={700}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={Invoicing?.terms}
                  />
                </div>
              </div>
            </div>
          </div>
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
  );
}
