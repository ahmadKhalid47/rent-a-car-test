"use client";
import { useEffect, useState, useRef } from "react";
import { MediumLoader } from "../../Components/Loader";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setvehicle_idR, setvehicleNameR } from "@/app/store/reservations";
import image404 from "@/public/image404.png";
interface dataType {
  data: Array<Object>;
  loading: boolean;
}

export default function Feature({ data, loading }: dataType) {
  let reservation = useSelector((state: RootState) => state.reservation);
  let VehiclesData: any = data;
  const [filteredVehicle, setFilteredVehicle] = useState<any[]>(data);
  const [searchQuery, setSearchQuery] = useState<string>("");

  let dispatch = useDispatch();

  // Store refs for each vehicle div
  const vehicleRefs = useRef<any[]>([]);

  function filterVehicle() {
    if (!searchQuery) {
      setFilteredVehicle(VehiclesData);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase().trim();
    const filtered = VehiclesData.filter((vehicle: any) => {
      const { data } = vehicle;
      const { make, model } = data;

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

  // Scroll to the selected vehicle when it changes
  useEffect(() => {
    const selectedIndex = filteredVehicle.findIndex(
      (item: any) => item._id === reservation.vehicle_id
    );
    if (selectedIndex !== -1 && vehicleRefs.current[selectedIndex]) {
      vehicleRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [reservation.vehicle_id, filteredVehicle]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.trim());
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8 overflow-auto scroll">
        <div className="flex justify-between flex-wrap gap-y-3 items-center w-full h-fit">
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
            <div
              key={item._id}
              ref={(el: any) => (vehicleRefs.current[index] = el)} // Store ref for each vehicle
              className="w-[100%] rounded-[15px] shadow px-5 py-6 flex flex-col sm:flex-row justify-start gap-4 items-center relative"
            >
              <div className="w-[133px] h-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
                <img
                  src={
                    item.data.carImages[item.data.thumbnailImage]
                      ? item.data.carImages[item.data.thumbnailImage]
                      : image404.src
                  }
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
                className={`w-full sm:w-[120px] h-[30px] rounded-[10px] ${
                  reservation.vehicle_id === item._id
                    ? "bg-dark-grey"
                    : "bg-main-blue"
                } text-white font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-5 sm:leading-[21px] text-center`}
                onClick={() => {
                  dispatch(
                    setvehicle_idR(
                      reservation.vehicle_id === item._id ? "" : item._id
                    )
                  );
                  dispatch(
                    setvehicleNameR(
                      reservation.vehicleName ===
                        item?.data?.make + " " + item?.data?.model
                        ? ""
                        : item?.data?.make + " " + item?.data?.model
                    )
                  );
                }}
              >
                {reservation.vehicle_id === item._id ? "Selected" : "Select"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
