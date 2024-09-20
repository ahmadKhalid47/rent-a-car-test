"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { handleExport } from "../Components/functions/exportFunction";
import { TypeInput } from "../Components/InputComponents/TypeInput";
import { SelectInputWidth } from "../Components/InputComponents/SelectInput";
import { TextLoader, MediumLoader } from "../Components/Loader";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [loading, setLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);
  const [make, setMake] = useState<any>("");
  const [model, setModel] = useState<any>("");
  const [regNo, setRegNo] = useState<any>("");
  const [date, setDate] = useState<any>("");
  const [carAvailable, setCarAvailable] = useState<any>(undefined);
  const [configurationsLoading, setConfigurationsLoading] = useState<any>(true);
  const [Configurations, setConfigurationsData] = useState<any>([]);
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const [reservationLoading, setreservationLoading] = useState<any>(true);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await axios.post("/api/getVehicle");

        if (result?.data?.data) {
          setVehiclesData(result.data.data);
          setFilteredVehicles(result.data.data); // Initialize with full data
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [global.vehicleDataReloader]);

  useEffect(() => {
    filterVehicles();
  }, [searchQuery, VehiclesData]);

  function filterVehicles() {
    if (!searchQuery) {
      setFilteredVehicles(VehiclesData);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = VehiclesData.filter((vehicle) => {
      const { data } = vehicle;
      const { registration, city, make, model } = data;
      const carName = `${make} ${model}`.toLowerCase();
      return (
        registration.toLowerCase().includes(lowercasedQuery) ||
        city.toLowerCase().includes(lowercasedQuery) ||
        carName.includes(lowercasedQuery)
      );
    });
    setFilteredVehicles(filtered);
  }

  useEffect(() => {
    async function getData2() {
      try {
        setConfigurationsLoading(true);
        let result: any = await axios.post(`/api/getConfigurations`);
        setConfigurationsData(result?.data?.wholeData);
      } catch (error: any) {
        console.log(error);
      } finally {
        setConfigurationsLoading(false);
      }
    }
    getData2();
  }, []);

  function filterReg() {
    let filtered: any = VehiclesData;

    if (make) {
      const lowercasedQuery = make.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.make?.toLowerCase();
        return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }

    if (model) {
      const lowercasedQuery = model.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.model?.toLowerCase();
        return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }

    if (!model && !make) {
      filtered = [];
    }
    return filtered;
  }
  useEffect(() => {
    async function getData() {
      try {
        setvehicleLoading(true);
        const result = await axios.post("/api/getVehicle");
        setVehiclesData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setvehicleLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setreservationLoading(true);
        const result = await axios.post("/api/getreservation");
        setreservationsData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setreservationLoading(false);
      }
    }
    getData();
  }, [global.vehicleDataReloader]);
  const completedReservations = reservationsData.filter(
    (item: any) => item?.data?.status === "complete"
  );
  const canceledReservations = reservationsData.filter(
    (item: any) => item?.data?.status === "cancel"
  );
  const currentDate = new Date().toISOString().split("T")[0]; // Formats date as YYYY-MM-DD
  const pendingReservations = reservationsData.filter((item: any) => {
    return item?.data?.status === "inComplete";
  });
  const upComingReservations = reservationsData.filter((item: any) => {
    console.log(item?.data?.PickUpDate > currentDate?item:"null");
    return (
      item?.data?.PickUpDate > currentDate &&
      item?.data?.status === "inComplete"
    );
  });

  const completedReservationsToday = completedReservations.filter(
    (item: any) => item.data.completeDate === currentDate
  );
  const reservationsMadeToday = reservationsData.filter(
    (item: any) => item.data.reservationDate === currentDate
  );
  const totalAmount = completedReservations.reduce(
    (sum, record) => sum + Number(record.data.amount),
    0
  );
  const totalAmountToday = completedReservationsToday.reduce(
    (sum, record) => sum + Number(record.data.amount),
    0
  );

  useEffect(() => {
    async function getData2() {
      try {
        setConfigurationsLoading(true);
        let result: any = await axios.post(`/api/getConfigurations`);
        setConfigurationsData(result?.data?.wholeData);
      } catch (error: any) {
        console.log(error);
      } finally {
        setConfigurationsLoading(false);
      }
    }
    getData2();
  }, []);

  function submitButton() {
    let filtered: any = VehiclesData;

    if (make) {
      const lowercasedQuery = make.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.make?.toLowerCase();
        return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }

    if (model) {
      const lowercasedQuery = model.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.model?.toLowerCase();
        return keyValueInVehicle?.includes(lowercasedQuery);
      });
    }

    if (regNo) {
      const lowercasedQuery = regNo.toLowerCase();
      filtered = filtered.filter((vehicle: any) => {
        const keyValueInVehicle = vehicle.data.registration?.toLowerCase();
        return keyValueInVehicle === lowercasedQuery;
      });
    }

    const allFilteredReservations: any[] = [];

    filtered.forEach((vehicle: any) => {
      const vehicleId = vehicle._id;

      const filteredReservations = reservationsData.filter(
        (reservation: any) => reservation.data.vehicle_id === vehicleId
      );

      allFilteredReservations.push(...filteredReservations);
    });

    if (!make && !model && !regNo) {
      setCarAvailable(undefined);
    } else {
      setCarAvailable(filtered?.length);
    }
  }

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={` w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Report
          </h3>
        </div>
        <div className="bg-red-600 w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          {configurationsLoading ? (
            <div className="pt-5 w-full ">
              <MediumLoader />
            </div>
          ) : (
            <div className="w-full flex flex-wrap justify-between items-start gap-y-4">
              <SelectInputWidth
                widthProp="sm:w-[32%]"
                setState={setMake}
                label={"Make"}
                value={make}
                required={false}
                options={Configurations?.make?.map((item: any) => item.make)}
              />
              <SelectInputWidth
                widthProp="sm:w-[32%]"
                setState={setModel}
                label={"Model"}
                value={model}
                required={false}
                options={Configurations?.model
                  ?.filter((item: any) => item.make === make)
                  .map((item: any) => item.model)}
              />
              <SelectInputWidth
                widthProp="sm:w-[32%]"
                setState={setRegNo}
                label={"Registration Number"}
                value={regNo}
                required={false}
                options={filterReg()?.map(
                  (item: any) => item.data.registration
                )}
              />

              <button
                className="px-2 md:px-0 w-fit md:w-full py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  submitButton();
                }}
              >
                Check
              </button>
            </div>
          )}
        </div>
        <div className="w-full h-fit mt-4">
          <h3
            className={`w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] text-main-blue`}
          >
            <span className="font-[600] text-black" onClick={() => {}}>
              All Vehicles
            </span>
            <span
              className="underline cursor-pointer hover:no-underline"
              onClick={() => {}}
            >
              Export
            </span>
          </h3>
          <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2 bg-red-300 relative">
            <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start bg-light-grey overflow-hidden mt-0 leading-[17px]">
              <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  Total Revenue
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  {!reservationLoading ? "$" + totalAmount : <TextLoader />}{" "}
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  Total Reservations
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  {!reservationLoading ? (
                    reservationsData?.length
                  ) : (
                    <TextLoader />
                  )}
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  Complete Reservations
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  {!reservationLoading ? (
                    completedReservations?.length
                  ) : (
                    <TextLoader />
                  )}
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  Cancel Reservations
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  {!reservationLoading ? (
                    canceledReservations?.length
                  ) : (
                    <TextLoader />
                  )}
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  Pending Reservations
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  {!reservationLoading ? (
                    pendingReservations?.length
                  ) : (
                    <TextLoader />
                  )}
                </div>
              </div>
              <div className="w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] rounded-t-[10px] leading-[17px text-center border-b-2 border-grey">
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  Upcoming Reservations
                </div>
                <div className="text-start px-8 flex justify-between items-center w-[50%]">
                  {!reservationLoading ? (
                    upComingReservations?.length
                  ) : (
                    <TextLoader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
