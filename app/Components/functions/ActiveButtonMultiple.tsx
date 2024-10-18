import { RootState } from "@/app/store";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ActiveButtonMultiple({ itemToDeleteMany, model }: any) {
  const dispatch = useDispatch();
  const global = useSelector((state: RootState) => state.Global);

  async function UpdateActiveManyItem(active: boolean) {
    try {
      await axios.post(`/api/updateManyActiveConfiguration`, {
        _ids: itemToDeleteMany,
        active: active,
        model,
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          active
            ? "Selective Items Activated Successfully"
            : "Selective Items Deactivated Successfully"
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  return (
    <>
      <span className="ps-1"></span> |<span className="ps-1"></span>
      <span
        className={`${
          itemToDeleteMany?.length < 1 ? "" : "cursor-pointer hover:underline"
        }`}
        onClick={() => {
          UpdateActiveManyItem(true);
        }}
      >
        Active
      </span>
      <span className="px-1">/</span>
      <span
        className={`${
          itemToDeleteMany?.length < 1 ? "" : "cursor-pointer hover:underline"
        }`}
        onClick={() => {
          UpdateActiveManyItem(false);
        }}
      >
        Inactive Multiple
      </span>
    </>
  );
}
