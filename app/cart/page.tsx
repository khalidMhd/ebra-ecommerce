"use client";

import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const total = useCartStore((state) => state.total);

  if (cart.length === 0)
    return <div className="p-8 text-center">Your cart is empty.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <ul>
        {cart.map(({ id, title, price, quantity }) => (
          <li
            key={id}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
              <p className="font-semibold text-lg">{title}</p>
              <div className="flex items-center mt-2 gap-3">
                <button
                  onClick={() => decrementQuantity(id)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="text-md">{quantity}</span>
                <button
                  onClick={() => incrementQuantity(id)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p className="mt-1 text-gray-600">
                Price: ${(price * quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="text-right font-bold mt-6 text-xl">
        Total: ${total().toFixed(2)}
      </p>
    </div>
  );
}
