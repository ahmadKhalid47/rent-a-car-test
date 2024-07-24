import Nav from "../Nav";
import Sidebar from "../Sidebar";
import Vehicles from "../Vehicles";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex justify-start items-start relative flex-wrap">
        <Sidebar />
        <Nav />
        <div className="w-fit h-[105vh] mt-[90px] pt-5 border-t-[1px] pb-20">
          <Vehicles />
        </div>
      </div>
    </div>
  );
}
