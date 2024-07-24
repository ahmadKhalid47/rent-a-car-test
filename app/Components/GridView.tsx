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
import { FaEllipsis } from "react-icons/fa6";
export default function GridView() {
  return (
    <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] p-[5%] pt-0 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-6">
      <div className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative">
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] bg-yellow-500 overflow-hidden rounded-[15px]"></div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-2">
          <div className="flex justify-start items-center gap-2 w-fit pe-5">
            <p className="font-[400] text-[12px] leading-[18px]">Vehicle ID:</p>
            <p className="font-[600] text-[13px] leading-[15px]">539485</p>
          </div>
          <div className="flex justify-start items-center gap-2 w-fit">
            <p className="font-[400] text-[12px] leading-[18px]">
              Registration No:
            </p>
            <p className="font-[600] text-[13px] leading-[15px]">MBU 5667</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Make:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Honda</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Model:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Civic</p>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">
                Fuel Type:
              </p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative">
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] bg-yellow-500 overflow-hidden rounded-[15px]"></div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-2">
          <div className="flex justify-start items-center gap-2 w-fit pe-5">
            <p className="font-[400] text-[12px] leading-[18px]">Vehicle ID:</p>
            <p className="font-[600] text-[13px] leading-[15px]">539485</p>
          </div>
          <div className="flex justify-start items-center gap-2 w-fit">
            <p className="font-[400] text-[12px] leading-[18px]">
              Registration No:
            </p>
            <p className="font-[600] text-[13px] leading-[15px]">MBU 5667</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Make:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Honda</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Model:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Civic</p>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">
                Fuel Type:
              </p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative">
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] bg-yellow-500 overflow-hidden rounded-[15px]"></div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-2">
          <div className="flex justify-start items-center gap-2 w-fit pe-5">
            <p className="font-[400] text-[12px] leading-[18px]">Vehicle ID:</p>
            <p className="font-[600] text-[13px] leading-[15px]">539485</p>
          </div>
          <div className="flex justify-start items-center gap-2 w-fit">
            <p className="font-[400] text-[12px] leading-[18px]">
              Registration No:
            </p>
            <p className="font-[600] text-[13px] leading-[15px]">MBU 5667</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Make:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Honda</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Model:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Civic</p>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">
                Fuel Type:
              </p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[47%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-5 py-6 flex justify-between items-center relative">
        <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
          <FaEllipsis />
        </div>
        <div className="w-[170px] h-[139px] bg-yellow-500 overflow-hidden rounded-[15px]"></div>
        <div className="w-[55%] h-fit flex justify-start flex-wrap items-center gap-2">
          <div className="flex justify-start items-center gap-2 w-fit pe-5">
            <p className="font-[400] text-[12px] leading-[18px]">Vehicle ID:</p>
            <p className="font-[600] text-[13px] leading-[15px]">539485</p>
          </div>
          <div className="flex justify-start items-center gap-2 w-fit">
            <p className="font-[400] text-[12px] leading-[18px]">
              Registration No:
            </p>
            <p className="font-[600] text-[13px] leading-[15px]">MBU 5667</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Make:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Honda</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Model:</p>
              <p className="font-[600] text-[13px] leading-[15px]">Civic</p>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
              <p className="font-[400] text-[12px] leading-[18px]">Year:</p>
              <p className="font-[600] text-[13px] leading-[15px]">2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">Type:</p>
              <p className="font-[600] text-[13px] leading-[15px]">539485</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center">
            <div className="flex justify-start items-center gap-2 w-[40%]">
              <p className="font-[400] text-[12px] leading-[18px]">Color:</p>
              <p className="font-[600] text-[13px] leading-[15px]">White</p>
            </div>
            <div className="flex justify-start items-center gap-2 w-[50%]">
              <p className="font-[400] text-[12px] leading-[18px]">
                Fuel Type:
              </p>
              <p className="font-[600] text-[13px] leading-[15px]">Petrol</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
