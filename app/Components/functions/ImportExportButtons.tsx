import ExcelDownload from "./ExportData";
import ExcelUpload from "./ImportData";

export default function ImportExportButtons({ data, model }: any) {
  return (
    <div className="h-[24px] w-fit flex justify-end gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
      <ExcelUpload model={model} />
      <ExcelDownload data={data} />
    </div>
  );
}
