import { sort } from "@/app/Components/functions/sortFunction";
import arrows from "@/public/arrows.svg";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface dataType {
  data: Array<Object>;
}

export default function ListViewRecentReservations({ data }: dataType) {
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState<{
    [key: string]: "asc" | "desc";
  }>({});

  useEffect(() => {
    setSortedData(data);
  }, [data]);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);

  return (
    <div className="w-full h-fit">
      <h3
        className={`w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] ${
          1 ? "text-grey" : " text-main-blue"
        }  `}
      ></h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey">
        <div className="w-[1200px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
            <div
              className="text-start truncate ps-3 flex justify-start gap-2 items-center w-[16%]"
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
            >
              Vehicle Name{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>{" "}
            <div
              className="text-start truncate flex justify-start gap-2 items-center w-[16%]"
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
            >
              Customer Name{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div
              className="text-start truncate flex justify-start gap-2 items-center w-[10%]"
              onClick={() =>
                sort(
                  "city",
                  currentSortKey,
                  sortOrder,
                  sortedData,
                  setSortedData,
                  setSortOrder,
                  setCurrentSortKey
                )
              }
            >
              City{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start truncate flex justify-start gap-2 items-center w-[10%]">
              Start Date{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start truncate flex justify-start gap-2 items-center w-[10%]">
              End Date{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start truncate flex justify-start gap-2 items-center w-[10%]">
              Duration
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start truncate flex justify-start gap-2 items-center w-[10%]">
              Amount
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start truncate flex justify-start gap-2 items-center w-[10%]">
              Status
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
          </div>
          {data?.length < 1 ? (
            <span className="p-3">No Reservations found.</span>
          ) : (
            data.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <Link
                  href={`/ReservationsInfo/${item?._id}`}
                  className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize ${
                    index % 2 !== 0
                      ? "dark:bg-dark2 bg-light-grey"
                      : "dark:bg-dark1 bg-white"
                  } border-b-2 border-grey`}
                >
                  <div className="text-start truncate ps-3 w-[16%]">
                    {item.data?.vehicleName}
                  </div>
                  <div className="flex justify-start item-center gap-5 text-start truncate pe-3 w-[16%]">
                    {item.data?.customerName}
                  </div>
                  <div className="text-start truncate pe-3 w-[10%]">
                    {item.data?.city}
                  </div>
                  <div className="flex justify-start items-end w-[10%]">
                    {item.data?.PickUpDate}
                  </div>
                  <div className="flex justify-start items-end w-[10%]">
                    {item.data?.dropOffDate}
                  </div>
                  <div className="text-start truncate pe-3 w-[10%]">
                    {item.data?.durationinDays ? (
                      <>{item.data?.duration.padStart(2, "0")} Days</>
                    ) : (
                      <>{item.data?.duration.padStart(2, "0")} Hours</>
                    )}
                  </div>
                  <div className="text-start truncate pe-3 w-[10%]">
                    ${item.data?.amount}
                  </div>
                  <div className="text-start truncate pe-3 w-[10%]">
                    <div
                      className={`w-[85px] flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px]
                   ${
                     item?.data?.status === "complete"
                       ? "complete-status"
                       : item.data?.status === "cancel"
                       ? "cancel-status"
                       : "progress-status"
                   }
                   `}
                    >
                      {item.data?.status === "complete"
                        ? "Completed"
                        : item.data?.status === "cancel"
                        ? "Canceled"
                        : "Incomplete"}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
