import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";

const banners = [
  {
    title: "Empower Your Workspace",
    subtitle: "Track employee performance, streamline operations, and boost productivity.",
    image: "https://i.ibb.co/WWsc7nxH/42852-1.jpg",
  },
  {
    title: "Real-Time Workflow Updates",
    subtitle: "Get updates as they happen. Manage your team efficiently.",
    image: "https://i.ibb.co/23F68Jyf/2149631015-1.jpg",
  },
  {
    title: "Secure & Scalable",
    subtitle: "Modern HR tools that grow with your team.",
    image: "https://i.ibb.co/gMXtHLyM/22112340-6534502-1-1.jpg",
  },
];

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <img
                src={slide?.image}
                alt={slide?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold drop-shadow-lg max-w-3xl">{slide.title}</h2>
                <p className="mt-3 font-body text-base sm:text-lg md:text-xl max-w-2xl drop-shadow-md">{slide.subtitle}</p>
                <Link to="/login">
                  <button className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition duration-300 shadow-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;