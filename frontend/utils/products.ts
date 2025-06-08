import api from "./api";
import { Product } from "@/types/product";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data.products;
};

interface ProductInput {
  title: string;
  description?: string;
  cost?: number;
  banner_image?: File | null;
}

export const createProduct = async (input: ProductInput): Promise<Product> => {
  const formData = new FormData();
  formData.append("title", input.title);
  if (input.description) formData.append("description", input.description);
  if (input.cost !== undefined) formData.append("cost", input.cost.toString());
  if (input.banner_image) formData.append("banner_image", input.banner_image);

  const res = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.product;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data.product;
};

export const updateProduct = async (
  id: number,
  input: ProductInput
): Promise<Product> => {
  const formData = new FormData();
  formData.append("title", input.title);
  if (input.description) formData.append("description", input.description);
  if (input.cost !== undefined) formData.append("cost", input.cost.toString());
  if (input.banner_image) formData.append("banner_image", input.banner_image);

  const res = await api.post(`/products/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.product;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
