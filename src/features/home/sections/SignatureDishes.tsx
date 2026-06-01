import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { api } from "../../../shared/api";

type Food = {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  badge?: string;
};

const SignatureDishes = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);

        const res = await api.get("/food");

        // Adjust based on your API response structure
        const data = res.data.foods || res.data;

        setFoods(data);
      } catch (error) {
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Preview only first 9 foods
  const previewFoods = foods.slice(0, 9);

  return (
    <section className="px-5 py-12">
      {/* HEADER */}
      <header className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Signature Dishes
        </h2>

        <div className="w-20 h-1 bg-red-600 mt-2 rounded-full" />

        <p className="text-gray-500 mt-3 max-w-md">
          Taste our most loved Nigerian meals, freshly prepared every day.
        </p>
      </header>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin" />
        </div>
      ) : previewFoods.length > 0 ? (
        <>
          {/* FOOD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {previewFoods.map((food) => (
              <Card
                key={food.id}
                id={food.id}
                name={food.name}
                image={
                  food.imageUrl ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                price={food.price}
                badge={food.badge}
                onAddToCart={() => console.log("Added:", food.name)}
              />
            ))}
          </div>

          {/* CTA BUTTON */}
          <div className="flex justify-center mt-10">
            <Link
              to="/menu"
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
            >
              Explore Full Menu 🍽️
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🍽️</div>

          <h3 className="text-lg font-semibold text-gray-700">
            No food available
          </h3>

          <p className="text-gray-500 mt-2">
            New dishes will appear here soon.
          </p>
        </div>
      )}
    </section>
  );
};

export default SignatureDishes;
