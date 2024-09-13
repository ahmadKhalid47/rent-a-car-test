"use client";
import upload from "@/public/Paper Upload.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { formatId } from "@/app/Components/functions/formats";
import { setAllValues } from "@/app/store/reservations";
import { useReactToPrint } from "react-to-print";
import carLogo from "@/public/car.svg";

export default function reservationInfoMainPage() {
  let reservation = useSelector((state: RootState) => state.reservation);
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
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
    documentTitle: "Custom Document Title",
  });

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Invoice
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Reservations / All Reservations / {formatId(_id)} / Invoice
            </p>
          </h3>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
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
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative">
          <div ref={componentRef} className="printing-width h-fit">
            <PrintCom data={reservation} id={_id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrintCom({ data, id }: any) {
  console.log(data);

  return (
    <div
      className={`w-full h-[1123px] flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 relative bg-white`}
    >
      <div className="w-full h-fit  rounded-[10px] flex flex-col justify-start items-center">
        <h2 className="w-full h-fit rounded-[10px] text-black font-[500] text-[18px] leading-[21px] text-start">
          Invoice Number:
          <span className="font-[600]"> #{formatId(id)}</span>
        </h2>
        <div className="w-full h-fit rounded-[10px] text-black font-[500] text-[18px] leading-[21px] text-center flex justify-end items-center">
          <img src={carLogo.src} className={`w-[120px] h-[40px] mt-[30px]`} />
        </div>
        <div className="w-full h-fit flex justify-between items-center mt-1">
          <div className="w-[50%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] text-black">
            <span className=" text-[17px] font-[700] leading-[20px] text-main-blue">
              Invoice To:
            </span>
            <span className="">{data.customerName}</span>
            <span className="">Here you can Upload Passport</span>
            <span className="">Here you can Upload Passport</span>
            <span className="">Here you can Upload Passport</span>
            <span className="">Here you can Upload Passport</span>
          </div>
          <div className="w-[50%] h-fit flex flex-col justify-start items-end text-[14px] font-[400] leading-[17px] text-black">
            <span className=" text-[18px] font-[600] leading-[20px] text-black">
              Rapid Rent a Car{" "}
            </span>
            <span className="text-transparent">transparent</span>
            <span className="">Here you can Upload Passport</span>
            <span className="">Here you can Upload Passport</span>
            <span className="">Here you can Upload Passport</span>
            <span className="">Here you can Upload Passport</span>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-between items-center mt-6">
          <div className="w-full h-fit flex justify-between items-center py-3 px-4 bg-light-grey border-[1px] border-grey">
            <div className="w-[10%] h-fit flex justify-start items-center">
              SN
            </div>
            <div className="w-[70%] h-fit flex justify-start items-center">
              Service description
            </div>
            <div className="w-[10%] h-fit flex justify-start items-center">
              Price
            </div>
          </div>
          <div className="w-full h-fit flex justify-between items-center py-3 px-4 border-b-[1px] border-grey">
            <div className="w-[10%] h-fit flex justify-start items-center">
              01
            </div>
            <div className="w-[70%] h-fit flex justify-start items-center">
              Suzuki Swift From 03.08.2024 | 05:00 To 04.08.2024 | 05:00{" "}
            </div>
            <div className="w-[10%] h-fit flex justify-start items-center font-[600]">
              $560
            </div>
          </div>
          <div className="w-full h-fit flex justify-between items-center py-3 px-4 border-b-[1px] border-grey">
            <div className="w-[10%] h-fit flex justify-start items-center">
              02
            </div>
            <div className="w-[70%] h-fit flex justify-start items-center">
              Chauffeur
            </div>
            <div className="w-[10%] h-fit flex justify-start items-center font-[600]">
              $50
            </div>
          </div>
          <div className="w-full h-fit flex justify-end items-center py-1 px-4">
            <div className="w-[40%] h-fit flex justify-between items-center font-[600]">
              <div className="w-[50%] h-fit flex justify-start items-center">
                Subtotal
              </div>
              <div className="w-[25%] h-fit flex justify-start items-center">
                $610
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex justify-end items-center py-1 px-4">
            <div className="w-[40%] h-fit flex justify-between items-center font-[600]">
              <div className="w-[50%] h-fit flex justify-start items-center">
                VAT
              </div>
              <div className="w-[25%] h-fit flex justify-start items-center">
                20%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
