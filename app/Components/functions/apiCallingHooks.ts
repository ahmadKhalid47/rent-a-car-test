// get Data and set in State

import { useEffect } from "react";
import axios from "axios";

export function useFetchData({
  modelName,
  createdBy,
  setData,
  setFilteredData,
  setLoading,
}: any) {
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await axios.post("/api/getSortedLeanData", {
          createdBy,
          modelName,
        });

        if (result?.data?.data) {
          setData(result.data.data);
          if (setFilteredData) {
            setFilteredData(result.data.data); // Only set filtered data if the function is provided
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (createdBy) getData();
  }, [createdBy, modelName, setData, setFilteredData, setLoading]);
}
