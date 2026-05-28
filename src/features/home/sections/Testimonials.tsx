import TestimonialCard from "../components/TestimonialCard";

const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    name: "Ama Ampomah",
    role: "CEO & Founder Inc",
    review:
      "Noble Restaurant gave me one of the best dining experiences in Osogbo. The jollof rice and ambience were absolutely unforgettable.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    name: "Kweku Annan",
    role: "CEO & Founder Inc",
    review:
      "Excellent customer service, premium atmosphere, and authentic Nigerian cuisine. Highly recommended for fine dining lovers.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#F5F5F5] px-5 py-20">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-gray-900">
          Our Happy Customers
        </h2>

        <p className="mt-4 text-gray-500 leading-7">
          Hear what our amazing guests have to say about their unforgettable
          dining experience at Noble Restaurant.
        </p>
      </header>

      {/* TESTIMONIAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
