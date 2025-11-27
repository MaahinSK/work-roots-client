'use client';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Freelance Developer',
    content: 'Work Roots helped me find consistent projects and build my portfolio. The platform is intuitive and the clients are serious about hiring.',
    rating: 5
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Startup Founder',
    content: 'As a startup, we needed reliable talent quickly. Work Roots delivered exceptional professionals who helped us scale our development team.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'UX Designer',
    content: 'I doubled my income within 3 months of joining Work Roots. The quality of projects and clients is outstanding.',
    rating: 5
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Marketing Agency Owner',
    content: 'We use Work Roots for all our specialized talent needs. It has streamlined our hiring process and saved us countless hours.',
    rating: 5
  }
];

export default function TestimonialCarousel() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mx-auto max-w-2xl">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-2xl">★</span>
                ))}
              </div>
              <p className="text-xl italic mb-6">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                <p className="text-blue-200">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}