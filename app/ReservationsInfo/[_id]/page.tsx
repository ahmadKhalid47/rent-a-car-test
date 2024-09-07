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
import { useParams } from "next/navigation";
import Generalreservations from "./Generalreservation";
import Emergencyreservations from "./Emergencyreservation";
import Referencereservations from "./ReferenceChauffeurs";

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
    getData();
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
        <div className="w-full h-[200px ">
          <h3 className="font-[600] text-[25px] leading-[38px] text-black">
            {reservationInfo?.name ? reservationInfo?.name : "---"}
          </h3>
          <div className="flex justify-between items-start">
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              reservations / All reservations /
              {reservationInfo?.name ? reservationInfo?.name : "---"}
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px] bg-">
            <div className="w-full h-fit flex justify-start gap-[7%] items-center px- bg-white rounded-[10px] border-2 border-grey py-7 px-6 ">
              <div className="w-fit flex justify-start items-center gap-1">
                <div className="w-[464px] h-[464px] flex justify-between items-start rounded-[10px] overflow-hidden border-[1px] border-grey bg-white ms-1">
                  <img
                    src={reservationInfo?.reservationImage}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="w-[35%] flex justify-start flex-col items-start gap-1 bg-green-">
                <h3 className="font-[600] text-[36px] flex justify-start items-center gap-4 leading-[54px] text-black">
                  {reservationInfo?.name ? reservationInfo?.name : "---"}{" "}
                </h3>
                <p className="font-[400] text-[28px] leading-[42px] text-black">
                  {reservationInfo?.phone ? reservationInfo?.phone : "---"}
                </p>
                <div className="w-[80%] flex justify-between items-center">
                  <div className="flex justify-start items-center gap-0 w-[70%] pe-5">
                    <p className="font-[400] text-[20px] leading-[30px] w-[50%]">
                      City:
                    </p>
                    <p className="font-[400] text-[20px] leading-[30px] w-[50%] ">
                      {reservationInfo?.city ? reservationInfo?.city : "---"}
                    </p>
                  </div>
                </div>
                <div className="w-[80%] flex justify-between items-center bg-red-5">
                  <div className="flex justify-start items-center gap-0 w-[70%] pe-5">
                    <p className="font-[400] text-[20px] leading-[30px] w-[50%] ">
                      Country:
                    </p>
                    <p className="font-[400] text-[20px] leading-[30px] w-[50%] ">
                      {reservationInfo?.country
                        ? reservationInfo?.country
                        : "---"}
                    </p>
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
