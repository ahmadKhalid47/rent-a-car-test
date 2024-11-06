import ConfirmationPopup from "../Components/functions/Popups";
import { sort } from "@/app/Components/functions/sortFunction";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { SmallLoader } from "../Components/Loader";
import { useRouter } from "next/navigation";
import { PaginationComponent } from "../Components/functions/Pagination";
import {
  formatCreatedAtDate,
  formatDuration,
} from "../Components/functions/formats";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  useDeleteItem,
  useDeleteManyItems,
} from "../Components/functions/deleteFunction";

interface dataType {
  data: Array<Object>;
}

export default function ListViewreservation({ data }: dataType) {
  const [popup, setPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState<{
    [key: string]: "asc" | "desc";
  }>({});
  const [itemToDeleteMany, setItemToDeleteMany] = useState<any>([]);
  const router = useRouter();
  const deleteItem = useDeleteItem();
  const deleteManyItems = useDeleteManyItems();

  useEffect(() => {
    setSortedData(data);
  }, [data]);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const [deleteManyPopup, setDeleteManyPopup] = useState(false);
  const itemsPerPage = 12;

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function handlePushItem(_id: any) {
    setItemToDeleteMany((prevArray: any) => {
      const isPresent = prevArray?.includes(_id);

      if (isPresent) {
        return prevArray.filter((item: any) => item !== _id);
      } else {
        return [...prevArray, _id];
      }
    });
  }
  const allIds = data.map((item: any) => item?._id);
    const handleDeleteConfirm = () => {
      deleteItem(
        itemToDelete,
        "reservations",
        setDeleteLoading,
        setPopup,
        setItemToDelete
      );
    };

  return (
    <div className="w-full h-fit">
      <div
        className={`h-[24px] w-fit flex justify-between items-end font-[400] text-[14px] sm:text-[18px] leading-[18px] ${
          itemToDeleteMany.length < 1 ? "text-grey" : " text-main-blue"
        }  `}
      >
        {itemToDeleteMany.length >= 1 && (
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
        )}
      </div>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">
        <div className="w-[1200px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
            <div className="text-center truncate w-[3%]  flex justify-center items-center">
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
            <div className="text-start flex justify-start gap-2 items-center truncate w-[11%] c">
              Customer{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "customerName",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
              />
            </div>
            <div className="text-start flex justify-start gap-2 items-center truncate w-[11%]">
              Chauffeur{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "chauffeur",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
              />
            </div>
            <div className="text-start flex justify-start gap-2 items-center truncate w-[11%] c">
              Vehicle{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "vehicleName",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
              />
            </div>
            <div className="text-start flex justify-start gap-2 items-center truncate w-[10%] s">
              Start Date{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "vehicleName",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
              />
            </div>
            <div className="text-start flex justify-start gap-2 items-center truncate w-[10%] e">
              End Date{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "vehicleName",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
              />
            </div>
            <div className="text-start flex justify-start gap-2 items-center truncate w-[11%] c">
              Duration
            </div>
            <div className="text-start flex justify-start gap-2 items-center truncate w-[7%]">
              Amount
            </div>
            <div className="text-start flex justify-start gap-2 items-center truncate w-[9%] s">
              Status
            </div>
            {/* <div className="text-start pe-3 truncate flex justify-between items-center w-[8.5%]">
              Created At{" "}
            </div>{" "} */}
            <div className="text-start pe-3 truncate flex justify-between items-center w-[8%]">
              Documents{" "}
            </div>
            <div className="text-start pe-3 flex justify-end items-center truncate w-[6%]">
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
                  <div className="text-center truncate w-[3%]  flex justify-center items-center">
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
                  <div className="text-start pe-3 truncate w-[11%] c">
                    {item?.data?.customerName}
                  </div>
                  <div className="text-start pe-3 truncate w-[11%]">
                    {item?.data?.chauffeurName}
                  </div>
                  <div className="flex justify-start item-center gap-5 text-start pe-3 truncate w-[11%] c">
                    {item?.data?.vehicleName}
                  </div>
                  <div className="flex justify-start item-center gap-5 text-start pe-3 truncate w-[10%] s">
                    {formatCreatedAtDate(item?.data?.PickUpDate)}
                  </div>
                  <div className="flex justify-start item-center gap-5 text-start pe-3 truncate w-[10%] e">
                    {formatCreatedAtDate(item?.data?.dropOffDate)}
                  </div>
                  <div className="text-start pe-3 truncate w-[11%] c">
                    {item.data?.durationinDays ? (
                      <>{formatDuration(Number(item?.data?.duration))}</>
                    ) : (
                      <>{item?.data?.duration.padStart(2, "0")} Hours</>
                    )}
                  </div>
                  <div className="text-start pe-3 truncate w-[7%]">
                    ${item?.data?.amount}
                  </div>
                  <div className="text-start pe-3 truncate w-[9%] s">
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
                  <div
                    className="pe-3 w-[8%] flex flex-col justify-center items-start text-[12px]"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <button
                      className="w-fit flex justify-start items-center gap-1"
                      onClick={() => {
                        router.push(`/ReservationsInfo/${item?._id}/Invoice`);
                      }}
                    >
                      <div className="w-[14px] h-[14px] rounded-[2px] flex justify-center items-center bg-[#0094DA33]">
                        <IoDocumentTextOutline className="text-[11px]" />
                      </div>
                      Invoice
                    </button>
                    <button
                      className="w-fit flex justify-start items-center gap-1"
                      onClick={() => {
                        router.push(`/ReservationsInfo/${item?._id}/Contract`);
                      }}
                    >
                      <div className="w-[14px] h-[14px] rounded-[2px] flex justify-center items-center bg-[#0094DA33]">
                        <IoDocumentTextOutline className="text-[11px]" />
                      </div>
                      Agreement
                    </button>
                  </div>

                  <div
                    className="flex justify-end pe-3 truncate gap-1 items-center w-[6%] h-[43px]"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <img
                      src={edit.src}
                      title="Edit"
                      className="hover:scale-[1.3] z-[200]"
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
              </div>
            ))
          )}
        </div>
      </div>
      <PaginationComponent
        page={page}
        itemsPerPage={itemsPerPage}
        data={data}
        paginatedData={paginatedData}
        totalPages={totalPages}
        handleChange={handleChange}
      />
      <ConfirmationPopup
        isMultiple={false}
        popup={popup}
        onCancel={() => setPopup(false)}
        onConfirm={handleDeleteConfirm}
        deleteLoading={deleteLoading}
      />{" "}
      <ConfirmationPopup
        popup={deleteManyPopup}
        onCancel={() => setDeleteManyPopup(false)}
        onConfirm={() =>
          deleteManyItems(
            itemToDeleteMany,
            "reservation",
            setDeleteLoading,
            setDeleteManyPopup,
            setItemToDeleteMany
          )
        }
        deleteLoading={deleteLoading}
        isMultiple={true}
      />
    </div>
  );
}
