"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginPage1 from "@/public/Vector 11.png";
import loginPage2 from "@/public/Vector 10 (1).png";
import car from "@/public/Layer_1 (1).svg";
import axios from "axios";
import { FormEvent } from "react";
import { Alert } from "@mui/material";
import Link from "next/link";
import Loader, { SmallLoader } from "@/app/Components/Loader";
import expire404 from "@/public/404.svg";
export default function ResetPassword() {
  const params = useParams();
  const token = params?.token;
  const [showError, setShowError] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState<any>(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isVerified, setIsVerified] = useState<any>(undefined);
  const [loading, setLoading] = useState<any>(true);
  const [buttonLoading, setButtonLoading] = useState<any>(false);

  useEffect(() => {
    async function verifyTokenApi() {
      try {
        setLoading(true);
        setIsVerified(undefined);
        await axios.get(`/api/verifyTokenForgotPassword`, {
          headers: { token },
        });
        setIsVerified(true);
      } catch (err) {
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    }
    verifyTokenApi();
  }, []);

  const ResetPasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (typeof window === "undefined") {
      return;
    }
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });

    if (formDataObj?.password !== formDataObj?.confirmPassword) {
      setShowError("Passwords did not matched");
      return;
    }

    try {
      setButtonLoading(true);
      let result: any = await axios.post(`/api/resetPassword`, {
        token,
        ...formDataObj,
      });
      if (result?.data?.success) {
        setShowSuccess(result?.data?.success);
        setShowError(null);
      } else {
        setShowError(result?.data?.error);
        setShowSuccess(null);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
      {loading || isVerified === undefined ? (
        <Loader />
      ) : (
        <>
          {isVerified === false ? (
            <>
              <img src={expire404.src} className="w-[40vw] mx-auto mt-10" />
              <h3 className="font-[600] text-[25px] leading-[38px] text-black text-center">
                Sorry, your link to reset password has been expired!
              </h3>
            </>
          ) : (
            <div className="w-full h-fit">
              <div className="w-full h-[100vh] flex flex-col lg:flex-row justify-center items-center">
                <div className="w-full lg:w-[50%] h-[40%] sm:h-[50%] lg:h-full flex justify-center items-center bg-main-blue relative">
                  <img
                    src={loginPage2.src}
                    className="w-[100% h-[90%] absolute bottom-0 right-0"
                  />
                  <img
                    src={loginPage1.src}
                    className="w-[100%] h-[50%] absolute bottom-0 left-0"
                  />

                  <div className="w-[90%] sm:w-fit h-fit flex flex-col justify-center items-start gap-2 sm:gap-[20px] z-[10]">
                    <img
                      src={car.src}
                      className="w-[120px] sm:w-[175px] z-10"
                    />
                    <h1 className="font-[600] text-[40px] sm:text-[70px] leading-[40px] sm:leading-[73px] capitalize text-white">
                      Reset <br />
                      Your Password!
                    </h1>
                    <p className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[22px] text-white z-10 ">
                      Are you ready to efficiently manage your fleet and
                      <br className="hidden sm:block" />
                      reservations? Let's work together to ensure everything
                      <br className="hidden sm:block" />
                      runs smoothly and seamlessly.
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-[50%] h-[60%] sm:h-[50%] lg:h-full bg-white flex justify-center items-center">
                  <div className="w-full flex justify-center items-center">
                    {showError ? (
                      <Alert
                        variant="filled"
                        severity="error"
                        className="absolute w-fit z-[100] top-2 right-2 alert-animation capitalize"
                      >
                        {showError}
                      </Alert>
                    ) : showSuccess ? (
                      <Alert
                        variant="filled"
                        severity="success"
                        className="absolute w-fit z-[100] top-2 right-2 alert-animation capitalize"
                      >
                        {showSuccess}
                      </Alert>
                    ) : null}
                    <form
                      onSubmit={ResetPasswordSubmit}
                      className="w-[90%] sm:w-[60%] h-fit flex flex-col justify-center items-start gap-[10px]"
                    >
                      <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
                        <h3 className="font-[400]">New Password</h3>
                        <div className="w-full h-fit relative">
                          <input
                            className="w-full h-[59px] px-4 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
                            type={!showPassword1 ? "Password" : "text"}
                            name="password"
                            placeholder="New Password"
                            minLength={6}
                            maxLength={30}
                            required
                          />
                          {!showPassword1 ? (
                            <FaEyeSlash
                              className="absolute right-5 top-[20px] text-[20px] cursor-pointer"
                              onClick={(e) => setShowPassword1(!showPassword1)}
                            />
                          ) : (
                            <FaEye
                              className="absolute right-5 top-[20px] text-[20px] cursor-pointer"
                              onClick={(e) => setShowPassword1(!showPassword1)}
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
                        <h3 className="font-[400]">Confirm Password</h3>
                        <div className="w-full h-fit relative">
                          <input
                            className="w-full h-[59px] px-4 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
                            type={!showPassword2 ? "Password" : "text"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            minLength={6}
                            maxLength={30}
                            required
                          />
                          {!showPassword2 ? (
                            <FaEyeSlash
                              className="absolute right-5 top-[20px] text-[20px] cursor-pointer"
                              onClick={(e) => setShowPassword2(!showPassword2)}
                            />
                          ) : (
                            <FaEye
                              className="absolute right-5 top-[20px] text-[20px] cursor-pointer"
                              onClick={(e) => setShowPassword2(!showPassword2)}
                            />
                          )}
                        </div>
                      </div>

                      <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
                        {showSuccess ? (
                          <Link
                            href={"/"}
                            className="font-[400] text-[16px] leading-[20px] text-[#EB4643] w-full text-end mb-2 cursor-pointer"
                          >
                            Go Back To Login Page?
                          </Link>
                        ) : null}
                      </div>

                      <button
                        type="submit"
                        className="w-full h-[59px] flex justify-center items-center rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[20px] text-center"
                      >
                        {buttonLoading ? <SmallLoader /> : "Submit"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
