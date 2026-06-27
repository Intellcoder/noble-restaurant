import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { api } from "../../../shared/api";
import Loader from "../../../shared/components/Loader";

type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable?: boolean;
};

const FoodDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchFood = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/food/${id}`);

        const { data } = response.data;

        setFoodItem(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch food item");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalPrice = foodItem ? foodItem.price * quantity : 0;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!foodItem) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-gray-500">Food item not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* LEFT SIDE IMAGE */}
        <div>
          <img
            src={foodItem.imageUrl}
            alt={foodItem.name}
            className="w-full h-[400px] object-cover rounded-3xl shadow-xl"
          />

          {/* <div className="grid grid-cols-4 gap-3 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <img
                key={item}
                src={foodItem.imageUrl}
                alt="food preview"
                className="h-24 rounded-xl object-cover cursor-pointer border hover:scale-105 transition"
              />
            ))}
          </div> */}
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div>
          {/* Badge */}
          <div className="flex gap-3 items-center">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              🍽 {foodItem.category}
            </span>

            {foodItem.isAvailable ? (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                Available
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                Sold Out
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mt-5">{foodItem.name}</h1>

          {/* Description */}
          <p className="text-gray-500 leading-8 mt-5">{foodItem.description}</p>

          {/* Price */}
          <div className="mt-8">
            <span className="text-4xl font-bold text-red-600">
              ₦{foodItem.price.toLocaleString()}
            </span>
          </div>

          {/* Quantity */}
          <div className="mt-10">
            <h3 className="font-semibold text-lg mb-4">Quantity</h3>

            <div className="flex items-center gap-4">
              <button
                onClick={decreaseQuantity}
                className="w-12 h-12 bg-gray-200 rounded-xl text-xl"
              >
                -
              </button>

              <div className="w-12 h-12 flex items-center justify-center text-lg font-semibold">
                {quantity}
              </div>

              <button
                onClick={increaseQuantity}
                className="w-12 h-12 bg-red-600 text-white rounded-xl text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mt-8 p-5 bg-white rounded-2xl shadow-sm border">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Price</span>

              <span className="text-2xl font-bold text-red-600">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Food Customization */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg">Customize Order</h3>

            <div className="space-y-4 mt-4">
              <label className="flex justify-between">
                <span>Extra Chicken (+₦1000)</span>
                <input type="checkbox" />
              </label>

              <label className="flex justify-between">
                <span>Extra Sauce (+₦500)</span>
                <input type="checkbox" />
              </label>

              <label className="flex justify-between">
                <span>Extra Drink (+₦800)</span>
                <input type="checkbox" />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button className="bg-red-600 text-white py-4 rounded-2xl font-semibold hover:bg-red-700 transition">
              Add To Cart
            </button>

            <button className="bg-black text-white py-4 rounded-2xl font-semibold">
              Buy Now
            </button>
          </div>

          {/* Delivery */}
          <div className="mt-8 p-5 bg-white rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-3">Delivery Information</h3>

            <p className="text-gray-500">🚚 Estimated delivery: 30 - 45 mins</p>

            <p className="text-gray-500 mt-2">
              📍 Delivery fee calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;
