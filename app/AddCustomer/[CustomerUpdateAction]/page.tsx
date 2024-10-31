"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAlert, setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import Rental from "./Rental";
import Reference from "./Reference";
import Feature from "./Feature";
import Info from "./Info";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { FormEvent, useState, useEffect, useRef, KeyboardEvent } from "react";
import axios, { AxiosResponse } from "axios";
import {
  LoaderOnSave,
  MediumLoader,
  SmallLoader,
} from "../../Components/Loader";
import { resetState, setAllValues } from "@/app/store/Customer";
import { Country, State, City } from "country-state-city";
import Link from "next/link";

export default function Vehicles() {
  const params = useParams();
  const { CustomerUpdateAction } = params;
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let customer = useSelector((state: RootState) => state.Customer);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  let [currentPage, setCurrentPage] = useState(0);
  let [goToPage, setGoToPage] = useState(0);
  const [loading, setLoading] = useState<any>(false);
  const [showSuccess, setShowSuccess] = useState(null);
  const [showError, setShowError] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0);
  const router = useRouter();
  const formRef = useRef<any>(null);
  console.log(customer);

  let dispatch = useDispatch();
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

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
      event.preventDefault(); // Prevent form submission on Enter key
    }
  };
  async function saveData(action: string) {
    try {
      setLoading(true);

      let res: AxiosResponse<any, any> | null = null;
      if (customer?.customerImage[0] instanceof File) {
        const formData = new FormData();
        formData.append("files", customer.customerImage[0]);

        res = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const formData2 = new FormData();
      for (let i = 0; i < customer.passportImages.length; i++) {
        if (customer.passportImages[i] instanceof File) {
          formData2.append("files", customer.passportImages[i]);
        } else {
          // alreadyUploadedFiles.push(customer.passportImages[i]);
        }
      }
      const res2 = await axios.post("/api/upload", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData3 = new FormData();
      for (let i = 0; i < customer.licenseImages.length; i++) {
        if (customer.licenseImages[i] instanceof File) {
          formData3.append("files", customer.licenseImages[i]);
        } else {
          // alreadyUploadedFiles.push(customer.licenseImages[i]);
        }
      }
      const res3 = await axios.post("/api/upload", formData3, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData4 = new FormData();
      for (let i = 0; i < customer?.otherImages.length; i++) {
        if (customer?.otherImages[i] instanceof File) {
          formData4.append("files", customer?.otherImages[i]);
        } else {
          // alreadyUploadedFiles.push(customer?.otherImages[i]);
        }
      }
      const res4 = await axios.post("/api/upload", formData4, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let result: any = await axios.post(`/api/saveCustomer`, {
        customer: {
          ...customer,
          customerImage: res?.data?.message,
          passportImages: res2?.data?.message,
          licenseImages: res3?.data?.message,
          otherImages: res4?.data?.message,
        },
        createdBy: myProfile._id,
      });
      if (result?.data?.success) {
        setShowSuccess(result?.data?.success);
        setShowError(null);
      } else {
        setShowError(result?.data?.error);
        setShowSuccess(null);
      }
      dispatch(setAlert("Customer Saved Successfully"));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      if (action === "close") {
        router.push("/Customers");
      } else {
        setCurrentPage(0);
        dispatch(resetState());
      }
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(
          `/api/getCustomerInfo/${CustomerUpdateAction}`
        );
        if (result?.data?.data) {
          dispatch(setAllValues(result?.data?.data?.data));
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
        setDeleteTrigger(deleteTrigger + 1);
      }
    }
    if (CustomerUpdateAction !== "AddNew") {
      getData();
    }
    return () => {
      if (CustomerUpdateAction !== "AddNew") {
        dispatch(resetState());
      }
    };
  }, []);

  async function updateData(action: string) {
    try {
      setLoading(true);
      const carImages = customer.customerImage;

      // if (
      //   Array.isArray(carImages) &&
      //   carImages.some((item) => item instanceof File)
      // ) {
      const formData = new FormData();
      let res: AxiosResponse<any, any> | null = null;
      if (customer?.customerImage[0] instanceof File) {
        formData.append("files", customer.customerImage[0]);
        res = await axios.post("/api/uploadWithCondition", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      const formData2 = new FormData();
      for (let i = 0; i < customer.passportImages.length; i++) {
        formData2.append("files", customer.passportImages[i]);
      }
      const res2 = await axios.post("/api/uploadWithCondition", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const formData3 = new FormData();
      for (let i = 0; i < customer.licenseImages.length; i++) {
        formData3.append("files", customer.licenseImages[i]);
      }
      const res3 = await axios.post("/api/uploadWithCondition", formData3, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData4 = new FormData();
      for (let i = 0; i < customer?.otherImages.length; i++) {
        formData4.append("files", customer?.otherImages[i]);
      }
      const res4 = await axios.post("/api/uploadWithCondition", formData4, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await axios.post(`/api/updateCustomer/${CustomerUpdateAction}`, {
        ...customer,
        customerImage: res?.data?.message,
        passportImages: res2?.data?.message,
        licenseImages: res3?.data?.message,
        otherImages: res4?.data?.message,
      });
      // } else {
      // await axios.post(
      //   `/api/updateCustomer/${CustomerUpdateAction}`,
      //   customer
      // );
      // }
      if (action === "close") {
        router.push("/Customers");
      }
      dispatch(setAlert("Customer Updated Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%]  flex justify-start items-end">
                    <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
            Add New Customer
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Customers"} className="hover:underline">
                Customers
              </Link>
              {" / "}
              Add New Customer
            </span>
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown} // Add the event handler here
          className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-8 flex flex-col justify-start items-start mt-5"
        >
          <div className="w-full h-fit flex flex-col justify-start items-center">
            <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[18px] md:text-[24px] leading-[36px] count-button">
              <div className="w-[84%] h-[10px] flex justify-start items-center absolute top-[20px] left-[8%] border-[1px] border-grey dark:bg-dark1 bg-white z-[0]">
                <div
                  className={` h-full flex justify-start items-center bg-main-blue z-[0] transitions2 rounded-full`}
                  style={{ width: `${currentPage * 34}%` }}
                ></div>
              </div>
              <div className="w-[20%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(0);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
                    currentPage >= 0
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  <span className="text-center -translate-x-[2px]">1</span>
                </button>
              </div>
              <div className="w-[20%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(1);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
                    currentPage >= 1
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  2
                </button>
              </div>
              <div className="w-[20%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(2);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
                    currentPage >= 2
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  }
                     flex justify-center items-center rounded-full z-[5]`}
                >
                  3
                </button>
              </div>
              <div className="w-[20%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(3);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] ${
                    currentPage >= 3
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  4
                </button>
              </div>
            </div>
            <div className="w-full h-[50px] flex justify-between items-center relative text-[10px] sm:text-[12px] md:text-[16px] leading-[14px] md:leading-[19px] text-shadow">
              <div
                className={`w-[20%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 0 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                General Information
              </div>
              <div
                className={`w-[20%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 1 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Identity Information
              </div>
              <div
                className={`w-[20%] xl:w-fi h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 2 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Emergency Information
              </div>
              <div
                className={`w-[20%] xl:w-fi h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 3 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Reference Information
              </div>
            </div>
          </div>

          {currentPage === 0 ? (
            <Info />
          ) : currentPage === 1 ? (
            <Rental />
          ) : currentPage === 2 ? (
            <Feature />
          ) : currentPage === 3 ? (
            <Reference />
          ) : null}

          <div
            className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 justify-between items-center`}
          >
            <div className="w-[50%] flex justify-start item-center gap-1 md:gap-3">
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
            </div>
            <div className="w-[50%] flex justify-end item-center gap-1 md:gap-3">
              <button
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(resetState());
                  setCurrentPage(0);
                }}
              >
                Reset
              </button>

              {currentPage === 3 ? (
                <>
                  {CustomerUpdateAction !== "AddNew" ? (
                    <>
                      {loading ? (
                        <LoaderOnSave />
                      ) : (
                        <div className="flex justify-start items-center gap-1 md:gap-3">
                          <button
                            className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                            disabled={loading}
                            onClick={() => {
                              updateData("close");
                            }}
                          >
                            {loading ? <SmallLoader /> : "Update and Close"}
                          </button>
                          <div />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {loading ? (
                        <LoaderOnSave />
                      ) : (
                        <div className="flex justify-start items-center gap-1 md:gap-3">
                          <button
                            className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                            disabled={loading}
                            onClick={() => {
                              saveData("close");
                            }}
                          >
                            {loading ? <SmallLoader /> : "Save and Close"}
                          </button>
                          <button
                            className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                            disabled={loading}
                            onClick={() => {
                              saveData("new");
                            }}
                          >
                            {loading ? <SmallLoader /> : "Save and New"}
                          </button>
                          <div />
                        </div>
                      )}
                    </>
                  )}
                </>
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
          </div>
        </form>
      </div>
    </div>
  );
}
