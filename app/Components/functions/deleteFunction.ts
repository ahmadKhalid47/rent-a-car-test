import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import { RootState } from "@/app/store";

export function useDeleteItem() {
  const dispatch = useDispatch();
  let global = useSelector((state: RootState) => state.Global);

  const deleteItem = async (
    _id: any,
    model: string,
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setPopup: React.Dispatch<React.SetStateAction<boolean>>,
    setItemToDelete: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      setDeleteLoading(true);
      await axios.delete(`/api/deleteSingleItem/${_id}`, {
        data: { model },
      });
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          `Selective ${
            model.charAt(0).toUpperCase() + model.slice(1)
          } Deleted Successfully`
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  };

  return deleteItem;
}
