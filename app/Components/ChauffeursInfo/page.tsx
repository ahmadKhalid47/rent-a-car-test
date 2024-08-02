
import ChauffeursInfo from "../ChauffeursInfo";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import Vehicles from "../Vehicles";

export default function ChauffeursInfoMainPage() {
  return (
    <div className="w-full">
      <div className="flex justify-start items-start relative flex-wrap">
        <Sidebar />
        <Nav />
        <div className="w-fit h-fit mt-[90px] pt-5">
          <ChauffeursInfo/>
        </div>
      </div>
    </div>
  );
}
