"use client";
import vip from "@/public/vip.svg";
import GeneralCustomer from "./GeneralCustomer";
import IdentityCustomer from "./IdentityCustomer";
import EmergencyCustomer from "./EmergencyCustomer";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import ReferenceCustomer from "./ReferenceCustomer";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { setCustomerInfo } from "@/app/store/Customerinfo";
import { useParams } from "next/navigation";

export default function CustomerInfoMainPage() {
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
  let { CustomerInfo } = useSelector((state: RootState) => state.CustomerInfo);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.get(`/api/getCustomerInfo/${_id}`);
        if (result?.data?.data) {
          dispatch(setCustomerInfo(result?.data?.data?.data));
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
            {CustomerInfo?.name ? CustomerInfo?.name : "---"}
          </h3>
          <div className="flex justify-between items-start">
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Customers / All Customers /{" "}
              {CustomerInfo?.name ? CustomerInfo?.name : "---"}
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] border-2 border-grey bg-light-grey mt-5 relative">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%] rounded-[10px] bg-">
            <div className="w-full h-fit flex flex-col lg:flex-row justify-start gap-5 lg:gap-[7%] items-center px- g-white rounded-[10px] border-2 border-grey py-7 px-6 ">
              <div className="w-fit flex justify-start items-center gap-1">
                <div className="w-[464px] h-[464px] flex justify-between items-start rounded-[10px] overflow-hidden border-[1px] border-grey bg-white ms-1">
                  <img
                    src={CustomerInfo?.customerImage}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full lg:w-[60%] 1400:w-[35%] flex justify-start flex-col items-center lg:items-start gap-1 bg-green-">
                <h3 className="font-[600] text-[36px] flex justify-start items-center gap-4 leading-[54px] text-black">
                  {CustomerInfo?.name ? CustomerInfo?.name : "---"}
                  {CustomerInfo?.isVip ? (
                    <img
                      src={vip.src}
                      className="w-[44px] h-[32px] -translate-y-1"
                    />
                  ) : null}
                </h3>
                <p className="font-[400] text-[28px] leading-[42px] text-black">
                  {CustomerInfo?.phone ? CustomerInfo?.phone : "---"}
                </p>
                <div className="w-full lg:w-[80%] flex justify-center lg:justify-start items-center">
                  <div className="flex justify-start items-center gap-3 lg:gap-0 w-fit lg:w-[70%] pe-5">
                    <p className="font-[400] text-[20px] leading-[30px] w-full lg:w-[50%]">
                      City:
                    </p>
                    <p className="font-[400] text-[20px] leading-[30px] w-full lg:w-[50%]">
                      {CustomerInfo?.city ? CustomerInfo?.city : "---"}
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[80%] flex justify-center lg:justify-start items-center">
                  <div className="flex justify-start items-center gap-3 lg:gap-0 w-fit lg:w-[70%] pe-5">
                    <p className="font-[400] text-[20px] leading-[30px] w-full lg:w-[50%]">
                      Country:{" "}
                    </p>
                    <p className="font-[400] text-[20px] leading-[30px] w-full lg:w-[50%]">
                      {CustomerInfo?.country ? CustomerInfo?.country : "---"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit bg-white  border-2 border-grey mt-5 rounded-[10px] px-5 py-1">
              <div className="w-full h-fit flex justify-between items-center mt-3 border-b-2 border-grey pb-3">
                <div
                  className={`w-[215px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "General"
                      ? "text-white bg-main-blue font-[500]"
                      : " text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("General")}
                >
                  General Info
                </div>
                <div
                  className={`w-[215px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Identity"
                      ? "text-white bg-main-blue font-[500]"
                      : " text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Identity")}
                >
                  Identity Info
                </div>
                <div
                  className={`w-[215px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Emergency"
                      ? "text-white bg-main-blue font-[500]"
                      : " text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Emergency")}
                >
                  Emergency Info
                </div>
                <div
                  className={`w-[215px] h-[43px] flex justify-center rounded-[10px] hover:cursor-pointer items-center ${
                    activeButton === "Reference"
                      ? "text-white bg-main-blue font-[500]"
                      : " text-black "
                  } font-[400] text-[18px] leading-[22px]`}
                  onClick={() => setActiveButton("Reference")}
                >
                  Reference Info
                </div>
              </div>
              <div className="w-full h-[350px] flex justify-center items-start gap-8">
                {activeButton === "General" ? (
                  <>
                    <GeneralCustomer />
                  </>
                ) : activeButton === "Identity" ? (
                  <>
                    <IdentityCustomer />
                  </>
                ) : activeButton === "Emergency" ? (
                  <>
                    <EmergencyCustomer />
                  </>
                ) : activeButton === "Reference" ? (
                  <>
                    <ReferenceCustomer />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
