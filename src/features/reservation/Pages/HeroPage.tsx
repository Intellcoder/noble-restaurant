import { useEffect, useState } from "react";

import hero1 from "../../../assets/nick-karvounis-Ciqxn7FE4vE-unsplash.jpg";
import hero2 from "../../../assets/patrick-tomasso-GXXYkSwndP4-unsplash.jpg";
import hero3 from "../../../assets/jason-leung-poI7DelFiVA-unsplash.jpg";

const slides = [
  {
    image: hero1,
    title: "Reserve a Table or Book an Event at Noble Restaurant",
    subtitle:
      "Enjoy fine dining or host unforgettable events with premium Nigerian cuisine and top-tier service.",
  },
  {
    image: hero1,
    title: "  Reserve Your Table",
    subtitle: "Secure your dining experience at Noble Restaurant.",
  },
  {
    image: hero2,
    title: "Book Dining Experience in Osogbo",
    subtitle:
      "Secure your table and enjoy freshly prepared Nigerian meals in a calm, elegant environment.",
  },
  {
    image: hero3,
    title: "Host Weddings, Birthdays & Corporate Events",
    subtitle:
      "We provide event space, catering, and full service support for your special occasions.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full h-[85vh] overflow-hidden">
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt="Noble Restaurant dining and events venue"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        {/* SEO H1 */}
        <h1 className="text-white text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
          {slides[current].title}
        </h1>

        {/* SEO DESCRIPTION */}
        <p className="text-gray-200 mt-4 text-sm md:text-lg max-w-2xl">
          {slides[current].subtitle}
        </p>

        {/* CTA SECTION */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {/* Dining CTA */}
          {/* <Link
            to="/reservation/dining"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Book Dining
          </Link> */}

          {/* Event CTA */}
          {/* <Link
            to="/reservation/events"
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Book Events
          </Link> */}
        </div>

        {/* SEO SUPPORT TEXT */}
        <p className="text-xs text-gray-400 mt-3 max-w-xl">
          Reserve dining tables or event spaces in Osogbo. Perfect for
          birthdays, weddings, corporate events, and private dining experiences.
        </p>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </header>
  );
};

export default HeroSection;
