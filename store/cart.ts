import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  total: () => number;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingIndex = state.cart.findIndex((p) => p.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += 1;
        return { cart: newCart };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),

  incrementQuantity: (productId: number) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { cart: newCart };
    }),

  decrementQuantity: (productId: number) =>
    set((state) => {
      const newCart = state.cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // auto-remove if 0
      return { cart: newCart };
    }),

  total: () =>
    get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

