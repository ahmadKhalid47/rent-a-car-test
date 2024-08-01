export default function ReferenceCustomer() {
  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[80%] h-fit flex flex-col justify-start items-start bg-red-30 ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Customer ID:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            539485
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Gender:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            Suzuki
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Nationality:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            American
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Phone:</p>
          <div className="w-[30%] text-start font-[400] text-[18px] leading-[27px] flex justify-start gap-3 items-center">
            846 373 543
          </div>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Alternative Phone:
          </p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            846 373 543
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">Country:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            USA
          </p>
        </div>

        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px">
          <p className="font-[400] text-[18px] leading-[27px]">City:</p>
          <p className="w-[30%] text-start font-[400] text-[18px] leading-[27px]">
            New York
          </p>
        </div>
      </div>
    </div>
  );
}
