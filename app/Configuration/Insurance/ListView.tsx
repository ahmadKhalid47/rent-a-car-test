import shape from "@/public/ShapeBlack.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import axios from "axios";
import { SmallLoader } from "@/app/Components/Loader";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import ActiveButton from "@/app/Components/functions/ActiveButton";
import ActiveButtonMultiple from "@/app/Components/functions/ActiveButtonMultiple";
import { PaginationComponent } from "@/app/Components/functions/Pagination";

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

  useEffect(() => {
    if (recurring === "Other") setOtherPopUp(true);
  }, [recurring]);

  useEffect(() => {
    // Create a copy of the data to avoid mutating the original array
    const sorted = [...data].sort((a: any, b: any) => {
      const aIsUser = a.createdBy === myProfile._id;
      const bIsUser = b.createdBy === myProfile._id;

      if (aIsUser && !bIsUser) return -1; // a comes before b
      if (!aIsUser && bIsUser) return 1; // b comes before a
      return 0; // no change in order
    });

    setSortedData(sorted);
  }, [data, myProfile._id]); // Added myProfile._id as a dependency
  const itemsPerPage = 12;

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  async function deleteItem(_id: any) {
    try {
      setDeleteLoading(true);
      await axios.delete(`/api/deleteInsurance/${_id}`);

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Selective Insurance Deleted Successfully"));
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
      await axios.post(`/api/deleteManyInsurance`, {
        _ids: itemToDeleteMany,
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Selective Insurances Deleted Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }

  async function editItem(_id: any) {
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
  console.log(recurring, other);

  return (
    <div className="w-full h-fit">
      <h3
        className={`h-[24px] w-fit flex justify-between items-end font-[400] mt-[-24px] text-[14px] sm:text-[18px] leading-[18px] ${
          itemToDeleteMany.length < 1 ? "text-grey" : " text-main-blue"
        }  `}
      >
        <span>
          {userData.length > 0 && (
            <>
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
              <ActiveButtonMultiple
                itemToDeleteMany={itemToDeleteMany}
                model={"Insurance"}
              />
            </>
          )}
        </span>
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2 ">
        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden mt-0 leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
            <div className="w-[5%]  ps-5 flex justify-start items-center ">
              {userData.length > 0 && (
                <div
                  className={`w-[15px] h-[15px] rounded-[1px] cursor-pointer ${
                    itemToDeleteMany.length === userData.length &&
                    userData.length !== 0
                      ? "bg-check"
                      : ""
                  } border-2 border-dark-grey`}
                  onClick={() => {
                    setItemToDeleteMany(
                      itemToDeleteMany.length !== userData.length ? allIds : []
                    );
                  }}
                ></div>
              )}
            </div>
            <div className="text-start truncate pe-3 flex justify-between items-center w-[15%] ">
              Insurance
            </div>
            <div className="text-start truncate pe-3 flex justify-between items-center w-[67%] ">
              Recurring
            </div>
            <div className="text-center pe-5 flex justify-end items-center w-[13%] ">
              Actions{" "}
            </div>
          </div>
          {paginatedData.length < 1 ? (
            <span className="p-3">No Insurances found.</span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <div
                  className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center capitalize ${
                    index % 2 !== 0
                      ? "dark:bg-dark2 bg-light-grey"
                      : "dark:bg-dark1 bg-white"
                  } border-b-2 border-grey`}
                >
                  <div className="w-[5%]  ps-5 flex justify-start items-center ">
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
                  <div className="text-start truncate pe-3 w-[15%] ">
                    {item?.Insurance}
                  </div>
                  <div className="text-start truncate pe-3 w-[67%] ">
                    {item?.recurring}
                  </div>
                  <div
                    className="flex justify-end pe-5 items-center w-[13%]  h-full gap-[6px]"
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
                    <img
                      src={edit.src}
                      title="Edit"
                      className={`me-[5.8px] ${
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
                    <img
                      className={`${
                        item?.createdBy === myProfile._id
                          ? "hover:scale-[1.3] cursor-pointer"
                          : "grayscale opacity-50"
                      }`}
                      src={deleteIcon.src}
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
                    <div className="w-[90%]  sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%]  gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 fixed modal-position">
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

                {editPopup ? (
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-center sm:items-center z-[10] ">
                    <div className="w-[90%]  sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%]  gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 fixed modal-position">
                      <div
                        className={`w-[100%]  h-fit flex flex-col justify-start items-start gap-1`}
                      >
                        <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                          {"Update Insurance"}
                          <FaAsterisk className="text-[6px]" />
                        </label>
                        <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                          <input
                            required={true}
                            type={"text"}
                            className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%]  h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                            placeholder={`Enter Text Here`}
                            onChange={(e) => {
                              setInsurance(e.target.value);
                            }}
                            value={Insurance}
                          />
                        </div>
                      </div>
                      <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                        <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                          Select Recurring
                          <FaAsterisk className="text-[6px]" />
                        </label>
                        <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                          <select
                            className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                            required={true}
                            onChange={(e) => {
                              setrecurring(e.target.value);
                            }}
                            value={recurring}
                          >
                            <option value={""}>Select</option>
                            {options?.map((item: any, key: number) => (
                              <option value={item} key={key}>
                                {item ? item : "Select"}
                              </option>
                            ))}{" "}
                            {other ||
                              recurring ? (
                                <option value={other ? other : recurring}>
                                  {other ? other : recurring}
                                </option>
                              ):null}
                            <option value={"Other"}>Other</option>
                          </select>
                          <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                            <img
                              src={shape.src}
                              className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
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

                {otherPopUp && (
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
                    <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position">
                      <div
                        className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                      >
                        <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                          {"Add New"}
                          <FaAsterisk className="text-[6px]" />
                        </label>
                        <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
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