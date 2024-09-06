import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function GeneralCustomer() {
  let { CustomerInfo } = useSelector((state: RootState) => state.CustomerInfo);

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[40%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Customer ID:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            53948
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Gender:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.gender}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Nationality:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.nationality}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Phone:</p>
          <div className="w-[30%] text-start font-[400] text-[18px] leading-[27px] flex justify-start gap-3 items-center">
            {CustomerInfo?.phone}
          </div>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Alternative Phone:
          </p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.alternativePhone}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Country:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.country}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">City:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.city}
          </p>
        </div>
      </div>
      <div className="w-[40%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Full Name: </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.name}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Customer Type:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.customerType}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Date Of Birth:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.dateOfBirth}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Email:</p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px] truncate">
            {CustomerInfo?.emailAddress}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Street Address:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px] truncate">
            {CustomerInfo?.streetAddress}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            State/Provinces:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px] truncate">
            {CustomerInfo?.state}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">
            Postal/Zip Code:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.postalCode}
          </p>
        </div>
      </div>
    </div>
  );
}
