import React from 'react';
import img1 from '../assets/Layer_1.png'

const BeMerchent = () => {
    return (
        <div data-aos="fade-right" className='grid grid-cols-1 bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat md:grid-cols-12 bg-[#03373d]  py-30 px-12 rounded-lg'>
            <div className='col-span-8'>
            <h1 className='font-bold text-4xl text-white'>Merchant and Customer Satisfaction <br /> is Our First Priority</h1>
            <br />
            <p className='text-[#DADADA]'>We offer the lowest delivery charge with the highest value along with 100% <br /> safety of your product. Pathao courier delivers your parcels in every jbr
             corner of Bangladesh right on time.</p>
             <br />
             <div className='md:flex gap-6'>
                <button className='btn bg-[#CAEB66] text-black font-bold text-xl'>Become a Merchant</button>
                <button className='btn bg-transparent border-[#CAEB66] text-[#CAEB66] font-bold text-xl'>Earn with Profast Courier</button>
             </div>
            </div>
            <div className='col-span-4'>
                <img src={img1} alt="" />

            </div>
            
        </div>
    );
};

export default BeMerchent;