import {
  FaBars,
  FaBeer,
  FaChevronDown,
  FaHamburger,
  FaSquare,
} from "react-icons/fa";
import check from "@/public/check.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import shape from "@/public/Shape.svg";
import list from "@/public/Group 110 (1).svg";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  GridViewRounded,
  Menu,
  MenuOpen,
  MenuRounded,
} from "@mui/icons-material";
import { BiMenu } from "react-icons/bi";
import { FcMenu } from "react-icons/fc";
export default function GridView() {
  return (
    <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] p-[5%] pt-0 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-6">
      <div className="w-[47%] h-[183px] bg-green-200 mt-[5%] rounded-[15px] shadow p-5 flex justify-between items-center">
        <div className="w-[170px] h-[139px] bg-yellow-500"></div>
      </div>
      <div className="w-[47%] h-[183px] bg-green-200 mt-[5%]"></div>
      <div className="w-[47%] h-[183px] bg-green-200 mt-[5%]"></div>
      <div className="w-[47%] h-[183px] bg-green-200 mt-[5%]"></div>
    </div>
  );
}
