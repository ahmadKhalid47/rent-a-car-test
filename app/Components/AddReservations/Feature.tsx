"use client";
import shape from "@/public/Shape.svg";
import car from "@/public/carInfoCar.svg";
import {
  SelectInputWidth,
  TempSelectInputWidth,
} from "../InputComponents/SelectInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { MediumLoader } from "../Loader";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setvehicle_idR } from "@/app/store/reservations";

interface dataType {
  data: Array<Object>;
  loading: boolean;
}

export default function Feature({ data, loading }: dataType) {
  let VehiclesData: any = data;
  const [filteredVehicle, setFilteredVehicle] = useState<any[]>(data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  let dispatch = useDispatch();

  function filterVehicle() {
    if (!searchQuery) {
      setFilteredVehicle(VehiclesData);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase().trim();
    const filtered = VehiclesData.filter((vehicle: any) => {
      const { data } = vehicle;
      const { make, model } = data;
      console.log(make, model);

      return (
        make.toLowerCase().includes(lowercasedQuery) ||
        model.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredVehicle(filtered);
  }

  useEffect(() => {
    filterVehicle();
  }, [searchQuery, VehiclesData]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.trim());
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8 overflow-auto scroll">
        <div className="flex justify-between flex-wrap gap-y-3 items-center w-full h-fit">
          {/* <SelectInputWidth
            label={"Make"}
            value={""}
            required={false}
            options={["Make1", "Make2"]}
            widthProp="sm:w-[48.5%]"
          />
          <TempSelectInputWidth
            setState={setSearchQuery}
            label={"Model"}
            value={""}
            required={false}
            options={["Model1", "Model2"]}
            widthProp="sm:w-[48.5%]"
          /> */}
          <input
            className="w-full h-[43px] flex justify-start ps-5 items-center border-[1px] border-grey rounded-[10px] input-color text-[16px] leading-[19px] placeholder:text-black"
            placeholder="Search By Name"
            onChange={handleSearchQueryChange}
          />
        </div>
        {loading ? (
          <MediumLoader />
        ) : (
          filteredVehicle?.map((item: any, index: number) => (
            <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex flex-col sm:flex-row justify-start gap-4 items-center relative">
              <div className="w-[133px] h-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
                <img
                  src={item.data.carImages[item.data.thumbnailImage]}
                  className="w-full h-full"
                />
              </div>
              <div className="w-full sm:w-[55%] h-fit flex justify-start flex-col bg-red-20 items-center sm:items-start">
                <div className="w-full flex justify-center sm:justify-start items-center pe-0 sm:pe-5 h-fit py-[-10px] -mt-2">
                  <span className="font-[600] text-[15px] xs:text-[24px] leading-7 sm:leading-[36px]">
                    {item.data.make} {item.data.model}
                  </span>
                </div>
                <div className="w-full flex justify-center sm:justify-start items-center py-[-10px] -mt-1">
                  <span className="font-[500] text-[14px] xs:text-[20px] leading-7 sm:leading-[30px]">
                    {item.data.registration}
                  </span>
                </div>

                <div className="w-full flex justify-center sm:justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
                  <div className="flex justify-center sm:justify-start items-center gap-2 w-[50%] sm:w-[40%] pe-5">
                    <span className="leading-7 w-[50%] sm:w-[42%]">Year:</span>
                    <span className="leading-7 w-[50%] sm:w-[40%]">
                      {item.data.year}
                    </span>
                  </div>
                  <div className="flex justify-center sm:justify-start items-center gap- w-[50%]">
                    <span className="leading-7 w-[50%] sm:w-[30%]">Type:</span>
                    <span className="leading-7 w-[50%] sm:w-[30%]">
                      {item.data.type}
                    </span>
                  </div>
                </div>

                <div className="w-full flex justify-center sm:justify-start gap-0 items-center font-[400] text-[14px] leading-[21px] -mt-1">
                  <div className="flex justify-center sm:justify-start items-center gap-2 w-[50%] sm:w-[40%]">
                    <span className="leading-7 w-[50%] sm:w-fit">Color:</span>
                    <div className="w-[50%] sm:w-fit">
                      <div
                        className="w-[23px] h-[12px] rounded-full"
                        style={{
                          backgroundColor: item.data.color,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-center sm:justify-start items-center gap- w-[50%]">
                    <span className="leading-7 w-[50%] sm:w-[30%]">City:</span>
                    <span className="leading-7 w-[50%] sm:w-[30%]">
                      {item.data.city}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex justify-center items-center h-[22px] border-[1px] text-[12px] leading-[14px] text-center rounded-[5px] ${
                    item.active
                      ? "w-[77px] complete-status"
                      : "progress-status w-[100px]"
                  } font-[600] mt-1`}
                >
                  {item.active ? "Available" : "Not Available"}
                </div>
              </div>
              <button
                className="w-full sm:w-[103px] h-[30px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-5 sm:leading-[21px] text-center"
                onClick={() => {
                  dispatch(setvehicle_idR(item._id));
                }}
              >
                Select
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
