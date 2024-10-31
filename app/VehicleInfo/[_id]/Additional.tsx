import demyIcon from "@/public/features (1).png";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { MediumLoader } from "@/app/Components/Loader";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Additional() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  const [open, setOpen] = useState<any>(true);
  const categories = [
    "Basic Comfort Features",
    "Safety Features",
    "Convenience Features",
  ];
  let configArray: any = Configurations?.Configurations?.feature;

  console.log(configArray);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    const result = configArray?.filter((item: any) =>
      vehicleInfo?.features.includes(item.Feature)
    );
    setFilteredData(result);
  }, [configArray]);
  console.log(filteredData);

  return (
    <div
      className={`w-full g-yellow-300 dark:bg-dark1 mt-5 flex justify-between items-start ${
        open ? "min-h-[200px] max-h-fit" : "h-[50px]"
      }`}
    >
      {Configurations?.Configurations?.feature ? (
        <div className="w-[100%] g-blue-500 min-h-[200px] max-h-fit flex flex-col items-start gap-2">
          <div className="w-full h-[50px] g-pink-400 flex justify-between items-center font-[600] text-[15px] xs:text-[24px] leading-[0px dark:text-white text-black">
            Features{" "}
            <FaChevronDown
              className={`w-4 h-4 transition-transform cursor-pointer ${
                open ? "rotate-180" : "rotate-0"
              }`}
              onClick={() => setOpen(!open)}
            />
          </div>
          {open && (
            <div className="w-[100%] min-h-[150px] max-h-fit g-orange-500 flex justify-between">
              {categories.map((categoryItem) => (
                <div className="w-[33%] min-h-fit max-h-full bg-[#F7F7F7] border-[1px] border-grey rounded-[10px] pb-2">
                  <span className="font-[600] text-[12px] xs:text-[14px] px-3 py-2 dark:text-white text-black flex flex-col justify-start items-start">
                    {categoryItem}
                  </span>
                  <div className="w-full flex justify-between items-center flex-wrap g-yellow-400">
                    {filteredData?.map(
                      (item: any, index: any) =>
                        item?.Box === categoryItem && (
                          <div
                            className={`w-[100%] sm:w-[48%] h-fit py-[7px] rounded-[10px] truncate px-3 font-[500] text-[13px] leading-[21px] text-center flex justify-start items-center gap-4`}
                            key={index}
                          >
                            <img
                              className={`w-[20px] h-[20px]`}
                              src={item.Icon ? item.Icon : demyIcon.src}
                              alt=""
                            />
                            <span className="w-[90%] truncate text-start">
                              {item?.Feature}
                            </span>
                          </div>
                        )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <MediumLoader />
      )}
    </div>
  );
}
