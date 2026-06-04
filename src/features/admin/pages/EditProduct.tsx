import React, { useEffect, useState } from "react";
import { api } from "../../../shared/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

type ProductForm = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
};

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/food/${id}`);

      const product = res.data.data;

      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        categoryId: product.categoryId || "",
      });

      setImagePreview(product.image);
    } catch {
      toast.error("Failed to fetch product");
    } finally {
      setFetching(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");

      setCategories(res.data.data);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("name", formData.name);

      payload.append("description", formData.description);

      payload.append("price", formData.price.toString());

      payload.append("categoryId", formData.categoryId);

      if (selectedImage) {
        payload.append("image", selectedImage);
      }

      await api.put(`/food/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully");

      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          rows={4}
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div>
          <label className="block mb-2">Product Image</label>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 h-44 w-44 rounded-lg object-cover border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
