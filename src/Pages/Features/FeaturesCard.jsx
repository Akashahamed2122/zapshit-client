import React from "react";

const FeaturesCard = ({ feature }) => {
    const {image,title,description}=feature
  return (
    <>
      <div

        className="flex flex-col md:flex-row items-center bg-white rounded-xl p-6 shadow-sm gap-6"
      >
       <div className="border-r border-dashed pr-[30px]">
         {/* Image */}
        <img
        className='w-32 h-32 object-contain border border-gray-300 p-2 rounded-lg'
          src={image}
       
    
        />
       </div>

        {/* Text Content */}
        <div className="text-center md:text-left ">
          <h3 className="text-lg font-semibold text-[#013C47] mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </>
  );
};

export default FeaturesCard;
