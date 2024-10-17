import { useHandleExport } from "./exportFunction";

const ExcelDownload = ({ data }: any) => {
  const handleExport = useHandleExport();

  return (
    <button
      className="hover:no-underline w-fit px-3 md:px-6 h-[24px] rounded-[6px] bg-main-blue text-white font-[500] text-[12px] md:text-[14px] flex justify-center items-center leading-[0px]"
      onClick={() => {
        handleExport(data);
      }}
      disabled={!data}
    >
      Export
    </button>
  );
};

export default ExcelDownload;
