import { RootState } from "@/app/store";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ActiveButton({ active, _id, model, admin }: any) {
  console.log(admin);
  const dispatch = useDispatch();
  const global = useSelector((state: RootState) => state.Global);

  async function updateActive(_id: any, active: boolean) {
    try {
      let result: any = await axios.post(`/api/configurationActive/${_id}`, {
        active: !active,
        model,
      });
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          !active
            ? "Selective Item Activated Successfully"
            : "Selective Item Deactivated Successfully"
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  return (
    <img
      src={active ? check.src : unCheck.src}
      title={active ? "Inactive" : "Active"}
      className={`me-[8px] translate-y-[1px] hover:scale-[1.3] cursor-pointer ${
        admin ? "hover:scale-[1.3] cursor-pointer" : "grayscale opacity-50"
      }`}
      onClick={() => {
        if (admin) {
          updateActive(_id, active);
        }
      }}
    />
  );
}
