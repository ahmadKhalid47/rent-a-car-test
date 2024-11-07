import ConfirmationPopup from "../Components/functions/Popups";
import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { setAlert, setVehicleDataReloader } from "../store/Global";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { formatCreatedAtDate } from "../Components/functions/formats";
import { PaginationComponent } from "../Components/functions/Pagination";
import { sort, sort2 } from "../Components/functions/sortFunction";
import {
  useDeleteItem,
  useDeleteManyItems,
} from "../Components/functions/deleteFunction";
import Image from "next/image";

interface dataType {
  data: Array<Object>;
}

export default function ListView({ data }: dataType) {
  let global = useSelector((state: RootState) => state.Global);
  const [popup, setPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "asc" | "desc" }>(
    {}
  );
  const [itemToDeleteMany, setItemToDeleteMany] = useState<any>([]);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const [deleteManyPopup, setDeleteManyPopup] = useState(false);
  const itemsPerPage = 12;
  const dispatch = useDispatch();
  const router = useRouter();
  const deleteItem = useDeleteItem();
  const deleteManyItems = useDeleteManyItems();

  useEffect(() => {
    setSortedData(data);
  }, [data]);
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

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
  async function updateActive(_id: any, active: boolean) {
    try {
      await axios.post(`/api/updateSingleActive/${_id}`, {
        active: !active,
        model: "vehicle",
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          !active
            ? "Selective Vehicle Activated Successfully"
            : "Selective Vehicle Deactivated Successfully"
        )
      );
    } catch (err) {
      console.log(err);
    }
  }
  async function UpdateActiveManyItem(active: boolean) {
    try {
      setDeleteLoading(true);
      await axios.post(`/api/updateMultipleActive`, {
        _ids: itemToDeleteMany,
        active: active,
        model: "vehicle",
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          active
            ? "Selective Vehicles Activated Successfully"
            : "Selective Vehicles Deactivated Successfully"
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }
  const handleDeleteConfirm = () => {
    deleteItem(
      itemToDelete,
      "vehicle",
      setDeleteLoading,
      setPopup,
      setItemToDelete
    );
  };
  return (
    <div className="w-full h-fit">
      <div
        className={`h-[24px] w-fit flex justify-between items-end font-[400] text-[14px] sm:text-[18px] leading-[18px] ${
          itemToDeleteMany?.length < 1 ? "text-grey" : " text-main-blue"
        }  `}
      >
        {itemToDeleteMany?.length >= 1 && (
          <span>
            <span>
              <button
                className={`${
                  itemToDeleteMany?.length < 1
                    ? ""
                    : "cursor-pointer hover:underline"
                }`}
                onClick={() => {
                  setDeleteManyPopup(true);
                }}
                disabled={itemToDeleteMany?.length < 1 ? true : false}
              >
                Delete Multiple
              </button>
            </span>
            <span className="ps-1"></span>|<span className="ps-1"></span>
            <span
              className={`${
                itemToDeleteMany?.length < 1
                  ? ""
                  : "cursor-pointer hover:underline"
              }`}
              onClick={() => {
                UpdateActiveManyItem(true);
              }}
            >
              Active /
            </span>
            <span
              className={`${
                itemToDeleteMany?.length < 1
                  ? ""
                  : "cursor-pointer hover:underline"
              }`}
              onClick={() => {
                UpdateActiveManyItem(false);
              }}
            >
              Inactive Multiple
            </span>
          </span>
        )}
      </div>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2 relative">
        <div className="w-[1100px] 1400:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden mt-0 leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
            <div className="truncate  w-[4%]  flex justify-start ps-3 items-center">
              <div
                className={`w-[15px] h-[15px] rounded-[1px] cursor-pointer ${
                  itemToDeleteMany?.length === data?.length &&
                  data?.length !== 0
                    ? "bg-check"
                    : ""
                } border-2 border-dark-grey`}
                onClick={() => {
                  setItemToDeleteMany(
                    itemToDeleteMany?.length !== data?.length ? allIds : []
                  );
                }}
              ></div>
            </div>
            <div className="text-start truncate flex justify-start gap-2 items-center w-[10%]">
              Vehicle Name{" "}
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "make",
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
            <div className="text-start truncate flex justify-start gap-2 items-center w-[11%]"></div>
            <div className="text-start truncate flex justify-start gap-2 items-center w-[8%]">
              Reg No{" "}
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "registration",
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
            <div className="text-start truncate flex justify-start gap-2 items-center w-[11%]">
              VIN No{" "}
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "type",
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

            <div className="text-start truncate flex justify-start gap-2 items-center w-[6%]">
              Year{" "}
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "year",
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
            <div className="text-start truncate flex justify-start gap-2 items-center w-[6%]">
              Color{" "}
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "color",
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
            <div className="text-start truncate flex justify-start gap-2 items-center w-[12%]">
              Odometer{" "}
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "odometer",
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
            <div className="text-start truncate flex justify-start gap-2 items-center w-[7%] ">
              City{" "}
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
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
              />
            </div>
            <div className="text-start truncate flex justify-start gap-2 items-center w-[9%]">
              Created At{" "}
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort2(
                    "createdAt",
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
            <div className="text-start truncate flex justify-start gap-2 items-center w-[7%] ">
              Status
            </div>
            <div className="text-start flex justify-end pe-3 truncate items-center w-[7%] ">
              Actions{" "}
            </div>
          </div>
          {paginatedData?.length < 1 ? (
            <span className="p-3">No Vehicles found.</span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <Link
                  href={`/VehicleInfo/${item?._id}`}
                  className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize border-grey
                     ${
                       index % 2 !== 0
                         ? "dark:bg-dark2 bg-light-gre"
                         : "dark:bg-dark1 bg-whit"
                     } 
                         ${
                           index ===
                             Math.min(page * itemsPerPage, data?.length) - 1 ||
                           index + 12 === data?.length - 1
                             ? ""
                             : "border-b-2"
                         }
                      `}
                >
                  <div className="truncate  w-[4%]  flex justify-start ps-3 items-center">
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
                  <div className="text-start pe-3 truncate w-[10%]">
                    {item?.data?.make} {item?.data?.model}
                  </div>
                  <div className="text-start pe-3 truncate w-[11%]">
                    <span
                      className={`w-[93px] px-1 truncate border-[1px] rounded-[5px] h-[22px] flex justify-center items-center text-[12px]`}
                    >
                      {item?.data?.type}
                    </span>
                  </div>
                  <div className="text-start pe-3 truncate w-[8%]">
                    {item?.data?.registration}
                  </div>
                  <div className="text-start pe-3 truncate w-[11%]">
                    {item?.data?.vinNo}
                  </div>{" "}
                  <div className="text-start pe-3 truncate w-[6%]">
                    {item?.data?.year}
                  </div>
                  <div className="text-start pe-3 truncate w-[6%]">
                    <div
                      className={`w-[23px] h-[12px] rounded-full`}
                      style={{
                        backgroundColor: item?.data?.color,
                      }}
                    ></div>
                  </div>
                  <div className="text-start pe-3 truncate w-[12%]">
                    <span className="w-[100px] h-[19px] bg-gradient-to-b from-white to-[rgb(229,230,231)] border-[1px] border-[rgb(128,130,133)] text-black flex justify-center items-center">
                      {item?.data?.odometer
                        ?.padStart(6, "0")
                        .split("")
                        .map((item: any, index: any) => (
                          <>
                            <span
                              className="border-[rgb(147,149,152)] text-center flex justify-center items-center w-[16.66px]"
                              key={index}
                            >
                              {item}
                            </span>
                            {index !== 5 && (
                              <div className="h-[19px] w-[1px] bg-[rgb(147,149,152)] rounded-[100%]"></div>
                            )}
                          </>
                        ))}
                    </span>
                  </div>
                  <div className="text-start pe-3 truncate w-[7%] ">
                    {item?.data?.city}
                  </div>
                  <div className="text-start pe-3 truncate w-[9%]">
                    {formatCreatedAtDate(item?.createdAt)}
                  </div>
                  <div className="text-start pe-3  w-[7%] ">
                    <span
                      className={`w-full truncate border-[1px] px-1 rounded-[5px] h-[22px] text-center text-[12px]
                        ${
                          item?.rentOut
                            ? "progress-status"
                            : !item?.active
                            ? "progress-status"
                            : "complete-status"
                        }`}
                    >
                      {item?.rentOut
                        ? "On Trip"
                        : !item?.active
                        ? "In Active"
                        : "Available"}
                    </span>
                  </div>
                  <div
                    className="flex justify-end pe-3 truncate gap-1 items-center w-[7%] h-[43px]"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <Image
                      alt=""
                      width={16}
                      height={16}
                      priority={true}
                      src={item.active ? check.src : unCheck.src}
                      title={item.active ? "Inactive" : "Active"}
                      className="translate-y-[1px] hover:scale-[1.3] cursor-pointer"
                      onClick={() => {
                        updateActive(item?._id, item?.active);
                      }}
                    />
                    <Image
                      alt=""
                      width={16}
                      height={16}
                      priority={true}
                      src={edit.src}
                      title="Edit"
                      className="hover:scale-[1.3] cursor-pointer"
                      onClick={() => {
                        router.push(`/AddVehicle/${item?._id}`);
                      }}
                    />

                    <Image
                      alt=""
                      width={16}
                      height={16}
                      priority={true}
                      src={deleteIcon.src}
                      className="hover:scale-[1.3] cursor-pointer"
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
            "vehicle",
            setDeleteLoading,
            setDeleteManyPopup,
            setItemToDeleteMany
          )
        }
        deleteLoading={deleteLoading}
        isMultiple={true}
      />{" "}
    </div>
  );
}
