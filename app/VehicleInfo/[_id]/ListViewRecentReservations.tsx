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

  return (
    <div className="w-full h-fit mt-4">
      <h3
        className={`w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] ${
          1 ? "text-grey" : " text-main-blue"
        }  `}
      ></h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">
        <div className="w-[1200px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
            <div className="text-start w-[4%] ps-3">ID</div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[14%]"
              onClick={() => sort("customerName")}
            >
              Customer <img src={arrows.src} />
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[16%]"
              onClick={() => sort("vehicleName")}
            >
              Chauffeur <img src={arrows.src} />
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[12%]"
              onClick={() => sort("city")}
            >
              City <img src={arrows.src} />
            </div>
            <div className="text-start pe-3 flex justify-between items-center w-[9%]">
              Start Date{" "}
            </div>
            <div className="text-start pe-3 flex justify-between items-center w-[9%]">
              End Date{" "}
            </div>
            <div className="text-start pe-3 flex justify-between items-center w-[9%]">
              Duration
            </div>
            <div className="text-start pe-3 flex justify-between items-center w-[9%]">
              Amount
            </div>
            <div className="text-start pe-3 flex justify-between items-center w-[10%]">
              Status
            </div>
          </div>
          {data.length < 1 ? (
            <span className="p-3">No Reservations found.</span>
          ) : (
            data.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <Link
                  href={`/ReservationsInfo/${item?._id}`}
                  className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center ${
                    index % 2 !== 0
                      ? "dark:bg-dark2 bg-light-grey"
                      : "dark:bg-dark1 bg-white"
                  } border-b-2 border-grey`}
                >
                  <h5 className="text-start w-[4%] ps-3">
                    {JSON.stringify(index).padStart(2, "0")}
                  </h5>
                  <h5 className="text-start pe-3 w-[14%]">
                    {item.data?.customerName}
                  </h5>
                  <div className="flex justify-start item-center gap-5 text-start pe-3 w-[16%]">
                    {item.data?.chauffeurName}
                  </div>
                  <h5 className="text-start pe-3 w-[12%]">{item.data?.city}</h5>
                  <div className="flex justify-start items-end w-[9%]">
                    {item.data?.dropOffDate}
                  </div>
                  <div className="flex justify-start ps-2 items-end w-[9%]">
                    {item.data?.PickUpDate}
                  </div>
                  <h5 className="text-start pe-3 w-[9%]">
                    {item.data?.durationinDays ? (
                      <>{item.data?.duration.padStart(2, "0")} Days</>
                    ) : (
                      <>{item.data?.duration.padStart(2, "0")} Hours</>
                    )}
                  </h5>
                  <h5 className="text-start pe-3 w-[9%]">
                    ${item.data?.amount}
                  </h5>
                  <div className="text-start pe-3 w-[10%]">
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
