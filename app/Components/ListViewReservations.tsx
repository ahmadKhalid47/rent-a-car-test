import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import doc1 from "@/public/doc (1).svg";
import doc2 from "@/public/doc (2).svg";
import Link from "next/link";
import vip from "@/public/vip.svg";

export default function ListViewReservations() {
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
        <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[9%] ps-7">
            ID <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[14%]">
            Vehicle <img src={arrows.src} />
          </div>

          <div className="text-start pe-3 flex justify-between items-center w-[14%]">
            Customer <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[10%]">
            City <img src={arrows.src} />
          </div>

          <div className="text-start pe-3 flex justify-between items-center w-[9%]">
            Duration <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[9%]">
            Amount <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[10%]">
            Status <img src={arrows.src} />
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[7%]">
            Documents{" "}
          </div>
          <div className="text-start pe-3 flex justify-between items-center w-[7%]">
            Actions{" "}
          </div>
        </div>
        <Link
          href={"/Components/ReservationsInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[14%]">
            Suzuki Swift
          </div>

          <h5 className="text-start pe-3 w-[14%]">Sharon Henry</h5>
          <h5 className="text-start pe-3 w-[10%]">New York</h5>

          <h5 className="text-start pe-3 w-[9%]">20 Day</h5>
          <h5 className="text-start pe-3 w-[9%]">$100</h5>
          <div className="text-start pe-3 w-[10%]">
            <div className="w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] complete-status">
              Completed
            </div>
          </div>
          <div className="flex justify-center items-end w-[7%]">
            <img src={doc2.src} className="me-[5.8px]" />
            <img src={doc1.src} />
          </div>
          <div className="flex justify-start ps-2 items-end w-[7%]">
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/ReservationsInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center  border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[14%]">
            Suzuki Swift
          </div>

          <h5 className="text-start pe-3 w-[14%]">Sharon Henry</h5>
          <h5 className="text-start pe-3 w-[10%]">New York</h5>

          <h5 className="text-start pe-3 w-[9%]">20 Day</h5>
          <h5 className="text-start pe-3 w-[9%]">$100</h5>
          <div className="text-start pe-3 w-[10%]">
            <div className="w-[76px] ms-[4.5px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] cancel-status">
              Canceled
            </div>
          </div>
          <div className="flex justify-center items-end w-[7%]">
            <img src={doc2.src} className="me-[5.8px]" />
            <img src={doc1.src} />
          </div>
          <div className="flex justify-start ps-2 items-end w-[7%]">
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/ReservationsInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[14%]">
            Suzuki Swift
            {/*  */}
          </div>

          <h5 className="text-start pe-3 w-[14%]">Sharon Henry</h5>
          <h5 className="text-start pe-3 w-[10%]">New York</h5>

          <h5 className="text-start pe-3 w-[9%]">20 Day</h5>
          <h5 className="text-start pe-3 w-[9%]">$100</h5>
          <div className="text-start pe-3 w-[10%]">
            <div className="w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] complete-status">
              Completed
            </div>
          </div>
          <div className="flex justify-center items-end w-[7%]">
            <img src={doc2.src} className="me-[5.8px]" />
            <img src={doc1.src} />
          </div>
          <div className="flex justify-start ps-2 items-end w-[7%]">
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/ReservationsInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[14%]">
            Suzuki Swift
            {/*  */}
          </div>

          <h5 className="text-start pe-3 w-[14%]">Sharon Henry</h5>
          <h5 className="text-start pe-3 w-[10%]">New York</h5>

          <h5 className="text-start pe-3 w-[9%]">20 Day</h5>
          <h5 className="text-start pe-3 w-[9%]">$100</h5>
          <div className="text-start pe-3 w-[10%]">
            <div className="w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] complete-status">
              Completed
            </div>
          </div>
          <div className="flex justify-center items-end w-[7%]">
            <img src={doc2.src} className="me-[5.8px]" />
            <img src={doc1.src} />
          </div>
          <div className="flex justify-start ps-2 items-end w-[7%]">
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/ReservationsInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[14%]">
            Suzuki Swift
          </div>

          <h5 className="text-start pe-3 w-[14%]">Sharon Henry</h5>
          <h5 className="text-start pe-3 w-[10%]">New York</h5>

          <h5 className="text-start pe-3 w-[9%]">20 Day</h5>
          <h5 className="text-start pe-3 w-[9%]">$100</h5>
          <div className="text-start pe-3 w-[10%]">
            <div className="w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] complete-status">
              Completed
            </div>
          </div>
          <div className="flex justify-center items-end w-[7%]">
            <img src={doc2.src} className="me-[5.8px]" />
            <img src={doc1.src} />
          </div>
          <div className="flex justify-start ps-2 items-end w-[7%]">
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/ReservationsInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[14%]">
            Suzuki Swift
            {/*  */}
          </div>

          <h5 className="text-start pe-3 w-[14%]">Sharon Henry</h5>
          <h5 className="text-start pe-3 w-[10%]">New York</h5>

          <h5 className="text-start pe-3 w-[9%]">20 Day</h5>
          <h5 className="text-start pe-3 w-[9%]">$100</h5>
          <div className="text-start pe-3 w-[10%]">
            <div className="w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] progress-status">
              In Progress
            </div>
          </div>
          <div className="flex justify-center items-end w-[7%]">
            <img src={doc2.src} className="me-[5.8px]" />
            <img src={doc1.src} />
          </div>
          <div className="flex justify-start ps-2 items-end w-[7%]">
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/ReservationsInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[14%]">
            Suzuki Swift
            {/*  */}
          </div>

          <h5 className="text-start pe-3 w-[14%]">Sharon Henry</h5>
          <h5 className="text-start pe-3 w-[10%]">New York</h5>

          <h5 className="text-start pe-3 w-[9%]">20 Day</h5>
          <h5 className="text-start pe-3 w-[9%]">$100</h5>
          <div className="text-start pe-3 w-[10%]">
            <div className="w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] complete-status">
              Completed
            </div>
          </div>
          <div className="flex justify-center items-end w-[7%]">
            <img src={doc2.src} className="me-[5.8px]" />
            <img src={doc1.src} />
          </div>
          <div className="flex justify-start ps-2 items-end w-[7%]">
            <img src={edit.src} className="me-[5.8px]" />
            <img src={deleteIcon.src} />
          </div>
        </Link>
        <Link
          href={"/Components/ReservationsInfo"}
          className="w-full h-[43px] flex justify-between items-center font-[400] text-[14px] leading-[17px text-center  border-grey"
        >
          <div className="text-center w-[3%] flex justify-center items-center ">
            <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
          </div>
          <h5 className="text-start pe-3 w-[9%] ps-[10px]">539485</h5>
          <div className="flex justify-start item-center gap-5 text-start pe-3 w-[14%]">
            Suzuki Swift
            {/*  */}
          </div>

          <h5 className="text-start pe-3 w-[14%]">Sharon Henry</h5>
          <h5 className="text-start pe-3 w-[10%]">New York</h5>

          <h5 className="text-start pe-3 w-[9%]">20 Day</h5>
          <h5 className="text-start pe-3 w-[9%]">$100</h5>
          <div className="text-start pe-3 w-[10%]">
            <div className="w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] progress-status">
              In Progress
            </div>
          </div>
          <div className="flex justify-center items-end w-[7%]">
            <img src={doc2.src} className="me-[5.8px]" />
            <img src={doc1.src} />
          </div>
          <div className="flex justify-start ps-2 items-end w-[7%]">
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
