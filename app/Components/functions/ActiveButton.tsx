import { RootState } from "@/app/store";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import check from "@/public/check.svg";
import unCheck from "@/public/uncheck.svg";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ActiveButton({ active, _id, model, admin }: any) {
  const dispatch = useDispatch();
  const global = useSelector((state: RootState) => state.Global);

  async function updateActive(_id: any, active: boolean) {
    try {
      await axios.post(`/api/configurationActive/${_id}`, {
        active: !active,
        model,
      });
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          !active
            ? `Selective ${model==="Type"?"Body Type":model} Activated Successfully`
            : `Selective ${model==="Type"?"Body Type":model} Deactivated Successfully`
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  return (
    <Image
      alt=""
      width={16}
      height={16}
      priority={true}
      src={active ? check.src : unCheck.src}
      title={active ? "Inactive" : "Active"}
      className={`translate-y-[1px] ${
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
