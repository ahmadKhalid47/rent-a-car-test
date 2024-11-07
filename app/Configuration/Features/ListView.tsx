import Image from "next/image";
import { sort } from "@/app/Components/functions/sortFunction";
import upload from "@/public/Paper Upload blue.svg";
import arrows from "@/public/arrows.svg";
import { GoTriangleDown } from "react-icons/go";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import demyIcon from "@/public/features (1).png";
import { useState, useEffect } from "react";
import axios from "axios";
import { SmallLoader } from "@/app/Components/Loader";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  setAlert,
  setSeverity,
  setVehicleDataReloader,
} from "@/app/store/Global";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import ActiveButton from "@/app/Components/functions/ActiveButton";
import ActiveButtonMultiple from "@/app/Components/functions/ActiveButtonMultiple";
import { PaginationComponent } from "@/app/Components/functions/Pagination";
import {
  useDeleteItem,
  useDeleteManyItems,
} from "@/app/Components/functions/deleteFunction";
import ConfirmationPopup from "@/app/Components/functions/Popups";

interface dataType {
  data: Array<Object>;
}

export default function ListView({ data }: dataType) {
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let global = useSelector((state: RootState) => state.Global);
  const [popup, setPopup] = useState(false);
  const [deleteManyPopup, setDeleteManyPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToDeleteMany, setItemToDeleteMany] = useState<any>([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState(data);
  const [Feature, setFeature] = useState("");
  const [Icon, setIcon] = useState<any>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [Box, setBox] = useState("");
  const deleteItem = useDeleteItem();
  const deleteManyItems = useDeleteManyItems();

  useEffect(() => {
    const sorted = [...data].sort((a: any, b: any) => {
      const aIsUser = a.createdBy === myProfile._id;
      const bIsUser = b.createdBy === myProfile._id;

      if (aIsUser && !bIsUser) return -1;
      if (!aIsUser && bIsUser) return 1;
      return 0;
    });

    setSortedData(sorted);
  }, [data, myProfile._id]);
  const itemsPerPage = 12;

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  async function editItem(_id: any) {
    if (Feature?.trim() === "" || Box?.trim() === "") {
      dispatch(setAlert("Please fill the input"));
      dispatch(setSeverity("error"));
      return;
    } else if (
      data.find(
        (item: any) =>
          item.Feature?.toLowerCase() === Feature?.trim()?.toLowerCase()
      )
    ) {
      dispatch(setAlert("This Item Already Exists"));
      dispatch(setSeverity("error"));
      return;
    }

    try {
      setEditLoading(true);
      const formData2 = new FormData();
      for (let i = 0; i < Icon?.length; i++) {
        formData2.append("files", Icon[i]);
      }
      const res2 = await axios.post("/api/upload", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let result: any = await axios.post(`/api/updateFeature/${_id}`, {
        Feature,
        Box,
        Icon: res2?.data?.message,
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Selective Feature Updated Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setEditLoading(false);
      setEditPopup(false);
      setItemToEdit(null);
    }
  }
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
  const allIds = data
    .filter((item: any) => item?.createdBy === myProfile._id)
    .map((item: any) => item?._id);

  const userData = data.filter(
    (item: any) => item?.createdBy === myProfile._id
  );
  const categories = [
    "",
    "Basic Comfort Features",
    "Safety Features",
    "Convenience Features",
  ];
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const [reverse, setReverse] = useState<any>(false);
  const [sortOrder, setSortOrder] = useState<{
    [key: string]: "asc" | "desc";
  }>({});
  const handleDeleteConfirm = () => {
    deleteItem(
      itemToDelete,
      "Feature",
      setDeleteLoading,
      setPopup,
      setItemToDelete
    );
  };

  return (
    <div className="w-full h-fit">
      <h3
        className={`h-[24px] w-fit flex justify-between items-end font-[400] text-[14px] sm:text-[18px] leading-[18px] ${
          itemToDeleteMany?.length < 1 ? "text-grey" : " text-main-blue"
        }  `}
      >
        <span>
          {userData?.length > 0 && itemToDeleteMany?.length >= 1 && (
            <>
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
              <ActiveButtonMultiple
                itemToDeleteMany={itemToDeleteMany}
                model={"Feature"}
              />
            </>
          )}
        </span>
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">
        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey-2 overflow-hidden mt-0 leading-[17px]">
          <div className="px-5 w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
            <div className="w-[3%] flex justify-start  items-center">
              {userData?.length > 0 && (
                <div
                  className={`w-[15px] h-[15px] rounded-[1px] cursor-pointer ${
                    itemToDeleteMany?.length === userData?.length &&
                    userData?.length !== 0
                      ? "bg-check"
                      : ""
                  } border-2 border-dark-grey`}
                  onClick={() => {
                    setItemToDeleteMany(
                      itemToDeleteMany?.length !== userData?.length
                        ? allIds
                        : []
                    );
                  }}
                ></div>
              )}
            </div>
            <div className="pe-3 flex justify-start gap-3 items-center w-[5%]">
              Sr#
            </div>
            <div className="pe-3 flex justify-start gap-3 items-center w-[20%]">
              Feature Type
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "Box",
                    currentSortKey,
                    sortOrder,
                    sortedData,
                    setSortedData,
                    setSortOrder,
                    setCurrentSortKey
                  )
                }
              />
            </div>{" "}
            <div className="pe-3 flex justify-start gap-3 items-center w-[20%]">
              Feature
              <Image
                alt=""
                width={10}
                height={10}
                priority={true}
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "Feature",
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
            <div className="truncate flex justify-start gap-4 items-center w-[37%]">
              Icon
            </div>
            <div className="flex justify-end items-center w-[13%] pe-[0.33rem]">
              Actions{" "}
            </div>
          </div>
          {paginatedData?.length < 1 ? (
            <span className="p-3">No Features found.</span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <div
                  className={`px-5 w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize ${
                    index % 2 !== 0
                      ? "dark:bg-dark2 bg-white"
                      : "dark:bg-dark1 bg-white"
                  } border-b-2 border-grey`}
                >
                  <div className="w-[3%] flex justify-start  items-center">
                    {item?.createdBy === myProfile._id && (
                      <button
                        className={`w-[15px] h-[15px] rounded-[1px] ${
                          itemToDeleteMany?.includes(item?._id)
                            ? "bg-check"
                            : ""
                        } border-2 border-dark-grey`}
                        onClick={() => {
                          handlePushItem(item?._id);
                        }}
                      ></button>
                    )}
                  </div>
                  <div className="text-start pe-3 w-[5%]">
                    {JSON.stringify(
                      !reverse
                        ? (page - 1) * itemsPerPage + 1 + index
                        : paginatedData?.length - index
                    ).padStart(2, "0")}{" "}
                  </div>
                  <div className="text-start pe-8 truncate w-[20%] h-[100%] flex justify-start items-center gap-5">
                    {item?.Box}
                  </div>
                  <div className="text-start pe-3 truncate w-[20%] h-[100%] flex justify-start items-center gap-5">
                    {item?.Feature}
                  </div>
                  <div className="text-start pe-3 truncate w-[37%] h-[100%] flex justify-start items-center gap-5">
                    <img
                      className="w-[20px] h-[20px] bg-white"
                      src={item?.Icon || demyIcon.src}
                      alt=""
                    />
                  </div>
                  <div
                    className="flex justify-end  gap-[6px] items-center w-[13%] h-full"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <ActiveButton
                      active={item?.active}
                      _id={item?._id}
                      model={"Feature"}
                      admin={item?.createdBy === myProfile._id}
                    />

                    <Image
                      alt=""
                      width={16}
                      height={16}
                      priority={true}
                      src={edit.src}
                      title="Edit"
                      className={` ${
                        item?.createdBy === myProfile._id
                          ? "hover:scale-[1.3] cursor-pointer"
                          : "grayscale opacity-50"
                      }`}
                      onClick={() => {
                        if (item?.createdBy === myProfile._id) {
                          setEditPopup(true);
                          setItemToEdit(item?._id);
                          setFeature(item?.Feature);
                          setBox(item?.Box);
                        }
                      }}
                    />

                    <Image
                      alt=""
                      width={16}
                      height={16}
                      priority={true}
                      src={deleteIcon.src}
                      className={`${
                        item?.createdBy === myProfile._id
                          ? "hover:scale-[1.3] cursor-pointer"
                          : "grayscale opacity-50"
                      }`}
                      title="Delete"
                      onClick={() => {
                        if (item?.createdBy === myProfile._id) {
                          setPopup(true);
                          setItemToDelete(item?._id);
                        }
                      }}
                    />
                  </div>
                </div>
                {editPopup ? (
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
                    <div className="w-[90%] sm:w-[600px] h-[430px] border-[1px] border-grey rounded-[10px] mt-0 flex flex-col justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position modal-animation">
                      <div
                        className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                      >
                        <label className="flex justify-start gap-1 items-start font-[600] text-[24px] leading-[17px]">
                          {"Update Feature"}
                          <FaAsterisk className="text-[8px] text-red-500" />
                        </label>
                      </div>
                      <div className="w-full h-fit flex flex-col justify-between items-center relative gap-4">
                        <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                          <div className="w-full h-fit flex justify-between items-center relative">
                            <select
                              className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                              required={true}
                              onChange={(e) => {
                                setBox(e.target.value);
                              }}
                              value={Box}
                            >
                              <option value={""}>Select</option>
                              <option value={"Basic Comfort Features"}>
                                Basic Comfort Features
                              </option>
                              <option value={"Safety Features"}>
                                Safety Features
                              </option>
                              <option value={"Convenience Features"}>
                                Convenience Features
                              </option>
                            </select>
                            <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                              <GoTriangleDown className="text-[18px]" />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-fit flex justify-between items-center relative">
                          <input
                            required={true}
                            type={"text"}
                            className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                            placeholder={`Feature Here`}
                            onChange={(e) => {
                              setFeature(e.target.value);
                            }}
                            value={Feature}
                          />
                        </div>

                        {myProfile.admin && (
                          <div
                            className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                          >
                            <div className="w-full h-fit flex justify-between items-center relative">
                              <input
                                required={true}
                                type={"file"}
                                className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] py-2 flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate cursor-pointer"
                                onChange={(e: any) => {
                                  setIcon(e.target?.files);
                                }}
                              />
                              <div className="z-1 w-full h-full flex justify-center gap-1 items-center bg-white absolute top-0 left-0 rounded-[5px] border-dashed border-2 border-main-dark-blue pointer-events-none text-main-dark-blue text-[18px] leading-[18px] font-[600]">
                                <Image
                                  src={upload.src}
                                  alt=""
                                  width={32}
                                  height={32}
                                  priority={true}
                                />
                                <span className="w-[70&] truncate bg-red500 leading-[24px]">
                                  {Icon[0]?.name || "Upload Icon"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`w-full flex justify-end gap-4 items-center pt-4`}
                      >
                        <button
                          className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                          onClick={() => {
                            setEditPopup(false);
                            setFeature("");
                            setBox("");
                            setIcon("");
                          }}
                        >
                          <FaTimes />
                        </button>
                        <button
                          className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                          onClick={() => editItem(itemToEdit)}
                          disabled={editLoading}
                        >
                          {editLoading ? <SmallLoader /> : "Update and Close"}
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
      />
      <ConfirmationPopup
        popup={deleteManyPopup}
        onCancel={() => setDeleteManyPopup(false)}
        onConfirm={() =>
          deleteManyItems(
            itemToDeleteMany,
            "Feature",
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
