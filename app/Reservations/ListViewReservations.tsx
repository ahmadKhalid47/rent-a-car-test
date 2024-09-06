import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import doc1 from "@/public/doc (1).svg";
import doc2 from "@/public/doc (2).svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { SmallLoader } from "../Components/Loader";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { setVehicleDataReloader } from "../store/Global";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { handleExport } from "../Components/functions/exportFunction";
import { PaginationComponent } from "../Components/functions/Pagination";

interface dataType {
  data: Array<Object>;
}

export default function ListViewreservation({ data }: dataType) {
  let global = useSelector((state: RootState) => state.Global);
  const [popup, setPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState<{
    [key: string]: "asc" | "desc";
  }>({});
  const [itemToDeleteMany, setItemToDeleteMany] = useState<any>([]);
  const [itemToActiveMany, setItemToActiveMany] = useState<any>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setSortedData(data);
  }, [data]);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const [deleteManyPopup, setDeleteManyPopup] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const itemsPerPage = 12;

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Slice the data for the current page
  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // General sorting function
  const sort = (key: string) => {
    const newSortOrder =
      currentSortKey === key
        ? sortOrder[key] === "asc"
          ? "desc"
          : "asc" // Toggle sort order for the same key
        : "asc"; // Default to "asc" for a new key

    const sorted = [...sortedData].sort((a: any, b: any) => {
      let fieldA =
        key === "vehicleId" ? JSON.parse(a?.data?.[key]) : a?.data?.[key];
      let fieldB = b?.data?.[key];

      if (typeof fieldA === "string") {
        fieldA = fieldA.toLowerCase();
      }
      if (typeof fieldB === "string") {
        fieldB = fieldB.toLowerCase();
      }

      if (newSortOrder === "asc") {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

    setSortedData(sorted);
    setSortOrder((prev) => ({ ...prev, [key]: newSortOrder }));
    setCurrentSortKey(key);
  };

  async function deleteItem(_id: any) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.delete(`/api/deletereservation/${_id}`);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }
  async function deleteManyItem() {
    try {
      setDeleteLoading(true);
      let result: any = await axios.post(`/api/deleteManyreservation`, {
        _ids: itemToDeleteMany,
      });
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }
  function handlePushItem(_id: any) {
    setItemToDeleteMany((prevArray: any) => {
      // Check if the item is already present in the array
      const isPresent = prevArray.includes(_id);

      // Return a new array with the item either added or removed
      if (isPresent) {
        // Remove the item
        return prevArray.filter((item: any) => item !== _id);
      } else {
        // Add the item
        return [...prevArray, _id];
      }
    });
  }
  const allIds = data.map((item: any) => item?._id);

  async function updateActive(_id: any, active: boolean) {
    try {
      setEditLoading(true);
      let result: any = await axios.post(
        `/api/updateActivereservation/${_id}`,
        {
          active: !active,
        }
      );
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
    } catch (err) {
      console.log(err);
    } finally {
      setEditLoading(false);
    }
  }

  async function UpdateActiveManyItem(active: boolean) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.post(`/api/updateManyActivereservation`, {
        _ids: itemToDeleteMany,
        active: active,
      });
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }

  return (
    <div className="w-full h-fit mt-4">
      <h3 className="w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] text-grey  ">
        <span>
          <span className="cursor-pointer">
            <button
              className="cursor-pointer"
              onClick={() => {
                setDeleteManyPopup(true);
              }}
              disabled={itemToDeleteMany.length < 1 ? true : false}
            >
              Delete Multiple
            </button>
          </span>
          <span className="ps-1"></span>|<span className="ps-1"></span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              UpdateActiveManyItem(true);
            }}
          >
            Active /
          </span>
          <span
            className=" cursor-pointer"
            onClick={() => {
              UpdateActiveManyItem(false);
            }}
          >
            Inactive Multiple
          </span>
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => {
            handleExport(data?.map((item: any) => item.data));
          }}
        >
          Export
        </span>{" "}
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">
        <div className="w-[1200px] 1200:w-full h-fit flex flex-col justify-start items-start bg-light-grey overflow-hidden leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
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
            href={"/reservationInfo"}
            className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
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
            <div className="flex justify-start items-end w-[7%]">
              <img src={doc2.src} className="ms-3 1200:me-[5.8px]" />
              <img src={doc1.src} />
            </div>
            <div className="flex justify-start ps-2 items-end w-[7%]">
              <img src={edit.src} className="me-[5.8px]" />
              <img src={deleteIcon.src} />
            </div>
          </Link>

          <Link
            href={"/reservationInfo"}
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
            <div className="flex justify-start items-end w-[7%]">
              <img src={doc2.src} className="ms-3 1200:me-[5.8px]" />
              <img src={doc1.src} />
            </div>
            <div className="flex justify-start ps-2 items-end w-[7%]">
              <img src={edit.src} className="me-[5.8px]" />
              <img src={deleteIcon.src} />
            </div>
          </Link>

          <Link
            href={"/reservationInfo"}
            className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
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
            <div className="flex justify-start items-end w-[7%]">
              <img src={doc2.src} className="ms-3 1200:me-[5.8px]" />
              <img src={doc1.src} />
            </div>
            <div className="flex justify-start ps-2 items-end w-[7%]">
              <img src={edit.src} className="me-[5.8px]" />
              <img src={deleteIcon.src} />
            </div>
          </Link>
          <Link
            href={"/reservationInfo"}
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
            <div className="flex justify-start items-end w-[7%]">
              <img src={doc2.src} className="ms-3 1200:me-[5.8px]" />
              <img src={doc1.src} />
            </div>
            <div className="flex justify-start ps-2 items-end w-[7%]">
              <img src={edit.src} className="me-[5.8px]" />
              <img src={deleteIcon.src} />
            </div>
          </Link>
          <Link
            href={"/reservationInfo"}
            className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
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
            <div className="flex justify-start items-end w-[7%]">
              <img src={doc2.src} className="ms-3 1200:me-[5.8px]" />
              <img src={doc1.src} />
            </div>
            <div className="flex justify-start ps-2 items-end w-[7%]">
              <img src={edit.src} className="me-[5.8px]" />
              <img src={deleteIcon.src} />
            </div>
          </Link>
          <Link
            href={"/reservationInfo"}
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
            <div className="flex justify-start items-end w-[7%]">
              <img src={doc2.src} className="ms-3 1200:me-[5.8px]" />
              <img src={doc1.src} />
            </div>
            <div className="flex justify-start ps-2 items-end w-[7%]">
              <img src={edit.src} className="me-[5.8px]" />
              <img src={deleteIcon.src} />
            </div>
          </Link>
          <Link
            href={"/reservationInfo"}
            className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center bg-white border-b-2 border-grey"
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
            <div className="flex justify-start items-end w-[7%]">
              <img src={doc2.src} className="ms-3 1200:me-[5.8px]" />
              <img src={doc1.src} />
            </div>
            <div className="flex justify-start ps-2 items-end w-[7%]">
              <img src={edit.src} className="me-[5.8px]" />
              <img src={deleteIcon.src} />
            </div>
          </Link>
          <Link
            href={"/reservationInfo"}
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
            <div className="flex justify-start items-end w-[7%]">
              <img src={doc2.src} className="ms-3 1200:me-[5.8px]" />
              <img src={doc1.src} />
            </div>
            <div className="flex justify-start ps-2 items-end w-[7%]">
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
