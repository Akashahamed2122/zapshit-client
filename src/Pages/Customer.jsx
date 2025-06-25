// src/components/Customer.jsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Awlad Hossin',
    title: 'Senior Product Designer',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Rasel Ahamed',
    title: 'CTO',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Nasir Uddin',
    title: 'CEO',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
];

export default function Customer() {
  return (
    <div className="py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.2 },
        }}
        className="relative max-w-6xl mx-auto"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-xl rounded-xl p-8 h-full">
              <p className="text-gray-600 mb-6">❝ {t.text} ❞</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800"></div>
                <div>
                  <h4 className="font-bold text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <div className="swiper-button-prev bg-white border rounded-full p-2 shadow absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
          ←
        </div>
        <div className="swiper-button-next bg-lime-400 border rounded-full p-2 shadow absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
          →
        </div>
      </Swiper>
    </div>
  );
}
