import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import arrows from "@/public/arrows.svg";
import edit from "@/public/Layer_1 (2).svg";
import deleteIcon from "@/public/Group 9.svg";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import axios from "axios";
import { SmallLoader } from "../Components/Loader";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { setAlert, setVehicleDataReloader } from "../store/Global";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { handleExport } from "../Components/functions/exportFunction";

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
  const [itemToActiveMany, setItemToActiveMany] = useState<any>([]);
  const dispatch = useDispatch();
  const router = useRouter();

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

  // Slice the data for the current page
  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // General sorting function
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
            "& .MuiPaginationItem-previousNext": {
              color: "#878787",
              "&:hover": {
                opacity: 0.8,
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
      let result: any = await axios.delete(`/api/deleteVehicle/${_id}`);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Item Deleted"));
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
      let result: any = await axios.post(`/api/deleteManyVehicle`, {
        _ids: itemToDeleteMany,
      });
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Items Deleted"));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
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

  async function updateActive(_id: any, active: boolean) {
    try {
      setEditLoading(true);
      let result: any = await axios.post(`/api/updateActive/${_id}`, {
        active: !active,
      });
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert(!active ? "Item Activated" : "Item Deactivated"));
    } catch (err) {
      console.log(err);
    } finally {
      setEditLoading(false);
    }
  }
  async function UpdateActiveManyItem(active: boolean) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.post(`/api/updateManyActive`, {
        _ids: itemToDeleteMany,
        active: active,
      });
      console.log(result);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert(active ? "Items Activated" : "Items Deactivated"));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }
  console.log(paginatedData);

  return (
    <div className="w-full h-fit mt-4">
      <h3
        className={`w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] ${
          itemToDeleteMany.length < 1
            ? "text-grey"
            : " dark:text-white text-main-blue"
        }  `}
      >
        <span>
          <span>
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
        <span
          className="underline cursor-pointer dark:text-white text-main-blue hover:no-underline"
          onClick={() => {
            handleExport(data?.map((item: any) => item.data));
          }}
        >
          Export
        </span>
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2 relative">
        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden mt-0 leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
            <div className="text-center w-[3%] flex justify-center items-center ">
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

            <div
              className="text-start w-[4%]"
              // onClick={() => sort("vehicleId")}
            >
              ID
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[20%] cursor-pointer"
              onClick={() => sort("make")}
            >
              Car Name <img src={arrows.src} />
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[13%] cursor-pointer"
              onClick={() => sort("registration")}
            >
              Registration No <img src={arrows.src} />
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[11%] cursor-pointer"
              onClick={() => sort("year")}
            >
              Making Year <img src={arrows.src} />
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[9%] cursor-pointer"
              onClick={() => sort("type")}
            >
              Type <img src={arrows.src} />
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[9%] cursor-pointer"
              onClick={() => sort("color")}
            >
              Color <img src={arrows.src} />
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[12%] cursor-pointer"
              onClick={() => sort("city")}
            >
              City <img src={arrows.src} />
            </div>
            <div className="text-start pe-3 flex justify-between items-center w-[8%]">
              Actions{" "}
            </div>
          </div>
          {paginatedData.length < 1 ? (
            <span className="p-3">
              No Vehicles found. Please add a Vehicle.
            </span>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <div key={index} className="w-full">
                <Link
                  href={`/VehicleInfo/${item?._id}`}
                  className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center ${
                    index % 2 !== 0
                      ? "dark:bg-dark2 bg-light-grey"
                      : "dark:bg-dark1 bg-white"
                  } border-b-2 border-grey`}
                >
                  <div className="text-center w-[3%] flex justify-center items-center ">
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
                  <h5 className="text-start w-[4%]">
                    {JSON.stringify(
                      index + (page - 1) * itemsPerPage + 1
                    ).padStart(2, "0")}
                  </h5>
                  <h5 className="text-start pe-3 w-[20%]">
                    {item?.data?.make} {item?.data?.model}
                  </h5>
                  <h5 className="text-start pe-3 w-[13%]">
                    {item?.data?.registration}
                  </h5>
                  <h5 className="text-start pe-3 w-[11%]">
                    {item?.data?.year}
                  </h5>
                  <h5 className="text-start pe-3 w-[9%]">{item?.data?.type}</h5>
                  <h5 className="text-start pe-3 w-[9%]">
                    <div
                      className={`w-[23px] h-[12px] rounded-full`}
                      style={{
                        backgroundColor: item?.data?.color,
                      }}
                    ></div>
                  </h5>
                  <h5 className="text-start pe-3 w-[12%]">
                    {item?.data?.city}
                  </h5>
                  <div
                    className="flex justify-start gap items-center w-[8%] h-full"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <img
                      src={item.active ? check.src : unCheck.src}
                      title={item.active ? "Inactive" : "Active"}
                      className="me-[8px] translate-y-[1px] hover:scale-[1.3]"
                      onClick={() => {
                        updateActive(item?._id, item?.active);
                      }}
                    />
                    <img
                      src={edit.src}
                      title="Edit"
                      className="me-[5.8px] hover:scale-[1.3] cursor-pointer dark:filter dark:brightness-[0] dark:invert"
                      onClick={() => {
                        router.push(`/AddVehicle/${item?._id}`);
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
                  <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
                    <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 fixed modal-position">
                      <div className="w-full h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
                        <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                          Are you sure you want to delete this item
                        </label>
                      </div>
                      <div
                        className={`w-full flex justify-end gap-4 items-center pt-4`}
                      >
                        <button
                          className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey dark:text-white text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
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
                    <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10">
                      <div className="w-full h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
                        <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                          Are you sure you want to delete these items
                        </label>
                      </div>
                      <div
                        className={`w-full flex justify-end gap-4 items-center pt-4`}
                      >
                        <button
                          className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey dark:text-white text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
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
              </div>
            ))
          )}
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
