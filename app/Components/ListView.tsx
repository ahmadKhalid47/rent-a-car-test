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
export default function ListView() {
  return (
    <div className="w-full h-fit">
      <h3 className="font-[400] text-[14px] leading-[17px] text-grey">
        Delete Multiple <span className="ps-1"></span>|
        <span className="ps-1"></span> Active/Inactive Multiple
      </h3>
      <div className="w-full h-fit flex flex-col justify-start items-start rounded-[10px] bg-light-grey border-2 border-grey overflow-hidden mt-2">
        <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%] ps-4">ID</h5>
          <h5 className="text-start pe-3 w-[15%]">Registration no.</h5>
          <h5 className="text-start pe-3 w-[10%]">Make</h5>
          <h5 className="text-start pe-3 w-[10%]">Model</h5>
          <h5 className="text-start pe-3 w-[10%]">Year</h5>
          <h5 className="text-start pe-3 w-[10%]">Type</h5>
          <h5 className="text-start pe-3 w-[10%]">Color</h5>
          <h5 className="text-start pe-3 w-[10%]">Fuel Type</h5>
          <h5 className="text-start pe-3 w-[10%]">Actions</h5>
        </div>
        <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] rounded-t-[10px] leading-[17px text-center bg-white border-b-2 border-grey">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%]">539485</h5>
          <h5 className="text-start pe-3 w-[15%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[10%]">Suzuki</h5>
          <h5 className="text-start pe-3 w-[10%]">Swift</h5>
          <h5 className="text-start pe-3 w-[10%]">2023</h5>
          <h5 className="text-start pe-3 w-[10%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[10%]">Red</h5>
          <h5 className="text-start pe-3 w-[10%]">Petrol</h5>
          <div className="flex justify-start gap-2 items-center w-[10%]">
            <img src={check.src} />
            <img src={edit.src} />
            <img src={deleteIcon.src} />
          </div>
        </div>
        <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%]">539485</h5>
          <h5 className="text-start pe-3 w-[15%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[10%]">Suzuki</h5>
          <h5 className="text-start pe-3 w-[10%]">Swift</h5>
          <h5 className="text-start pe-3 w-[10%]">2023</h5>
          <h5 className="text-start pe-3 w-[10%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[10%]">White</h5>
          <h5 className="text-start pe-3 w-[10%]">Petrol</h5>
          <div className="flex justify-start gap-2 items-center w-[10%]">
            <img src={check.src} />
            <img src={edit.src} />
            <img src={deleteIcon.src} />
          </div>
        </div>
        <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] rounded-t-[10px] leading-[17px text-center bg-white border-b-2 border-grey">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%]">539485</h5>
          <h5 className="text-start pe-3 w-[15%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[10%]">Suzuki</h5>
          <h5 className="text-start pe-3 w-[10%]">Swift</h5>
          <h5 className="text-start pe-3 w-[10%]">2023</h5>
          <h5 className="text-start pe-3 w-[10%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[10%]">Red</h5>
          <h5 className="text-start pe-3 w-[10%]">Petrol</h5>
          <div className="flex justify-start gap-2 items-center w-[10%]">
            <img src={check.src} />
            <img src={edit.src} />
            <img src={deleteIcon.src} />
          </div>
        </div>
        <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%]">539485</h5>
          <h5 className="text-start pe-3 w-[15%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[10%]">Honda</h5>
          <h5 className="text-start pe-3 w-[10%]">Swift</h5>
          <h5 className="text-start pe-3 w-[10%]">2023</h5>
          <h5 className="text-start pe-3 w-[10%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[10%]">Red</h5>
          <h5 className="text-start pe-3 w-[10%]">Petrol</h5>
          <div className="flex justify-start gap-2 items-center w-[10%]">
            <img src={check.src} />
            <img src={edit.src} />
            <img src={deleteIcon.src} />
          </div>
        </div>
        <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] rounded-t-[10px] leading-[17px text-center bg-white border-b-2 border-grey">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%]">539485</h5>
          <h5 className="text-start pe-3 w-[15%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[10%]">Suzuki</h5>
          <h5 className="text-start pe-3 w-[10%]">Swift</h5>
          <h5 className="text-start pe-3 w-[10%]">2023</h5>
          <h5 className="text-start pe-3 w-[10%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[10%]">Red</h5>
          <h5 className="text-start pe-3 w-[10%]">Petrol</h5>
          <div className="flex justify-start gap-2 items-center w-[10%]">
            <img src={check.src} />
            <img src={edit.src} />
            <img src={deleteIcon.src} />
          </div>
        </div>
        <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%]">539485</h5>
          <h5 className="text-start pe-3 w-[15%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[10%]">Toyota</h5>
          <h5 className="text-start pe-3 w-[10%]">Corolla Grandee</h5>
          <h5 className="text-start pe-3 w-[10%]">2023</h5>
          <h5 className="text-start pe-3 w-[10%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[10%]">Red</h5>
          <h5 className="text-start pe-3 w-[10%]">Petrol</h5>
          <div className="flex justify-start gap-2 items-center w-[10%]">
            <img src={check.src} />
            <img src={edit.src} />
            <img src={deleteIcon.src} />
          </div>
        </div>
        <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] rounded-t-[10px] leading-[17px text-center bg-white border-b-2 border-grey">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%]">539485</h5>
          <h5 className="text-start pe-3 w-[15%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[10%]">Suzuki</h5>
          <h5 className="text-start pe-3 w-[10%]">Swift</h5>
          <h5 className="text-start pe-3 w-[10%]">2023</h5>
          <h5 className="text-start pe-3 w-[10%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[10%]">Red</h5>
          <h5 className="text-start pe-3 w-[10%]">Petrol</h5>
          <div className="flex justify-start gap-2 items-center w-[10%]">
            <img src={check.src} />
            <img src={edit.src} />
            <img src={deleteIcon.src} />
          </div>
        </div>
        <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] rounded-t-[10px] leading-[17px text-center">
          <h5 className="text-center w-[5%] flex justify-center items-center ">
            <div className="w-[10px] h-[10px] rounded-[1px] bg-light-grey border-2 border-grey"></div>
          </h5>
          <h5 className="text-start pe-3 w-[10%]">539485</h5>
          <h5 className="text-start pe-3 w-[15%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[10%]">Honda</h5>
          <h5 className="text-start pe-3 w-[10%]">Corolla Grandee</h5>
          <h5 className="text-start pe-3 w-[10%]">2023</h5>
          <h5 className="text-start pe-3 w-[10%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[10%]">Red</h5>
          <h5 className="text-start pe-3 w-[10%]">Petrol</h5>
          <div className="flex justify-start gap-2 items-center w-[10%]">
            <img src={check.src} />
            <img src={edit.src} />
            <img src={deleteIcon.src} />
          </div>
        </div>
      </div>
    </div>
  );
}
