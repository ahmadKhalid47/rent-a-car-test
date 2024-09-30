import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { formatDate, formatId } from "@/app/Components/functions/formats";

export default function ThirdPage({ customersName, id }: any) {
  let Agreement = useSelector((state: RootState) => state.Agreement);
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  return (
    <div
      className={`w-full h-[1123px] flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 relative g-dark1 bg-white text-black`}
    >
      <div className="w-full h-fit  rounded-[10px] flex flex-col justify-start items-center">
        <div className="w-full h-fit flex justify-between items-center mt-1">
          <div className="w-[50%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] ext-white text-black">
            <span className=" text-[17px] font-[700] leading-[20px] text-transparent">
              Contract To:
            </span>
            <span className="text-transparent">
              {customersName ? customersName : "---"}
            </span>

            <h2 className="w-full h-fit rounded-[10px] ext-white text-black font-[400] text-[18px] leading-[21px] text-start">
              Contract Number:
              <span className="font-[600]"> #{formatId(id)}</span>
            </h2>
            <span className=" font-[600] text-[18px] leading-[21px] ">
              Issue Date:{" "}
              <span className="font-[400]">{formatDate(todayDate)}</span>
            </span>
          </div>
        </div>
        <div
          className="w-full h-fit flex flex-col justify-between items-center mt-4"
          dangerouslySetInnerHTML={{
            __html: Agreement?.terms,
          }}
        />
      </div>
    </div>
  );
}
