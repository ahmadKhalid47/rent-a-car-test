import { useState } from "react";
import { SmallLoader } from "../Loader";
import ExcelUpload from "./ImportData";
import { useHandleExport } from "./exportFunction";

export default function ImportExportButtons({ data, model }: any) {
  const [exportLoading, setExportLoading] = useState<any>(false);
  const handleExport = useHandleExport();
  console.log(data);

  return (
    <div className="h-fit w-full flex justify-end gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
      <button
        className={`hover:no-underline w-[210px] h-[44px] rounded-[10px] text-white font-[500] text-[12px] md:text-[16px] flex justify-center items-center leading-[0px] bg-main-blue`}
        onClick={() => {
          async function exporting() {
            try {
              setExportLoading(true);
              await handleExport(data);
            } finally {
              setExportLoading(false);
            }
          }
          exporting();
        }}
        disabled={!data}
      >
        {exportLoading || !data ? <SmallLoader /> : "Export Configurations"}
      </button>
      <ExcelUpload />
    </div>
  );
}
