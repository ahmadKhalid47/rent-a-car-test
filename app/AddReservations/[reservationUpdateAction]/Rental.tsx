"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { MediumLoader } from "../../Components/Loader";
import {
  setchauffeur_idR,
  setchauffeurNameR,
  setwithChauffeur,
} from "@/app/store/reservations";
import image404 from "@/public/image404.png";
import SearchEmpty from "@/app/Components/functions/SearchEmpty";

interface dataType {
  data: Array<Object>;
  loading: boolean;
}

export default function Rental({ data, loading }: dataType) {
  let reservation = useSelector((state: RootState) => state.reservation);
  const [exterior, setExterior] = useState(
    reservation?.withChauffeur ? reservation?.withChauffeur : false
  );
  const chauffeursData: any = data;
  const [filteredchauffeur, setFilteredchauffeur] = useState<any[]>(data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  let dispatch = useDispatch();

  const chauffeurRefs = useRef<any[]>([]); // Store refs for each chauffeur div

  function filterchauffeur() {
    if (!searchQuery) {
      setFilteredchauffeur(chauffeursData);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = chauffeursData.filter((vehicle: any) => {
      const { data } = vehicle;
      const { name } = data;

      return name.toLowerCase().includes(lowercasedQuery);
    });
    setFilteredchauffeur(filtered);
  }

  useEffect(() => {
    filterchauffeur();
  }, [searchQuery, chauffeursData]);

  // Scroll to the selected chauffeur when it changes
  useEffect(() => {
    const selectedIndex = filteredchauffeur.findIndex(
      (item: any) => item._id === reservation.chauffeur_id
    );
    if (selectedIndex !== -1 && chauffeurRefs.current[selectedIndex]) {
      chauffeurRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "center", // Scroll to the center of the container
      });
    }
  }, [reservation.chauffeur_id, filteredchauffeur]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.trim());
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full h-full dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8 overflow-auto scroll">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Select Chauffeur
        </span>

        <div className="w-[100%] h-fit flex flex-wrap justify-center items-center bg-green-20 gap-y-2 gap-x-5 font-[500] text-[14px] md:text-[16px] leading-[19px] ">
          <button
            className={`pe-3 md:pe-0 w-fit md:w-[190px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-start gap-2 ps-3 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
              exterior
                ? "bg-main-blue text-white"
                : "dark:bg-dark1 bg-white dark:text-white text-black"
            }`}
            onClick={() => {
              setExterior(true);
              dispatch(setwithChauffeur(true));
            }}
          >
            {exterior ? (
              <div className="w-[20px] h-[20px] bg-main-blue rounded-full flex justify-center items-center border-[2px] border-white">
                <div className="w-[10px] h-[10px] dark:bg-dark1 bg-white rounded-full"></div>
              </div>
            ) : (
              <div className="w-[20px] h-[20px] dark:bg-dark1 bg-white rounded-full flex justify-center items-center border-[2px] border-black">
                <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
              </div>
            )}
            With chauffeur
          </button>
          <button
            className={`pe-3 md:pe-0 w-fit md:w-[190px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-start gap-2 ps-3 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
              !exterior
                ? "bg-main-blue text-white"
                : "dark:bg-dark1 bg-white dark:text-white text-black"
            }`}
            onClick={() => {
              setExterior(false);
              dispatch(setwithChauffeur(false));
            }}
          >
            {!exterior ? (
              <div className="w-[20px] h-[20px] bg-main-blue rounded-full flex justify-center items-center border-[2px] border-white">
                <div className="w-[10px] h-[10px] dark:bg-dark1 bg-white rounded-full"></div>
              </div>
            ) : (
              <div className="w-[20px] h-[20px] dark:bg-dark1 bg-white rounded-full flex justify-center items-center border-[2px] border-black">
                <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
              </div>
            )}
            Without chauffeur
          </button>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center h-fit gap-1">
          <span className="w-full text-start font-[400] text-[14px] leading-[17px]">
            Search Chauffeur
          </span>
          <div className="w-full h-fit relative">
            <input
              className="w-full h-[43px] flex justify-start ps-5 items-center border-[1px] border-grey rounded-[10px] dark:bg-dark1 input-color text-[16px] leading-[19px] placeholder:dark:text-white text-black"
              placeholder="Search By Name"
              onChange={handleSearchQueryChange}
              value={searchQuery}
            />
            {searchQuery && (
              <SearchEmpty
                classes={"right-[0%] md:right-[2%] w-[3.5%] top-0"}
                setState={setSearchQuery}
              />
            )}
          </div>
        </div>
        {loading ? (
          <MediumLoader />
        ) : (
          filteredchauffeur?.map((item: any, index: number) => (
            <div
              key={item._id}
              ref={(el: any) => (chauffeurRefs.current[index] = el)} // Store ref for each item
              className="w-[100%] rounded-[15px] shadow px-5 py-6 flex flex-col sm:flex-row justify-start gap-4 items-center relative"
            >
              <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
                <div className="w-[130px] h-[130px] object-cover overflow-hidden rounded-[10px] border-[1px] border-grey">
                  <img
                    src={
                      item.data.chauffeurImage
                        ? item.data.chauffeurImage
                        : image404.src
                    }
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full sm:w-[55%] h-fit flex justify-center sm:justify-start flex-wrap items-center gap-1">
                <div className="w-full flex justify-center sm:justify-start items-center  pe-0 sm:pe-5  leading-6">
                  <span className="font-[600] text-[15px] xs:text-[24px] leading-6 sm:leading-[36px]">
                    {item.data.name}
                  </span>
                </div>
                <div className="w-full flex justify-center sm:justify-start items-center">
                  <span className="font-[500] text-[14px] xs:text-[20px] leading-6 sm:leading-[30px]">
                    {item.data.phone}
                  </span>
                </div>
                <div className="w-full flex justify-between items-center sm:items-start flex-col font-[400] text-[14px] leading-5 sm:leading-[21px]">
                  <div className="flex justify-start items-center gap-2 w-fit sm:w-[100%] pe-0 sm:pe-5">
                    <span className="w-fit">City:</span>
                    <span className="w-fit">{item.data.city}</span>
                  </div>
                  <div className="flex justify-start items-center gap-2 w-fit sm:w-[100%]">
                    <span className="w-fit">Country:</span>
                    <span className="w-fit">{item.data.country}</span>
                  </div>
                </div>
              </div>
              <button
                className={`w-full sm:w-[120px] h-[30px] rounded-[10px] ${
                  reservation.chauffeur_id === item._id ||
                  !reservation.withChauffeur
                    ? "bg-dark-grey"
                    : "bg-main-blue"
                } text-white font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-5 sm:leading-[21px] text-center`}
                disabled={!reservation.withChauffeur}
                onClick={() => {
                  dispatch(
                    setchauffeur_idR(
                      reservation.chauffeur_id === item._id ? "" : item._id
                    )
                  );
                  dispatch(
                    setchauffeurNameR(
                      reservation.chauffeurName === item?.data.name
                        ? ""
                        : item?.data.name
                    )
                  );
                }}
              >
                {reservation.chauffeur_id === item._id ? "Selected" : "Select"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
