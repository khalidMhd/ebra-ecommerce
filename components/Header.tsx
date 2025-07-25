"use client";

import { useCartStore } from '@/store/cart';
import { ShoppingCart, User, Search } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
const cartCount = useCartStore((state) =>
  state.cart.reduce((total, item) => total + item.quantity, 0)
);

  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md">
      <div className="text-2xl font-bold">Ibraa</div>
      <nav className="flex space-x-6">
        <Link href="/" className="text-blue-600 font-semibold">Home</Link>
        <Link href="/shop" className="hover:text-blue-600">Shop</Link>
        <Link href="/product" className="hover:text-blue-600">Product</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
      </nav>
      <div className="flex space-x-4">
        <Search className="cursor-pointer" />
        <User className="cursor-pointer" />
        <div className="relative">
          <Link href={`/cart`}>
            <ShoppingCart className="cursor-pointer" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}