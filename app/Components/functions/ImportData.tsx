import { RootState } from "@/app/store";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { SmallLoader } from "../Loader";

const ExcelUpload = ({ model }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  const global = useSelector((state: RootState) => state.Global);

  async function saveImport(jsonData: any) {
    try {
      setLoading(true);
      let result: any = await axios.post(`/api/saveImport`, {
        data: jsonData,
        createdBy: myProfile._id,
        modelName: model,
      });
      console.log(result);
      dispatch(setAlert("Data Imported Successfully"));
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);

      // Call saveImport with jsonData
      saveImport(jsonData);
    };

    reader.readAsArrayBuffer(file);

    // Reset the file input after reading the file
    event.target.value = "";
  };

  return (
    <div className="w-fit relative cursor-pointer overflow-hidden rounded-[6px] bg-main-blue hover:opacity-[0.9] active:opacity-[0.9]">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="opacity-0 absolute cursor-pointer z-[1] right-[0%] w-[300%] h-[100%]"
        title={""}
      />
      <button className="hover:no-underline w-fit px-3 md:px-6 h-[24px] rounded-[6px] bg-main-blue text-white font-[500] text-[12px] md:text-[14px] flex justify-center items-center leading-[0px]">
        {loading ? <SmallLoader /> : "Import"}
      </button>
    </div>
  );
};

export default ExcelUpload;
