import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import doc1 from "@/public/doc (1).svg";
import doc2 from "@/public/doc (2).svg";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SmallLoader } from "../Components/Loader";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { setAlert, setVehicleDataReloader } from "../store/Global";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useHandleExport } from "../Components/functions/exportFunction";
import { PaginationComponent } from "../Components/functions/Pagination";
import { formatCreatedAtDate, formatDuration } from "../Components/functions/formats";

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
  const handleExport = useHandleExport(); // Use the hook to get the handleExport function

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
      dispatch(setAlert("Selective Item Deleted Successfully"));
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
      dispatch(setAlert("Selective Items Deleted Successfully"));
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

  return (
    <div className="w-full h-fit">
      <h3
        className={`w-fit flex justify-between items-end font-[400] h-[24px] mt-[-24px] text-[14px] sm:text-[18px] leading-[18px] ${
          itemToDeleteMany.length < 1 ? "text-grey" : " text-main-blue"
        }  `}
      >
        <span>
          <span className="cursor-pointer">
            <button
              className={`${
                itemToDeleteMany.length < 1
                  ? ""
                  : "cursor-pointer hover:underline"
              }`}
              onClick={() => {
                setDeleteManyPopup(true);
              }}
              disabled={itemToDeleteMany.length < 1 ? true : false}
            >
              Delete Multiple
            </button>
          </span>
        </span>
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">
        <div className="w-[1200px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
            <div className="text-center truncate w-[3%]  flex justify-center items-center ">
              <div
                className={`w-[15px] h-[15px] rounded-[1px] cursor-pointer ${
                  itemToDeleteMany.length === data.length && data.length !== 0
                    ? "bg-check"
                    : ""
                } border-2 border-dark-grey`}
                onClick={() => {
                  setItemToDeleteMany(
                    itemToDeleteMany.length !== data.length ? allIds : []
                  );
                }}
              ></div>
            </div>
            <div className="text-start pe-3 flex justify-between items-center truncate w-[12%] ">
              Vehicle{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() => sort("vehicleName")}
              />
            </div>
            <div className="text-start pe-3 flex justify-between items-center truncate w-[12%] ">
              Customer{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() => sort("customerName")}
              />
            </div>
            <div className="text-start pe-3 flex justify-between items-center truncate w-[8%] ">
              City{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() => sort("city")}
              />
            </div>
            <div className="text-start pe-3 flex justify-between items-center truncate w-[12%] ">
              Duration
            </div>
            <div className="text-start pe-3 flex justify-between items-center truncate w-[8%] ">
              Amount
            </div>
            <div className="text-start pe-3 flex justify-between items-center truncate w-[10%] ">
              Status
            </div>
            <div className="text-start pe-3 truncate flex justify-between items-center w-[14%] ">
              Created At{" "}
            </div>{" "}
            <div className="text-center pe- flex justify-center items-center truncate w-[7%] ">
              Documents{" "}
            </div>
            <div className="text-start pe-3 flex justify-end items-center truncate w-[7%] ">
              Actions{" "}
            </div>
          </div>
          {paginatedData.length < 1 ? (
            <span className="p-3">No Reservations found.</span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <Link
                  href={`/ReservationsInfo/${item?._id}`}
                  className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[0px text-center ${
                    index % 2 !== 0
                      ? "dark:bg-dark2 bg-light-grey"
                      : "dark:bg-dark1 bg-white"
                  } border-b-2 border-grey`}
                >
                  <div className="text-center truncate w-[3%]  flex justify-center items-center ">
                    <div
                      className={`w-[15px] h-[15px] rounded-[1px] cursor-pointer ${
                        itemToDeleteMany?.includes(item?._id) ? "bg-check" : ""
                      } border-2 border-dark-grey`}
                      onClick={(event) => {
                        handlePushItem(item?._id);
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-start item-center gap-5 text-start pe-3 truncate w-[12%] ">
                    {item?.data?.vehicleName}
                  </div>

                  <div className="text-start pe-3 truncate w-[12%] ">
                    {item?.data?.customerName}
                  </div>
                  <div className="text-start pe-3 truncate w-[8%] ">
                    {item?.data?.city}
                  </div>
                  <div className="text-start pe-3 truncate w-[12%] ">
                    {item.data?.durationinDays ? (
                      <>{formatDuration(Number(item?.data?.duration))}</>
                    ) : (
                      <>{item?.data?.duration.padStart(2, "0")} Hours</>
                    )}
                  </div>
                  <div className="text-start pe-3 truncate w-[8%] ">
                    ${item?.data?.amount}
                  </div>
                  <div className="text-start pe-3 truncate w-[10%] ">
                    <div
                      className={`w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px]
                   ${
                     item?.data?.status === "complete"
                       ? "complete-status"
                       : item?.data?.status === "cancel"
                       ? "cancel-status"
                       : "progress-status"
                   }
                   `}
                    >
                      {item?.data?.status === "complete"
                        ? "Completed"
                        : item?.data?.status === "cancel"
                        ? "Canceled"
                        : "Incomplete"}
                    </div>
                  </div>
                  <div className="text-start pe-3 truncate w-[14%] ">
                    {formatCreatedAtDate(item?.createdAt)}
                  </div>
                  <div
                    className="flex justify-center items-end truncate w-[7%] "
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <img
                      src={doc2.src}
                      className="hover:scale-[1.3] cursor-pointer "
                      onClick={() => {
                        router.push(`/ReservationsInfo/${item?._id}/Invoice`);
                      }}
                      title="Invoice"
                    />
                    <img
                      src={doc1.src}
                      className="hover:scale-[1.3] cursor-pointer "
                      onClick={() => {
                        router.push(`/ReservationsInfo/${item?._id}/Contract`);
                      }}
                      title="Contract"
                    />
                  </div>
                  <div
                    className="flex justify-end ps-2 pe-3 items-end truncate w-[7%] "
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <img
                      src={edit.src}
                      title="Edit"
                      className="me-[5.8px] hover:scale-[1.3] z-[200]"
                      onClick={() => {
                        router.push(`/AddReservations/${item?._id}`);
                      }}
                    />

                    <img
                      className="hover:scale-[1.3] cursor-pointer"
                      src={deleteIcon.src}
                      title="Delete"
                      onClick={() => {
                        setPopup(true);
                        setItemToDelete(item?._id);
                      }}
                    />
                  </div>
                </Link>
                {popup ? (
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
                    <div className="w-[90%]  sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%]  gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 fixed modal-position">
                      <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
                        <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                          Are you sure you want to delete this item ?
                        </label>
                      </div>
                      <div
                        className={`w-full flex justify-end gap-4 items-center pt-4`}
                      >
                        <button
                          className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                          onClick={() => {
                            setPopup(false);
                          }}
                        >
                          No
                        </button>
                        <button
                          className="w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                          onClick={() => {
                            deleteItem(itemToDelete);
                          }}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? <SmallLoader /> : "Yes"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {deleteManyPopup ? (
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
                    <div className="w-[90%]  sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%]  gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10">
                      <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
                        <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                          Are you sure you want to delete these items
                        </label>
                      </div>
                      <div
                        className={`w-full flex justify-end gap-4 items-center pt-4`}
                      >
                        <button
                          className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                          onClick={() => {
                            setDeleteManyPopup(false);
                          }}
                        >
                          No
                        </button>
                        <button
                          className="w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                          onClick={() => {
                            deleteManyItem();
                          }}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? <SmallLoader /> : "Yes"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-full h-[32px] mt-10 flex justify-between items-center">
        <div className="font-[400] text-[12px] sm:text-[14px] leading-[17px] text-[#878787]">
          Showing {paginatedData.length ? (page - 1) * itemsPerPage + 1 : 0} -{" "}
          {Math.min(page * itemsPerPage, data.length)} of {data.length} data
        </div>
        <div className="font-[600] text-[10px] sm:text-[14px] leading-[17px]">
          <PaginationComponent
            totalPages={totalPages}
            page={page}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
