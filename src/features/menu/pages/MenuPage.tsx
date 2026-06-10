import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../../../shared/components/Loader";
import { api } from "../../../shared/api";

type Food = {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  badge?: string;
  description: string;
};

type Category = {
  id: string;
  name: string;
  foods: Food[];
};

type Tab = "ALL" | string;

const MenuPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("Main Meals");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);

        const res = await api.get("/food/category");
        setCategories(res.data.foods || res.data || []);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  /**
   * Flatten all foods for "ALL" tab
   */
  const allFoods = useMemo(() => {
    return categories.flatMap((cat) => cat.foods);
  }, [categories]);

  /**
   * Get foods based on active tab
   */
  const displayedFoods = useMemo(() => {
    if (activeTab === "Main Meals") return allFoods;

    const category = categories.find((c) => c.id === activeTab);
    return category?.foods || [];
  }, [activeTab, categories, allFoods]);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600"
          alt="Restaurant menu"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <span className="text-sm font-medium uppercase tracking-[4px] text-red-500">
            Noble Restaurant Menu
          </span>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">
            Authentic Nigerian Food Menu
          </h1>

          <p className="mt-6 max-w-2xl text-gray-300">
            Explore our delicious collection of meals freshly prepared daily.
          </p>
        </div>
      </section>

      {/* MENU */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Explore Our Menu</h2>
          <p className="mt-4 text-gray-500">
            Discover premium Nigerian cuisine and chef specials.
          </p>
        </header>

        {/* 🔥 CATEGORY TABS */}
        {!loading && categories.length > 0 && (
          <div className="sticky top-0 z-20 mb-10 bg-white py-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {/* ALL TAB */}
              <button
                onClick={() => setActiveTab("Main Meals")}
                className={`whitespace-nowrap rounded-full px-5 py-2 border transition ${
                  activeTab === "Main Meals"
                    ? "bg-red-600 text-white border-red-600"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Main Meals
              </button>

              {/* CATEGORY TABS */}
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`whitespace-nowrap rounded-full px-5 py-2 border transition ${
                    activeTab === cat.id
                      ? "bg-red-600 text-white border-red-600"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : displayedFoods.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedFoods.map((food) => (
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
          <div className="py-20 text-center">
            <div className="mb-4 text-5xl">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No food available
            </h3>
            <p className="mt-2 text-gray-500">
              Meals will appear here once added.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-black px-5 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Experience Fine Dining
          </h2>

          <p className="mt-6 text-gray-300">
            Reserve your table today or order your favorite meals online.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
            <Link to="/reservation">
              <button className="rounded-xl bg-red-600 px-8 py-4 hover:bg-red-700">
                Reserve a Table
              </button>
            </Link>

            <Link to="/menu">
              <button className="rounded-xl border border-white px-8 py-4 hover:bg-white hover:text-black">
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
