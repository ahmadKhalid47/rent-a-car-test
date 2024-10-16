import React from "react";
import * as XLSX from "xlsx";

const ExcelUpload: React.FC = () => {
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
    };
    reader.readAsArrayBuffer(file);
  };

  
    function saveFile() {
        
    }
    
  
    
    return (
    <div className="w-fit relative cursor-pointer overflow-hidden rounded-[10px] bg-main-blue hover:opacity-[0.9] active:opacity-[0.9]">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="opacity-0 absolute cursor-pointer z-[1] right-[0%] w-[300%] h-[100%]"
        title={""}
      />
      <button className="z-[-1] hover:no-underline w-fit cursor-pointer px-3 md:px-6 h-[44px] text-white font-[500] text-[12px] md:text-[16px] flex justify-center items-center leading-[0px]">
        Import Configurations
      </button>
    </div>
  );
};

export default ExcelUpload;
