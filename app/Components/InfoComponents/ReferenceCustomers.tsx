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
        <button
          className="text-3xl hover:opacity-75"
          onClick={() => {
            setRefIndex(
              (prev) =>
                (prev - 1 + info?.reference?.length) % info?.reference?.length
            );
          }}
        >
          <FaChevronLeft />
        </button>
        <div className="w-[80%] dark:text-white text-black text-[14px] font-[400] flex flex-col justify-between items-start">
          <div className="w-full flex justify-between item-start gap-2">
            <span className="w-fit text-[#555555]">Name</span>
            <span className="w-fit">{info?.reference[refIndex]?.refName}</span>
          </div>
          <div className="w-full flex justify-between item-start gap-2">
            <span className="w-fit text-[#555555]">Address</span>
            <span className="w-fit">
              {info?.reference[refIndex]?.refAddress}
            </span>
          </div>
          <div className="w-full flex justify-between item-start gap-2">
            <span className="w-fit text-[#555555]">Phone </span>
            <span className="w-fit">{info?.reference[refIndex]?.refPhone}</span>
          </div>
          <div className="w-full flex justify-between item-start gap-2">
            <span className="w-fit text-[#555555]">Relation</span>
            <span className="w-fit">
              {info?.reference[refIndex]?.refRelation}
            </span>
          </div>
        </div>
        <button
          className="text-3xl hover:opacity-75"
          onClick={() => {
            setRefIndex((prev) => (prev + 1) % info?.reference?.length);
          }}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="w-[100%] h-fit dark:text-white text-black text-[14px] font-[400] flex justify-between items-center mt-2">
        {info?.reference[refIndex]?.refImages?.length > 0 && (
          <div className="relative w-full h-[157px] flex justify-center items-center">
            <>
              <button
                className="text-2xl hover:opacity-75 mx-2"
                onClick={() => {
                  setCurrentIndex(
                    (prev) =>
                      (prev -
                        1 +
                        info?.reference[refIndex]?.refImages?.length) %
                      info?.reference[refIndex]?.refImages?.length
                  );
                }}
              >
                <FaChevronLeft />
              </button>
              <img
                src={info?.reference[refIndex]?.refImages[currentIndex]}
                className="relative w-[250px] h-[157px] rounded-[10px]"
              />
              <button
                className="text-2xl hover:opacity-75 mx-2"
                onClick={() => {
                  setCurrentIndex(
                    (prev) =>
                      (prev + 1) % info?.reference[refIndex]?.refImages?.length
                  );
                }}
              >
                <FaChevronRight />
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
};
