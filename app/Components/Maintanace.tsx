export default function Maintenance() {
  return (
    <div className="w-[50%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] py-5 px-6 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-5">
      <div className="w-[100%] h-fit flex flex-col justify-start items-start bg-red-30">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[600] text-[18px] leading-[27px]">
            Last Maintenance:
          </p>
          <p className="w-[35%] text-start font-[400] text-[18px] leading-[27px]">
            13 Sept 2023{" "}
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[600] text-[18px] leading-[27px]">
            Next Maintenance Schd:{" "}
          </p>
          <p className="w-[35%] text-start font-[400] text-[18px] leading-[27px]">
            24 Sept 2023{" "}
          </p>
        </div>
      </div>

    </div>
  );
}
