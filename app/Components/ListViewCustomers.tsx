import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
import vip from "@/public/vip.svg";

export default function ListViewCustomers() {
  return (
    <div className="w-full h-fit mt-4">
      <h3 className="w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] text-grey">
        <span>
          <span className="cursor-pointer">Delete Multiple</span>
          <span className="ps-1"></span>|<span className="ps-1"></span>
          <span className=" cursor-pointer">Active/Inactive Multiple</span>
        </span>
        <span className="underline cursor-pointer">Export</span>
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">

        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start bg-light-grey overflow-hidden leading-[17px]">
        <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[11%] ps-7">
            ID <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[19%]">
            Full Name <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[14%]">
            Customer Type
            <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[14%]">
            Phone <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[12%]">
            Gender <img src={arrows.src} />
          </div>

          <div className="text-start pe-3 flex justify-between items-center w-[12%]">
            City <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[8%]">
            Actions{" "}
          </div>
        </div>
        <Link
          href={"/Components/CustomerInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[11%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[19%]">
            Glenn A. Jean
            {/* <img src={vip.src} /> */}
          </div>
          <h5 className="text-start pe-3 w-[14%]">Individual</h5>
          <h5 className="text-start pe-3 w-[14%]">757-947-5015</h5>
          <h5 className="text-start pe-3 w-[12%]">Female</h5>

          <h5 className="text-start pe-3 w-[12%]">Dahlonega</h5>
          <div className="flex justify-start gap items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CustomerInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center  border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[11%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[19%]">
            Glenn A. Jean <img src={vip.src} />
          </div>
          <h5 className="text-start pe-3 w-[14%]">Individual</h5>
          <h5 className="text-start pe-3 w-[14%]">757-947-5015</h5>
          <h5 className="text-start pe-3 w-[12%]">Female</h5>

          <h5 className="text-start pe-3 w-[12%]">Fort Valley</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CustomerInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[11%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[19%]">
            Glenn A. Jean
            {/* <img src={vip.src} /> */}
          </div>
          <h5 className="text-start pe-3 w-[14%]">Individual</h5>
          <h5 className="text-start pe-3 w-[14%]">757-947-5015</h5>
          <h5 className="text-start pe-3 w-[12%]">Female</h5>

          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CustomerInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[11%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[19%]">
            Glenn A. Jean
            {/* <img src={vip.src} /> */}
          </div>
          <h5 className="text-start pe-3 w-[14%]">Individual</h5>
          <h5 className="text-start pe-3 w-[14%]">757-947-5015</h5>
          <h5 className="text-start pe-3 w-[12%]">Female</h5>

          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CustomerInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[11%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[19%]">
            Glenn A. Jean <img src={vip.src} />
          </div>
          <h5 className="text-start pe-3 w-[14%]">Individual</h5>
          <h5 className="text-start pe-3 w-[14%]">757-947-5015</h5>
          <h5 className="text-start pe-3 w-[12%]">Female</h5>

          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CustomerInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[11%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[19%]">
            Glenn A. Jean
            {/* <img src={vip.src} /> */}
          </div>
          <h5 className="text-start pe-3 w-[14%]">Individual</h5>
          <h5 className="text-start pe-3 w-[14%]">757-947-5015</h5>
          <h5 className="text-start pe-3 w-[12%]">Female</h5>

          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap- items-center w-[8%]">
            <img src={unCheck.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CustomerInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[11%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[19%]">
            Glenn A. Jean
            {/* <img src={vip.src} /> */}
          </div>
          <h5 className="text-start pe-3 w-[14%]">Individual</h5>
          <h5 className="text-start pe-3 w-[14%]">757-947-5015</h5>
          <h5 className="text-start pe-3 w-[12%]">Female</h5>

          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/CustomerInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center  border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[11%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[19%]">
            Glenn A. Jean
            {/* <img src={vip.src} /> */}
          </div>
          <h5 className="text-start pe-3 w-[14%]">Individual</h5>
          <h5 className="text-start pe-3 w-[14%]">757-947-5015</h5>
          <h5 className="text-start pe-3 w-[12%]">Female</h5>

          <h5 className="text-start pe-3 w-[12%]">Atlanta</h5>
          <div className="flex justify-start gap2 items-end w-[8%]">
            <img src={check.src} className="me-[8px] translate-y-[1px]" />
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
      </div>
      </div>
      <div className="w-full h-[32px] mt-10 flex justify-between items-center">
        <div className="font-[400] text-[12px] sm:text-[14px] leading-[17px] text-[#878787]">
          Showing 12 from 100 data
        </div>
        <div className="font-[600] text-[10px] sm:text-[14px] leading-[17px]">
          <div className="w-fit h-full flex justify-end items-center gap-1 sm:gap-4">
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
