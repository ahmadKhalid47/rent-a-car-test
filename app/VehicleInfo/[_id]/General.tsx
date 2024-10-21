import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function General({ partsHieght, accordionData }: any) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] border-grey">
      <div id="accordion-collapse" className="w-full">
        {accordionData.map(
          (item: { title: string; content: JSX.Element }, index: number) => (
            <div key={index}>
              <div id={`accordion-collapse-heading-${index + 1}`}>
                <button
                  type="button"
                  className={`font-[600] text-[18px] w-[100%] h-[61px] flex items-center justify-between p-5 border-b-[1px] border-grey dark:bg-dark1 bg-light-grey`}
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
              </div>
              <div
                id={`accordion-collapse-body-${index + 1}`}
                className={`${
                  activeIndex === index ? "block" : "hidden"
                } w-[100%] ${partsHieght} border-b-[1px] border-grey`}
                aria-labelledby={`accordion-collapse-heading-${index + 1}`}
              >
                {item.content}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
