import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBars,
  FaBeer,
  FaChevronDown,
  FaHamburger,
  FaSquare,
} from "react-icons/fa";
import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
export default function ListView() {
  return (
    <div className="w-full h-fit mt-4">
      <h3 className="w-full flex justify-between items-center font-[400] text-[18px] leading-[21px] text-grey">
        <span>
          <span className="cursor-pointer">Delete Multiple</span>
          <span className="ps-1"></span>|<span className="ps-1"></span>
          <span className=" cursor-pointer">Active/Inactive Multiple</span>
        </span>
        <span className="underline cursor-pointer">Export</span>
      </h3>
      <div className="w-full h-fit flex flex-col justify-start items-start rounded-[10px] bg-light-grey border-2 border-grey overflow-hidden mt-2 leading-[17px]">
        <div className="w-full h-[43px] flex justify-between items-center font-[500] text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[9%] ps-7">
            ID <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[20%]">
            Car Name <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[13%]">
            Registration No. <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[9%]">
            Year <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[9%]">
            Type <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[9%]">
            Color <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[12%]">
            City <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[8%]">
            Actions{" "}
          </div>
        </div>
        <Link
          href={"/Components/CarInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <h5 className="text-start pe-3 w-[20%]">
            Mercedes Benz C Class c200
          </h5>
          <h5 className="text-start pe-3 w-[13%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[9%]">2023</h5>
          <h5 className="text-start pe-3 w-[9%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[9%]">
            <div className="w-[23px] h-[12px] bg-red-500 rounded-full"></div>
          </h5>
          <h5 className="text-start pe-3 w-[12%]">Dahlonega</h5>
          <div className="flex justify-start gap items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CarInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center  border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <h5 className="text-start pe-3 w-[20%]">
            Mercedes Benz C Class c200
          </h5>
          <h5 className="text-start pe-3 w-[13%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[9%]">2023</h5>
          <h5 className="text-start pe-3 w-[9%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[9%]">
            <div className="w-[23px] h-[12px] bg-red-100 rounded-full"></div>
          </h5>
          <h5 className="text-start pe-3 w-[12%]">Fort Valley</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CarInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <h5 className="text-start pe-3 w-[20%]">Suzuki Swift</h5>
          <h5 className="text-start pe-3 w-[13%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[9%]">2023</h5>
          <h5 className="text-start pe-3 w-[9%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[9%]">
            <div className="w-[23px] h-[12px] bg-blue-500 rounded-full"></div>
          </h5>
          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CarInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <h5 className="text-start pe-3 w-[20%]">
            Mercedes Benz C Class c200
          </h5>
          <h5 className="text-start pe-3 w-[13%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[9%]">2023</h5>
          <h5 className="text-start pe-3 w-[9%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[9%]">
            <div className="w-[23px] h-[12px] bg-red-500 rounded-full"></div>
          </h5>
          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CarInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <h5 className="text-start pe-3 w-[20%]">
            Mercedes Benz C Class c200
          </h5>
          <h5 className="text-start pe-3 w-[13%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[9%]">2023</h5>
          <h5 className="text-start pe-3 w-[9%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[9%]">
            <div className="w-[23px] h-[12px] bg-green-500 rounded-full"></div>
          </h5>
          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CarInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <h5 className="text-start pe-3 w-[20%]">
            Mercedes Benz C Class c200
          </h5>
          <h5 className="text-start pe-3 w-[13%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[9%]">2023</h5>
          <h5 className="text-start pe-3 w-[9%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[9%]">
            <div className="w-[23px] h-[12px] bg-red-900 rounded-full"></div>
          </h5>
          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap- items-center w-[8%]">
            <img src={unCheck.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CarInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <h5 className="text-start pe-3 w-[20%]">
            Mercedes Benz C Class c200
          </h5>
          <h5 className="text-start pe-3 w-[13%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[9%]">2023</h5>
          <h5 className="text-start pe-3 w-[9%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[9%]">
            <div className="w-[23px] h-[12px] bg-red-500 rounded-full"></div>
          </h5>
          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CarInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center  border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <h5 className="text-start pe-3 w-[20%]">
            Mercedes Benz C Class c200
          </h5>
          <h5 className="text-start pe-3 w-[13%]">MBU 5667</h5>
          <h5 className="text-start pe-3 w-[9%]">2023</h5>
          <h5 className="text-start pe-3 w-[9%]">Sedan</h5>
          <h5 className="text-start pe-3 w-[9%]">
            <div className="w-[23px] h-[12px] bg-blue-500 rounded-full"></div>
          </h5>
          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
      </div>
      <div className="w-full h-[32px] mt-10 flex justify-between items-center">
        <div className="font-[400] text-[14px] leading-[17px] text-[#878787]">
          Showing 12 from 100 data
        </div>
        <div className="font-[600] text-[14px] leading-[17px]">
          <div className="w-fit h-full flex justify-end items-center gap-4">
            <FaAngleDoubleLeft />
            <div className="flex justify-center items-center">
              <div className="ms-4 bg-main-blue text-white rounded-[5px] w-[32px] h-[32px] flex justify-center items-center">
                1
              </div>
              <div className="w-[32px] h-[32px] flex justify-center items-center bg- text-[#878787]">
                2
              </div>
            </div>
            <FaAngleDoubleRight />
          </div>
        </div>
      </div>
    </div>
  );
}
