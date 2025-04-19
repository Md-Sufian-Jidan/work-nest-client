import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import 'swiper/css';
import 'swiper/css/navigation';

const banners = [
  {
    title: "Empower Your Workspace",
    subtitle: "Track employee performance, streamline operations, and boost productivity.",
    image: "https://i.ibb.co/WWsc7nxH/42852-1.jpg",
  },
  {
    title: "Real-Time Workflow Updates",
    subtitle: "Get updates as they happen. Manage your team efficiently.",
    image: "https://i.ibb.co/23F68Jyf/2149631015-1.jpg", // Replace with your actual link
  },
  {
    title: "Secure & Scalable",
    subtitle: "Modern HR tools that grow with your team.",
    image: "https://i.ibb.co/gMXtHLyM/22112340-6534502-1-1.jpg", // Replace with your actual link
  },
];

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {banners.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide?.image}
                alt={slide?.title}
                className="h-[60vh] w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold drop-shadow">{slide.title}</h2>
                <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow">{slide.subtitle}</p>
                <button className="mt-6 bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
                  Get Started
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner