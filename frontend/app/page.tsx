"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ModalAdd from "@/components/ModalAdd";
import { getProducts, deleteProduct } from "@/utils/products"; // sesuaikan path
import { Product } from "@/types/product";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import ModalEdit from "@/components/ModalEdit";
import Swal from "sweetalert2";

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleDeleteProduct = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((product) => product.id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete product:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the product.",
          icon: "error",
        });
      }
    }
  };

  return (
    <main>
      <Navbar />
      <section className="p-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 font-bold cursor-pointer text-white flex items-center gap-1 p-2 rounded-md"
        >
          Add Product
          <IoMdAdd />
        </button>
      </section>

      {showModal && (
        <ModalAdd
          onClose={() => setShowModal(false)}
          onSuccess={handleAddProduct}
        />
      )}

      {editProduct && (
        <ModalEdit
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSuccess={(updated) => {
            setProducts((prev) =>
              prev.map((item) => (item.id === updated.id ? updated : item))
            );
            setEditProduct(null);
          }}
        />
      )}

      <section className="p-6">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(product.cost)}
                </td>
                <td className="border px-4 py-2">
                  {product.banner_image && (
                    <Image
                      src={`http://127.0.0.1:8000/storage/${product.banner_image}`}
                      alt={product.title}
                      width={600}
                      height={400}
                      className="h-12 w-fit object-contain rounded"
                    />
                  )}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center gap-1 w-fit">
                    <button
                      onClick={() => setEditProduct(product)}
                      className="bg-yellow-500 cursor-pointer font-bold text-white flex items-center gap-1 p-2 rounded-md"
                    >
                      Edit <BiEdit />
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 cursor-pointer font-bold text-white flex items-center gap-1 p-2 rounded-md"
                    >
                      Delete <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Page;
