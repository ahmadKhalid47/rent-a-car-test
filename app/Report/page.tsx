"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { SelectInputWidth } from "../Components/InputComponents/SelectInput";
import { TextLoader, MediumLoader } from "../Components/Loader";
import { GrPowerReset } from "react-icons/gr";
import { handleExport } from "../Components/functions/exportFunction";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [make, setMake] = useState<any>("");
  const [model, setModel] = useState<any>("");
  const [regNo, setRegNo] = useState<any>("");
  const [carAvailable, setCarAvailable] = useState<any>(undefined);
  const [configurationsLoading, setConfigurationsLoading] = useState<any>(true);
  const [Configurations, setConfigurationsData] = useState<any>([]);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const [vehicle, setVehicle] = useState<any>("All Vehicles");
  const [filterReservationsData, setFilterReservationsData] = useState<any[]>(
    []
  );
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
        const result = await axios.post("/api/getVehicle");
        setVehiclesData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    getData();
  }, [global.vehicleDataReloader]);
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
        const result = await axios.post("/api/getVehicle");
        setVehiclesData(result.data.data);
      } catch (error) {
        console.log(error);
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
        setFilterReservationsData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setreservationLoading(false);
      }
    }
    getData();
  }, [global.vehicleDataReloader]);
  const currentDate = new Date().toISOString().split("T")[0]; // Formats date as YYYY-MM-DD
  const [completedReservations, setCompletedReservations] = useState(
    reservationsData.filter((item: any) => item?.data?.status === "complete")
  );
  const [canceledReservations, setCanceledReservations] = useState(
    reservationsData.filter((item: any) => item?.data?.status === "cancel")
  );
  const [pendingReservations, setPendingReservations] = useState(
    reservationsData.filter((item: any) => {
      return item?.data?.status === "inComplete";
    })
  );
  const [upComingReservations, setUpComingReservations] = useState(
    reservationsData.filter((item: any) => {
      return (
        item?.data?.PickUpDate > currentDate &&
        item?.data?.status === "inComplete"
      );
    })
  );
  const [totalAmount, setTotalAmount] = useState(
    completedReservations.reduce(
      (sum, record) => sum + Number(record.data.amount),
      0
    )
  );
  const [exportData, setExportData] = useState<any>([
    {
      "Total Revenue": totalAmount,
      "Total Reservations": filterReservationsData?.length,
      "Complete Reservations": completedReservations?.length,
      "Cancel Reservations": canceledReservations?.length,
      "Pending Reservations": pendingReservations?.length,
      "Upcoming Reservations": upComingReservations?.length,
    },
  ]);
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

    if (!make || !model || !regNo) {
      setCarAvailable(undefined);
    } else {
      setCarAvailable(filtered);
    }
  }
  let handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitButton();
  };

  useEffect(() => {
    function reFilter() {
      let vehicle_id = carAvailable ? carAvailable[0]._id : undefined;
      let filteredReservations: any = reservationsData.filter(
        (item: any) => item?.data?.vehicle_id === vehicle_id
      );
      setFilterReservationsData(filteredReservations);
      if (carAvailable) {
        setVehicle(
          `${carAvailable[0]?.data?.make} ${carAvailable[0]?.data?.model} ${carAvailable[0]?.data?.registration}`
        );
      }
    }
    if (carAvailable) {
      reFilter();
    }
  }, [carAvailable]);

  useEffect(() => {
    function reFilter() {
      setCompletedReservations(
        filterReservationsData.filter(
          (item: any) => item?.data?.status === "complete"
        )
      );
      setCanceledReservations(
        filterReservationsData.filter(
          (item: any) => item?.data?.status === "cancel"
        )
      );
      setPendingReservations(
        filterReservationsData.filter((item: any) => {
          return item?.data?.status === "inComplete";
        })
      );
      setUpComingReservations(
        filterReservationsData.filter((item: any) => {
          return (
            item?.data?.PickUpDate > currentDate &&
            item?.data?.status === "inComplete"
          );
        })
      );
      setTotalAmount(
        filterReservationsData
          .filter((item: any) => item?.data?.status === "complete")
          .reduce((sum, record) => sum + Number(record.data.amount), 0)
      );
    }
    reFilter();
  }, [filterReservationsData]);

  useEffect(() => {
    setExportData([
      {
        "Total Revenue": totalAmount,
        "Total Reservations": filterReservationsData?.length,
        "Complete Reservations": completedReservations?.length,
        "Cancel Reservations": canceledReservations?.length,
        "Pending Reservations": pendingReservations?.length,
        "Upcoming Reservations": upComingReservations?.length,
      },
    ]);
  }, [
    totalAmount,
    filterReservationsData?.length,
    completedReservations?.length,
    canceledReservations?.length,
    pendingReservations?.length,
    upComingReservations?.length,
  ]);

  // about graph
  const data = {
    labels: ["Complete", "Cancel", "Pending", "Upcoming"],
    datasets: [
      {
        label: "Reservations",
        backgroundColor: ["#4CAF50", "#FF4C4C", "#FFA500", "#42A5F5"],
        data: [
          completedReservations?.length,
          canceledReservations?.length,
          pendingReservations?.length,
          upComingReservations?.length,
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // Ensures custom sizing works
  };

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
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          {configurationsLoading ? (
            <div className="pt-5 w-full ">
              <MediumLoader />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-wrap justify-between items-start gap-y-4"
            >
              <SelectInputWidth
                widthProp="sm:w-[32%]"
                setState={setMake}
                label={"Make"}
                value={make}
                required={true}
                options={Configurations?.make?.map((item: any) => item.make)}
              />
              <SelectInputWidth
                widthProp="sm:w-[32%]"
                setState={setModel}
                label={"Model"}
                value={model}
                required={true}
                options={Configurations?.model
                  ?.filter((item: any) => item.make === make)
                  .map((item: any) => item.model)}
              />
              <SelectInputWidth
                widthProp="sm:w-[32%]"
                setState={setRegNo}
                label={"Registration Number"}
                value={regNo}
                required={true}
                options={filterReg()?.map(
                  (item: any) => item.data.registration
                )}
              />

              <button
                className="px-2 md:px-0 filter-button py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                type="submit"
              >
                Filter By Vehicle
              </button>
              <button
                className={`px-2 md:px-0 w-fit md:w-[44px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey font-[500] text-[12px] md:text-[28px] leading-[21px] text-center flex justify-center items-center ${
                  vehicle === "All Vehicles"
                    ? "bg-light-grey text-grey"
                    : "bg-white text-main-blue"
                }`}
                onClick={(e) => {
                  setFilterReservationsData(reservationsData);
                  setMake("");
                  setModel("");
                  setRegNo("");
                  setVehicle("All Vehicles");
                }}
                type="button"
              >
                <GrPowerReset />
              </button>
            </form>
          )}
        </div>
        <div className="w-full h-fit mt-4">
          <h3
            className={`w-full flex justify-between items-center font-[400]  text-[14px] sm:text-[18px] leading-[21px] text-main-blue`}
          >
            <span className="font-[600] text-black" onClick={() => {}}>
              {vehicle}
            </span>
            <span
              className="underline cursor-pointer hover:no-underline"
              onClick={() => {
                handleExport(exportData);
              }}
            >
              Export
            </span>
          </h3>
          <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey mt-2 relative">
            <div className="w-[900px] 1200:w-full h-fit flex flex-row-revers justify-between items-start bg-light-grey overflow-hidden mt-0 leading-[17px]">

              <div className="w-[100%] 1200:w-[55%] h-[360px] flex flex-col justify-start items-start bg-light-gre overflow-hidden mt-0 leading-[17px]">
                <div className="w-full h-[60px] flex justify-between items-center font-[600] text-[12px] sm:text-[18px] leading-[17px text-center border-b-[2px] border-r-2 border-grey">
                  <div className="text-start px-8 flex justify-between items-center w-[60%]">
                    Total Revenue
                  </div>
                  <div className="text-start px-8 flex justify-between items-center w-[40%]">
                    {!reservationLoading ? "$" + totalAmount : <TextLoader />}{" "}
                  </div>
                </div>
                <div className="w-full h-[60px] flex justify-between items-center font-[400] text-[12px] sm:text-[18px] leading-[17px text-center border-b-[2px] border-r-2 border-grey">
                  <div className="text-start px-8 flex justify-between items-center w-[60%]">
                    Total Reservations
                  </div>
                  <div className="text-start px-8 flex justify-between items-center w-[40%]">
                    {!reservationLoading ? (
                      filterReservationsData?.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                </div>
                <div className="w-full h-[60px] flex justify-between items-center font-[400] text-[12px] sm:text-[18px] leading-[17px text-center border-b-[2px] border-r-2 border-grey">
                  <div className="text-start px-8 flex justify-between items-center w-[60%]">
                    Complete Reservations
                  </div>
                  <div className="text-start px-8 flex justify-between items-center w-[40%]">
                    {!reservationLoading ? (
                      completedReservations?.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                </div>
                <div className="w-full h-[60px] flex justify-between items-center font-[400] text-[12px] sm:text-[18px] leading-[17px text-center border-b-[2px] border-r-2 border-grey">
                  <div className="text-start px-8 flex justify-between items-center w-[60%]">
                    Cancel Reservations
                  </div>
                  <div className="text-start px-8 flex justify-between items-center w-[40%]">
                    {!reservationLoading ? (
                      canceledReservations?.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                </div>
                <div className="w-full h-[60px] flex justify-between items-center font-[400] text-[12px] sm:text-[18px] leading-[17px text-center border-b-[2px] border-r-2 border-grey">
                  <div className="text-start px-8 flex justify-between items-center w-[60%]">
                    Pending Reservations
                  </div>
                  <div className="text-start px-8 flex justify-between items-center w-[40%]">
                    {!reservationLoading ? (
                      pendingReservations?.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                </div>
                <div className="w-full h-[60px] flex justify-between items-center font-[400] text-[12px] sm:text-[18px] leading-[17px text-center border-r-2 border-grey">
                  <div className="text-start px-8 flex justify-between items-center w-[60%]">
                    Upcoming Reservations
                  </div>
                  <div className="text-start px-8 flex justify-between items-center w-[40%]">
                    {!reservationLoading ? (
                      upComingReservations?.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[45%] h-[360px] flex justify-center items-center">
                {configurationsLoading ? (
                  <MediumLoader />
                ) : (
                  <div className="w-[100%] h-[330px] flex justify-center items-center">
                    <Pie data={data} options={options} />
                  </div>
                )}
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
