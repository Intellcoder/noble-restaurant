type Props = {
  image: string;
  name: string;
  role: string;
  review: string;
};

const TestimonialCard = ({ image, name, role, review }: Props) => {
  return (
    <article className="relative bg-[#E8E8E8] rounded-[40px] px-6 pt-16 pb-8 text-center shadow-sm hover:shadow-md transition">
      {/* AVATAR */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <img
          src={image}
          alt={`${name} customer review`}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
        />
      </div>

      {/* REVIEW */}
      <p className="text-gray-600 leading-7 text-sm md:text-base mt-4">
        {review}
      </p>

      {/* USER INFO */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-gray-900">{name}</h3>

        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </article>
  );
};

export default TestimonialCard;
