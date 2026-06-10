import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../shared/api";
import Loader from "../../../shared/components/Loader";

type Category = {
  id: string;
  name: string;
};

const CategoryEditPage = () => {
  const { id } = useParams();
  //   const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const res = await api.get(`/category/${id}`);

        const data = res.data.data || res.data;

        setCategory(data);
        setName(data.name);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
    if (!id || !name.trim()) return;

    try {
      setSaving(true);

      const payload = {
        name: name.trim(),
      };

      const res = await api.patch(`/category/${id}`, payload);

      setCategory(res.data.data || payload);

      // Optional redirect
      // navigate("/admin/categories");
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Category not found
        </h2>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Edit Category</h1>

        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:border-red-500 focus:outline-none"
            placeholder="Enter category name"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdate}
            disabled={saving || !name.trim()}
            className="rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Category"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default CategoryEditPage;
