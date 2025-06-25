import React from "react";
import Marquee from "react-fast-marquee";
import img1 from '../assets/brands/casio.png'
import img2 from '../assets/brands/amazon_vector.png'
import img3 from '../assets/brands/moonstar.png'
import img4 from '../assets/brands/randstad.png'
import img5 from '../assets/brands/start-people 1.png'
import img6 from '../assets/brands/start.png'
import img7 from '../assets/brands/amazon.png'



// Replace with your actual logo image paths (stored in /public/logos/)

const Teams = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className=" rounded-md overflow-hidden">
        {/* Heading */}
        <div className="bg-white py-12 px-5 text-center ">
          <h2 className="text-xl md:text-2xl font-bold text-[#013C47]">
            We've helped thousands of sales teams
          </h2>
        </div>

        {/* Logo carousel */}
        <div className="bg-white pb-12">
          <Marquee speed={50} pauseOnHover={true} gradient={false}>
            <div className="flex gap-12 items-center">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
            <img src={img5} alt="" />
            <img src={img6} alt="" />
            <img src={img7} alt="" />

            </div>
           
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Teams;
