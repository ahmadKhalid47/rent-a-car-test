import vip from "@/public/vip.svg";
import Image from "next/image";
import unCheck from "@/public/uncheck.svg";
import { sort } from "@/app/Components/functions/sortFunction";
import check from "@/public/check.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaginationComponent } from "../Components/functions/Pagination";
import {
  addDayInDate,
  addMonthInDate,
  addYearInDate,
  formatDate,
} from "../Components/functions/formats";
import {
  useDeleteItem,
  useDeleteManyItems,
} from "../Components/functions/deleteFunction";
import ConfirmationPopup from "../Components/functions/Popups";
import useItemToDelete from "@/app/Components/functions/smallFunctions";
interface dataType {
  data: Array<Object>;
}

export default function ListViewUsers({ data }: dataType) {
  const [popup, setPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState<{
    [key: string]: "asc" | "desc";
  }>({});
  const [itemToDeleteMany, setItemToDeleteMany, handlePushItem] =
    useItemToDelete();
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

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const allIds = data.map((item: any) => item?._id);

  async function updateActive(_id: any, active: boolean) {
    return;
  }

  const handleDeleteConfirm = () => {
    deleteItem(
      itemToDelete,
      "registration",
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
            <span className="cursor-pointer">
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
          </span>
        )}
      </div>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">
        <div className="w-[1100px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
            <div className="text-center w-[3%] flex justify-center items-center">
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
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[17%]">
              Name{" "}
              <Image
                alt=""
                width={10}
                height={10}
                onClick={() =>
                  sort(
                    "name",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[12%]">
              Username{" "}
              <Image
                alt=""
                width={10}
                height={10}
                src={arrows.src}
                onClick={() =>
                  sort(
                    "name",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[12%]">
              Company{" "}
              <Image
                alt=""
                width={10}
                height={10}
                onClick={() =>
                  sort(
                    "name",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[12%]">
              Phone{" "}
              <Image
                alt=""
                width={10}
                height={10}
                onClick={() =>
                  sort(
                    "phone",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[18%]">
              Email{" "}
              <Image
                alt=""
                width={10}
                height={10}
                onClick={() =>
                  sort(
                    "email",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[8%]">
              City{" "}
              <Image
                alt=""
                width={10}
                height={10}
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
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[9%]">
              Subscription
              <Image
                alt=""
                width={10}
                height={10}
                onClick={() =>
                  sort(
                    "",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="pe-3 flex justify-end items-center w-[8%]">
              Actions{" "}
            </div>
          </div>

          {paginatedData?.length < 1 ? (
            <span className="p-3">No Users found.</span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <Link
                  href={`/UsersInfo/${item?._id}`}
                  className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize list-hover dark:bg-dark1 bg-white border-b-2 border-grey`}
                >
                  <div className="text-center w-[3%] flex justify-center items-center">
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
                  <div className="text-start pe-4 truncate w-[17%] flex justify-start gap-3 items-center">
                    {item?.name}

                    {item?.data?.isVip && (
                      <Image alt="" width={21} height={15} src={vip.src} />
                    )}
                  </div>
                  <div className="text-start pe-3 truncate w-[12%]">
                    {item?.username}
                  </div>
                  <div className="text-start pe-3 truncate w-[12%]">
                    {item?.company}
                  </div>
                  <div className="text-start pe-3 truncate w-[12%]">
                    {item?.phone}
                  </div>
                  <div className="text-start pe-3 truncate w-[18%]">
                    {item?.email}
                  </div>
                  <div className="text-start pe-3 truncate w-[8%]">
                    {item?.city}
                  </div>
                  <div className="text-start pe-3 truncate w-[9%]">
                    <div
                      className={`flex justify-center px-2 items-center w-fit h-[22px] border-[1px] text-[12px] rounded-[5px] ${
                        index === 7
                          ? "trial-status"
                          : index === 0
                          ? "progress-status"
                          : index === 5
                          ? "pending-status"
                          : "complete-status"
                      }
                          `}
                    >
                      {index === 7
                        ? "Trail"
                        : index === 0
                        ? "Expired"
                        : index === 5
                        ? "Pending"
                        : "Active"}
                    </div>{" "}
                  </div>
                  {/* <div className="text-start pe-3 truncate w-[12%]">
                    {item?.createdAt
                      ? item?.plan === "3-Day Trial"
                        ? formatDate(addDayInDate(item?.createdAt, 3))
                        : item?.plan === "1 Month"
                        ? formatDate(addMonthInDate(item?.createdAt, 1))
                        : item?.plan === "3 Months"
                        ? formatDate(addMonthInDate(item?.createdAt, 3))
                        : item?.plan === "6 Months"
                        ? formatDate(addMonthInDate(item?.createdAt, 6))
                        : item?.plan === "1 Year"
                        ? formatDate(addYearInDate(item?.createdAt, 1))
                        : null
                      : null}
                  </div> */}
                  <div
                    className="flex justify-end pe-3 truncate gap-1 items-center w-[8%] h-[43px]"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <Image
                      alt=""
                      width={16}
                      height={16}
                      src={item?.active ? check.src : unCheck.src}
                      title={item.active ? "Inactive" : "Active"}
                      className="translate-y-[1px] hover:scale-[1.3] cursor-pointer"
                      // onClick={() => {
                      //   handleActivateSingleVehicle(item?._id, item?.active);
                      // }}
                    />

                    <Image
                      alt=""
                      width={16}
                      height={16}
                      src={edit.src}
                      title="Edit"
                      className="hover:scale-[1.3] cursor-pointer"
                      onClick={() => {
                        router.push(`/AddUser/${item?._id}`);
                      }}
                    />
                    <Image
                      alt=""
                      width={16}
                      height={16}
                      src={deleteIcon.src}
                      className="hover:scale-[1.3] cursor-pointer h-[16px]"
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
            "registration",
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
