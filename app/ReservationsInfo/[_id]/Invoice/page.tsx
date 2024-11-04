"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { formatId, formatListing } from "@/app/Components/functions/formats";
import { setAllValues } from "@/app/store/reservations";
import { useReactToPrint } from "react-to-print";
import { MediumLoader } from "@/app/Components/Loader";
import { setAllValues as setAllInvoiceValues } from "@/app/store/Invoicing";
import Link from "next/link";

export default function reservationInfoMainPage() {
  let reservation = useSelector((state: RootState) => state.reservation);
  let global = useSelector((state: RootState) => state.Global);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  let dispatch = useDispatch();

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
        setLoading(true);
        let result: any = await axios.post(`/api/getreservationInfo/${_id}`);
        if (result?.data?.data) {
          dispatch(setAllValues(result?.data?.data?.data));
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `"Contract"${reservation?.customerName}`,
  });

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]  pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="h-[44px] w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-center">
                    <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
            Invoice
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-5 md:leading-[21px] text-black">
              <Link href={"/Reservations"} className="hover:underline">
                Reservations / All Reservations
              </Link>
              {" / "}
              {formatId(_id)} / Invoice
            </span>
          </span>
          <div className="flex justify-end items-center w-[100%] md:w-[50%] h-[44px]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                handlePrint();
              }}
            >
              Print Invoice
            </button>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative">
          <div ref={componentRef} className="printing-width h-fit">
            <PrintCom data={reservation} id={_id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrintCom({ data, id }: any) {
  const [customersData, setCustomersData] = useState<any>([]);
  const [customerloading, setcustomerLoading] = useState<any>(true);
  let dispatch = useDispatch();
  let Invoicing = useSelector((state: RootState) => state.Invoicing);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let companyProfile: any = useSelector(
    (state: RootState) => state.companyProfile
  );
  // Customer Data
  useEffect(() => {
    async function getData() {
      try {
        setcustomerLoading(true);
        const result = await axios.post(
          `/api/getCustomerInfo/${data?.customer_id}`
        );
        
        setCustomersData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setcustomerLoading(false);
      }
    }
    if (data?.customer_id) {
      getData();
    }
  }, [data?.customer_id]);

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getInvoicing", {
          createdBy: myProfile._id,
        });
        dispatch(setAllInvoiceValues(result.data.data[0].data));
      } catch (error) {
        console.log(error);
      }
    }
    if (myProfile._id) getData();
  }, [myProfile._id]);

  return (
    <>
      {customerloading ? (
        <MediumLoader />
      ) : (
        <div
          className={`w-full h-[1123px] flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 relative bg-white`}
        >
          <div className="w-full h-fit  rounded-[10px] flex flex-col justify-start items-center">
            <h2 className="w-full h-fit rounded-[10px] text-black font-[500] text-[18px] leading-[21px] text-start mt-2">
              Invoice Number:
              <span className="font-[600]"> #{formatId(id)}</span>
            </h2>
            <div className="w-full h-fit rounded-[10px] text-black font-[500] text-[18px] leading-[21px] text-center flex justify-end items-center mt-3">
              <img
                src={companyProfile?.profilePic}
                className={`w-[120px] h-[40px]`}
              />
            </div>
            <div className="w-full h-fit flex justify-between items-center mt-1">
              <div className="w-[50%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] text-black">
                <span className="text-[17px] font-[700] leading-[20px] text-main-blue">
                  Invoice To:
                </span>
                <span >
                  {customersData?.data?.name
                    ? customersData?.data?.name
                    : "---"}
                </span>
                <span >
                  {customersData?.data?.streetAddress
                    ? customersData?.data?.streetAddress
                    : "---"}
                </span>
                <span >
                  {customersData?.data?.city
                    ? customersData?.data?.city
                    : "---"}
                  {", "}
                  {customersData?.data?.country
                    ? customersData?.data?.country
                    : "---"}
                </span>
                <span >
                  {customersData?.data?.phone
                    ? customersData?.data?.phone
                    : "---"}
                </span>
                <span >
                  {customersData?.data?.emailAddress
                    ? customersData?.data?.emailAddress
                    : "---"}
                </span>
              </div>
              <div className="w-[50%] h-fit flex flex-col justify-start items-end text-[14px] font-[400] leading-[17px] text-black">
                <span className="text-[18px] font-[600] leading-[20px] text-black">
                  Rapid Rent a Car
                </span>
                <span className="text-transparent">transparent</span>
                <span >{myProfile?.address}</span>
                <span >{myProfile?.phone}</span>
                <span >{myProfile?.email}</span>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col justify-between items-center mt-6">
              <div className="w-full h-fit flex justify-between items-center py-3 px-4 bg-light-grey border-[1px] border-grey font-[600] text-[#808080]">
                <div className="w-[10%] h-fit flex justify-start items-center">
                  SN
                </div>
                <div className="w-[80%] h-fit flex justify-start items-center">
                  Service description
                </div>
                <div className="w-[10%] h-fit flex justify-start items-center">
                  Price
                </div>
              </div>
              <div className="w-full h-fit flex justify-between items-center py-3 px-4 border-b-[1px] border-grey text-black">
                <div className="w-[10%] h-fit flex justify-start items-center">
                  01
                </div>
                <div className="w-[80%] h-fit flex justify-start items-center">
                  {data.vehicleName} From {data.PickUpDate} | {data.PickUpTime}
                  <br />
                  To {data.dropOffDate} | {data.dropOffTime}
                </div>
                <div className="w-[10%] h-fit flex justify-start items-center font-[600]">
                  ${Number(data?.carTotal)}
                </div>
              </div>
              {data.withChauffeur && (
                <div className="w-full h-fit flex justify-between items-center py-3 px-4 border-b-[1px] border-grey text-black">
                  <div className="w-[10%] h-fit flex justify-start items-center">
                    02
                  </div>
                  <div className="w-[80%] h-fit flex justify-start items-center">
                    Chauffeur
                  </div>
                  <div className="w-[10%] h-fit flex justify-start items-center font-[600]">
                    ${Number(data?.chauffeurTotal)}
                  </div>
                </div>
              )}
              <div className="w-full h-fit flex justify-between items-start py-1 px-">
                <div className="w-[55%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] text-black mt-2">
                  <span className="text-[18px] font-[600] leading-[21px] text-black">
                    ADDITIONAL INFORMATION
                  </span>
                  <span className="w-[100%] leading-[21px] mt-1">
                    {Invoicing?.additionalInfo}{" "}
                  </span>
                </div>
                <div className="w-[40%] h-fit flex flex-col justify-between items-center font-[600] text-black">
                  <div className="w-full h-fit flex justify-end items-center py-1 pe-4 text-black">
                    <div className="w-[100%] h-fit flex justify-between items-center font-[600]">
                      <div className="w-[50%] h-fit flex ps-4 justify-start items-center">
                        Subtotal
                      </div>
                      <div className="w-[25%] h-fit flex justify-start items-center">
                        ${Number(data?.carTotal) + Number(data?.chauffeurTotal)}
                      </div>
                    </div>
                  </div>
                  {data?.vatInclude && (
                    <div className="w-full h-fit flex justify-end items-center py-1 pe-4 text-black">
                      <div className="w-[100%] h-fit flex justify-between items-center font-[600]">
                        <div className="w-[50%] h-fit flex ps-4 justify-start items-center">
                          VAT
                        </div>
                        <div className="w-[25%] h-fit flex justify-start items-center">
                          {Invoicing?.vatPercentage}%
                        </div>
                      </div>
                    </div>
                  )}
                  {data.discount && (
                    <div className="w-[100%] h-fit flex justify-between items-center font-[600] pe-4 text-black">
                      <div className="w-[50%] h-fit flex ps-4 justify-start items-center">
                        Discount:
                      </div>
                      <div className="w-[25%] h-fit flex justify-start items-center">
                        {Number(data.discount)}%
                      </div>
                    </div>
                  )}

                  <div className="w-[100%] py-2 h-fit flex justify-between items-center font-[600] bg-main-blue text-white mt-1 pe-4">
                    <div className="w-[50%] h-fit flex ps-4 justify-start items-center">
                      TOTAL:
                    </div>
                    <div className="w-[25%] h-fit flex justify-start items-center">
                      ${data.amount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit flex justify-between items-start py-1 px- mt-3">
                <div className="w-[100%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] text-black">
                  <span className="text-[18px] font-[600] leading-[41px] text-black underline">
                    TERMS & CONDITIONS
                  </span>
                  {formatListing(Invoicing?.terms).map(
                    (item: any, index: any) => (
                      <div className="w-[100%] leading-[21px] mt- flex justify-between items-start text-justify">
                        <span className="w-[2%]">{index + 1}.</span>
                        <span key={index} className="w-[98%]">
                          {item}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full h-fit flex justify-between items-start py-1 px- mt-3">
                <div className="w-[100%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] text-black">
                  <span className="text-[18px] font-[600] leading-[41px] text-black">
                    PAYMENT INFO
                  </span>
                  {Invoicing?.paymentInfo.split("\n").map((item) => (
                    <span className="w-[100%] leading-[21px] flex justify-between items-start text-justify">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full h-fit flex justify-end items-start py-1 px-4 mt-5 absolute bottom-[80px]">
                <div className="w-[50%] h-fit flex flex-col justify-center items-end text-[14px] font-[400] leading-[17px] text-black">
                  <span className="w-[50%] leading-[21px] mt-1 flex justify-between items-start text-justify border-b-[1px] border-black"></span>
                  <span className="w-[50%] leading-[21px] mt-1 text-center">
                    SIGNATURE
                  </span>
                </div>
              </div>
              <div className="w-full h-fit flex justify-end items-start py-1 px-4 mt-5 absolute bottom-[20px]">
                <div className="w-[100%] h-fit flex justify-between items-end text-[14px] font-[400] leading-[17px] text-black">
                  <span className="w-[33%] leading-[21px] mt-1 text-center">
                    Address
                  </span>
                  <span className="w-[33%] leading-[21px] mt-1 text-center">
                    Phone
                  </span>
                  <span className="w-[33%] leading-[21px] mt-1 text-center">
                    Email
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
