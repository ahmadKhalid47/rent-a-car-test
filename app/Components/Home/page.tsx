import Nav from "../Nav";
import Sidebar from "../Sidebar";
import Vehicles from "../Vehicles";

export default function Home() {
  return (
    <div className="w-full pe-[3%]">
      <div className="flex justify-between items-start relative flex-wrap">
        <Sidebar />
        <Nav />
        <div className="w-full h-[150vh] mt-[90px] pt-5">
          <Vehicles />
        </div>
      </div>
    </div>
  );
}
