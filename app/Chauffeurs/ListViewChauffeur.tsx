import { sort } from "@/app/Components/functions/sortFunction";
import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { SmallLoader } from "../Components/Loader";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { setAlert, setVehicleDataReloader } from "../store/Global";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useHandleExport } from "../Components/functions/exportFunction";
import { PaginationComponent } from "../Components/functions/Pagination";
import { formatCreatedAtDate } from "../Components/functions/formats";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import {
  useDeleteItem,
  useDeleteManyItems,
} from "../Components/functions/deleteFunction";

interface dataType {
  data: Array<Object>;
}

export default function ListViewchauffeurs({ data }: dataType) {
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
  const handleExport = useHandleExport(); 
  const deleteItem = useDeleteItem();
  const deleteManyItems = useDeleteManyItems();

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


  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function handlePushItem(_id: any) {
    setItemToDeleteMany((prevArray: any) => {
      
      const isPresent = prevArray.includes(_id);

      
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
      setEditLoading(true);
      let result: any = await axios.post(`/api/updateActivechauffeur/${_id}`, {
        active: !active,
      });
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          !active
            ? "Selective Chauffeur Activated Successfully"
            : "Selective Chauffeur Deactivated Successfully"
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setEditLoading(false);
    }
  }

  async function UpdateActiveManyItem(active: boolean) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.post(`/api/updateManyActivechauffeur`, {
        _ids: itemToDeleteMany,
        active: active,
      });
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          active
            ? `Selective Chauffeurs Activated Successfully`
            : "Selective Chauffeurs Deactivated Successfully"
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

  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: any, images: any) => {
    if (!images?.length) {
      return;
    }

    setCurrentIndex(index);
    setIsOpen(true);
    setImages(images);
  };

  const closeModal = () => setIsOpen(false);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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
            <span className="ps-1"></span>|<span className="ps-1"></span>
            <span
              className={`${
                itemToDeleteMany.length < 1
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
                itemToDeleteMany.length < 1
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
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">
        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
            <div className="text-center w-[4%]  flex justify-center items-center">
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
            <div className="text-start flex justify-start gap-2 items-center w-[14%]">
              Chauffeur Name{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
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
              />
            </div>
            <div className="text-start flex justify-start gap-2 items-center w-[12%]">
              Phone{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
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
              />
            </div>
            <div className="text-start flex justify-start gap-2 items-center w-[17%]">
              Email{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "emailAddress",
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
            <div className="text-start flex justify-start gap-2 items-center w-[8%]">
              Gender{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
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
              />
            </div>
            <div className="text-start flex justify-start gap-2 items-center w-[8%]">
              City{" "}
              <img
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
            <div className="text-start flex justify-start gap-2 items-center w-[10%]">
              Rent Per Day{" "}
              <img
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "rentPerDay",
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
            <div className="text-start pe-3 truncate flex justify-between items-center w-[9%]">
              Created At{" "}
            </div>{" "}
            <div className="text-start pe-3 truncate flex justify-between items-center w-[11%]">
              Documents{" "}
            </div>{" "}
            <div className="text-start flex justify-end pe-3 truncate items-center w-[7%] ">
              Actions{" "}
            </div>
          </div>

          {paginatedData.length < 1 ? (
            <span className="p-3">No Chauffeurs found. </span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <Link
                  href={`/ChauffeursInfo/${item?._id}`}
                  className={`w-full h-fit flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize ${
                    index % 2 !== 0
                      ? "dark:bg-dark2 bg-light-grey"
                      : "dark:bg-dark1 bg-white"
                  } border-b-2 border-grey`}
                >
                  <div className="text-center w-[4%]  flex justify-center items-center">
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
                  <div className="text-start pe-3 truncate w-[14%]">
                    {item?.data?.name}
                  </div>
                  <div
                    className="text-start pe-3 truncate w-[12%]"
                    title={item?.data?.phone}
                  >
                    {item?.data?.phone}
                  </div>
                  <div
                    className="text-start pe-3 truncate w-[17%]"
                    title={item?.data?.emailAddress}
                  >
                    {item?.data?.emailAddress}
                  </div>

                  <div className="text-start pe-3 truncate w-[8%]">
                    {item?.data?.gender}
                  </div>
                  <div className="text-start pe-3 truncate w-[8%]">
                    {item?.data?.city}
                  </div>
                  <div className="text-start pe-3 truncate w-[10%]">
                    {global.currentCurrency}
                    {item?.data?.rentPerDay}
                  </div>
                  <div className="text-start pe-3 truncate w-[9%]">
                    {formatCreatedAtDate(item?.createdAt)}
                  </div>
                  <div
                    className="pe-3 w-[11%] flex flex-col justify-center items-start text-[12px]"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <button
                      className="w-fit flex justify-start items-center gap-1"
                      onClick={() => {
                        openModal(0, item?.data?.passportImages);
                      }}
                    >
                      <div className="w-[14px] h-[14px] rounded-[2px] flex justify-center items-center bg-[#0094DA33]">
                        <IoDocumentTextOutline className="text-[11px]" />
                      </div>
                      Passport / ID
                    </button>
                    <button
                      className="w-fit flex justify-start items-center gap-1"
                      onClick={() => {
                        openModal(0, item?.data?.licenseImages);
                      }}
                    >
                      <div className="w-[14px] h-[14px] rounded-[2px] flex justify-center items-center bg-[#0094DA33]">
                        <IoDocumentTextOutline className="text-[11px]" />
                      </div>
                      License
                    </button>
                    {/* {item?.data?.otherImages?.length > 0 && ( */}
                    <button
                      className="w-fit flex justify-start items-center gap-1"
                      onClick={() => {
                        openModal(0, item?.data?.otherImages);
                      }}
                    >
                      <div className="w-[14px] h-[14px] rounded-[2px] flex justify-center items-center bg-[#0094DA33]">
                        <IoDocumentTextOutline className="text-[11px]" />
                      </div>
                      Other
                    </button>
                    {/* )} */}
                  </div>
                  <div
                    className="flex justify-end pe-3 truncate gap-1 items-center w-[7%] h-[43px]"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <img
                      src={item.active ? check.src : unCheck.src}
                      title={item.active ? "Inactive" : "Active"}
                      className="translate-y-[1px] hover:scale-[1.3] cursor-pointer"
                      onClick={() => {
                        updateActive(item?._id, item?.active);
                      }}
                    />
                    <img
                      src={edit.src}
                      title="Edit"
                      className="hover:scale-[1.3] cursor-pointer"
                      onClick={() => {
                        router.push(`/AddChauffeur/${item?._id}`);
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
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
                    <div className="w-[90%]  sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] flex flex-wrap justify-between items-start gap-x-[4%]  gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 modal-position animate-zoom fixed modal-position animate-zoom">
                      <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
                        <label className="flex justify-start gap-1 items-start font-[400] text-[16px] leading-[17px]">
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
                            deleteItem(
                              itemToDelete,
                              "chauffeur",
                              setDeleteLoading,
                              setPopup,
                              setItemToDelete
                            );
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
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
                    <div className="w-[90%]  sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] flex flex-wrap justify-between items-start gap-x-[4%]  gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 modal-position animate-zoom">
                      <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
                        <label className="flex justify-start gap-1 items-start font-[400] text-[16px] leading-[17px]">
                          Are you sure you want to delete selected items?
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
                          onClick={() => {}}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? <SmallLoader /> : "Yes"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {isOpen && (
                  <div className="w-[100vw] h-[100vh] fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-80">
                    <span
                      className="absolute top-4 right-6 text-white text-3xl cursor-pointer"
                      onClick={closeModal}
                    >
                      <FaTimes />
                    </span>
                    <div className="relative max-w-3xl w-full animate-zoom">
                      <div className="relative">
                        <img src={images[currentIndex]} className="w-full" />
                      </div>
                      <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2"
                        onClick={prevSlide}
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2"
                        onClick={nextSlide}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                )}{" "}
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
