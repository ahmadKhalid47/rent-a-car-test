import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function AdditionalCustomers() {
  let { CustomerInfo } = useSelector(
    (state: RootState) => state.CustomerInfo
  );

  return (
    <div className="w-[100%] h-full overflow-auto py-4 px-5 scroll2">
      <div className="w-[100%] h-fit font-[400] text-[14px] text-justify">
        {CustomerInfo?.additional
          ? CustomerInfo?.additional
          : "No Additional Note Added"}
      </div>
    </div>
  );
}
