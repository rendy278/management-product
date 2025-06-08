"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { updateProduct } from "@/utils/products";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface ModalEditProps {
  product: Product;
  onClose: () => void;
  onSuccess: (updatedProduct: Product) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  product,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description || "",
    cost: product.cost.toString(),
    banner_image: null as File | null,
    previewImage: product.banner_image,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({
      ...prev,
      banner_image: file,
      previewImage: file ? URL.createObjectURL(file) : prev.previewImage,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(product.id, {
        title: formData.title,
        description: formData.description,
        cost: Number(formData.cost),
        banner_image: formData.banner_image,
      });
      onSuccess(updatedProduct);
      toast.success("Product updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <div>
                <label htmlFor="title" className="block font-medium mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="cost" className="block font-medium mb-1">
                  Cost
                </label>
                <input
                  id="cost"
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div>
                <label
                  htmlFor="banner_image"
                  className="block font-medium mb-1"
                >
                  Banner Image
                </label>
                <input
                  id="banner_image"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full bg-blue-500 p-2 rounded-md text-white"
                />
              </div>

              {formData.previewImage && (
                <Image
                  src={
                    formData.banner_image
                      ? formData.previewImage
                      : `http://127.0.0.1:8000/storage/${formData.previewImage}`
                  }
                  width={600}
                  height={300}
                  alt="Preview"
                  className="mt-2 max-h-40 w-full object-contain border rounded"
                />
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 cursor-pointer px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
