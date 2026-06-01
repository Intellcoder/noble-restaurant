import React, { useEffect, useState } from "react";
import { api } from "../../../shared/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../../../shared/components/Loader";

type Category = {
  id: string;
  name: string;
};

type ProductForm = {
  name: string;
  price: number;
  categoryId: string;
  category: string;
  quantity: number;
  description: string;
  image: File | null;
  isAvailable: boolean;
};

const initialState: ProductForm = {
  name: "",
  price: 0,
  categoryId: "",
  category: "",
  quantity: 0,
  description: "",
  image: null,
  isAvailable: true,
};

const NewProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductForm>(initialState);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Separate loading states
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setPageLoading(true);

        const res = await api.get("/category");

        const categoryData = res.data.data || res.data;

        setCategories(categoryData);
      } catch (error) {
        console.error("Failed to load categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "new") {
      navigate("/admin/categories/new");
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.id === value,
    );

    if (!selectedCategory) return;

    setForm((prev) => ({
      ...prev,
      categoryId: selectedCategory.id,
      category: selectedCategory.name,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);

      let categoryId = form.categoryId;
      let categoryName = form.category;

      // Create category if needed
      if (showNewCategory && newCategoryName) {
        const categoryRes = await api.post("/category", {
          name: newCategoryName,
        });

        const category = categoryRes.data.data || categoryRes.data;

        categoryId = category.id;
        categoryName = category.name;

        // Update local category list
        setCategories((prev) => [...prev, category]);
      }

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", form.price.toString());
      formData.append("quantity", form.quantity.toString());
      formData.append("description", form.description);
      formData.append("isAvailable", form.isAvailable.toString());
      formData.append("categoryId", categoryId);
      formData.append("category", categoryName);

      if (form.image) {
        formData.append("image", form.image);
      }

      await api.post("/food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully");

      setForm(initialState);
      setNewCategoryName("");
      setShowNewCategory(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to create product");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Show loader while fetching categories
  if (pageLoading) {
    return <Loader variant="spinner" />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h1 className="text-2xl font-bold">Create Product</h1>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full p-3 border rounded-xl"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-3 border rounded-xl"
              required
            />

            <select
              value={form.categoryId}
              onChange={handleCategorySelect}
              className="p-3 border rounded-xl"
              required
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}

              <option value="new">+ Create New Category</option>
            </select>
          </div>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full p-3 border rounded-xl"
            required
          />

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-xl"
            required
          />

          <input type="file" onChange={handleFileChange} />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  isAvailable: e.target.checked,
                }))
              }
            />
            Available
          </label>

          <button
            type="submit"
            disabled={submitLoading}
            className="w-full bg-red-500 text-white rounded-xl py-3 disabled:opacity-50"
          >
            {submitLoading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
