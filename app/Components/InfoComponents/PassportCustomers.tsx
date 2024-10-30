import { FaChevronRight, FaChevronLeft, FaEye, FaTimes } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import image404 from "@/public/image404.png";

type InfoComponentProps = {
  infoKey: "chauffeurInfo" | "CustomerInfo";
};
export const PassportCustomers: React.FC<InfoComponentProps> = ({ infoKey }) => {
  const info = useSelector((state: RootState) => state[infoKey][infoKey]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full h-full py-3 px-5 flex justify-start flex-col items-start gap-1 overflow-auto">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">
            {info?.idCard ? "ID Card" : "Passport"} Number{" "}
          </span>
          <span className="w-full">{info?.passportNumber}</span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Valid Until </span>
          <span className="w-full">{info?.passportValid}</span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Issuing Country/State</span>
          <span className="w-full">{info?.passportCountry}</span>
        </div>
      </div>
      <div className="w-[100%] h-fit dark:text-white text-black text-[14px] font-[400] flex justify-between items-center mt-1">
        <div className="relative w-full h-[157px] flex justify-center items-center">
          {info?.passportImages?.length && (
            <img
              src={info?.passportImages[currentIndex]}
              className="w-[250px] h-[157px] rounded-[10px]"
            />
          )}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
            onClick={() => {
              setCurrentIndex(
                (prev) =>
                  (prev - 1 + info?.passportImages?.length) %
                  info?.passportImages?.length
              );
            }}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
            onClick={() => {
              setCurrentIndex(
                (prev) => (prev + 1) % info?.passportImages?.length
              );
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
