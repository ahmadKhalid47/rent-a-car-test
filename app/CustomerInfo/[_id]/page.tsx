"use client";
import React from "react";
import {PassportCustomers} from "../../Components/InfoComponents/PassportCustomers";
import {LicenseCustomers} from "../../Components/InfoComponents/LicenseCustomers";
import {EmergencyCustomers} from "../../Components/InfoComponents/EmergencyCustomers";
import {ReferenceCustomers} from "../../Components/InfoComponents/ReferenceCustomers";
import {AdditionalCustomers} from "../../Components/InfoComponents/AdditionalCustomers";
import {OtherCustomers} from "../../Components/InfoComponents/OtherCustomers";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { setCustomerInfo } from "@/app/store/Customerinfo";
import { useParams } from "next/navigation";
import image404 from "@/public/image404.png";
import Link from "next/link";
import { formatCreatedAtDate } from "@/app/Components/functions/formats";
import General from "@/app/Components/InfoComponents/General";
import { FaChevronDown } from "react-icons/fa";
import { MediumLoader } from "@/app/Components/Loader";
import ListViewRecentReservations from "./ListViewRecentReservations";

export default function CustomerInfoMainPage() {
  let [activeButton, setActiveButton] = useState("General");
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
  const [showError, setShowError] = useState(null);
  let { CustomerInfo } = useSelector(
    (state: RootState) => state.CustomerInfo
  );

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getCustomerInfo/${_id}`);
        if (result?.data?.data) {
          console.log(result?.data?.data);

          dispatch(
            setCustomerInfo({
              ...result?.data?.data?.data,
              createdAt: result?.data?.data?.createdAt,
              active: result?.data?.data?.active,
            })
          );
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
  console.log(reservationsData);
  const accordionItems = [
    {
      title: `${CustomerInfo?.idCard ? "ID Card" : "Passport"}`,
      content: <PassportCustomers infoKey="CustomerInfo" />,
    },
    {
      title: "Driving License",
      content: <LicenseCustomers infoKey="CustomerInfo" />,
    },
    { title: "Others", content: <OtherCustomers infoKey="CustomerInfo" /> },
  ];
  const accordionItems2 = [
    {
      title: "Emergency Information",
      content: <EmergencyCustomers infoKey="CustomerInfo" />,
    },
    {
      title: "Reference Information",
      content: <ReferenceCustomers infoKey="CustomerInfo" />,
    },
    {
      title: "Additional Notes",
      content: <AdditionalCustomers infoKey="CustomerInfo" />,
    },
  ];
 useEffect(() => {
   async function getData() {
     try {
       setLoading(true);
       const result = await axios.post("/api/getReservationsOfCustomer", {
         createdBy: myProfile._id,
         customer_id: _id,
       });

       if (result?.data?.data) {
         setreservationsData(result.data.data);
       } else {
         setShowError(result?.data?.error);
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
            {CustomerInfo?.name ? CustomerInfo?.name : "---"}
          </span>
          <div className="flex justify-between items-start">
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Customers"} className="hover:underline">
                Customers / All Customers
              </Link>
              {" / "}
              {CustomerInfo?.name ? CustomerInfo?.name : "---"}
            </span>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-5 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey mt-5 relative overflow-hidden">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-4 rounded-[10px] py-7 border-[1px] border-grey dark:bg-dark1 bg-white px-10">
            <div className="w-full h-fit flex justify-between items-star rounded-[10px]">
              <div className="w-[36%] flex justify-center items-center">
                <div className="w-[267px] h-[267px] flex justify-between items-start rounded-full overflow-hidden border-[1px] border-grey dark:bg-dark1 bg-white">
                  <img
                    src={CustomerInfo?.customerImage || image404.src}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="w-[64%] flex justify-start flex-col items-start gap-3">
                <span
                  className={`border-[1px] px-3 rounded-[5px] -mb-2 ${
                    CustomerInfo?.active ? "complete-status" : "cancel-status"
                  }`}
                >
                  {CustomerInfo?.active ? "Active" : "InActive"}
                </span>
                <div className="w-full h-fit flex justify-between items-start py-1 border-b-2 border-color">
                  <div className="flex flex-col justify-start items-start h-fit">
                    <span className="w-full font-[600] text-[36px] leading-none dark:text-white text-black  mt-[3px]">
                      {CustomerInfo?.name}
                      <div className="font-[400] text-[12px] xs:text-[14px] md:text-[12px] leading-none h-fit py-1">
                        Created Date:{" "}
                        {formatCreatedAtDate(CustomerInfo?.createdAt)}
                      </div>{" "}
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-[150px] h-[48px] bg-light-grey border-[1px] border-light-grey rounded-[3px] overflow-hidden text-center text-[14px] xs:text-[16px] md:text-[21px] font-[500]">
                    {CustomerInfo?.customerType}
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Phone
                    </span>
                    <span>{CustomerInfo?.phone}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Alternative Phone
                    </span>
                    <span>{CustomerInfo?.alternativePhone}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Email
                    </span>
                    <span>{CustomerInfo?.emailAddress}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Gender
                    </span>
                    <span>{CustomerInfo?.gender}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Date of Birth
                    </span>
                    <span>{CustomerInfo?.dateOfBirth}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Nationality
                    </span>
                    <span>{CustomerInfo?.nationality}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Street Address
                    </span>
                    <span>{CustomerInfo?.streetAddress}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Country
                    </span>
                    <span>{CustomerInfo?.country}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      State/Province
                    </span>
                    <span>{CustomerInfo?.state}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">City</span>
                    <span>{CustomerInfo?.city}</span>
                  </div>
                </div>
                <div className="w-[100%] dark:text-white text-black  text-[14px] font-[400] flex justify-between items-center bg-yellow-00 -mt-[6px]">
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      Postal/ZIP Code
                    </span>
                    <span>{CustomerInfo?.postalCode}</span>
                  </div>
                  <div className="w-[45%] flex justify-between items-center">
                    <span className="dark:text-white text-[#555555]">
                      No. of Damages
                    </span>
                    <span className="w-[60px] h-[27px] flex justify-center items-center border-[1px] border-grey rounded-[3px] bg-light-grey">
                      0
                    </span>
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
