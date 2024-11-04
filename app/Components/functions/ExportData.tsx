import { renameKeys2, useHandleExport } from "./exportFunction";

const ExcelDownload = ({ data }: any) => {
  const handleExport = useHandleExport();
  const keyMap = {
    make: "Make",
    model: "Model",
    type: "Body_Type",
    ColorName: "Color_Name",
    country: "Country",
    city: "City",
    Insurance: "Insurance_Company_Name",
    recurring: "Recurring_Period",
    exterior: "Exterior",
    interior: "Interior",
  };

  const renamedArray = renameKeys2(data, keyMap);

  return (
    <button
      className="hover:no-underline w-[112px] h-[43px] rounded-[6px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] flex justify-center items-center leading-[0px]"
      onClick={() => {
        handleExport(
          renamedArray?.map((item: any) => {
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
