import { useHandleExport } from "./exportFunction";

const ExcelDownload = ({ data }: any) => {
  const handleExport = useHandleExport();

  return (
    <button
      className="hover:no-underline w-[112px] h-[43px] rounded-[6px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] flex justify-center items-center leading-[0px]"
      onClick={() => {
        handleExport(
          data?.map((item: any) => {
            const { _id, __v, createdBy, ...rest } = item;
            return rest;
          })
        );
      }}
      disabled={!data}
    >
      Export
    </button>
  );
};

export default ExcelDownload;
