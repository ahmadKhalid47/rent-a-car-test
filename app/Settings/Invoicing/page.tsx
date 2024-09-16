"use client";
import vip from "@/public/vip.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import axios from "axios";
import { TempTypeInput } from "@/app/Components/InputComponents/TypeInput";

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [currencies, setCurrencies] = useState<any>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<any>([]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%]  flex justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Invoicing
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Settings / Invoicing
            </p>
          </h3>
        </div>
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5 gap-5">
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full h-fit bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
              VAT Percentage
            </h3>
            <div className="flex justify-start items-center gap-x-[4%] gap-y-5 w-full h-fit">
              <div className="w-[100%] sm:w-[48%] lg:w-[22%] h-fit bg-red-30 flex flex-col justify-start items-start gap-0 sm:gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[0px] sm:text-[14px] leading-[0px] sm:leading-[17px] text-transparent">
                  VIP Client
                </label>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                  <div className="pe- font-[400] text-[14px] leading-[17px] ps-2 w-[100%] h-[43px] flex  justify-start gap-2 items-center bg-white ">
                    <input
                      type="checkbox"
                      // checked={customer.isVip}
                      className="mr-2 font-[400] text-[16px] leading-[19px] ps-2 w-[19px] h-[19px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
                      // onChange={(e) =>
                      //   dispatch(setisVipR(e.target.checked))
                      // }
                    />
                    Prices include VAT
                  </div>
                </div>
              </div>

              <TempTypeInput
                setState={"setrefNameR"}
                label={"VAT percentage (%)"}
                value={"10"}
                required={false}
                type={"text"}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full h-fit bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
              VAT Percentage
            </h3>
            <div className="flex justify-start items-center gap-x-[4%] gap-y-5 w-full h-fit">
              <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  {"Payment Method"}
                </label>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                  <textarea
                    className="py-3 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] flex justify-between items-center input-color rounded-xl border-2 border-grey"
                    placeholder={`Enter Payment Method`}
                    rows={6}
                    cols={6}
                    value={`A/C NAME: __________ 
BANK: __________ 
SWIFT : __________ 
IBAN : __________ 
ACCOUNT: __________
METHOD: Bank`}
                    // onChange={(e) => {
                    //   dispatch(setState(e.target.value));
                    // }}
                    // value={value}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full h-fit bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
              Additional Information
            </h3>
            <div className="flex justify-start items-center gap-x-[4%] gap-y-5 w-full h-fit">
              <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  {"Additional information in invoice."}
                </label>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                  <textarea
                    className="py-3 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] flex justify-between items-center input-color rounded-xl border-2 border-grey"
                    placeholder={`Enter Payment Method`}
                    rows={6}
                    cols={6}
                    value={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text`}
                    // onChange={(e) => {
                    //   dispatch(setState(e.target.value));
                    // }}
                    // value={value}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-3 w-full h-fit bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
            <h3 className="w-full font-[600] text-[15px] xs:text-[24px] leading-[36px] text-black ">
              Terms and Conditions
            </h3>
            <div className="flex justify-start items-center gap-x-[4%] gap-y-5 w-full h-fit">
              <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                  {"Please specify terms and conditions."}
                </label>
                <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                  <textarea
                    className="py-3 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] flex justify-between items-center input-color rounded-xl border-2 border-grey"
                    placeholder={`Enter Payment Method`}
                    rows={6}
                    cols={6}
                    value={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`}
                    // onChange={(e) => {
                    //   dispatch(setState(e.target.value));
                    // }}
                    // value={value}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
