import CarInfo from "../CarInfo";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import Vehicles from "../Vehicles";

export default function CarInfoMainPage() {
  return (
    // <div className="w-full">
    //   <div className="flex justify-start items-start relative flex-wrap">
    //     <Sidebar />
    //     <Nav />
        <div className="w-fit h-fit mt-[90px] pt-5">
          <CarInfo/>
        </div>
    //   </div>
    // </div>
  );
}
