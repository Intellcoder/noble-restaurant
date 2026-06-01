import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../../store/cart.store";
import toast from "react-hot-toast";

type FoodCardProps = {
  id: string;
  slug?: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  badge?: string;
  category?: string;
  isAvailable?: boolean;
};

const FoodCard = ({
  id,
  slug,
  name,
  image,
  price,
  description,
  badge,
  category,
  isAvailable = true,
}: FoodCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      image,
      price,
      quantity: 1,
    });
    toast.success("Added to cart");
  };

  return (
    <article
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
      itemScope
      itemType="https://schema.org/MenuItem"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={`${name} Nigerian meal served at Noble Restaurant Osogbo`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          itemProp="image"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* BADGE */}
        {badge && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            {badge}
          </span>
        )}

        {/* CATEGORY */}
        {category && (
          <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        )}

        {/* QUICK VIEW */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300">
          <Link
            to={`/menu/${slug || id}`}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition"
            aria-label={`View ${name}`}
          >
            <Eye size={18} className="text-gray-800" />
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-4">
        {/* TITLE + PRICE */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className="text-lg md:text-xl font-bold text-gray-900 line-clamp-1"
              itemProp="name"
            >
              {name}
            </h3>

            {description && (
              <p
                className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2"
                itemProp="description"
              >
                {description}
              </p>
            )}
          </div>

          <span
            className="text-red-600 font-extrabold text-lg whitespace-nowrap"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <meta itemProp="priceCurrency" content="NGN" />
            <span className="text-sm"> ₦</span>
            <span itemProp="price">{price}</span>
          </span>
        </div>

        {/* AVAILABILITY */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>

          <span className="text-xs text-gray-400">Freshly Prepared 🍽️</span>
        </div>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all duration-300 ${
            isAvailable
              ? "bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingCart size={18} />
          {isAvailable ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
};

export default FoodCard;
