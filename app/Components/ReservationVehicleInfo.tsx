import React from 'react'
import customer from "@/public/Customer.svg"
const ReservationVehicleInfo = () => {
    return (
        <div className='w-full flex justify-between items-center  px-[70px] py-[20px] '>
    <div className=' '>
            <div className='w-[150px] h-[150px] rounded-2xl  '>
                <img src='customer' alt='image-0' style={{width:'100%', height:"100%", objectFit:"cover"}}/>
            </div>
            </div>
          <div className='w-1/2'>
          <div className=' w-full flex justify-between '>
                <div className='font-[400] text-[18px]'>Full Name:</div>
                
                <div className='font-[400] text-[18px]'>
                Glenn A. Jean
                </div>
            </div>
              <div className='border border-t mt-2 mb-2'></div>
          <div className=' w-full flex justify-between '>
                <div className='font-[400] text-[18px]'>Phone:</div>
                <div className='font-[400] text-[18px]'>
                757-947-5015
                </div>
    
            </div>
            <div className='border border-t mt-2 mb-2'></div>
              <div className=' w-full flex justify-between '>
                <div className='font-[400] text-[18px]'>City:</div>
                <div className='font-[400] text-[18px]'>
                Brentwood
                </div>
            </div>
            <div className='border border-t mt-2 mb-2'></div>
              <div className=' w-full flex justify-between '>
                <div className='font-[400] text-[18px]'>Country:</div>
                <div className='font-[400] text-[18px]'>
                USA
                </div>
            </div>

          </div>
          <div className=''>
           <button className='w-fit px-3 md:px-6 py-4 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-[#F9F9F9]  text-main-blue border border-gray-200  font-[600] text-[12px] md:text-[18px] py-2 leading-[21px] text-center'>
           More Details
           </button>
          </div>
        </div>
      )
}

export default ReservationVehicleInfo
