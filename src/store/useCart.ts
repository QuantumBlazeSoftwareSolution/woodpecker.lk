import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  woodType: string;
  size: string;
  quantity: number;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, woodType: string, size: string) => void;
  updateQuantity: (id: string, woodType: string, size: string, quantity: number) => void;
  toggleCart: (force?: boolean) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  cartItems: [],
  isOpen: false,
  addToCart: (item) =>
    set((state) => {
      const existingIndex = state.cartItems.findIndex(
        (i) =>
          i.id === item.id &&
          i.woodType === item.woodType &&
          i.size === item.size
      );

      if (existingIndex > -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[existingIndex].quantity += 1;
        return { cartItems: updatedItems, isOpen: true };
      }

      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        isOpen: true,
      };
    }),
  removeFromCart: (id, woodType, size) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (i) => !(i.id === id && i.woodType === woodType && i.size === size)
      ),
    })),
  updateQuantity: (id, woodType, size, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cartItems: state.cartItems.filter(
            (i) => !(i.id === id && i.woodType === woodType && i.size === size)
          ),
        };
      }
      return {
        cartItems: state.cartItems.map((i) =>
          i.id === id && i.woodType === woodType && i.size === size
            ? { ...i, quantity }
            : i
        ),
      };
    }),
  toggleCart: (force) =>
    set((state) => ({ isOpen: force !== undefined ? force : !state.isOpen })),
  clearCart: () => set({ cartItems: [] }),
}));
