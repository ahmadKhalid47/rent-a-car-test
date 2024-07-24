import bar from "@/public/car.svg";

export default function Sidebar() {
  return (
    <div className="w-[300px] sidebar-height flex flex-col justify-start items-start border-r-[1px] fixed z-0">
      <div className="w-full h-[90px] bg-white flex justify-center items-cente border-b-[1px]">
        <img src={bar.src} className="w-[124px] h-[37px] mt-[30px]" />
      </div>
    </div>
  );
}
