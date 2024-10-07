import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Rental from "./Rental";
import Insurance from "./Insurance";
import Other from "./Other";

export default function General() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  const [activeIndex, setActiveIndex] = useState<any>(0);

  const toggleAccordion = (index: any) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const accordionData = [
    {
      title: "Rental Info",
      content: <Rental />,
    },
    {
      title: "Insurance Info",
      content: <Insurance />,
    },
    {
      title: "Features",
      content: <div className="w-full h-full"></div>,
    },
    {
      title: "Damages",
      content: <div className="w-full h-full"></div>,
    },
    {
      title: "Others",
      content: <Other />,
    },
  ];

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] border-grey">
      <div id="accordion-collapse" className="w-full">
        {accordionData.map((item, index) => (
          <div key={index}>
            <h2 id={`accordion-collapse-heading-${index + 1}`}>
              <button
                type="button"
                className="w-[100%] h-[47px] flex items-center justify-between p-5 border-b-[1px] border-grey bg-light-grey"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`accordion-collapse-body-${index + 1}`}
              >
                <span>{item.title}</span>
                <FaChevronDown
                  className={`w-3 h-3 transition-transform ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </h2>
            <div
              id={`accordion-collapse-body-${index + 1}`}
              className={`${
                activeIndex === index ? "block" : "hidden"
              } w-[100%] h-[141px] border-b-[1px] border-grey`}
              aria-labelledby={`accordion-collapse-heading-${index + 1}`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
