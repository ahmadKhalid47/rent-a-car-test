import { resetting } from "@/app/store/Vehicle";
import { useDispatch } from "react-redux";

export function useReset() {
  const dispatch = useDispatch();

  const deleteItem = async (resetArray: any) => {
    dispatch(resetting(resetArray));
  };

  return deleteItem;
}
