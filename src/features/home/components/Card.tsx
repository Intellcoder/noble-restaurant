import { ShoppingCart } from "lucide-react";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useCartStore } from "../../../store/cart.store";

type FoodAddon = {
  id: string;
  name: string;
  price: number;
};

type FoodCardProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  badge?: string;

  requirePackaging: boolean;
  packagingFee?: number;

  addons?: FoodAddon[];
};

const FoodCard = ({
  id,
  name,
  image,
  price,
  description,
  badge,
  requirePackaging,
  packagingFee = 0,
  addons = [],
}: FoodCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    /**
     * Later:
     * if addons exist -> open modal
     */

    addToCart({
      cartId: nanoid(),

      id: id,

      name,
      image,

      price: price,

      quantity: 1,

      requirePackaging,

      packagingFee: requirePackaging ? packagingFee : 0,

      addons: [],
    });

    toast.success(`${name} added to cart`);
  };

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {badge && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Name + Price */}
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {name}
          </h3>

          <span className="text-red-600 font-bold whitespace-nowrap">
            ₦{price.toLocaleString()}
          </span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Packaging indicator */}
        {requirePackaging && (
          <p className="text-xs text-orange-500">
            Packaging fee: ₦{packagingFee.toLocaleString()}
          </p>
        )}

        {/* Addons indicator */}
        {addons.length > 0 && (
          <p className="text-xs text-gray-400">
            Customizable ({addons.length} extras available)
          </p>
        )}

        {/* Button */}
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
