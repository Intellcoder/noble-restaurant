import { useMemo, useState } from "react";

import Card from "../components/Card";

type Category =
  | "All"
  | "Starters"
  | "Soup & Swallows"
  | "Rice & Grains"
  | "Grills & Proteins"
  | "Desserts";

type Food = {
  id: number;
  name: string;
  image: string;
  price: number;
  badge?: string;
  description: string;
  category: Category;
};

const categories: Category[] = [
  "All",
  "Starters",
  "Soup & Swallows",
  "Rice & Grains",
  "Grills & Proteins",
  "Desserts",
];

const foods: Food[] = [
  {
    id: 1,
    name: "Signature Jollof Rice",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200",
    price: 3500,
    badge: "Popular",
    description: "Smoky Nigerian jollof rice served with grilled chicken.",
    category: "Rice & Grains",
  },
  {
    id: 2,
    name: "Amala & Ewedu",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200",
    price: 3200,
    badge: "Traditional",
    description: "Fresh amala paired with authentic ewedu and stew.",
    category: "Soup & Swallows",
  },
  {
    id: 3,
    name: "Catfish Pepper Soup",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
    price: 4200,
    badge: "Spicy",
    description: "Hot and flavorful catfish pepper soup with local spices.",
    category: "Soup & Swallows",
  },
  {
    id: 4,
    name: "Suya Beef",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1200",
    price: 2800,
    badge: "Grilled",
    description: "Tender spicy beef suya grilled to perfection.",
    category: "Grills & Proteins",
  },
  {
    id: 5,
    name: "Fried Rice Special",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200",
    price: 3600,
    badge: "Best Seller",
    description: "Premium fried rice mixed with vegetables and shrimp.",
    category: "Rice & Grains",
  },
  {
    id: 6,
    name: "Chicken Wings",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1200",
    price: 2500,
    badge: "Starter",
    description: "Crispy spicy wings served with signature sauce.",
    category: "Starters",
  },
  {
    id: 7,
    name: "Grilled Chicken",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200",
    price: 4500,
    badge: "Chef Choice",
    description: "Juicy grilled chicken marinated with Nigerian spices.",
    category: "Grills & Proteins",
  },
  {
    id: 8,
    name: "Chocolate Lava Cake",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200",
    price: 2200,
    badge: "Dessert",
    description: "Warm chocolate cake with creamy vanilla drizzle.",
    category: "Desserts",
  },
];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredFoods = useMemo(() => {
    if (activeCategory === "All") return foods;

    return foods.filter((food) => food.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <main className="bg-white">
        {/* HERO BANNER */}
        <section className="relative h-[60vh] overflow-hidden">
          {/* BACKGROUND IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600"
            alt="Nigerian restaurant menu in Osogbo"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/70" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
            <span className="uppercase tracking-[4px] text-red-500 text-sm font-medium">
              Noble Restaurant Menu
            </span>

            {/* SEO H1 */}
            <h1 className="mt-4 text-white font-[Playfair_Display] text-4xl md:text-6xl font-bold max-w-4xl leading-tight">
              Authentic Nigerian Food Menu in Osogbo
            </h1>

            <p className="mt-6 text-gray-300 max-w-2xl leading-8">
              Explore our delicious collection of Nigerian soups, swallows, rice
              dishes, grills, desserts, and signature chef specials freshly
              prepared daily.
            </p>
          </div>
        </section>

        {/* MENU SECTION */}
        <section className="px-5 py-20 max-w-7xl mx-auto">
          {/* HEADER */}
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explore Our Menu
            </h2>

            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Discover premium Nigerian cuisine including jollof rice, pepper
              soup, grilled proteins, desserts, and local delicacies in Osogbo.
            </p>
          </header>

          {/* CATEGORY NAV */}
          <nav className="flex flex-wrap items-center justify-center gap-4 mb-14">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full border transition text-sm md:text-base ${
                  activeCategory === category
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* FOOD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFoods.map((food) => (
              <Card
                key={food.id}
                name={food.name}
                image={food.image}
                price={food.price}
                badge={food.badge}
                description={food.description}
                onAddToCart={() => console.log("Added:", food.name)}
              />
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredFoods.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No meals available in this category 🍽️
            </div>
          )}
        </section>

        {/* CTA SECTION */}
        <section className="bg-black text-white py-20 px-5">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold leading-tight">
              Experience Fine Dining in Osogbo
            </h2>

            <p className="mt-6 text-gray-300 leading-8 max-w-2xl mx-auto">
              Reserve your table today or order your favorite Nigerian meals
              online from Noble Restaurant.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
              <button className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl font-semibold">
                Reserve a Table
              </button>

              <button className="border border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-xl font-semibold">
                Order Online
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MenuPage;
