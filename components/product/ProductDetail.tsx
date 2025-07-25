"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import { RenderStars } from "../common/RenderStars";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import ProductTabs from "./ProductTabs";
import { imageOptions } from "@/utils/helper";

export default function ProductDetail({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [timer, setTimer] = useState({ days: 2, hours: 12, minutes: 45, seconds: 4 });
  const [selectedImage, setSelectedImage] = useState(product.image);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          minutes = 59;
          seconds = 59;
          hours--;
        } else if (days > 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
          days--;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const discountedPrice = (product.price - product.price * 0.1).toFixed(2);

  return (
    <>
      <div className="p-6 mt-6 sm:p-10  mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* Image */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[400px] border rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden mb-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="object-cover h-full w-full transition-all duration-300"
            />
          </div>

          <div className="flex space-x-3">
            {[product.image, ...imageOptions].map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 object-cover rounded-md border cursor-pointer transition hover:scale-105 ${selectedImage === img ? "ring-2 ring-blue-500" : "border-gray-300"
                  }`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {/* Rating */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex">{RenderStars(product?.rating?.rate ?? 0)}</div>
            <div className="text-sm text-gray-600">({product?.rating?.count ?? 0} reviews)</div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          {/* Category & Description */}
          <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>
          <p className="mt-4 text-sm text-gray-500 italic">Category: {product.category}</p>
          {/* Price */}
          <div className="flex items-center space-x-4 mt-3">
            <p className="text-2xl text-black font-semibold">${discountedPrice}</p>
            <p className="text-lg text-gray-500 line-through">${product.price}</p>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Offer Expiry */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 font-medium mb-2">Offer expires in:</p>
            <div className="flex space-x-4 text-center text-sm font-semibold">
              <div>
                <div className="text-xl text-black">{String(timer.days).padStart(2, "0")}</div>
                <span className="text-gray-600">Days</span>
              </div>
              <div>
                <div className="text-xl text-black">{String(timer.hours).padStart(2, "0")}</div>
                <span className="text-gray-600">Hours</span>
              </div>
              <div>
                <div className="text-xl text-black">{String(timer.minutes).padStart(2, "0")}</div>
                <span className="text-gray-600">Minutes</span>
              </div>
              <div>
                <div className="text-xl text-black">{String(timer.seconds).padStart(2, "0")}</div>
                <span className="text-gray-600">Seconds</span>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Measurements */}
          <div className="mb-4">
            <p className="font-medium text-gray-800">Measurements:</p>
            <p className="text-gray-600 mt-1">17 1/2 * 20 5/8</p>
          </div>

          {/* Choose Color */}
          <div className="mb-4">
            <p className="font-medium text-gray-800 mb-2">Choose Color:</p>
            <div className="flex space-x-3">
              <span className="w-6 h-6 rounded-full bg-red-500 border-2 border-gray-300 cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-300 cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-green-500 border-2 border-gray-300 cursor-pointer"></span>
            </div>
          </div>

          {/* Quantity + Wishlist */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className="px-3 py-1 text-lg font-bold"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4 py-1 text-lg">{quantity}</span>
              <button
                className="px-3 py-1 text-lg font-bold"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition">
              <Heart className="w-5 h-5" />
              <span>Add to Wishlist</span>
            </button>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-black transition duration-300 ease-in-out text-white font-semibold py-2 px-6 rounded-full shadow-md"
          >
            Add to Cart
          </button>


        </div>

      </div>
      <ProductTabs />
    </>
  );
}
