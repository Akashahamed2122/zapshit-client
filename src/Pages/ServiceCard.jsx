import React from 'react';

const ServiceCard = ({service}) => {
    const {title,icon,description}=service
    return (
        <>
        <div
         
              className={`rounded-xl bg-white hover:bg-[#CAEB66] transition-colors duration-300 p-6 shadow-md text-black 
              
              }`}
            >
              <div className="mb-3">
                <div className="bg-pink-100 p-4 w-fit mx-auto rounded-full">
                  {icon}
                </div>
              </div>
              <h3 className="font-semibold text-lg text-center mb-2">
                {title}
              </h3>
              <p className="text-sm text-center">{description}</p>
            </div>
            
        </>
    );
};

export default ServiceCard;