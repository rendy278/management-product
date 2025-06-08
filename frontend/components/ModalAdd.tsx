"use client";

import React, { useState } from "react";
import { createProduct } from "@/utils/products"; // sesuaikan path
import { Product } from "@/types/product";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface ModalAddProps {
  onClose: () => void;
  onSuccess: (newProduct: Product) => void;
}

const ModalAdd: React.FC<ModalAddProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cost: "",
    banner_image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      banner_image: e.target.files?.[0] ?? null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const product = await createProduct({
        title: formData.title,
        description: formData.description,
        cost: Number(formData.cost),
        banner_image: formData.banner_image,
      });
      onSuccess(product);
      toast.success("Product successfully created!"); // ✅ Notifikasi sukses
      onClose();
    } catch (error) {
      console.error("Error creating product", error);
      toast.error("Failed to create product."); // ❌ Notifikasi gagal (optional)
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
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
                  placeholder="Title"
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
                  placeholder="Description"
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
                  placeholder="Cost"
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

              {formData.banner_image && (
                <Image
                  src={URL.createObjectURL(formData.banner_image)}
                  width={800}
                  height={800}
                  alt="Preview"
                  className="mt-2 max-h-96 w-full object-contain border rounded"
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
              className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAdd;
