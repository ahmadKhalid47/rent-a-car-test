import demyIcon from "@/public/features (1).png";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { MediumLoader } from "@/app/Components/Loader";

export default function Additional() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  const categories = [
    "Basic Comfort Features",
    "Safety Features",
    "Convenience Features",
  ];
  let iconsDisplayArray: any = Configurations?.Configurations?.feature?.map(
    (item: any) => item
  );

  return (
    <div className="w-full h-fit dark:bg-dark1 mt-5 flex justify-between items-center">
      {Configurations?.Configurations?.feature ? (
        <div className="w-[100%] h-fit flex flex-col items-start gap-2">
          <span className="font-[600] text-[15px] xs:text-[24px] leading-[24px] pb-2 dark:text-white text-black ">
            Features{" "}
          </span>
          {Configurations?.Configurations?.feature && (
            <div className="w-[100%] h-[150px] flex justify-between">
              {categories.map((categoryItem) => (
                <div className="w-[33%] h-full bg-[#F7F7F7] border-[1px] border-grey rounded-[10px]">
                  {" "}
                  <span className="font-[600] text-[12px] xs:text-[14px] px-3 py-2 dark:text-white text-black flex flex-col justify-start items-start">
                    {categoryItem}
                  </span>
                  <div className="w-full flex justify-between items-center flex-wrap">
                    {vehicleInfo?.features?.map(
                      (item: any, index: any) =>
                        iconsDisplayArray[index].Box === categoryItem && (
                          <button
                            className={`w-[100%] sm:w-[48%] h-fit py-1 rounded-[10px] truncate px-3 font-[500] text-[13px] leading-[21px] text-center flex justify-start items-center gap-4`}
                            key={index}
                          >
                            {iconsDisplayArray.map(
                              (item2: any) =>
                                item2.Feature === item && (
                                  <img
                                    className={`w-[20px] h-[20px]`}
                                    src={item2.Icon ? item2.Icon : demyIcon.src}
                                    alt=""
                                  />
                                )
                            )}
                            <span className="w-[90%] truncate text-start">
                              {item}
                            </span>
                          </button>
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
