import { Link } from "react-router-dom";
import Card from "../components/Card";

type Food = {
  name: string;
  image: string;
  price: number;
  badge?: string;
};

export const foods: Food[] = [
  {
    name: "Jollof Rice",
    image:
      "https://images.unsplash.com/photo-1604908177522-040c7f0c0c7b?auto=format&fit=crop&w=800&q=80",
    price: 2500,
    badge: "Popular",
  },
  {
    name: "Amala & Ewedu",
    image:
      "https://images.unsplash.com/photo-1625938146365-3f2c6c9d4a2a?auto=format&fit=crop&w=800&q=80",
    price: 3000,
    badge: "Traditional",
  },
  {
    name: "Pepper Soup (Goat Meat)",
    image:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80",
    price: 3500,
    badge: "Spicy",
  },
  {
    name: "Fried Rice",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    price: 2800,
    badge: "Popular",
  },
  {
    name: "Suya Beef",
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
    price: 2000,
    badge: "Grilled",
  },
  {
    name: "Burger & Fries",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    price: 3000,
    badge: "Fast Food",
  },
  {
    name: "Chicken Shawarma",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e2d2a9c3?auto=format&fit=crop&w=800&q=80",
    price: 2200,
    badge: "Street Food",
  },
  {
    name: "Grilled Chicken",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
    price: 3500,
    badge: "Grilled",
  },
  {
    name: "Pounded Yam & Egusi",
    image:
      "https://images.unsplash.com/photo-1625944525533-4733b4c7c5b8?auto=format&fit=crop&w=800&q=80",
    price: 3200,
    badge: "Classic",
  },
  {
    name: "Ofada Rice",
    image:
      "https://images.unsplash.com/photo-1617692855027-33b14f061a8d?auto=format&fit=crop&w=800&q=80",
    price: 2700,
    badge: "Local",
  },
  {
    name: "Moi Moi",
    image:
      "https://images.unsplash.com/photo-1604908554027-3d2f9d2c9c3a?auto=format&fit=crop&w=800&q=80",
    price: 1500,
    badge: "Healthy",
  },
  {
    name: "Efo Riro",
    image:
      "https://images.unsplash.com/photo-1625944025141-0c7c4c5b8b0c?auto=format&fit=crop&w=800&q=80",
    price: 2800,
    badge: "Soup",
  },
  {
    name: "Bitterleaf Soup",
    image:
      "https://images.unsplash.com/photo-1625944225778-4a0a7c5c1d2f?auto=format&fit=crop&w=800&q=80",
    price: 2900,
    badge: "Traditional",
  },
  {
    name: "Plantain & Egg Sauce",
    image:
      "https://images.unsplash.com/photo-1604908177450-8b4c3c5f3d9a?auto=format&fit=crop&w=800&q=80",
    price: 1800,
    badge: "Breakfast",
  },
  {
    name: "Jollof Rice & Chicken Combo",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d5b?auto=format&fit=crop&w=800&q=80",
    price: 4000,
    badge: "Best Seller",
  },
];

const SignatureDishes = () => {
  // 👉 show only 4 items (preview mode)
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
          Taste our most loved Nigerian meals, freshly prepared every day in
          Osogbo.
        </p>
      </header>

      {/* GRID */}
      {previewFoods.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {previewFoods.map((food) => (
              <Card
                key={food.name}
                {...food}
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
        <div className="text-center text-gray-500 py-10">
          No dishes available at the moment 🍽️
        </div>
      )}
    </section>
  );
};

export default SignatureDishes;
