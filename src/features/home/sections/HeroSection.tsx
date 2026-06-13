import { useEffect, useState } from "react";

import hero1 from "../../../assets/restaurant 1.jpeg";
import hero2 from "../../../assets/restaurant 2.jpeg";
import hero3 from "../../../assets/restaurant 3.jpeg";
import { Link } from "react-router-dom";

const slides = [
  {
    image: hero1,
    title: "Best Nigerian Restaurant in Osogbo",
    subtitle: "Delicious meals delivered hot & fast to your doorstep",
  },
  {
    image: hero2,
    title: "Taste Authentic Jollof Rice",
    subtitle: "Freshly cooked Nigerian meals made daily",
  },
  {
    image: hero3,
    title: "Fast Food Delivery in Osogbo",
    subtitle: "Order now and get your food in 30 minutes",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
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
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* TEXT CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        {/* SEO H1 */}
        <h1 className="text-white text-3xl md:text-5xl font-bold max-w-3xl">
          {slides[current].title}
        </h1>

        <p className="text-gray-200 mt-4 text-sm md:text-lg max-w-xl">
          {slides[current].subtitle}
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-6 flex gap-4">
          <Link to={"/menu"}>
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition">
              Order Now
            </button>
          </Link>

          <Link to={"/menu"}>
            <button className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition">
              View Menu
            </button>
          </Link>
        </div>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
