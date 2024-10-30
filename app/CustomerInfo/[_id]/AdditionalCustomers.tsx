import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function AdditionalChauffeurs() {
  let { chauffeurInfo } = useSelector(
    (state: RootState) => state.chauffeurInfo
  );

  return (
    <div className="w-[100%] h-full overflow-auto py-4 px-5 scroll2">
      <div className="w-[100%] h-fit font-[400] text-[14px] leading-[27px] text-justify">
        {chauffeurInfo?.additional
          ? chauffeurInfo?.additional
          : "No Additional Note Added"}
      </div>
    </div>
  );
}
