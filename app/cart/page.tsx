"use client";

import { useCartStore } from "@/store/cart";
import { X } from "lucide-react";
import { useState } from "react";
import ProgressBar from "@/components/cart/progressBar";
import CouponComponent from "@/components/cart/Coupon";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const total = useCartStore((state) => state.total);

  const [shipping, setShipping] = useState(0);

  if (cart.length === 0) {
    return <div className="p-8 text-center text-xl">🛒 Your cart is empty.</div>;
  }


  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-4 text-xl text-center font-semibold mb-6">Cart</div>

      <ProgressBar />

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="hidden md:grid grid-cols-4 text-gray-500 font-medium text-sm mb-4 ">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-center">Price</span>
            <span className="text-right">Subtotal</span>
          </div>

          <hr className="my-4 border-black-500" />

          {cart.map(({ id, title, price, quantity, image }) => (
            <div key={id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-b border-gray-300 py-4">
              {/* Product Info */}
              <div className="flex gap-4 items-center">

                <img
                  src={image}
                  alt={title}
                  width={60}
                  height={50}
                  className="rounded object-cover"
                />
                <div>
                  <p className="font-medium">{title.slice(0, 10)}..</p>
                  <p className="text-sm text-gray-500">Color: Black</p>
                  <button onClick={() => removeFromCart(id)} className="text-sm text-red-500 flex items-center gap-1 mt-1 hover:underline">
                    <X size={14} /> Remove
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex justify-center md:justify-center items-center gap-2">
                <button onClick={() => decrementQuantity(id)} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">-</button>
                <span className="font-medium">{quantity}</span>
                <button onClick={() => incrementQuantity(id)} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">+</button>
              </div>

              <div className="text-center font-medium">${price.toFixed(2)}</div>
              <div className="text-right font-semibold">${(price * quantity).toFixed(2)}</div>

            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border p-6 rounded-md shadow-sm bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>

          <div className="space-y-3 mb-6">
            <label className={`block cursor-pointer rounded-md border p-3 ${shipping === 0 ? 'border-blue-600 bg-white' : 'border-gray-300'}`}>
              <input type="radio" name="shipping" value={0} checked={shipping === 0} onChange={() => setShipping(0)} className="hidden" />
              <div className="flex justify-between">
                <span>Free Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
            </label>
            <label className={`block cursor-pointer rounded-md border p-3 ${shipping === 15 ? 'border-blue-600 bg-white' : 'border-gray-300'}`}>
              <input type="radio" name="shipping" value={15} checked={shipping === 15} onChange={() => setShipping(15)} className="hidden" />
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="font-medium">$15.00</span>
              </div>
            </label>
            <label className={`block cursor-pointer rounded-md border p-3 ${shipping === 21 ? 'border-blue-600 bg-white' : 'border-gray-300'}`}>
              <input type="radio" name="shipping" value={21} checked={shipping === 21} onChange={() => setShipping(21)} className="hidden" />
              <div className="flex justify-between">
                <span>Pickup</span>
                <span className="font-medium">$21.00</span>
              </div>
            </label>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal:</span>
            <span>${total().toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-md mb-4">
            <span>Total:</span>
            <span>${(total() + shipping).toFixed(2)}</span>
          </div>

          <button className="w-full bg-black text-white py-2 rounded-md transition">Proceed to Checkout</button>
        </div>
      </div>

      <CouponComponent />
    </div>
  );
}
