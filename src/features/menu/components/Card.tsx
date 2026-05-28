import { ShoppingCart } from "lucide-react";

type FoodCardProps = {
  name: string;
  image: string;
  price: number;
  description?: string;
  badge?: string;
  onAddToCart?: () => void;
};

const FoodCard = ({
  name,
  image,
  price,
  description,
  badge,
  onAddToCart,
}: FoodCardProps) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border">
      {/* IMAGE SECTION */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={`${name} Nigerian food in Osogbo`}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />

        {/* BADGE */}
        {badge && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        {/* NAME */}
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

        {/* DESCRIPTION */}
        {description && (
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        )}

        {/* PRICE */}
        <div className="text-red-600 font-bold text-lg">
          ₦{price.toLocaleString()}
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={onAddToCart}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
