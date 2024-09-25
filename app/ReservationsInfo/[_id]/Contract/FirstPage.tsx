import { useSelector } from "react-redux";
import { formatDate, formatId } from "@/app/Components/functions/formats";
import carLogo from "@/public/car.svg";
import { RootState } from "@/app/store";

export default function FirstPage({
  data,
  customersData,
  chauffeursData,
  VehiclesData,
  id,
}: any) {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let companyProfile: any = useSelector(
    (state: RootState) => state.companyProfile
  );
  return (
    <div
      className={`w-full h-[1123px] flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 relative -dark1 bg-white text-black`}
    >
      <div className="w-full h-fit  rounded-[10px] flex flex-col justify-start items-center">
        <div className="w-full h-fit rounded-[10px] -white text-black font-[500] text-[18px] leading-[21px] text-center flex justify-end items-center mt-[40px]">
          <img
            src={companyProfile?.profilePic}
            className={`w-[120px] h-[40px]`}
          />
        </div>
        <div className="w-full h-fit flex justify-between items-center mt-1">
          <div className="w-[50%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] -white text-black">
            <span className=" text-[17px] font-[700] leading-[20px] text-transparent">
              Contract To:
            </span>
            <span className="text-transparent">
              {customersData?.data?.name ? customersData?.data?.name : "---"}
            </span>

            <h2 className="w-full h-fit rounded-[10px] -white text-black font-[400] text-[18px] leading-[21px] text-start">
              Contract Number:
              <span className="font-[600]"> #{formatId(id)}</span>
            </h2>
            <span className=" font-[600] text-[18px] leading-[21px] ">
              Issue Date:{" "}
              <span className="font-[400]">{formatDate(todayDate)}</span>
            </span>
          </div>
          <div className="w-[50%] h-fit flex flex-col justify-start items-end text-[14px] font-[400] leading-[17px] -white text-black">
            <span className=" text-[18px] font-[600] leading-[20px] -white text-black">
              Rapid Rent a Car
            </span>
            <span className="text-transparent">transparent</span>
            <span className="">{myProfile?.address}</span>
            <span className="">{myProfile?.phone}</span>
            <span className="">{myProfile?.email}</span>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-between items-center">
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] border-2 border-grey overflow-hidden mt-6">
            <div className="w-full h-fit flex justify-between items-center py-3 px-4 -dark2 bg-light-grey font-[600]">
              <div className="w-[100%] h-fit flex justify-start items-center text-[18px] font-[600]">
                Customer{" "}
              </div>
            </div>
            <div className="w-full h-fit flex justify-between items-start py-3 px-4 text-[14px]">
              <div className="w-[30%] h-fit flex justify-between items-center ">
                <div className="w-[35%] text-start font-[600] ">Full Name</div>
                <div className="w-[65%] text-start font-[400] ">
                  {customersData?.data?.name
                    ? customersData?.data?.name
                    : "---"}
                </div>
              </div>
              <div className="w-[36%] h-fit flex justify-between items-center">
                <div className="w-[45%] text-start font-[600] ">
                  ID/Passport NO:
                </div>
                <div className="w-[55%] text-start font-[400] ">
                  {customersData?.data?.passportNumber
                    ? customersData?.data?.passportNumber
                    : "---"}
                </div>
              </div>
              <div className="w-[33%] h-fit flex justify-between items-center ">
                <div className="w-[100%] text-start font-[600] ">Address:</div>
              </div>
            </div>
            <div className="w-full h-fit flex justify-between items-start py-3 px-4 text-[14px]">
              <div className="w-[30%] h-fit flex justify-between items-center ">
                <div className="w-[35%] text-start font-[600] ">Phone:</div>
                <div className="w-[65%] text-start font-[400] ">
                  {customersData?.data?.phone
                    ? customersData?.data?.phone
                    : "---"}
                </div>
              </div>
              <div className="w-[36%] h-fit flex justify-between items-center">
                <div className="w-[45%] text-start font-[600] ">
                  Date of birth :
                </div>
                <div className="w-[55%] text-start font-[400] ">
                  {customersData?.data?.dateOfBirth
                    ? customersData?.data?.dateOfBirth
                    : "---"}
                </div>
              </div>
              <div className="w-[33%] h-fit flex justify-between items-center ">
                <div className="w-[100%] text-start font-[400] ">
                  {customersData?.data?.streetAddress
                    ? customersData?.data?.streetAddress
                    : "---"}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-start mt-6">
            <div className="w-[49%] flex flex-col justify-start items-start rounded-[5px] border-2 border-grey overflow-hidden">
              <div className="w-full h-fit flex justify-between items-center py-3 px-4 -dark2 bg-light-grey font-[600]">
                <div className="w-[100%] h-fit flex justify-start items-center text-[18px] font-[600]">
                  Reservation Details
                </div>
              </div>
              <div className="w-full h-fit flex-col justify-start items-start py-3 px-4 text-[14px] divide-dashed divide-y divide-gray-300">
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">Pick Up:</div>
                  <div className="w-fit text-start font-[400] ">
                    {data?.PickUpAddress ? data?.PickUpAddress : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">
                    Date & Time:
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {data?.PickUpDate ? data?.PickUpDate : "---"}{" "}
                    {data?.PickUpTime ? data?.PickUpTime : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-[60px] text-start font-[600] ">
                    Drop Off:
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {data?.dropOffAddress ? data?.dropOffAddress : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">
                    Date & Time:
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {data?.dropOffDate ? data?.dropOffDate : "---"}{" "}
                    {data?.dropOffTime ? data?.dropOffTime : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">
                    Security Deposit:
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {data?.securityDeposit ? data?.securityDeposit : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">
                    Total Duration:
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {data?.duration ? data?.duration : "---"}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[49%] flex flex-col justify-start items-start rounded-[5px] border-2 border-grey overflow-hidden">
              <div className="w-full h-fit flex justify-between items-center py-3 px-4 -dark2 bg-light-grey font-[600]">
                <div className="w-[100%] h-fit flex justify-start items-center text-[18px] font-[600]">
                  Chauffeur Information
                </div>
              </div>
              <div className="w-full h-fit flex-col justify-start items-start py-3 px-4 text-[14px] divide-dashed divide-y divide-gray-300">
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">
                    Full Name :{" "}
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {chauffeursData?.data?.name
                      ? chauffeursData?.data?.name
                      : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">
                    Driving Licence:{" "}
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {chauffeursData?.data?.licenseNumber
                      ? chauffeursData?.data?.licenseNumber
                      : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">
                    Expire Date:{" "}
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {chauffeursData?.data?.licenseValid
                      ? chauffeursData?.data?.licenseValid
                      : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">
                    Nationality:{" "}
                  </div>
                  <div className="w-fit text-start font-[400] ">
                    {chauffeursData?.data?.nationality
                      ? chauffeursData?.data?.nationality
                      : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">Phone: </div>
                  <div className="w-fit text-start font-[400] ">
                    {chauffeursData?.data?.phone
                      ? chauffeursData?.data?.phone
                      : "---"}
                  </div>
                </div>
                <div className="w-[100%] h-fit flex justify-start gap-1 items-start py-3">
                  <div className="w-fit text-start font-[600] ">Email: </div>
                  <div className="w-fit text-start font-[400] ">
                    {chauffeursData?.data?.emailAddress
                      ? chauffeursData?.data?.emailAddress
                      : "---"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] border-2 border-grey overflow-hidden mt-6">
            <div className="w-full h-fit flex justify-between items-center py-3 px-4 -dark2 bg-light-grey font-[600]">
              <div className="w-[100%] h-fit flex justify-start items-center text-[18px] font-[600]">
                Vehicle Information{" "}
              </div>
            </div>
            <div className="w-full h-fit flex justify-between items-start py-3 px-4 text-[14px]">
              <div className="w-fit h-fit flex justify-between items-center gap-2">
                <div className="w-fit text-start font-[600] ">Make: </div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.make ? VehiclesData?.data?.make : "---"}
                </div>
              </div>
              <div className="w-fit h-fit flex justify-between items-center gap-2">
                <div className="w-fit text-start font-[600] ">Model: </div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.model
                    ? VehiclesData?.data?.model
                    : "---"}
                </div>
              </div>
              <div className="w-fit h-fit flex justify-between items-center gap-2">
                <div className="w-fit text-start font-[600] ">
                  Registration NO:
                </div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.registration
                    ? VehiclesData?.data?.registration
                    : "---"}
                </div>
              </div>
              <div className="w-[15%] h-fit flex justify-start items-center gap-2">
                <div className="w-fit text-start font-[600] ">Making Year:</div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.year ? VehiclesData?.data?.year : "---"}
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex justify-between items-start py-3 px-4 text-[14px]">
              <div className="w-fit h-fit flex justify-start items-center gap-2">
                <div className="w-fit text-start font-[600] ">
                  Current Odometer (KMPH):
                </div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.odometer
                    ? VehiclesData?.data?.odometer
                    : "---"}
                </div>
              </div>
              <div className="w-fit h-fit flex justify-start items-center gap-2">
                <div className="w-fit text-start font-[600] ">
                  Current Fuel:{" "}
                </div>
                <div className="w-fit text-start font-[400] ">
                  {data?.fuelStatus ? data?.fuelStatus : "---"}
                </div>
              </div>
              <div className="w-[27%] h-fit flex justify-start items-center gap-2">
                <div className="w-fit text-start font-[600] ">
                  Rental Price Per Day:
                </div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.rentDay
                    ? VehiclesData?.data?.rentDay
                    : "---"}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-fit flex justify-end items-start py-1 px-4 absolute bottom-[60px]">
            <div className="w-[50%] h-fit flex flex-col justify-center items-end text-[14px] font-[400] leading-[17px] -white text-black">
              <span className="w-[50%] leading-[21px] mt-1 flex justify-between items-start text-justify border-b-[1px] border-black"></span>
              <span className="w-[50%] leading-[21px] mt-1 text-center">
                SIGNATURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
