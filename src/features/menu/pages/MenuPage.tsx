import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { api } from "../../../shared/api";
import Loader from "../../../shared/components/Loader";

type Category = string;

type Food = {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  badge?: string;
  description: string;
  category: string;
};

const MenuPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);

        const res = await api.get("/food");

        // Adjust according to your backend structure
        const foodData = res.data.foods || res.data;

        setFoods(foodData);
      } catch (error) {
        console.log("Error fetching foods:", error);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Generate categories dynamically from backend foods
  const categories = useMemo(() => {
    const categoryNames = foods.map((food) => food.category).filter(Boolean);

    return ["All", ...new Set(categoryNames)];
  }, [foods]);

  const filteredFoods = useMemo(() => {
    if (activeCategory === "All") return foods;

    return foods.filter((food) => food.category === activeCategory);
  }, [foods, activeCategory]);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600"
          alt="Restaurant menu"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
          <span className="uppercase tracking-[4px] text-red-500 text-sm font-medium">
            Noble Restaurant Menu
          </span>

          <h1 className="mt-4 text-white text-4xl md:text-6xl font-bold max-w-4xl">
            Authentic Nigerian Food Menu
          </h1>

          <p className="mt-6 text-gray-300 max-w-2xl">
            Explore our delicious collection of meals freshly prepared daily.
          </p>
        </div>
      </section>

      {/* MENU */}
      <section className="px-5 py-20 max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Our Menu</h2>

          <p className="mt-4 text-gray-500">
            Discover premium Nigerian cuisine and chef specials.
          </p>
        </header>

        {/* CATEGORY BUTTONS */}
        {!loading && categories.length > 1 && (
          <nav className="flex flex-wrap justify-center gap-4 mb-14">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full border transition
                ${
                  activeCategory === category
                    ? "bg-red-600 text-white border-red-600"
                    : "border-gray-300 text-gray-700 hover:border-red-500"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFoods.map((food) => (
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
                description={food.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🍽️</div>

            <h3 className="text-xl font-semibold text-gray-700">
              No food available
            </h3>

            <p className="text-gray-500 mt-2">
              Meals will appear here once added.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20 px-5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Experience Fine Dining
          </h2>

          <p className="mt-6 text-gray-300">
            Reserve your table today or order your favorite meals online.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
            <Link to="/reservation">
              <button className="bg-red-600 px-8 py-4 rounded-xl hover:bg-red-700">
                Reserve a Table
              </button>
            </Link>

            <Link to="/menu">
              <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black">
                Order Online
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
