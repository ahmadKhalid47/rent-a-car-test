import { FaChevronRight, FaChevronLeft, FaEye, FaTimes } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import image404 from "@/public/image404.png";

type InfoComponentProps = {
  infoKey: "chauffeurInfo" | "CustomerInfo";
};
export const LicenseCustomers: React.FC<InfoComponentProps> = ({ infoKey }) => {
  const info = useSelector((state: RootState) => state[infoKey][infoKey]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full h-full py-3 px-5 flex justify-start flex-col items-start gap-1 overflow-auto">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">License Number </span>
          <span className="w-full">{info?.licenseNumber}</span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Valid Until </span>
          <span className="w-full">{info?.licenseValid}</span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Issuing Country/State</span>
          <span className="w-full">{info?.licenseCountry}</span>
        </div>
      </div>
      <div className="w-[100%] h-fit dark:text-white text-black text-[14px] font-[400] flex justify-between items-center mt-2">
        {info?.licenseImages?.length>0 && (
          <div className="relative w-full h-[157px] flex justify-center items-center">
            <img
              src={info?.licenseImages[currentIndex]}
              className="w-[250px] h-[157px] rounded-[10px]"
            />
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
              onClick={() => {
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + info?.licenseImages?.length) %
                    info?.licenseImages?.length
                );
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
              onClick={() => {
                setCurrentIndex(
                  (prev) => (prev + 1) % info?.licenseImages?.length
                );
              }}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
