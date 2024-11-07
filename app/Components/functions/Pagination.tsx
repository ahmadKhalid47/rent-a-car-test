import { Pagination, Stack } from "@mui/material";




import React from "react";

export const PaginationComponent = ({
  page,
  itemsPerPage,
  data,
  paginatedData,
  totalPages,
  handleChange,
}: any) => {
  return (
    <div className="w-full h-[32px] mt-10 flex justify-between items-center">
      <div className="font-[400] text-[12px] sm:text-[14px] leading-[17px] text-[#878787]">
        Showing {paginatedData?.length ? (page - 1) * itemsPerPage + 1 : 0} -{" "}
        {Math.min(page * itemsPerPage, data?.length)} of {data?.length} data
      </div>
      <div className="font-[600] text-[10px] sm:text-[14px] leading-[17px]">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            shape="rounded"
            page={page}
            onChange={handleChange}
            sx={{
              "& .MuiPaginationItem-root": {
                "&.Mui-selected": {
                  backgroundColor: "#054B86",
                  color: "white",
                  "&:hover": {
                    opacity: 0.9,
                  },
                },
              },
              "& .MuiPaginationItem-previousNext": {
                color: "#878787",
                "&:hover": {
                  opacity: 0.9,
                },
              },
            }}
          />
        </Stack>{" "}
      </div>
    </div>
  );
};

