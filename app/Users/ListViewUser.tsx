import { sort } from "@/app/Components/functions/sortFunction";
import check from "@/public/check.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SmallLoader } from "../Components/Loader";
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
        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
            <div className="text-center w-[3%] flex justify-center items-center">
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
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[12%]">
              Full Name{" "}
              <img
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
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[10%]">
              Username{" "}
              <img
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
              Company{" "}
              <img
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
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[13%]">
              Email{" "}
              <img
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
            <div className="text-start pe-3 flex justify-start gap-2 items-center w-[6%]">
              City{" "}
              <img
                onClick={() =>
                  sort(
                    "gender",
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
            <div
              className="text-start pe-3 flex justify-start gap-2 items-center w-[9%]"
              onClick={() =>
                sort(
                  "gender",
                  currentSortKey,
                  sortOrder,
                  sortedData,
                  setSortedData,
                  setSortOrder,
                  setCurrentSortKey
                )
              }
            >
              Active Plan{" "}
            </div>
            <div
              className="text-start pe-3 flex justify-start gap-2 items-center w-[9%]"
              onClick={() =>
                sort(
                  "gender",
                  currentSortKey,
                  sortOrder,
                  sortedData,
                  setSortedData,
                  setSortOrder,
                  setCurrentSortKey
                )
              }
            >
              Started At{" "}
            </div>
            <div
              className="text-start pe-3 flex justify-start gap-2 items-center w-[9%]"
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
              Expiry Date
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
              />
            </div>
            <div className="pe-3 flex justify-end items-center w-[8%]">
              Actions{" "}
            </div>
          </div>

          {paginatedData.length < 1 ? (
            <span className="p-3">No Users found.</span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <Link
                  href={`/UsersInfo/${item?._id}`}
                  className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize ${
                    index % 2 !== 0
                      ? "dark:bg-dark2 bg-light-grey"
                      : "dark:bg-dark1 bg-white"
                  } border-b-2 border-grey`}
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
                  <div className="text-start pe-3 truncate w-[12%]">
                    {item?.name}
                  </div>
                  <div className="text-start pe-3 truncate w-[10%]">
                    {item?.username}
                  </div>
                  <div className="text-start pe-3 truncate w-[12%]">
                    {item?.company}
                  </div>
                  <div className="text-start pe-3 truncate w-[13%]">
                    {item?.email}
                  </div>
                  <div className="text-start pe-3 truncate w-[6%]">
                    {item?.city}
                  </div>
                  <div className="text-start pe-3 truncate w-[9%]">
                    {item?.plan}
                  </div>
                  <div className="text-start pe-3 truncate w-[9%]">
                    {item?.createdAt && formatDate(item?.createdAt)}
                  </div>
                  <div className="text-start pe-3 truncate w-[9%]">
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
                  </div>
                  <div
                    className="flex justify-end pe-3 gap-3 items-center w-[8%] h-full"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <img
                      // src={item.active ? check.src : unCheck.src}
                      src={check.src}
                      title={item.active ? "Inactive" : "Active"}
                      className="translate-y-[1px] hover:scale-[1.3]"
                      onClick={() => {
                        updateActive(item?._id, item?.active);
                      }}
                    />
                    <img
                      src={edit.src}
                      title="Edit"
                      className="hover:scale-[1.3] cursor-pointer"
                      onClick={() => {
                        router.push(`/AddUser/${item?._id}`);
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
