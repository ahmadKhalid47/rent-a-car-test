import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function GeneralChauffeurs() {
  let { chauffeurInfo } = useSelector(
    (state: RootState) => state.chauffeurInfo
  );

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[40%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Gender:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.gender ? chauffeurInfo?.gender : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Nationality:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.nationality ? chauffeurInfo?.nationality : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Phone:</p>
          <div className="w-[30%] text-start font-[400] text-[18px] leading-[27px] flex justify-start gap-3 items-center">
            {chauffeurInfo?.phone ? chauffeurInfo?.phone : "---"}
          </div>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Rent Per Day:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            ${chauffeurInfo?.rentPerDay ? chauffeurInfo?.rentPerDay : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Country:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.country ? chauffeurInfo?.country : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px]">
          <p className="font-[400] text-[18px] leading-[27px]">City:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.city ? chauffeurInfo?.city : "---"}
          </p>
        </div>
      </div>
      <div className="w-[40%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Full Name: </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.name ? chauffeurInfo?.name : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Date Of Birth:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.dateOfBirth ? chauffeurInfo?.dateOfBirth : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Email:</p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.emailAddress ? chauffeurInfo?.emailAddress : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Alternative Phone:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.alternativePhone
              ? chauffeurInfo?.alternativePhone
              : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Street Address:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.streetAddress
              ? chauffeurInfo?.streetAddress
              : "---"}
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            State/Provinces:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.state ? chauffeurInfo?.state : "---"}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Postal/Zip Code:
          </p>
          <p className="w-[40%] text-start font-[400] text-[18px] leading-[27px]">
            {chauffeurInfo?.postalCode ? chauffeurInfo?.postalCode : "---"}
          </p>
        </div>
      </div>
    </div>
  );
}
