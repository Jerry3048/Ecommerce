import { create } from 'zustand';

// Zustand store for managing user authentication, cart, wishlist,
export const useAuthStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

 

  cartItems: [],
  wishlist: [],
  viewedItems: [],


  // Cart Operations
  // Add product to cart (increase quantity if already in cart)
  addToCart: (item) => {
    const existingItem = get().cartItems.find((i) => i.name === item.name);
    if (existingItem) {
      set((state) => ({
        cartItems: state.cartItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      }));
    }
  },

  // Update quantity of item in cart
  updateCartQuantity: (name, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.name === name ? { ...item, quantity } : item
      ),
    }));
  },

  // Remove item from cart by name
  removeFromCart: (name) => {
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.name !== name),
    }));
  },

  // ------------------------
  // Wishlist Operations
  // ------------------------

  // Toggle item in wishlist (add if not exists, remove if exists)
  toggleWishlist: (item) => {
    set((state) => {
      const exists = state.wishlist.find((i) => i.name === item.name);
      if (exists) {
        return {
          wishlist: state.wishlist.filter((i) => i.name !== item.name),
        };
      } else {
        return {
          wishlist: [...state.wishlist, item],
        };
      }
    });
  },

  // Remove item from wishlist by name
  removeFromWishlist: (itemName) => {
    set((state) => ({
      wishlist: state.wishlist.filter((i) => i.name !== itemName),
    }));
  },
}));

export default useAuthStore;