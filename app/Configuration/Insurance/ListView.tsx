import Image from "next/image";
import { sort } from "@/app/Components/functions/sortFunction";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
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
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
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
  const [Insurance, setInsurance] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [recurring, setrecurring] = useState("");
  let [other, setOther] = useState("");
  let [otherPopUp, setOtherPopUp] = useState(false);
  const deleteItem = useDeleteItem();
  const deleteManyItems = useDeleteManyItems();

  useEffect(() => {
    if (recurring === "Other") setOtherPopUp(true);
  }, [recurring]);

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
    if (Insurance?.trim() === "" || recurring?.trim() === "") {
      dispatch(setAlert("Please fill the input"));
      dispatch(setSeverity("error"));
      return;
    } else if (
      data.find(
        (item: any) =>
          item.Insurance?.toLowerCase() === Insurance?.trim()?.toLowerCase()
      )
    ) {
      dispatch(setAlert("This Item Already Exists"));
      dispatch(setSeverity("error"));
      return;
    }
    try {
      setEditLoading(true);
      await axios.post(`/api/updateInsurance/${_id}`, {
        Insurance,
        recurring,
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Selective Insurance Updated Successfully"));
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
  let options = [
    "Daily",
    "Weekly",
    "Three Weekly",
    "Monthly",
    "Six Monthly",
    "Yearly",
  ];
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const [reverse, setReverse] = useState<any>(false);
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "asc" | "desc" }>(
    {}
  );
  const handleDeleteConfirm = () => {
    deleteItem(
      itemToDelete,
      "Insurance",
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
                model={"Insurance"}
              />
            </>
          )}
        </span>
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2">
        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey-2 overflow-hidden mt-0 leading-[17px]">
          <div className="px-5 w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
            <div className="w-[3%]   flex justify-start items-center">
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
            <div className="pe-3 flex justify-start gap-3 items-center w-[15%]">
              Company Name
              <Image
                alt=""
                width={10}
                height={10}
                
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "Insurance",
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
            <div className="pe-3 flex justify-start gap-3 items-center w-[62%]">
              Recurring Period
              <Image
                alt=""
                width={10}
                height={10}
                
                src={arrows.src}
                className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                onClick={() =>
                  sort(
                    "recurring",
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
            <div className="text-center  flex justify-end items-center w-[13%] pe-[0.33rem]">
              Actions{" "}
            </div>
          </div>
          {paginatedData?.length < 1 ? (
            <span className="p-3">No Insurances found.</span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <div
                  className={`px-5 w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize dark:bg-dark1 bg-white border-b-2 border-grey`}
                >
                  <div className="w-[3%]   flex justify-start items-center">
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
                  <div className="text-start truncate pe-3 w-[15%]">
                    {item?.Insurance}
                  </div>
                  <div className="text-start truncate pe-3 w-[62%]">
                    {item?.recurring}
                  </div>
                  <div
                    className="flex justify-end  items-center w-[13%]  h-full gap-[6px]"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <ActiveButton
                      active={item?.active}
                      _id={item?._id}
                      model={"Insurance"}
                      admin={item?.createdBy === myProfile._id}
                    />
                    <Image
                      alt=""
                      width={16}
                      height={16}
                      
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
                          setInsurance(item?.Insurance);
                          setrecurring(item?.recurring);
                        }
                      }}
                    />
                    <Image
                      alt=""
                      width={16}
                      height={16}
                      
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
                          {"Update Insurance"}
                          <FaAsterisk className="text-[8px] text-red-500" />
                        </label>
                      </div>
                      <div className="w-full h-fit flex flex-col justify-between items-center relative gap-4">
                        <div className="w-full h-fit flex justify-between items-center relative">
                          <input
                            required={true}
                            type={"text"}
                            className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%]  h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                            placeholder={`Company Name Here`}
                            onChange={(e) => {
                              setInsurance(e.target.value);
                            }}
                            value={Insurance}
                          />
                        </div>
                        <div
                          className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                        >
                          <div className="w-full h-fit flex justify-between items-center relative">
                            <input
                              type={"text"}
                              className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                              placeholder={`Recurring Here`}
                              required={true}
                              onChange={(e) => {
                                setrecurring(e.target.value);
                              }}
                              value={recurring}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-full flex justify-end gap-4 items-center pt-4`}
                      >
                        <button
                          className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                          onClick={() => {
                            setEditPopup(false);
                            setInsurance("");
                            setrecurring("");
                          }}
                        >
                          <FaTimes />
                        </button>
                        <button
                          className="w-[200px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                          onClick={() => editItem(itemToEdit)}
                          disabled={editLoading}
                        >
                          {editLoading ? <SmallLoader /> : "Update"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {otherPopUp && (
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
                    <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position modal-animation">
                      <div
                        className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                      >
                        <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                          {"Add New"}
                          <FaAsterisk className="text-[8px] text-red-500" />
                        </label>
                        <div className="w-full h-fit flex justify-between items-center relative">
                          <input
                            required={true}
                            type={"text"}
                            className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                            placeholder={`Enter Text Here`}
                            onChange={(e) => {
                              setOther(e.target.value);
                            }}
                            value={other}
                          />
                        </div>
                      </div>

                      <div
                        className={`w-full flex justify-end gap-4 items-center pt-4`}
                      >
                        <button
                          className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                          onClick={() => {
                            setOther("");
                            setOtherPopUp(false);
                          }}
                        >
                          <FaTimes />
                        </button>
                        <button
                          className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                          onClick={() => {
                            setrecurring(other);
                            setOtherPopUp(false);
                            // setOther("");
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
            "Insurance",
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
