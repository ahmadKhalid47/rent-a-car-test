import { formatDate, formatId } from "@/app/Components/functions/formats";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function SecondPage({
  data,
  customersData,
  VehiclesData,
  id,
}: any) {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  let Configurations = useSelector((state: RootState) => state.Configurations);
  let exteriorImg = Configurations?.Configurations?.type?.find(
    (item: any) => item.Type === VehiclesData?.data?.type
  )?.exterior;
  let interiorImg = Configurations?.Configurations?.type?.find(
    (item: any) => item.Type === VehiclesData?.data?.type
  )?.interior;

  return (
    <div
      className={`w-full h-[1123px] flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 relative bg-white`}
    >
      <div className="w-full h-fit  rounded-[10px] flex flex-col justify-start items-center">
        <div className="w-full h-fit flex justify-between items-center mt-1">
          <div className="w-[50%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] text-black">
            <span className=" text-[17px] font-[700] leading-[20px] text-transparent">
              Contract To:
            </span>
            <span className="text-transparent">
              {customersData?.data?.name ? customersData?.data?.name : "---"}
            </span>

            <h2 className="w-full h-fit rounded-[10px] text-black font-[400] text-[18px] leading-[21px] text-start">
              Contract Number:
              <span className="font-[600]"> #{formatId(id)}</span>
            </h2>
            <span className=" font-[600] text-[18px] leading-[21px] ">
              Issue Date:{" "}
              <span className="font-[400]">{formatDate(todayDate)}</span>
            </span>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-between items-center">
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] border-2 border-grey overflow-hidden mt-6">
            <div className="w-full h-fit flex justify-between items-center py-3 px-4 bg-light-grey font-[600]">
              <div className="w-[100%] h-fit flex justify-start items-center text-[18px] font-[600]">
                Damage Report{" "}
              </div>
            </div>
            <div className="w-full h-fit flex justify-between items-start py-3 px-4 text-[14px]">
              <div className="w-fit h-fit flex justify-start items-center gap-2">
                <div className="w-fit text-start font-[600] ">Customer:</div>
                <div className="w-fit text-start font-[400] ">
                  {customersData?.data?.name
                    ? customersData?.data?.name
                    : "---"}
                </div>
              </div>
              <div className="w-fit h-fit flex justify-between items-center gap-2">
                <div className="w-fit text-start font-[600] ">Make: </div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.make ? VehiclesData?.data?.make : "---"}
                </div>
              </div>
              <div className="w-fit h-fit flex justify-between items-center gap-2">
                <div className="w-fit text-start font-[600] ">Model: </div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.model
                    ? VehiclesData?.data?.model
                    : "---"}
                </div>
              </div>
              <div className="w-fit h-fit flex justify-between items-center gap-2">
                <div className="w-fit text-start font-[600] ">
                  Registration NO:
                </div>
                <div className="w-fit text-start font-[400] ">
                  {VehiclesData?.data?.registration
                    ? VehiclesData?.data?.registration
                    : "---"}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-start mt-6">
            <div className="w-[49%] flex justify-center items-start overflow-hidden relative">
              <img src={exteriorImg} className="w-[250px] h-[300px]" />
              {data.damages.map(
                (item: any, index: any) =>
                  item.exterior && (
                    <div
                      className={`absolute w-[15px] h-[15px] rounded-full bg-main-blue text-white text-[8px] flex justify-center items-center font-[600]`}
                      key={index}
                      style={{
                        top: `${item.y}%`,
                        left: `${item.x}%`,
                      }}
                    >
                      {index + 1}
                    </div>
                  )
              )}
            </div>
            <div className="w-[49%] flex justify-center items-start overflow-hidden relative">
              <img src={interiorImg} className="w-[250px] h-[300px]" />
              {data.damages.map((item: any, index: any) => (
                <>
                  {!item.exterior && (
                    <div
                      className={`absolute w-[15px] h-[15px] rounded-full bg-main-blue text-white text-[8px] flex justify-center items-center font-[600]`}
                      key={index}
                      style={{
                        top: `${item.y}%`,
                        left: `${item.x}%`,
                      }}
                    >
                      {index + 1}
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-between items-start mt-6">
            <div className="w-[49%] flex flex-col justify-start items-start rounded-[5px] border-2 border-grey overflow-hidden">
              <div className="w-full h-fit flex-col justify-start items-start text-[14px]">
                <div className="w-[100%] h-fit flex justify-start items-start px-4 py-3 bg-light-grey font-[600]">
                  <div className="w-[10%]">No</div>
                  <div className="w-[45%]">Damage Type</div>
                  <div className="w-[45%]">Degree</div>
                </div>
                {data?.damages?.map((item: any, index: number) => (
                  <>
                    {item.exterior && (
                      <div className="w-[100%] h-fit flex justify-start items-start px-4 py-3 font-[400] border-b border-dashed border-grey">
                        <div className="w-[10%]">{index + 1}</div>
                        <div className="w-[45%]">{item.damageType}</div>
                        <div className="w-[45%]">{item.degree}</div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="w-[49%] flex flex-col justify-start items-start rounded-[5px] border-2 border-grey overflow-hidden">
              <div className="w-full h-fit flex-col justify-start items-start text-[14px]">
                <div className="w-[100%] h-fit flex justify-start items-start px-4 py-3 bg-light-grey font-[600]">
                  <div className="w-[10%]">No</div>
                  <div className="w-[45%]">Damage Type</div>
                  <div className="w-[45%]">Degree</div>
                </div>
                {data?.damages?.map((item: any, index: number) => (
                  <>
                    {!item.exterior && (
                      <div className="w-[100%] h-fit flex justify-start items-start px-4 py-3 font-[400] border-b border-dashed border-grey">
                        <div className="w-[10%]">{index + 1}</div>
                        <div className="w-[45%]">{item.damageType}</div>
                        <div className="w-[45%]">{item.degree}</div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] border-2 border-grey overflow-hidden mt-6">
            <div className="w-full h-fit flex justify-between items-center py-3 px-4 bg-light-grey font-[600]">
              <div className="w-[100%] h-fit flex justify-start items-center text-[14px] font-[600]">
                Notes{" "}
              </div>
            </div>
            <div className="w-full h-fit flex justify-between items-start py-3 px-4 text-[14px]">
              <div className="w-full h-fit flex justify-start items-center gap-2">
                <span className="w-full text-justify font-[400] ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-fit flex justify-end items-start py-1 px-4 absolute bottom-[60px]">
            <div className="w-[50%] h-fit flex flex-col justify-center items-end text-[14px] font-[400] leading-[17px] text-black">
              <span className="w-[50%] leading-[21px] mt-1 flex justify-between items-start text-justify border-b-[1px] border-black"></span>
              <span className="w-[50%] leading-[21px] mt-1 text-center">
                SIGNATURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
