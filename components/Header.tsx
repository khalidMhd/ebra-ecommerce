"use client";

import { useCartStore } from '@/store/cart';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md relative z-50 bg-white">
      {/* Logo */}
      <div className="text-2xl font-bold">Ibraa</div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="text-blue-600 font-semibold">Home</Link>
        <Link href="/shop" className="hover:text-blue-600">Shop</Link>
        <Link href="/product" className="hover:text-blue-600">Product</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
      </nav>

      {/* Desktop Icons */}
      <div className="hidden md:flex space-x-4">
        <Search className="cursor-pointer" />
        <User className="cursor-pointer" />
        <div className="relative">
          <Link href={`/cart`}>
            <ShoppingCart className="cursor-pointer" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col space-y-4 md:hidden">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-blue-600 font-semibold">Home</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Shop</Link>
          <Link href="/product" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Product</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Contact Us</Link>

          <div className="flex space-x-4 pt-2 border-t">
            <Search className="cursor-pointer" />
            <User className="cursor-pointer" />
            <div className="relative">
              <Link href={`/cart`} onClick={() => setMobileMenuOpen(false)}>
                <ShoppingCart className="cursor-pointer" />
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
