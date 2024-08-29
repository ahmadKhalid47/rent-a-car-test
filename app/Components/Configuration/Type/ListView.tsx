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
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setSortedData(data);
  }, [data]);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
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
          }}
        />
      </Stack>
    );
  }
  async function deleteItem(_id: any) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.delete(`/api/deleteVehicle/${_id}`);
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
  console.log(paginatedData);
  console.log(data);
  return (
    <div className="w-full h-fit mt-4">
      <h3 className="w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] text-grey  ">
        <span>
          <span className="cursor-pointer">Delete Multiple</span>
        </span>
        <span className="underline cursor-pointer">Export</span>
      </h3>
      <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2 bg-red-300 relative">
        <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start bg-light-grey overflow-hidden mt-0 leading-[17px]">
          <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
            <div className="text-center w-[6%] flex justify-center items-center ">
              <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
            </div>
            <div
              className="text-start pe-5 flex justify-between items-center w-[7%] ps-7 cursor-pointer"
              onClick={() => sort("vehicleId")}
            >
              #
            </div>
            <div
              className="text-start pe-3 flex justify-between items-center w-[70%] cursor-pointer"
              onClick={() => sort("make")}
            >
              Type
            </div>
            <div className="text-center pe-3 flex justify-start items-center w-[13%]">
              Actions{" "}
            </div>
          </div>
          {paginatedData.map((item: any, index: number) => (
            <div key={index} className="w-full">
              <Link
                href={`/Components/CarInfo/${item?._id}`}
                className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] leading-[17px text-center ${
                  index % 2 !== 0 ? "bg-light-grey" : "bg-white"
                } border-b-2 border-grey`}
              >
                <div className="text-center w-[6%] flex justify-center items-center ">
                  <div className="w-[15px] h-[15px] rounded-[1px] bg-light-grey border-2 border-dark-grey"></div>
                </div>
                <h5 className="text-center pe-5 w-[7%] ps-[10px">
                  {item?.data?.vehicleId.padStart(2, "0")}
                </h5>
                <h5 className="text-start pe-3 w-[70%]">{item?.data?.type}</h5>
                <div
                  className="flex justify-start pe-3 gap-4 items-center w-[13%] h-full"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  <img
                    src={edit.src}
                    className=""
                    onClick={() => {
                      router.push(`/Components/${item?._id}`);
                    }}
                  />

                  <img
                    src={deleteIcon.src}
                    onClick={() => {
                      setPopup(true);
                      setItemToDelete(item?._id);
                    }}
                  />
                </div>
              </Link>
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
