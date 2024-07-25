import bar from "@/public/car.svg";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-[300px] sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-0">
      <div className="w-full h-[90px] bg-white flex justify-center items-cente border-b-[2px]">
        <Link href={"/Components/Home"} className="w-fit h-fit" >
        <img src={bar.src} className="w-[124px] h-[37px] mt-[30px]" />
        </Link>
      </div>
    </div>
  );
}
