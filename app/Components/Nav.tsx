import bar from "@/public/Layer_1 bar.svg";
import account from "@/public/account.png";
import { FaBell } from "react-icons/fa";
import { FaFaceDizzy, FaFaceSmile, FaPerson } from "react-icons/fa6";
export default function Nav() {
  return (
    <div className="nav-width h-[90px] ps-4 bg-red-40 flex justify-between items-center border-b-[1px] z-[10] float-end absolute right-0">
      <img src={bar.src} />
      <div className="w-[300px] h-fit flex justify-end items-center gap-4">
        <div className="w-[50px] h-[50px] bg-light-grey rounded-2xl text-[30px] flex justify-center items-center">
          <FaBell />
        </div>
        <div className="w-[50px] h-[50px] bg-light-grey rounded-2xl text-[30px] flex justify-center items-center">
          <img src={account.src} />
        </div>
      </div>
    </div>
  );
}
