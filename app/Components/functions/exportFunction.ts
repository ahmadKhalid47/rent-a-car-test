import { setAlert } from "@/app/store/Global";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

// Wrap the export function in a hook to use `useDispatch`
export const useHandleExport = () => {
  const dispatch = useDispatch();

  const handleExport = useCallback(
    async (data: any) => {
      try {
        // Send a POST request with the data using Axios
        const response = await axios.post(
          "/api/exportData",
          { data },
          {
            responseType: "blob", // Important for handling binary data like Excel files
          }
        );

        // Create a URL for the file blob and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Dispatch success alert
        dispatch(setAlert("Data Exported Successfully"));
      } catch (error) {
        console.error("Failed to export data", error);

        // Dispatch failure alert
        dispatch(setAlert("Failed to Export Data"));
      }
    },
    [dispatch]
  );

  return handleExport;
};
