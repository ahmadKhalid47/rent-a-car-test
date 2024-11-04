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

// Key Name Changer

export function renameKeys(array: any, keyMap: any) {
  return array.map((item: any) => {
    // Create a shallow copy of the item
    const newItem: any = { ...item };

    // Rename keys in 'data' object
    newItem.data = Object.keys(newItem.data).reduce((acc: any, key: any) => {
      const newKey: any = keyMap[key] || key; // Use mapped key if exists, else keep original
      acc[newKey] = newItem.data[key];
      return acc;
    }, {});

    return newItem;
  });
}

export function renameKeys2(array: any, keyMap: any) {
  return array.map((item: any) => {
    // Create a shallow copy of the item
    let newItem: any = { ...item };

    // Rename keys in 'data' object
    newItem = Object.keys(newItem).reduce((acc: any, key: any) => {
      const newKey: any = keyMap[key] || key; // Use mapped key if exists, else keep original
      acc[newKey] = newItem[key];
      return acc;
    }, {});

    return newItem;
  });
}
