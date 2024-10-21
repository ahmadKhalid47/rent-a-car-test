import { Pagination, Stack } from "@mui/material";

interface dataType {
  totalPages: any;
  page: any;
  handleChange: any;
}

export function PaginationComponent({
  totalPages,
  page,
  handleChange,
}: dataType) {
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
              backgroundColor: "#054B86",
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
