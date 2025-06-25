import React from "react";
import FeaturesCard from "./FeaturesCard";
import img1 from '../../assets/Illustration.png'
import img2 from '../../assets/Vector.png'
import img3 from '../../assets/Vector.png'

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    image: img1
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: img2
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: img3
  },
];

const Features = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
       {
        features.map((feature, index)=> <FeaturesCard key={index} feature={feature}></FeaturesCard>)
       }
      </div>
    </section>
  );
};

export default Features;
