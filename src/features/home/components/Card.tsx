import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../store/cart.store";
import toast from "react-hot-toast";
type FoodCardProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  badge?: string;
  onAddToCart?: () => void;
};

const FoodCard = ({
  id,
  name,
  image,
  price,
  description,
  badge,
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
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={`${name} Nigerian food served at Noble Restaurant Osogbo`}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* BADGE */}
        {badge && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-3">
        {/* TITLE + PRICE */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {name}
          </h3>

          <span className="text-red-600 font-bold whitespace-nowrap">
            ₦{price.toLocaleString()}
          </span>
        </div>

        {/* DESCRIPTION */}
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:scale-[0.98] transition text-white py-3 rounded-xl font-medium"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default FoodCard;
