import loginPage1 from "@/public/Vector 10.svg";
import loginPage2 from "@/public/Vector 11.svg";
import car from "@/public/Layer_1 (1).svg";
export default function Login() {
  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center bg-green-20">
        <div className="w-[50%] h-full flex justify-center items-center bg-main-blue">
          <div className="w-[70%] h-fit bg-yellow-30 flex flex-col justify-start items-start gap-[20px]">
            <img src={car.src} className="w-[175px]" />
            <h1 className="font-[600] text-[70px] leading-[70px] uppercase text-white">
              welcome <br /> back!
            </h1>
            <p className="font-[400] text-[18px] leading-[22px] text-white">
              Lorem ipsum is a placeholder text commonly used to
              <br /> demonstrate the visual form of a document or a typeface
              <br /> without relying on meaningful content.
            </p>
          </div>
        </div>
        <div className="w-[50%] h-full bg-red-20 flex justify-center items-center ">
          <div className="flex justify-center items-center ">
            <div className="w-[60%] h-fit flex flex-col justify-center items-start gap-[10px]">
              <h2 className="font-[600] text-[35px] leading-[28px] pb-2">
                Login Now
              </h2>
              <p className="font-[400] text-[18px] leading-[22px] text-[#808080] pb-3">
                Lorem ipsum is a placeholder text commonly used to demonstrate
                the visual form.
              </p>
              <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[10px] font-[400] text-[18px] leading-[12px] pb-2">
                <h3 className="">Email or Username</h3>
                <input className="w-full py-3 px-4 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] " placeholder="Email or Username"/>
              </div>
              <div className="w-[100%] h-fit flex flex-col justify-center items-start gap-[10px] font-[400] text-[18px] leading-[12px] pb-2">
                <h3 className="">Password</h3>
                <input className="w-full py-3 px-4 input-color rounded-[10px] font-[400] text-[16px] leading-[20px] " placeholder="Password"/>
              </div>
              <p className="font-[400] text-[16px] leading-[20px] text-red-600">
                Forgot Password ?
              </p>
              <button className="w-full py-4 rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[20px]">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
