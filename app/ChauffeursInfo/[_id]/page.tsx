"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { setchauffeurInfo } from "@/app/store/chauffeurInfo";
import { useParams } from "next/navigation";
import image404 from "@/public/image404.png";
import Link from "next/link";
import { formatCreatedAtDate } from "@/app/Components/functions/formats";
import General from "@/app/Components/InfoComponents/General";
import { FaChevronDown } from "react-icons/fa";
import { MediumLoader } from "@/app/Components/Loader";
import ListViewRecentReservations from "./ListViewRecentReservations";
import { PassportCustomers } from "@/app/Components/InfoComponents/PassportCustomers";
import { LicenseCustomers } from "@/app/Components/InfoComponents/LicenseCustomers";
import { EmergencyCustomers } from "@/app/Components/InfoComponents/EmergencyCustomers";
import { ReferenceCustomers } from "@/app/Components/InfoComponents/ReferenceCustomers";
import { AdditionalCustomers } from "@/app/Components/InfoComponents/AdditionalCustomers";
import { OtherCustomers } from "@/app/Components/InfoComponents/OtherCustomers";

export default function chauffeurInfoMainPage() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const params = useParams(); // Get all route parameters
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const { _id } = params;
  const [loading, setLoading] = useState<any>(true);
  const [open, setOpen] = useState<any>(true);
  const [open2, setOpen2] = useState<any>(true);
  let { chauffeurInfo } = useSelector(
    (state: RootState) => state.chauffeurInfo
  );

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getchauffeurInfo/${_id}`);
        if (result?.data?.data) {
          dispatch(
            setchauffeurInfo({
              ...result?.data?.data?.data,
              createdAt: result?.data?.data?.createdAt,
              active: result?.data?.data?.active,
            })
          );
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  const accordionItems = [
    {
      title: `${chauffeurInfo?.idCard ? "ID Card" : "Passport"}`,
      content: <PassportCustomers infoKey="chauffeurInfo" />,
    },
    {
      title: "Driving License",
      content: <LicenseCustomers infoKey="chauffeurInfo" />,
    },
    { title: "Others", content: <OtherCustomers infoKey="chauffeurInfo" /> },
  ];
  const accordionItems2 = [
    {
      title: "Emergency Information",
      content: <EmergencyCustomers infoKey="chauffeurInfo" />,
    },
    {
      title: "Reference Information",
      content: <ReferenceCustomers infoKey="chauffeurInfo" />,
    },
    {
      title: "Additional Notes",
      content: <AdditionalCustomers infoKey="chauffeurInfo" />,
    },
  ];

  useEffect(() => {
   async function getData() {
     try {
       setLoading(true);
       const result = await axios.post("/api/getReservationsOfChauffeur", {
         createdBy: myProfile._id,
         chauffeur_id: _id,
       });

       if (result?.data?.data) {
         setreservationsData(result.data.data);
       }
     } catch (error) {
       console.log(error);
     } finally {
       setLoading(false);
     }
   }
   if (myProfile._id) getData();
 }, [global.vehicleDataReloader, myProfile._id]);

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="w-full h-[200px">
          <span className="font-[600] text-[25px] leading-[38px] dark:text-white text-black">
            {chauffeurInfo?.name ? chauffeurInfo?.name : "---"}
          </span>
          <div className="flex justify-between items-start">
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Chauffeurs"} className="hover:underline">
                Chauffeurs / All Chauffeurs
              </Link>
              {" / "}
              {chauffeurInfo?.name ? chauffeurInfo?.name : "---"}
            </span>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-5 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative overflow-hidden">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-4 rounded-[10px] py-7 border-[1px] border-grey dark:bg-dark1 bg-white px-10">
            <div className="w-full h-fit flex justify-between items-star rounded-[10px]">
              <div className="w-[36%] flex justify-center items-center">
                <div className="w-[267px] h-[267px] flex justify-between items-start rounded-full overflow-hidden border-[1px] border-grey dark:bg-dark1 bg-white">
                  <img
                    src={chauffeurInfo?.chauffeurImage || image404.src}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="w-[64%] flex justify-start flex-col items-start gap-3">
                <span
                  className={`border-[1px] px-3 rounded-[5px] -mb-2 ${
                    chauffeurInfo?.active ? "complete-status" : "cancel-status"
                  }`}
                >
                  {chauffeurInfo?.active ? "Active" : "InActive"}
                </span>
                <div className="w-full h-fit flex justify-between items-start py-1 border-b-2 border-color">
                  <div className="flex flex-col justify-start items-start h-fit">
                    <span className="w-full font-[600] text-[36px] leading-none dark:text-white text-black  mt-[3px]">
                      {chauffeurInfo?.name}
                      <div className="font-[400] text-[12px] xs:text-[14px] md:text-[12px] leading-none h-fit py-1">
                        Created Date:{" "}
                        {formatCreatedAtDate(chauffeurInfo?.createdAt)}
                      </div>{" "}
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-[150px] h-[48px] bg-light-grey border-[1px] border-light-grey rounded-[3px] overflow-hidden text-center text-[14px] xs:text-[16px] md:text-[21px] font-[500]">
                    {global.currentCurrency}
                    {chauffeurInfo?.rentPerDay} {" / Day"}
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Phone
                    </span>
                    <span>{chauffeurInfo?.phone}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Alternative Phone
                    </span>
                    <span>{chauffeurInfo?.alternativePhone}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Email
                    </span>
                    <span>{chauffeurInfo?.emailAddress}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Gender
                    </span>
                    <span>{chauffeurInfo?.gender}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Date of Birth
                    </span>
                    <span>{chauffeurInfo?.dateOfBirth}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Nationality
                    </span>
                    <span>{chauffeurInfo?.nationality}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Employment Type{" "}
                    </span>
                    <span>{chauffeurInfo?.employmentType}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Driving Experience{" "}
                    </span>
                    <span>{chauffeurInfo?.drivingExp}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Availability
                    </span>
                    <span>{chauffeurInfo?.availability}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Street Address
                    </span>
                    <span>{chauffeurInfo?.streetAddress}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Country
                    </span>
                    <span>{chauffeurInfo?.country}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      State/Province
                    </span>
                    <span>{chauffeurInfo?.state}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">City</span>
                    <span>{chauffeurInfo?.city}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Postal/ZIP Code
                    </span>
                    <span>{chauffeurInfo?.postalCode}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit dark:bg-dark1 mt-5 flex justify-between items-center">
              <div className="w-[48.4%] h-fit flex flex-col items-start gap-2">
                <span className="font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black">
                  Identity Information
                </span>
                <div className="w-[100%]  bg-green-00 rounded-[10px] border-[1px] border-grey h-[400px] flex flex-col justify-start items-start gap-8 overflow-hidden scroll">
                  <General
                    partsHeight={"h-[234px]"}
                    accordionData={accordionItems}
                  />
                </div>
              </div>
              <div className="w-[48.4%] h-fit flex flex-col items-start gap-2">
                <span className="font-[600] text-[15px] xs:text-[24px] leading-[36px] dark:text-white text-black">
                  Additional Information
                </span>
                <div className="w-[100%]  bg-green-00 rounded-[10px] border-[1px] border-grey h-[400px] flex flex-col justify-start items-start gap-8 overflow-hidden scroll">
                  <General
                    partsHeight={"h-[234px]"}
                    accordionData={accordionItems2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-4 rounded-[10px] py-7 border-[1px] border-grey dark:bg-dark1 bg-white px-10">
            <div className="w-full h-fit dark:bg-dark1 flex justify-between items-center">
              <div className="w-[100%] h-fit flex flex-col items-start gap-2">
                <div className="w-full flex justify-between items-center font-[600] text-[15px] xs:text-[24px] leading-[0px dark:text-white text-black">
                  Recent Reservations
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform cursor-pointer ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                    onClick={() => setOpen(!open)}
                  />
                </div>
                {open && (
                  <div className="w-[100%]">
                    {loading ? (
                      <MediumLoader />
                    ) : (
                      <ListViewRecentReservations data={reservationsData} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-4 rounded-[10px] py-7 border-[1px] border-grey dark:bg-dark1 bg-white px-10">
            <div className="w-full h-fit dark:bg-dark1 flex justify-between items-center">
              <div className="w-[100%] h-fit flex flex-col items-start gap-2">
                <div className="w-full flex justify-between items-center font-[600] text-[15px] xs:text-[24px] leading-[0px dark:text-white text-black">
                  Violations{" "}
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform cursor-pointer ${
                      open2 ? "rotate-180" : "rotate-0"
                    }`}
                    onClick={() => setOpen2(!open2)}
                  />
                </div>
                <div className="w-[100%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
