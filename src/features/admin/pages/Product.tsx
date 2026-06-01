import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../../shared/api";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminFoodCard from "../components/FoodCard";

type Food = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  isAvailable: boolean;
};

const Products = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const res = await api.get("/food");
      const { foods } = res.data;
      // adjust according to backend structure
      const foodsData = foods;

      setFoods(foodsData);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id: string) => {
    try {
      await api.delete(`/food/${id}`);

      setFoods((prev) => prev.filter((food) => food.id !== id));

      toast.success("Food deleted");
    } catch (error) {
      console.log(error);

      toast.error("Unable to delete food");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-3xl">Products</h1>

          <p className="text-gray-500">Manage food items</p>
        </div>

        <Link
          to="/admin/product/new"
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading products...</div>
      ) : foods.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center">
          No products found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {foods.map((food) => (
            <AdminFoodCard
              key={food.id}
              food={food}
              onDelete={() => deleteFood(food.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
