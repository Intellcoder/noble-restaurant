import React, { useState } from "react";

import toast from "react-hot-toast";
import { api } from "../../../shared/api";

type CategoryForm = {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
};

const initialState: CategoryForm = {
  name: "",
  slug: "",
  description: "",
  isActive: true,
};

// 🔥 slug generator
const generateSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const CreateCategory = () => {
  const [form, setForm] = useState<CategoryForm>(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // auto-generate slug when name changes
      if (name === "name") {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: replace with API call
      console.log("Category Data:", form);

      const res = await api.post("/category", form);
      if (res.data.success) {
        toast.success("Category created successfully!");
      }
      setForm(initialState);
    } catch (error) {
      console.error(error);
      //   alert("Failed to create category");
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Category
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Organize your menu items into categories
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Category Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g Rice Meals"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Slug (SEO URL)
            </label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="e.g rice-meals"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Used for URLs like /menu/{form.slug || "category"}
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe this category..."
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
            />
            <label className="text-sm text-gray-700">
              Active category (visible in menu)
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
