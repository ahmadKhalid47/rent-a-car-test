import { useDispatch, useSelector } from "react-redux";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import axios from "axios";

// get Data and set in State
export function useFetchData({
  modelName,
  createdBy,
  setData,
  setFilteredData,
  setLoading,
  apiName,
  sortField,
}: any) {
  let global = useSelector((state: RootState) => state.Global);
  
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await axios.post(`/api/${apiName}`, {
          createdBy,
          modelName,
          sortField,
        });
        if (result?.data?.data) {
          setData(result.data.data);
          if (setFilteredData) {
            setFilteredData(result.data.data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (createdBy) getData();
  }, [
    createdBy,
    modelName,
    setData,
    setFilteredData,
    setLoading,
    global.vehicleDataReloader,
  ]);
}

// multiple active / inactive api calling

export const useUpdateActiveManyItem = () => {
  const dispatch = useDispatch();
  const updateActiveManyItem = async ({
    active,
    itemToDeleteMany,
    model,
    setDeleteLoading,
    setPopup,
    setItemToDelete,
  }: any) => {
    try {
      setDeleteLoading(true);
      await axios.post(`/api/updateMultipleActive`, {
        _ids: itemToDeleteMany,
        active: active,
        model: model,
      });
      dispatch(setVehicleDataReloader((prev: any) => prev + 1));
      dispatch(
        setAlert(
          active
            ? `Selective ${
                model.charAt(0).toUpperCase() + model.slice(1)
              }s Activated Successfully`
            : `Selective ${
                model.charAt(0).toUpperCase() + model.slice(1)
              }s Deactivated Successfully`
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  };

  return { updateActiveManyItem };
};

// single active / inactive api calling

const useUpdateActive = () => {
  const dispatch = useDispatch();

  const updateActive = async ({ _id, active, model }: any) => {
    try {
      await axios.post(`/api/updateSingleActive/${_id}`, {
        active: active,
        model: model,
      });

      dispatch(setVehicleDataReloader((prev: any) => prev + 1));
      dispatch(
        setAlert(
          active
            ? `Selective ${
                model.charAt(0).toUpperCase() + model.slice(1)
              } Activated Successfully`
            : `Selective ${
                model.charAt(0).toUpperCase() + model.slice(1)
              } Deactivated Successfully`
        )
      );
    } catch (err) {
      console.error(err);
      dispatch(setAlert("An error occurred while updating the item."));
    }
  };

  return { updateActive };
};

export default useUpdateActive;
