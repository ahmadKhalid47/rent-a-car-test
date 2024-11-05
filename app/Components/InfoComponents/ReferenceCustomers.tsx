import { FaChevronRight, FaChevronLeft, FaEye, FaTimes } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState } from "react";

type InfoComponentProps = {
  infoKey: "chauffeurInfo" | "CustomerInfo";
};
export const ReferenceCustomers: React.FC<InfoComponentProps> = ({
  infoKey,
}) => {
  const info = useSelector((state: RootState) => state[infoKey][infoKey]);
  const [refIndex, setRefIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full h-full py-3 px-5 flex justify-start flex-col items-start gap-1 overflow-auto">
      <div className="w-[100%] dark:text-white text-black text-[14px] font-[400] flex justify-between items-center">
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Name</span>
          <span className="w-full">{info?.reference[refIndex]?.refName}</span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Address</span>
          <span className="w-full">{info?.reference[refIndex]?.refAddress}</span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Phone </span>
          <span className="w-full">{info?.reference[refIndex]?.refPhone}</span>
        </div>
        <div className="w-fit flex flex-col justify-start item-start">
          <span className="w-full text-[#555555]">Relation</span>
          <span className="w-full">{info?.reference[refIndex]?.refRelation}</span>
        </div>
      </div>
      <div className="w-[100%] h-fit dark:text-white text-black text-[14px] font-[400] flex justify-between items-center mt-2">
        <div className="relative w-full h-[157px] flex justify-center items-center">
          {info?.reference[refIndex]?.refImages?.length && (
            <img
              src={info?.reference[refIndex]?.refImages[currentIndex]}
              className="w-[250px] h-[157px] rounded-[10px]"
            />
          )}
          <button
            className="absolute left-10 top-1/2 transform -translate-y-1/2 text-2xl p-2"
            onClick={() => {
              setCurrentIndex(
                (prev) =>
                  (prev - 1 + info?.reference[refIndex]?.refImages?.length) %
                  info?.reference[refIndex]?.refImages?.length
              );
            }}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-2xl p-2"
            onClick={() => {
              setCurrentIndex(
                (prev) => (prev + 1) % info?.reference[refIndex]?.refImages?.length
              );
            }}
          >
            <FaChevronRight />
          </button>

          {/* reference numbering  */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl p-2"
            onClick={() => {
              setRefIndex(
                (prev) =>
                  (prev - 1 + info?.reference?.length) %
                  info?.reference?.length
              );
            }}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl p-2"
            onClick={() => {
              setRefIndex((prev) => (prev + 1) % info?.reference?.length);
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
