import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../shared/api";
import { toast } from "react-hot-toast";

type Category = {
  id: string;
  name: string;
  foodsCount?: number;
  createdAt?: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await api.get("/category");

      // adjust based on your API response structure
      const categoryData = res.data.data.categories || res.data.data;
      console.log(categoryData);
      setCategories(categoryData);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load categories");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await api.delete(`/category/${id}`);

      setCategories((prev) => prev.filter((category) => category.id !== id));

      toast.success("Category deleted");
    } catch (error) {
      console.log(error);

      toast.error("Unable to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>

          <p className="text-gray-500">Manage food categories</p>
        </div>

        <Link
          to="/admin/categories/new"
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl text-white flex items-center gap-2"
        >
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-10 border rounded-xl">
          No categories found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Name</th>
                <th className="pb-4">Products</th>
                <th className="pb-4">Created</th>
                <th className="pb-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b h-20">
                  <td className="font-medium">{category.name}</td>

                  <td>{category.foodsCount || 0}</td>

                  <td className="text-gray-500">
                    {category.createdAt
                      ? new Date(category.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/categories/edit/${category.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Categories;
