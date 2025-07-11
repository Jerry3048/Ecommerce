import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  cartItems: [],
  wishlist: [],
  viewedItems: [],

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

  updateCartQuantity: (name, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.name === name ? { ...item, quantity } : item
      ),
    }));
  },

  removeFromCart: (name) => {
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.name !== name),
    }));
  },

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
  removeFromWishlist: (itemName) => {
  set((state) => ({
    wishlist: state.wishlist.filter((i) => i.name !== itemName),
  }));
},

  addToViewed: (item) => {
    const exists = get().viewedItems.find((i) => i.name === item.name);
    if (!exists) {
      set((state) => ({
        viewedItems: [...state.viewedItems, item],
      }));
    }
  },
}));

export default useAuthStore;