export default function EmergencyChauffeurs() {
  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-center gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[100%] h-fit flex flex-col justify-between items-center bg-red-30 ">
        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px] font-[600]">
          <p className="w-[30%] text-start text-[18px] leading-[27px]">
            Emergency Contact Name
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px]">
            Relationship
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            Emergency Phone
          </p>
        </div>

        <div className="w-[100%] h-fit flex justify-between items-start py-[3px] border-b-[2px font-[400]">
          <p className="w-[30%] text-start text-[18px] leading-[27px]">
            Lina Smith
          </p>
          <p className="w-[25%] text-start text-[18px] leading-[27px] flex justify-between items-center">
            Brother
          </p>
          <p className="w-[20%] text-start text-[18px] leading-[27px]">
            438 397 3075
          </p>
        </div>
      </div>
    </div>
  );
}
