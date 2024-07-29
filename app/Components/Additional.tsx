import ft1 from "@/public/ft (1).svg";
import ft2 from "@/public/ft (2).svg";
import ft3 from "@/public/ft (3).svg";

export default function Additional() {
  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
        <p className="font-[600] text-[18px] leading-[27px]">GPS</p>
      </div>
      <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
        <p className="font-[600] text-[18px] leading-[27px]">
          Air Conditioning
        </p>
      </div>
      <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
        <p className="font-[600] text-[18px] leading-[27px]">Bluetooth</p>
      </div>
    </div>
  );
}
