import ExcelDownload from "./ExportData";
import ExcelUpload from "./ImportData";

export default function ImportExportButtons({ data, model }: any) {
  return (
    <div className="h-[24px] w-full flex justify-end gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
      <ExcelDownload data={data} />
      <ExcelUpload model={model} />
    </div>
  );
}
