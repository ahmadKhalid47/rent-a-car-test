import check from "@/public/check.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import axios from "axios";
import { SmallLoader } from "@/app/Components/Loader";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { setVehicleDataReloader } from "@/app/store/Global";
import { setAllValues } from "@/app/store/Vehicle";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FaAsterisk, FaTimes } from "react-icons/fa";

interface dataType {
  data: Array<Object>;
}

export default function ListView({ data }: dataType) {
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
  const [make, setMake] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setSortedData(data);
  }, [data]);
  const itemsPerPage = 12;

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Slice the data for the current page
  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function PaginationRounded() {
    return (
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          shape="rounded"
          page={page}
          onChange={handleChange}
          sx={{
            "& .MuiPaginationItem-root": {
              "&.Mui-selected": {
                backgroundColor: "#242e69",
                color: "white",
                "&:hover": {
                  opacity: 0.8,
                },
              },
            },
          }}
        />
      </Stack>
    );
  }

  async function deleteItem(_id: any) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.delete(`/api/deleteMake/${_id}`);
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
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
      let result: any = await axios.post(`/api/deleteManyMake`, {
        _ids: itemToDeleteMany,
      });
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
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
      let result: any = await axios.post(`/api/updateMake/${_id}`, {
        make,
      });
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
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
  const allIds = data.map((item: any) => item?._id);

  return (
    <div className="w-full h-fit mt-4 relative">
      <h3
        className={`w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] ${
          itemToDeleteMany.length < 1 ? "text-grey" : "text-main-blue"
        }  `}
      >
        <span>
          <button
            className="cursor-pointer"
            onClick={() => {
              setDeleteManyPopup(true);
            }}
            disabled={itemToDeleteMany.length < 1 ? true : false}
          >
            Delete Multiple
          </button>
        </span>
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2 ">
        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start bg-light-grey overflow-hidden mt-0 leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
            <div className="text-center w-[6%] flex justify-center items-center ">
              <div
                className={`w-[15px] h-[15px] rounded-[1px] ${
                  itemToDeleteMany.length !== data.length ? "" : "bg-main-blue"
                } border-2 border-dark-grey`}
                onClick={() => {
                  setItemToDeleteMany(
                    itemToDeleteMany.length !== data.length ? allIds : []
                  );
                }}
              ></div>
            </div>
            <div className="text-start pe-3 flex justify-start items-center w-[7%] cursor-pointer">
              ID
            </div>{" "}
            <div className="text-start pe-3 flex justify-between items-center w-[70%]">
              Make
            </div>
            <div className="text-center pe-3 flex justify-start items-center w-[13%]">
              Actions{" "}
            </div>
          </div>
          {paginatedData.map((item: any, index: number) => (
            <div key={index} className="w-full">
              <div
                className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center ${
                  index % 2 !== 0 ? "bg-light-grey" : "bg-white"
                } border-b-2 border-grey`}
              >
                <div className="text-center w-[6%] flex justify-center items-center ">
                  <div
                    className={`w-[15px] h-[15px] rounded-[1px] ${
                      itemToDeleteMany?.includes(item?._id)
                        ? "bg-main-blue"
                        : ""
                    } border-2 border-dark-grey`}
                    onClick={() => {
                      handlePushItem(item?._id);
                    }}
                  ></div>
                </div>
                <h5 className="text-start pe-5 w-[7%]">
                  {JSON.stringify(
                    index + (page - 1) * itemsPerPage + 1
                  ).padStart(2, "0")}{" "}
                </h5>
                <h5 className="text-start pe-3 w-[70%]">{item?.make}</h5>
                <div
                  className="flex justify-start pe-3 gap-4 items-center w-[13%] h-full"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  <img
                    src={edit.src}
                    className="cursor-pointer"
                    onClick={() => {
                      setEditPopup(true);
                      setItemToEdit(item?._id);
                      setMake(item?.make);
                    }}
                  />

                  <img
                    src={deleteIcon.src}
                    className="cursor-pointer"
                    onClick={() => {
                      setPopup(true);
                      setItemToDelete(item?._id);
                    }}
                  />
                </div>
              </div>
              {popup ? (
                <div className="w-full h-full bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
                  <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10">
                    <div className="w-full h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
                      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                        Are you sure you want to delete this item
                      </label>
                    </div>
                    <div
                      className={`w-full flex justify-end gap-4 items-center pt-4`}
                    >
                      <button
                        className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
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
                <div className="w-full h-full bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
                  <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10">
                    <div className="w-full h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
                      <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                        Are you sure you want to delete this item
                      </label>
                    </div>
                    <div
                      className={`w-full flex justify-end gap-4 items-center pt-4`}
                    >
                      <button
                        className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
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
                <div className="w-full h-full bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-center sm:items-center z-[10] bg-red-40">
                  <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 relative">
                    <div
                      className={`w-[100%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1`}
                    >
                      <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                        {"Update Make"}
                        <FaAsterisk className="text-[6px] text-red-600" />
                      </label>
                      <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                        <input
                          required={true}
                          type={"text"}
                          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey truncate"
                          placeholder={`Enter Text Here`}
                          onChange={(e) => {
                            setMake(e.target.value);
                          }}
                          value={make}
                        />
                      </div>
                    </div>

                    <div
                      className={`w-full flex justify-end gap-4 items-center pt-4`}
                    >
                      <button
                        className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                        onClick={() => {
                          setEditPopup(false);
                          setMake("");
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
          ))}
        </div>
      </div>
      <div className="w-full h-[32px] mt-10 flex justify-between items-center">
        <div className="font-[400] text-[12px] sm:text-[14px] leading-[17px] text-[#878787]">
          Showing {(page - 1) * itemsPerPage + 1} -{" "}
          {Math.min(page * itemsPerPage, data.length)} of {data.length} data{" "}
        </div>
        <div className="font-[600] text-[10px] sm:text-[14px] leading-[17px]">
          <PaginationRounded />
        </div>
      </div>
    </div>
  );
}
