import bar from "@/public/Layer_1 (1).svg";
export default function Sidebar() {
  return (
    <div className="w-[300px] sidebar-height bg-blue-500 flex flex-col justify-start items-start border-b-[1px] fixed z-0">
      <img src={bar.src} className="w-[200px"/>
      {/* <div className="w-[300px] h-fit flex justify-end items-center gap-4">
        <div className="w-[50px] h-[50px] bg-light-grey rounded-2xl text-[30px] flex justify-center items-center">
          <FaBell />
        </div>
        <div className="w-[50px] h-[50px] bg-light-grey rounded-2xl text-[30px] flex justify-center items-center">
          <img src={account.src} />
        </div>
      </div> */}
    </div>
  );
}
