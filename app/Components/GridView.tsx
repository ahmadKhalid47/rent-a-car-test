import car2 from "@/public/car (2).svg";
import Link from "next/link";
import { FaEllipsis, FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Popover, Button } from "antd";
import check from "@/public/check.svg";
import { useRouter } from "next/navigation";

interface dataType {
  data: Array<Object>;
}

export default function GridView({ data }: dataType) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice the data for the current page
  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const router = useRouter();

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

  return (
    <div className="w-full h-fit mt-4">
      <h3 className="w-full flex justify-end items-center font-[400] text-[14px] sm:text-[18px] leading-[21px] text-grey">
        <span className="underline cursor-pointer">Export</span>
      </h3>
      <div className="w-full h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] px-1 xs:px-3 md:px-11 pb-3 md:pb-12 pt-0 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-2">
        {paginatedData.map((item: any, index: number) => (
          <Link
            key={index} // Added unique key prop
            href={`/Components/CarInfo/${item?._id}`}
            className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
          >
            <div
              className="absolute top-5 right-5 hover:cursor-pointer bg w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-gray-200"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <FaEllipsisVertical
                onClick={() => {
                  toggleDropdown(item?._id);
                }}
              />
              <div className="relative">
                {isOpen === item._id && (
                  <div className="z-10 bg-light-grey rounded-lg shadow absolute top-4 overflow-hidden right-0 text-md text-black flex flex-col justify-start items-start">
                    <button
                      className="px-4 py-2 hover:bg-gray-200 w-full text-start"
                      onClick={() => {
                        router.push(`/Components/${item?._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button className="px-4 py-2 hover:bg-gray-200 w-full text-start">
                      Delete
                    </button>
                    <button className="px-4 py-2 hover:bg-gray-200 w-full text-start">
                      Active
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
              {item?.data?.carImages ? (
                <img src={item?.data?.carImages[0]} className="w-full h-full" />
              ) : null}
            </div>
            <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
              <div className="w-full flex justify-start items-center pe-5 -mb-1">
                <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  {item?.data?.make} {item?.data?.model}
                </p>
              </div>
              <div className="w-full flex justify-start items-center">
                <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                  {item?.data?.registration}
                </p>
              </div>
              <div className="w-full flex justify-start 1400:justify-between items-center">
                <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                    Year:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                    {item?.data?.year}
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    Type:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    {item?.data?.type}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-start 1400:justify-between items-center">
                <div className="flex justify-start items-center gap-2 w-[40%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                    Color:
                  </p>
                  <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                    <div
                      className="w-[23px] h-[12px] rounded-full"
                      style={{
                        backgroundColor: item?.data?.color,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    City:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    {item?.data?.city}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full h-[32px] mt-5 md:mt-10 flex justify-between items-center">
        <div className="font-[400] text-[10px] sm:text-[14px] leading-[17px] text-[#878787]">
          Showing {(page - 1) * itemsPerPage + 1} -{" "}
          {Math.min(page * itemsPerPage, data.length)} of {data.length} data
        </div>
        <PaginationRounded />
      </div>
    </div>
  );
}
