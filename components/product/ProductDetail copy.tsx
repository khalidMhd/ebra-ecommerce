"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import { RenderStars } from "../renderStars";

export default function ProductDetail({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="p-6 mt-6 sm:p-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-sm">
      <div className="flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain rounded-xl border p-4 bg-gray-50"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex">{RenderStars(product?.rating?.rate ?? 0)}</div>
          <div className="text-sm text-gray-600">({product?.rating?.count ?? 0} reviews)</div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-2xl text-green-600 font-semibold mt-2">${product.price}</p>

        <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>

        <p className="mt-4 text-sm text-gray-500 italic">Category: {product.category}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-semibold py-2 px-6 rounded-full shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
