"use client";
import shape from "@/public/ShapeBlack.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setcurrentCurrency, setSidebarShowR } from "@/app/store/Global";
import axios from "axios";
import { SmallLoader } from "@/app/Components/Loader";
import {
  setAllValues,
  setvatIncludeR,
  setvatPercentageR,
} from "@/app/store/Invoicing";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

export default function AddUser() {
  let global = useSelector((state: RootState) => state.Global);
  let Invoicing = useSelector((state: RootState) => state.Invoicing);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [currencies, setCurrencies] = useState<any>([]);
  const [saveloading, setSaveLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const router = useRouter();

  const currencySymbols: any = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    INR: "₹", // Indian Rupee
    NZD: "NZ$",
    SEK: "kr", // Swedish Krona
    NOK: "kr", // Norwegian Krone
    MXN: "$", // Mexican Peso
    SGD: "S$", // Singapore Dollar
    HKD: "HK$",
    ZAR: "R", // South African Rand
    RUB: "₽", // Russian Ruble
    TRY: "₺", // Turkish Lira
    BRL: "R$", // Brazilian Real
    AED: "د.إ", // UAE Dirham
    PKR: "₨", // Pakistani Rupee
  };

  const fetchExchangeRates = async () => {
    try {
      const response: any = await axios.get(
        "https://api.currencylayer.com/live?access_key=58272b06c9c4db23d8165a9b547e7faf&format=1"
      );
      const rates: any = response.data.quotes;
      const quotesArray: any = Object.entries(rates);
      setCurrencies(quotesArray);
    } catch (error) {
      console.error("Error fetching exchange rates:", "error");
    }
  };

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
        const result = await axios.post("/api/getNotification");
      } finally {
      }
    }
    fetchExchangeRates();

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.post("/api/getInvoicing");
        dispatch(setAllValues(result.data.data[0].data));
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [global.vehicleDataReloader]);

  async function editItem() {
    let currency = global.currentCurrency;
    try {
      setSaveLoading(true);
      await axios.post(`/api/updateInvoicing`, { Invoicing });
      await axios.post(`/api/updateGeneralSettings`, { currency });
    } catch (err) {
      console.log(err);
    } finally {
      setSaveLoading(false);
    }
  }

  function setCurrencyData(value: any) {
    let arrayValue = value.split(",");
    let code = arrayValue[0].toString().slice(3);
    let rate = arrayValue[1];
    let symbol = currencySymbols[code];

    let currencyObject = {
      code: code,
      rate: rate,
      symbol: symbol ? symbol : code,
    };
    dispatch(setcurrentCurrency(currencyObject));
  }

  console.log(currencies);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%]  flex justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            General
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] text-black">
              Settings / General
            </p>
          </h3>
        </div>
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-6 px-1 xs:px-3 md:px-6 flex flex-col justify-start items-start relative mt-5">
          <div className="w-full h-fit">
            <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit bg-white rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
              {/* <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] text-black w-[100%]">
                    Currency
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] text-black">
                    You can select default currency here{" "}
                  </span>
                </div>
                <div className="w-[180px] h-[50px] flex justify-center items-center">
                  <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                    <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                      <select
                        className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
                        onChange={(e) => {
                          setCurrencyData(e.target.value);
                          console.log(e.target.value);
                        }}
                        value={`USD${global?.currentCurrency?.code},${global?.currentCurrency?.rate}`}
                      >
                        {currencies?.map((item: any, index: number) => (
                          <option value={item} key={index}>
                            {item[0].toString().slice(3)}
                          </option>
                        ))}
                      </select>
                      <div className="w-[30px] h-[35px] input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                        <img src={shape.src} className="w-[10.5px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px] border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] text-black w-[100%]">
                    VAT Percentage{" "}
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] text-black">
                    You can VAT percentage (%){" "}
                  </span>
                </div>
                <div className="w-[180px] h-[50px] flex justify-center items-center">
                  <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                    <div className="w-full h-fit flex justify-between items-center relative overflow-hidden">
                      <input
                        className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center input-color rounded-xl border-2 border-grey"
                        onChange={(e) => {
                          dispatch(setvatPercentageR(e.target.value));
                        }}
                        value={Invoicing.vatPercentage}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit py-4 flex justify-between items-center border-b-[1px border-grey">
                <div className="w-fit flex flex-col justify-start items-start">
                  <h3 className="font-[400] text-[14px] xs:text-[16px] md:text-[20px] leading-[23px] text-black w-[100%]">
                    Include VAT Percentage{" "}
                  </h3>
                  <span className="font-[400] text-[14px] leading-[17px] text-black">
                    Prices include VAT
                  </span>
                </div>
                <div className="w-[180px] h-[50px] flex justify-center items-center">
                  <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
                    <div className="w-full h-fit flex justify-end items-center relative overflow-hidden">
                      <Switch
                        disabled={loading}
                        checked={Invoicing.vatInclude}
                        onCheckedChange={(checked) => {
                          dispatch(setvatIncludeR(checked));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 ${"justify-end"} items-center gap-4`}
            >
              <button
                onClick={() => {
                  router.push("/Settings");
                }}
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              >
                {loading ? <SmallLoader /> : "Cancel"}
              </button>
              <button
                onClick={() => {
                  editItem();
                }}
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              >
                {saveloading ? <SmallLoader /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
