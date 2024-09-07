"use client";
import upload from "@/public/Paper Upload.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { formatId } from "@/app/Components/functions/formats";
import { SmallLoader } from "@/app/Components/Loader";
import { useFileDrop } from "@/app/Components/functions/onDragFromDrag";
import { useDropzone } from "react-dropzone";
import { Thumbs } from "@/app/Components/functions/thumbsFromDrag";
import { TempTypeInput } from "@/app/Components/InputComponents/TypeInput";
import {
  setAllValues,
  setfuelCompletion,
  setfuelImagesCompletion,
  setodometerCompletion,
  setodometerImagesCompletion,
} from "@/app/store/reservations";

export default function reservationInfoMainPage() {
  let { reservationInfo } = useSelector(
    (state: RootState) => state.reservationInfo
  );
  let reservation = useSelector((state: RootState) => state.reservation);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.get(`/api/getreservationInfo/${_id}`);
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
  const params = useParams(); // Get all route parameters
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  const router = useRouter();
  const [fuelFiles, setfuelFiles] = useState<any>(
    reservation?.fuelImagesCompletion
  );
  const [odometerFiles, setodometerFiles] = useState<any>(
    reservation?.odometerImagesCompletion
  );

  useEffect(() => {
    setfuelFiles(reservation?.fuelImagesCompletion);
  }, [reservation?.fuelImagesCompletion]);
  useEffect(() => {
    setodometerFiles(reservation?.odometerImagesCompletion);
  }, [reservation?.odometerImagesCompletion]);

  const onDropFuel = useFileDrop(
    (files: any[]) => setfuelFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );
  const onDropodometer = useFileDrop(
    (files: any[]) =>
      setodometerFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );

  const { getRootProps: getRootPropsFuel, getInputProps: getInputPropsFuel } =
    useDropzone({
      onDrop: onDropFuel,
    });
  const {
    getRootProps: getRootPropsodometer,
    getInputProps: getInputPropsodometer,
  } = useDropzone({
    onDrop: onDropodometer,
  });

  useEffect(() => {
    dispatch(setfuelImagesCompletion(fuelFiles));
  }, [fuelFiles]);
  useEffect(() => {
    dispatch(setodometerImagesCompletion(odometerFiles));
  }, [odometerFiles]);

  console.log(reservation);

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Complete Reservation{" "}
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Reservations / All Reservations / {formatId(_id)} / Complete
              Reservation
            </p>
          </h3>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px] bg-">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              <TempTypeInput
                setState={setfuelCompletion}
                label={"Fuel Status %"}
                value={reservation?.fuelCompletion}
                required={true}
                type={"number"}
              />
              <div
                className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
                {...getRootPropsFuel()}
              >
                <input {...getInputPropsFuel()} />
                <img src={upload.src} />
                <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
                  Drag & Drop or
                  <span className="text-link-blue cursor-pointer">
                    {" "}
                    choose file{" "}
                  </span>
                  to upload
                </h4>
              </div>
              <span className="font-[400] text-[14px] leading-[17px] text-black -mt-4">
                Here you can Upload Image of Fuel Status
              </span>
              <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
                <Thumbs files={fuelFiles} setFiles={setfuelFiles} />
              </div>
            </div>
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              <TempTypeInput
                setState={setodometerCompletion}
                label={"Odometer"}
                value={reservation?.odometerCompletion}
                required={true}
                type={"number"}
              />
              <div
                className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center gap-[7px] cursor-pointer"
                {...getRootPropsodometer()}
              >
                <input {...getInputPropsodometer()} />
                <img src={upload.src} />
                <h4 className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] leading-[17px]  text-black mt-[5px]">
                  Drag & Drop or
                  <span className="text-link-blue cursor-pointer">
                    {" "}
                    choose file{" "}
                  </span>
                  to upload
                </h4>
              </div>
              <span className="font-[400] text-[14px] leading-[17px] text-black -mt-4">
                Here you can Upload Image of Odometer
              </span>
              <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
                <Thumbs files={odometerFiles} setFiles={setodometerFiles} />
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
                {false ? <SmallLoader /> : "Save and Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
