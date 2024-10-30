import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

type InfoComponentProps = {
  infoKey: "chauffeurInfo" | "CustomerInfo";
};
export const AdditionalCustomers: React.FC<InfoComponentProps> = ({ infoKey }) => {
  const info = useSelector((state: RootState) => state[infoKey][infoKey]);

  return (
    <div className="w-[100%] h-full overflow-auto py-4 px-5 scroll2">
      <div className="w-[100%] h-fit font-[400] text-[14px] text-justify">
        {info?.additional
          ? info?.additional
          : "No Additional Note Added"}
      </div>
    </div>
  );
};
