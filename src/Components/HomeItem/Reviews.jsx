import React, { Suspense } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Reviews = ({ reviewPromise }) => {
  // Suspense + use for async fetch
  const reviews = React.use(reviewPromise);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500 dark:text-gray-400">
        No reviews available yet.
      </div>
    );
  }

  return (
    <section className="my-24 bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
          What Our Clients Say
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          "Best Client - Best Reviews"
        </p>

        <Swiper
          loop={true}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 200,
            modifier: 1,
            scale: 0.9,
            slideShadows: true,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="py-8"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} className="flex justify-center">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8">
          <a
            href="/reviews"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Read All Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

