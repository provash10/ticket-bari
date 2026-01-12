import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../assets/bannerImg1.webp";
import bannerImg2 from "../../assets/bannerImg2.webp";
import bannerImg3 from "../../assets/bannerImg3.webp";
import bannerImg4 from "../../assets/bannerImg4.webp";
import bannerImg5 from "../../assets/bannerImg5.webp";

const slides = [
  {
    image: bannerImg1,
    title: "Book Tickets Effortlessly",
    subtitle: "Fast, secure and reliable ticket booking platform",
  },
  {
    image: bannerImg2,
    title: "Travel Smarter",
    subtitle: "Choose routes, compare prices, book instantly",
  },
  {
    image: bannerImg3,
    title: "Verified Vendors",
    subtitle: "Safe journeys with trusted transport partners",
  },
  {
    image: bannerImg4,
    title: "Anytime, Anywhere",
    subtitle: "Book tickets from your mobile or desktop",
  },
  {
    image: bannerImg5,
    title: "Your Journey Starts Here",
    subtitle: "Comfortable travel with Ticket Bari",
  },
];

const Banner = () => {
  return (
    <section className="relative w-full h-[65vh] rounded-2xl overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3500}
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[65vh]">
            {/* background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 text-left text-white">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl">
                  {slide.title}
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-200 max-w-lg">
                  {slide.subtitle}
                </p>

                {/* CTA */}
                <div className="mt-6 flex gap-4">
                  <button className="btn btn-primary rounded-full px-6">
                    Explore Tickets
                  </button>
                  <button className="btn btn-outline text-white border-white rounded-full px-6 hover:bg-white hover:text-black">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white opacity-80">
        <span className="text-sm">Scroll ↓</span>
      </div>
    </section>
  );
};

export default Banner;
