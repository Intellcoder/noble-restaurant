import React, { useEffect, useState } from "react";
import { api } from "../../../shared/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

type ProductForm = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  requirePackaging: boolean;
};

type Category = {
  id: string;
  name: string;
};

const initialForm: ProductForm = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  requirePackaging: false,
};

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState<ProductForm>(initialForm);

  useEffect(() => {
    if (!id) return;

    loadInitialData();
  }, [id]);

  const loadInitialData = async () => {
    try {
      await Promise.all([fetchProduct(), fetchCategories()]);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/food/${id}`);
      const product = data.data;

      console.log("res:", data);
      setFormData({
        name: product.name ?? "",
        description: product.description ?? "",
        price: product.price ?? 0,
        categoryId: product.categoryId ?? "",
        requirePackaging: product.requirePackaging ?? false,
      });

      setImagePreview(product.image ?? "");
    } catch (error) {
      toast.error("Failed to fetch product");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/category");
      setCategories(data.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    let parsedValue: string | number | boolean = value;

    if (name === "price") {
      parsedValue = Number(value);
    }

    if (name === "requirePackaging") {
      parsedValue = value === "true";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const buildFormData = () => {
    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", String(formData.price));
    payload.append("categoryId", formData.categoryId);
    payload.append("requirePackaging", String(formData.requirePackaging));

    if (selectedImage) {
      payload.append("image", selectedImage);
    }

    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await api.put(`/food/${id}`, buildFormData(), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
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

        {/* Require Packaging */}
        <select
          name="requirePackaging"
          value={String(formData.requirePackaging)}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="false">No Packaging Required</option>
          <option value="true">Requires Packaging</option>
        </select>

        {/* Category */}
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

        {/* Image */}
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
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
