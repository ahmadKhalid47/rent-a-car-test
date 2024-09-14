"use client";
import upload from "@/public/Paper Upload.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams } from "next/navigation";
import { formatId } from "@/app/Components/functions/formats";
import { setAllValues } from "@/app/store/reservations";
import { useReactToPrint } from "react-to-print";
import { MediumLoader } from "@/app/Components/Loader";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import { setConfigurations } from "@/app/store/Configurations";
import ThirdPage from "./ThirdPage";

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
            Contract
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Reservations / All Reservations / {formatId(_id)} / Contract
            </p>
          </h3>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                handlePrint();
              }}
            >
              Print Contract
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
  const [customersData, setCustomersData] = useState<any>([]);
  const [customerloading, setcustomerLoading] = useState<any>(true);
  const [chauffeursData, setchauffeursData] = useState<any>([]);
  const [VehiclesData, setVehiclesData] = useState<any>([]);
  let dispatch = useDispatch();

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
  }, [data]);

  // Chauffeur Data
  useEffect(() => {
    async function getData() {
      try {
        setcustomerLoading(true);
        const result = await axios.post(
          `/api/getchauffeurInfo/${data?.chauffeur_id}`
        );
        setchauffeursData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setcustomerLoading(false);
      }
    }
    if (data?.chauffeur_id) {
      getData();
    }
  }, [data]);

  // vehicle Data
  useEffect(() => {
    async function getData() {
      try {
        setcustomerLoading(true);
        const result = await axios.post(
          `/api/getVehicleInfo/${data?.vehicle_id}`
        );

        setVehiclesData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setcustomerLoading(false);
      }
    }
    if (data?.vehicle_id) {
      getData();
    }
  }, [data]);

  // Configuration Data
  useEffect(() => {
    async function getData2() {
      try {
        setcustomerLoading(true);
        let result: any = await axios.post(`/api/getConfigurations`);
        dispatch(setConfigurations(result?.data?.wholeData));
      } catch (error: any) {
        console.log(error);
      } finally {
        setcustomerLoading(false);
      }
    }
    getData2();
  }, []);

  return (
    <>
      {customerloading ? (
        <MediumLoader />
      ) : (
        <div className="flex flex-col justify-start items-start gap-3 print:gap-0">
          <FirstPage
            data={data}
            customersData={customersData}
            chauffeursData={chauffeursData}
            VehiclesData={VehiclesData}
            id={id}
          />
          <SecondPage
            data={data}
            customersData={customersData}
            VehiclesData={VehiclesData}
            id={id}
          />
          <ThirdPage customersName={customersData?.data?.name} id={id} />
        </div>
      )}
    </>
  );
}