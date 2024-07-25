import ft1 from "@/public/ft (1).svg";
import ft2 from "@/public/ft (2).svg";
import ft3 from "@/public/ft (3).svg";

export default function Additional() {
  return (
    <div className="w-full h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] py-5 px-6 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-5">
      <div className="w-[25%] h-fit flex gap-2 justify-center items-start bg-red-30">
        <img src={ft1.src} />
        <p className="w-[35%] text-start font-[400] text-[18px] leading-[21px] mt-1">
          GPS
        </p>
      </div>
      <div className="w-[25%] h-fit flex gap-2 justify-center items-start bg-red-30">
        <img src={ft3.src} />
        <p className="w-fit text-start font-[400] text-[18px] leading-[21px] mt-[2px]">
          Air Conditioning
        </p>
      </div>
      <div className="w-[25%] h-fit flex gap-2 justify-center items-start bg-red-30">
        <img src={ft2.src} />
        <p className="w-fit text-start font-[400] text-[18px] leading-[21px] mt-[2px]">
          Bluetooth
        </p>
      </div>
    </div>
  );
}
