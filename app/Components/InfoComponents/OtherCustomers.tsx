import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState } from "react";

type InfoComponentProps = {
  infoKey: "chauffeurInfo" | "CustomerInfo";
};

export const OtherCustomers: React.FC<InfoComponentProps> = ({ infoKey }) => {
  const info = useSelector((state: RootState) => state[infoKey][infoKey]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateImage = (direction: "left" | "right") => {
    setCurrentIndex((prev) => {
      if (direction === "left") {
        return (prev - 1 + info.otherImages?.length) % info.otherImages?.length;
      }
      return (prev + 1) % info.otherImages?.length;
    });
  };

  return (
    <div className="w-full h-full py-3 px-5 flex flex-col items-start gap-1 overflow-auto">
      {info?.otherNumber &&
      info?.otherValid &&
      info?.otherImages?.length &&
      info?.otherCountry ? (
        <>
          <div className="w-full dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
            <div className="w-fit flex flex-col">
              <span className="text-[#555555]">Number</span>
              <span>{info.otherNumber}</span>
            </div>
            <div className="w-fit flex flex-col">
              <span className="text-[#555555]">Valid Until</span>
              <span>{info.otherValid}</span>
            </div>
            <div className="w-fit flex flex-col">
              <span className="text-[#555555]">Issuing Country/State</span>
              <span>{info.otherCountry}</span>
            </div>
          </div>
          <div className="w-full h-fit dark:text-white text-black text-[14px] font-[400] flex justify-between items-center mt-2">
            <div className="relative w-full h-[157px] flex justify-center items-center">
              <img
                src={info.otherImages[currentIndex]}
                className="w-[250px] h-[157px] rounded-[10px]"
                alt="Customer"
                onError={(e) => (e.currentTarget.src = "fallback-image-url")}
              />
              {info.otherImages?.length > 1 && (
                <>
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
                    onClick={() => navigateImage("left")}
                    aria-label="Previous Image"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
                    onClick={() => navigateImage("right")}
                    aria-label="Next Image"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        "No other details are entered."
      )}
    </div>
  );
};
