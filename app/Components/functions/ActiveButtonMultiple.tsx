import { RootState } from "@/app/store";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ActiveButtonMultiple({ itemToDeleteMany, model }: any) {
  console.log(itemToDeleteMany, model);
  const dispatch = useDispatch();
  const global = useSelector((state: RootState) => state.Global);

  async function UpdateActiveManyItem(active: boolean) {
    try {
      let result: any = await axios.post(`/api/updateManyActiveConfiguration`, {
        _ids: itemToDeleteMany,
        active: active,
        model,
      });
      console.log(result);
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
