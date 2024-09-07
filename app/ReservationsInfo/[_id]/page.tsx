"use client";
import vip from "@/public/vip.svg";
import Generalreservation from "./Generalreservation";
import Identityreservation from "./Identityreservation";
import Emergencyreservation from "./Emergencyreservation";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { setreservationInfo } from "@/app/store/reservationInfo";
import { useParams, useRouter } from "next/navigation";
import Generalreservations from "./Generalreservation";
import Emergencyreservations from "./Emergencyreservation";
import Referencereservations from "./ReferenceChauffeurs";
import {
  formatDate,
  formatId,
  formatTime,
} from "@/app/Components/functions/formats";
import { SmallLoader } from "@/app/Components/Loader";

export default function reservationInfoMainPage() {
  let { reservationInfo } = useSelector(
    (state: RootState) => state.reservationInfo
  );
  let [activeButton, setActiveButton] = useState("General");
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const [customerloading, setcustomerLoading] = useState<any>(true);
  const [chauffeursloading, setchauffeursLoading] = useState<any>(true);
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [chauffeursData, setchauffeursData] = useState<any[]>([]);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  const router = useRouter();
  // Customer Data
  useEffect(() => {
    async function getData() {
      try {
        setcustomerLoading(true);
        const result = await axios.get(
          `/api/getCustomerInfo/${reservationInfo?.customer_id}`,
          {
            headers: { "Cache-Control": "no-store" },
          }
        );

        if (result?.data?.data) {
          setCustomersData(result.data.data);
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setcustomerLoading(false);
      }
    }
    getData();
  }, [reservationInfo]);
  // Chauffeur Data
  useEffect(() => {
    async function getData() {
      try {
        setchauffeursLoading(true);
        const result = await axios.get(
          `/api/getchauffeurInfo/${reservationInfo?.chauffeur_id}`,
          {
            headers: { "Cache-Control": "no-store" },
          }
        );

        if (result?.data?.data) {
          setchauffeursData(result.data.data);
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setchauffeursLoading(false);
      }
    }
    if (reservationInfo?.chauffeur_id) {
      getData();
    }
  }, [reservationInfo]);
  // vehicle Data
  useEffect(() => {
    async function getData() {
      try {
        setvehicleLoading(true);
        const result = await axios.get(
          `/api/getVehicleInfo/${reservationInfo?.vehicle_id}`,
          {
            headers: { "Cache-Control": "no-store" },
          }
        );

        if (result?.data?.data) {
          setVehiclesData(result.data.data);
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setvehicleLoading(false);
      }
    }
    getData();
  }, [reservationInfo]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.get(`/api/getreservationInfo/${_id}`);
        if (result?.data?.data) {
          dispatch(setreservationInfo(result?.data?.data?.data));
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

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            ID: {formatId(_id)}
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Reservations / All Reservations / {formatId(_id)}
            </p>
          </h3>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push(`/ReservationsInfo/${_id}/CompleteReservation`);
              }}
            >
              Complete Reservation
            </button>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px] bg-">
            <div className=" bg-white w-full flex justify-between items-center p-[50px] border border-1 border-gray-300 rounded-xl">
              <div className="w-[40%] h-[150px]">
                <div className="font-[600] text-[#242E69] text-[18px]  ">
                  Pick-Up:
                </div>
                <div className="flex justify-start items-center relative">
                  <div className="p-[3px] rounded-full bg-[#242E69] object-cover left-0 top-[50%]"></div>
                  <div className="bg-[#242E69] border object-fill w-[250px] border-none h-[1px]"></div>
                </div>

                <div className="mt-[13px]">
                  <div className="font-[400] text-[18px]">
                    {reservationInfo?.PickUpAddress
                      ? reservationInfo?.PickUpAddress
                      : "---"}
                  </div>
                  <div className="font-[400] text-[18px]">
                    {reservationInfo?.PickUpDate
                      ? formatDate(reservationInfo?.PickUpDate)
                      : "---"}
                    ,{" "}
                    {reservationInfo?.PickUpTime
                      ? formatTime(reservationInfo?.PickUpTime)
                      : "---"}
                  </div>
                </div>
              </div>
              {/* 2nd */}
              <div className="w-[40%] h-[150px]">
                <div className="font-[600] text-[#242E69] text-[18px]  ">
                  Drop-off:
                </div>
                <div className="flex justify-start items-center relative">
                  <div className="p-[3px] rounded-full bg-[#242E69] object-cover left-0 top-[50%]"></div>
                  <div className="bg-[#242E69] border object-fill w-[250px] border-none h-[1px]"></div>
                </div>

                <div className="mt-[13px]">
                  <div className="font-[400] text-[18px]">
                    {reservationInfo?.dropOffAddress
                      ? reservationInfo?.dropOffAddress
                      : "---"}
                  </div>
                  <div className="font-[400] text-[18px]">
                    {reservationInfo?.dropOffDate
                      ? formatDate(reservationInfo?.dropOffDate)
                      : "---"}
                    ,{" "}
                    {reservationInfo?.dropOffTime
                      ? formatTime(reservationInfo?.dropOffTime)
                      : "---"}
                  </div>
                </div>
              </div>
              {/* 3rd */}
              <div className=" rounded-xl border border-gray-200 p-6 ">
                <div className="text-[#242E69] font-[600] text-[24px]">
                  {reservationInfo?.duration
                    ? reservationInfo?.duration
                    : "---"}{" "}
                  Days
                </div>
              </div>
            </div>
            <div className="w-full h-fit bg-white  border-2 border-grey mt-5 rounded-[10px] px-5 py-1">
              <div className="w-full h-fit flex justify-between items-center mt-3 border-b-2 border-grey pb-3">
                <div
                  className={`w-[290px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "General"
                      ? "text-white bg-main-blue font-[500]"
                      : " text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("General")}
                >
                  Reservation Details
                </div>
                <div
                  className={`w-[290px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Identity"
                      ? "text-white bg-main-blue font-[500]"
                      : " text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Identity")}
                >
                  Customer Info
                </div>
                <div
                  className={`w-[290px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Emergency"
                      ? "text-white bg-main-blue font-[500]"
                      : " text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Emergency")}
                >
                  Vehicle Info
                </div>
                <div
                  className={`w-[290px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Chauffeur"
                      ? "text-white bg-main-blue font-[500]"
                      : " text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Chauffeur")}
                >
                  Chauffeur Info
                </div>
              </div>
              <div className="w-full h-[300px] flex justify-center items-start gap-8">
                {activeButton === "General" ? (
                  <>
                    <Generalreservations />
                  </>
                ) : activeButton === "Identity" ? (
                  <>
                    <Identityreservation
                      data={customersData}
                      loading={customerloading}
                    />
                  </>
                ) : activeButton === "Emergency" ? (
                  <Emergencyreservations
                    data={VehiclesData}
                    loading={vehicleLoading}
                  />
                ) : activeButton === "Chauffeur" ? (
                  <Referencereservations
                    data={chauffeursData}
                    loading={chauffeursloading}
                  />
                ) : null}
              </div>
            </div>
            <div className="w-full flex justify-end items-center gap-1 md:gap-3 mt-10">
              <button
                className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                disabled={loading}
                onClick={() => {
                  // saveData("close");
                }}
              >
                {false ? <SmallLoader /> : "Create Contract"}
              </button>
              <button
                className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                disabled={loading}
                onClick={() => {
                  // saveData("close");
                }}
              >
                {false ? <SmallLoader /> : "Create Invoice"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
