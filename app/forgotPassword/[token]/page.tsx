"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import loginPage1 from "@/public/Vector 11.png";
import loginPage2 from "@/public/Vector 10 (1).png";
import car from "@/public/Layer_1 (1).svg";
import axios from "axios";
import { FormEvent } from "react";
import { Alert } from "@mui/material";

export default function ResetPassword() {
  const params = useParams();
  const token = params?.token;
  const [showError, setShowError] = useState(null);

  const [isVerified, setIsVerified] = useState<any>(undefined);
  const [loading, setLoading] = useState<any>(false);

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
        if (typeof window === "undefined") return;
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    try {
      setLoading(true);
      let result: any = await axios.post(`/api/resetPassword`, {
        token,
        ...formDataObj,
      });
      if (result?.data?.error === null) {
        setShowError(result?.data?.error);
      } else {
        setShowError(result?.data?.error);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading || isVerified === undefined ? (
        <>
          {isVerified === false ? (
            <h1>Sorry This has been Expired!</h1>
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
                      Your back!
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
                        className="absolute w-fit z-[100] top-2 right-2 fade-ou capitalize"
                      >
                        {showError}
                      </Alert>
                    ) : null}

                    <form
                      onSubmit={ResetPasswordSubmit}
                      className="w-[90%] sm:w-[60%] h-fit flex flex-col justify-center items-start gap-[10px]"
                    >
                      <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2">
                        <h3 className="font-[400]">New Password</h3>
                        <input
                          className="w-full h-[59px] px-4 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] border-[1px] border-grey"
                          type="password"
                          name="password"
                          placeholder="password"
                          minLength={6}
                          maxLength={30}
                          required
                        />
                      </div>
                      <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[13px] font-[500] text-[18px] leading-[12px] pb-2"></div>
                      <button
                        type="submit"
                        className="w-full h-[59px] flex justify-center items-center rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[20px] text-center"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
