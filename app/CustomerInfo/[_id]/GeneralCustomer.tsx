import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function GeneralCustomer() {
  let { CustomerInfo } = useSelector((state: RootState) => state.CustomerInfo);

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[43%] h-fit flex flex-col justify-start items-start ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Full Name: </p>
          <p className="w-[35%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.name?CustomerInfo?.name:"---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Gender:</p>
          <p className="w-[35%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.gender?CustomerInfo?.gender:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Nationality:</p>
          <p className="w-[35%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.nationality?CustomerInfo?.nationality:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Phone:</p>
          <div className="w-[35%] text-start font-[400] text-[18px] leading-[27px] flex justify-start gap-3 items-center">
            {CustomerInfo?.phone?CustomerInfo?.phone:"---"}
          </div>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Alternative Phone:
          </p>
          <p className="w-[35%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.alternativePhone?CustomerInfo?.alternativePhone:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Country:</p>
          <p className="w-[35%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.country?CustomerInfo?.country:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">City:</p>
          <p className="w-[35%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.city?CustomerInfo?.city:"---"}
          </p>
        </div>
      </div>
      <div className="w-[43%] h-fit flex flex-col justify-start items-start ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Customer Type:
          </p>
          <p className="w-[45%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.customerType?CustomerInfo?.customerType:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Date Of Birth:
          </p>
          <p className="w-[45%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.dateOfBirth?CustomerInfo?.dateOfBirth:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Email:</p>
          <p className="w-[45%] text-start font-[400] text-[18px] leading-[27px] break-words">
            {CustomerInfo?.emailAddress?CustomerInfo?.emailAddress:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Street Address:
          </p>
          <p className="w-[45%] text-start font-[400] text-[18px] leading-[27px] break-words">
            {CustomerInfo?.streetAddress?CustomerInfo?.streetAddress:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            State/Provinces:
          </p>
          <p className="w-[45%] text-start font-[400] text-[18px] leading-[27px] break-words">
            {CustomerInfo?.state?CustomerInfo?.state:"---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">
            Postal/Zip Code:
          </p>
          <p className="w-[45%] text-start font-[400] text-[18px] leading-[27px]">
            {CustomerInfo?.postalCode?CustomerInfo?.postalCode:"---"}
          </p>
        </div>
      </div>
    </div>
  );
}
