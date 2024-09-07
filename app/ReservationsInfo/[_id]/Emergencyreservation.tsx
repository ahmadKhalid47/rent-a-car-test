import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import Link from "next/link";

interface dataType {
  data: any;
  loading: boolean;
}

export default function Emergencyreservations({ data, loading }: dataType) {

  return (
    <div className="w-full flex justify-between items-center  px-[70px] py-[20px] ">
      <div className=" ">
        <div className="w-[150px] h-[150px] rounded-2xl  ">
          <img
            src={data?.data?.carImages[data?.data.thumbnailImage]}
            alt="image-0"
            style={{ width: "100%", height: "100%" }}
            className="rounded-[10px]"
          />
        </div>
      </div>
      <div className="w-1/2">
        <div className=" w-full flex justify-between ">
          <div className="font-[400] text-[18px]">Make:</div>
          <div className="font-[400] text-[18px]">{data?.data?.make}</div>
        </div>
        <div className="border border-t mt-2 mb-2"></div>

        <div className=" w-full flex justify-between ">
          <div className="font-[400] text-[18px]">Model:</div>

          <div className="font-[400] text-[18px]">{data?.data?.model}</div>
        </div>
        <div className="border border-t mt-2 mb-2"></div>
        <div className=" w-full flex justify-between ">
          <div className="font-[400] text-[18px]">City:</div>
          <div className="font-[400] text-[18px]">{data?.data?.city}</div>
        </div>
        <div className="border border-t mt-2 mb-2"></div>
        <div className=" w-full flex justify-between ">
          <div className="font-[400] text-[18px]">Country:</div>
          <div className="font-[400] text-[18px]">{data?.data?.country}</div>
        </div>
      </div>
      <div className="">
        <Link
          href={`/VehicleInfo/${data?._id}`}
          className="w-fit px-3 md:px-6 py-4 h-fit md:h-[44px] rounded-[10px] bg-[#F9F9F9] text-main-blue border border-gray-200 font-[600] text-[12px] md:text-[18px] leading-[21px] text-center"
        >
          More Details
        </Link>
      </div>
    </div>
  );
}
