import car from "@/public/carInfoCar.svg";
export default function CarInfo() {
  return (
    <div className="nav-width h-fit absolute right-0 flex flex-col justify-start items-start gap-[20px] pe-[50px] ps-[40px] pb-14">
      <div className="w-full h-[200px bg-yellow-30">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black">
          Suzuki Swift
        </h3>
        <div className="flex justify-between items-start">
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            All Vehicles / Suzuki Swift
          </p>
        </div>
      </div>
      <div className="w-full h-fit flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-8">
        <div className="w-full h-fit flex justify-start flex-col items-start gap-x-[5%] gap-y-[5%] py-10 px-10 rounded-[10px] bg-white border-2 border-grey">
          <div className="w-full h-fit flex justify-between items-center bg-red-100">
            <div className="w-[340px] h-[212px] flex justify-between items-start bg-red-100 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey">
              <img src={car.src} />
            </div>
                      <div className="w-[50%] bg-blue-300 h-[100%]">
                          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
