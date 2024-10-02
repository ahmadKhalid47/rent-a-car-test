"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams } from "next/navigation";
import image404 from "@/public/image404.png";
import Link from "next/link";
import { setUserInfo } from "@/app/store/UserInfo";

export default function UserInfoMainPage() {
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
  let { UserInfo } = useSelector((state: RootState) => state.UserInfo);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getUserInfo/${_id}`);
        if (result?.data?.data) {
          dispatch(setUserInfo(result?.data?.data));
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
  console.log(UserInfo);

  return (
    <div className="w-fit h-fit mt-[90px] pt-5">
      <div
        className={`${
          global.sidebarShow ? "nav-width" : "nav-closed-width"
        } h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px]   pe-[10px] md:pe-[50px] ps-[10px] md:ps-[20px]  pb-14`}
      >
        <div className="w-full h-[200px  px-6">
          <h3 className="font-[600] text-[25px] leading-[38px] dark:text-white text-black capitalize">
            {UserInfo?.name ? UserInfo?.name : "---"}
          </h3>
          <div className="flex justify-between items-start">
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px]">
              <Link href={"/Users"} className="hover:underline">
                Users / All Users
              </Link>
              {" / "}
              {UserInfo?.name ? UserInfo?.name : "---"}
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] mt-5 relative">
          <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%]  rounded-[10px]">
            <div className="w-full h-fit flex justify-start gap-[7%] items-center dark:bg-dark1 bg-white rounded-[10px] border-2 border-grey py-7 px-6 ">
              {/* _______ */}
              <div className="w-full flex justify-between items-center px-6 py-[20px] ">
                <div className=" ">
                  <div className="w-[155px] h-[155px] rounded-2xl  ">
                    <img
                      src={
                        UserInfo?.profilePic
                          ? UserInfo?.profilePic[0]
                          : image404.src
                      }
                      alt="image-0"
                      style={{ width: "100%", height: "100%" }}
                      className="rounded-[10px]"
                    />
                  </div>
                </div>
                <div className="w-[80%] flex justify-between items-center">
                  <div className="w-[47%]">
                    <div className=" w-full flex justify-between ">
                      <div className="font-[400] text-[18px]">Full Name:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.name}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>

                    <div className=" w-full flex justify-between ">
                      <div className="font-[400] text-[18px]">Company:</div>

                      <div className="font-[400] text-[18px]">
                        {UserInfo?.company}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>
                    <div className=" w-full flex justify-between ">
                      <div className="font-[400] text-[18px]">City:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.city}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>
                    <div className=" w-full flex justify-between ">
                      <div className="font-[400] text-[18px]">Phone:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.phone}
                      </div>
                    </div>
                  </div>
                  <div className="w-[47%]">
                    <div className=" w-full flex justify-between ">
                      <div className="font-[400] text-[18px]">Username:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.username}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>

                    <div className=" w-full flex justify-between ">
                      <div className="font-[400] text-[18px]">Country:</div>

                      <div className="font-[400] text-[18px]">
                        {UserInfo?.country}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>
                    <div className=" w-full flex justify-between ">
                      <div className="font-[400] text-[18px]">Email:</div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.email}
                      </div>
                    </div>
                    <div className="border border-t mt-2 mb-2"></div>
                    <div className=" w-full flex justify-between ">
                      <div className="font-[400] text-[18px]">
                        Plan Validity:
                      </div>
                      <div className="font-[400] text-[18px]">
                        {UserInfo?.plan}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit dark:bg-dark1 bg-white  border-2 border-grey mt-5 rounded-[10px] px-5 py-1">
              <div className="w-full h-[350px] flex justify-center items-start gap-8 overflow-auto scroll">
                {/* {activeButton === "General" ? (
                  <>
                    <GeneralUsers />
                  </>
                ) : activeButton === "Identity" ? (
                  <>
                    <IdentityUser />
                  </>
                ) : activeButton === "Emergency" ? (
                  <div className="w-full flex flex-col justify-start items-start gap-2 h-fit">
                    <EmergencyUsers />
                  </div>
                ) : null} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
