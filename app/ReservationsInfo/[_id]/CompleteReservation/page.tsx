"use client";
import React from "react";
import upload from "@/public/Paper Upload.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { formatId } from "@/app/Components/functions/formats";
import { SmallLoader } from "@/app/Components/Loader";
import { setAllValues } from "@/app/store/reservations";
import FirstPage from "./FirstPages";
import SecondPage from "./SecondPage";
import Link from "next/link";

export default function reservationInfoMainPage() {
  let reservation = useSelector((state: RootState) => state.reservation);
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  
  const formRef = useRef<any>(null);
  let [currentPage, setCurrentPage] = useState(0);
  let [goToPage, setGoToPage] = useState(0);
  const router = useRouter();

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
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  let handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(goToPage);
  };

  const submitButton = () => {
    if (formRef.current) {
      formRef.current?.click();
    }
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
    }
  };

  async function updateData(action: string) {
    try {
      setLoading(true);
      const damageImages = reservation.damages.map(
        (damage: any) => damage.files
      );

      const formData = new FormData();
      for (let i = 0; i < reservation.fuelImagesCompletion.length; i++) {
        formData.append("files", reservation.fuelImagesCompletion[i]);
      }
      const res = await axios.post("/api/uploadWithCondition", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData2 = new FormData();
      for (let i = 0; i < reservation.odometerImagesCompletion.length; i++) {
        formData2.append("files", reservation.odometerImagesCompletion[i]);
      }
      const res2 = await axios.post("/api/uploadWithCondition", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData3 = new FormData();
      formData3.append("length1", reservation.damages.length);

      for (let i = 0; i < reservation.damages.length; i++) {
        formData3.append("length2", reservation.damages[i]?.files.length); 

        for (let j = 0; j < reservation.damages[i]?.files.length; j++) {
          formData3.append("files", reservation.damages[i]?.files[j]); 
        }
      }

      const res3 = await axios.post("/api/uploadNested", formData3, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let tempArray = reservation.damages;
      for (let i = 0; i < reservation.damages.length; i++) {}

      const updatedObjects = tempArray.map((obj: any, index: any) => ({
        ...obj,
        files: res3?.data?.message[index].map((url: any) => url),
      }));
      const currentDate = new Date().toISOString().split("T")[0]; // Formats date as YYYY-MM-DD

      await axios.post(`/api/updatereservation/${_id}`, {
        ...reservation,
        fuelImagesCompletion: res?.data?.message,
        odometerImagesCompletion: res2?.data?.message,
        damages: updatedObjects,
        status: "complete",
        completeDate: currentDate,
      });
      let result2: any = await axios.post(
        `/api/updateRentOut/${reservation?.vehicle_id}/${reservation?.chauffeur_id}`,
        {
          rentOut: false,
        }
      );
      if (action === "close") {
        router.push("/Reservations");
      }
      dispatch(setAlert("Reservation Completed Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="h-[44px] w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-center">
          <span className="flex flex-col font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[100%]">
            Complete Reservation{" "}
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Reservations"} className="hover:underline">
                Reservations / All Reservations
              </Link>
              {" / "}
              {formatId(_id)} / Complete Reservation
            </span>
          </span>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative">
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px] bg-"
          >
            {currentPage === 0 ? (
              <FirstPage />
            ) : currentPage === 1 ? (
              <SecondPage />
            ) : null}

            <div
              className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-2 ${
                currentPage === 0 ? "justify-end" : "justify-between"
              } items-center`}
            >
              {currentPage !== 0 ? (
                <button
                  className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  Back
                </button>
              ) : null}
              {currentPage === 0 ? (
                <button
                  className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/ReservationsInfo/${_id}`);
                  }}
                >
                  Back
                </button>
              ) : null}
              {currentPage === 1 ? (
                <button
                  className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                  disabled={loading}
                  onClick={() => {
                    updateData("close");
                  }}
                >
                  {loading ? <SmallLoader /> : "Save"}
                </button>
              ) : (
                <>
                  <button
                    className="px-2 md:px-0 w-fit md:w-[240px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                    onClick={() => {
                      setGoToPage(currentPage + 1);
                      submitButton();
                    }}
                  >
                    Save and Continue
                  </button>
                  <button
                    ref={formRef}
                    className="absolute hidden"
                    type="submit"
                  ></button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
