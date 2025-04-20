import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sofia Khan",
    role: "HR Executive at DigiCorp",
    feedback: "WorkNest completely transformed how we manage our employees. It’s intuitive, fast, and keeps everything organized.",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Ryan Thomas",
    role: "Senior Developer at CodeBase",
    feedback: "I love the workflow tracking feature. Being able to log hours and see payments clearly is a game-changer.",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Priya Mehra",
    role: "Digital Marketer at MarketGen",
    feedback: "It’s user-friendly and mobile responsive. I can update my work from anywhere, which is amazing!",
    image: "https://i.pravatar.cc/100?img=44",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What Our Users Say
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Real voices from people who use WorkNest to manage teams smarter.
        </motion.p>

        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="pb-10"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                className="bg-gray-50 p-8 rounded-xl shadow text-left max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">“{t.feedback}”</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
export default Testimonials;