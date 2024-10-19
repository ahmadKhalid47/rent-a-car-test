import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setAlert, setVehicleDataReloader } from "../store/Global";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
// import { SmallLoader } from "../Loader";
// import { useHandleExport } from "../functions/exportFunction";
import { SmallLoader } from "../Components/Loader";
import { useHandleExport } from "../Components/functions/exportFunction";
import image404 from "@/public/image404.png";
import { PaginationComponent } from "../Components/functions/Pagination";

interface dataType {
  data: Array<Object>;
}

export default function GridView({ data }: dataType) {
  let global = useSelector((state: RootState) => state.Global);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [popup, setPopup] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleExport = useHandleExport(); // Use the hook to get the handleExport function

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };
  const dispatch = useDispatch();

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice the data for the current page
  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const router = useRouter();

  const content = (
    <div className="flex flex-col justify-start items-start">
      Delete Edit Active
    </div>
  );

  const [isOpen, setIsOpen] = useState("");

  const toggleDropdown = (e: any) => {
    if (isOpen === e) {
      setIsOpen("");
    } else {
      setIsOpen(e);
    }
  };
  async function deleteItem(_id: any) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.delete(`/api/deleteVehicle/${_id}`);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Selective Vehicle Deleted Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }
  async function updateActive(_id: any, active: boolean) {
    try {
      // setEditLoading(true);
      let result: any = await axios.post(`/api/updateActive/${_id}`, {
        active: !active,
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
    } finally {
      // setEditLoading(false);
    }
  }
  return (
    <div className="w-full h-fit mt-4">
      <h3
        className={`h-[24px] w-fit flex justify-between items-end font-[400] mt-[-24px] text-[14px] sm:text-[18px] leading-[18px] text-transparent `}
      >
        Delete Multiple
      </h3>

      <div className="w-full h-fit flex justify-start flex-wrap items-start rounded-[10px] bg-light-gre pb-4 px-3 border-2 border-grey dark:bg-dark2 bg-light-grey">
        {paginatedData.map((item: any, index: number) => (
          <div className="lg:w-[33.33%] 3xl:w-[25%] bg-green-5 h-fit flex justify-center items-start mt-4">
            <div
              key={index}
              className="w-[100%] lg:w-[340px] 2xl:w-[90%] h-[375px] dark:bg-dark1 bg-white shadow p-3 flex flex-col justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
            >
              <div className="w-[100%] h-fit flex justify-between items-center">
                <div className="w-full h-fit flex justify-between items-start py-1 border-color">
                  <span className="w-full dark:text-white text-black mt-[3px] flex flex-col justify-center items-start">
                    <span className="w-full font-[600] text-[20px] leading-none">
                      {item?.data?.make} {item?.data?.model}
                    </span>
                    <span className="text-[10px] w-full font-[400] truncate">
                      {item?.data?.type}
                    </span>
                  </span>
                  <div className="flex flex-col justify-start items-start w-[111px] h-fit">
                    <div className="flex justify-start items-center w-[111px] h-[24px] bg-[#F6F6F6] border-[1px] border-black rounded-[3px] overflow-hidden">
                      <div className="w-[33px] h-[24px] bg-[#054B86]"></div>
                      <span className="font-[600] flex justify-center items-center text-[12px] text-black w-[100%]">
                        <span className="w-[80px] truncate">
                          {item?.data?.registration}
                        </span>
                      </span>
                    </div>
                    <div className="w-full font-[400] text-[10px] truncate leading-none h-fit py-1">
                      VIN: {item?.data?.vinNo}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] h-[173px] flex justify-center items-center gap-1">
                {item?.data?.carImages ? (
                  <img
                    src={
                      item?.data?.carImages[item?.data?.thumbnailImage] ||
                      image404.src
                    }
                    className="h-full"
                  />
                ) : null}
              </div>
              <div className="w-[100%] h-fit flex flex-col justify-between items-start gap-1 ">
                <span className="complete-status border-[1px] px-3 rounded-[5px] h-[22px] flex justify-center items-center text-[12px] mb-1">
                  Available
                </span>
                <div className="w-[100%] h-fit flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2 w-fit ">
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      Color:
                    </span>
                    <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px] h-[18px] flex justify-center items-center w-fit">
                      <div
                        className="w-[23px] h-[12px] rounded-full"
                        style={{
                          backgroundColor: item?.data?.color,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 w-fit ">
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      Year:
                    </span>
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      {item?.data?.year}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-2 w-fit ">
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      City:
                    </span>
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      {item?.data?.city}
                    </span>
                  </div>
                </div>
                <div className="w-[100%] h-[44px] flex justify-between items-center">
                  <Link
                    href={`/VehicleInfo/${item?._id}`}
                    className="bg-main-blue rounded-[5px] w-[84%] h-full flex justify-center items-center text-[18px] font-[500] text-white hover:opacity-[0.9]"
                  >
                    View More
                  </Link>
                  <div className="bg-white border-[1px] border-grey rounded-[5px] w-[15%] h-full flex justify-center items-center">
                    <div
                      className="hover:cursor-pointer bg w-full h-full flex justify-center items-center rounded-[5px]"
                      onClick={() => {
                        toggleDropdown(item?._id);
                      }}
                    >
                      <div className="w-full h-full bg-hover-light-grey flex justify-center items-center rounded-[5px]">
                        <FaEllipsisVertical />
                      </div>
                      <div className="relative">
                        {isOpen === item._id && (
                          <div className="w-[130px] z-10 dark:bg-dark2 bg-light-grey rounded-lg shadow absolute bottom-4 overflow-hidden -right-5 text-md dark:text-white text-black flex flex-col justify-start items-center py-3">
                            <button
                              className="px-4 py-2 dark:hover:bg-slate-500 hover:bg-gray-200 w-[85%] rounded-[5px] text-start"
                              onClick={() => {
                                router.push(`/AddVehicle/${item?._id}`);
                              }}
                            >
                              Edit
                            </button>
                            <div className="mx-auto mt-1 mb-1 w-[100%] h-[0px] border-t-[1px border-[#d9d9d9]"></div>
                            <button
                              className="px-4 py-2 dark:hover:bg-slate-500 hover:bg-gray-200 w-[85%] rounded-[5px] text-start"
                              onClick={() => {
                                setPopup(true);
                                setItemToDelete(item?._id);
                              }}
                            >
                              Delete
                            </button>
                            <div className="mx-auto mt-1 mb-1 w-[100%] h-[0px] border-t-[1px border-[#d9d9d9]"></div>
                            <button
                              className="px-4 py-2 dark:hover:bg-slate-500 hover:bg-gray-200 w-[85%] rounded-[5px] text-start"
                              onClick={() => {
                                updateActive(item?._id, item?.active);
                              }}
                            >
                              {item.active ? "Inactive" : "Active"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {popup ? (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 modal-position fixed modal-position">
            <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Are you sure you want to delete this item ?
              </label>
            </div>
            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
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

      <div className="w-full h-[32px] mt-5 md:mt-10 flex justify-between items-center">
        <div className="font-[400] text-[10px] sm:text-[14px] leading-[17px] text-[#878787]">
          Showing {paginatedData.length ? (page - 1) * itemsPerPage + 1 : 0} -{" "}
          {Math.min(page * itemsPerPage, data.length)} of {data.length} data
        </div>
        <PaginationComponent
          totalPages={totalPages}
          page={page}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
