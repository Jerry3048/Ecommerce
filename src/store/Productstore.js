import { create } from "zustand";
import axios from "axios";


const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getBatches = (arr, size) => {
    const batches = [];
    for (let i = 0; i < arr.length; i += size) {
      batches.push(arr.slice(i, i + size));
    }
    return batches;
  };

export const useProductStore = create((set, get) => ({
  products: [],
  selectedProduct: null,

  flashDetails: [],
  flashCurrentBatch: [],
  flashBatchIndex: 0,

  monthCurrentBatch: [],
  monthSingleBatch: [],

  productDetails: [],
  productCurrentBatch: [],
  productBatchIndex: 0,
  

  allItems: [],
  loading: false,
  error: null,

  fetchProducts: async (url) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(url);
      const data = res.data;

      const flash = getBatches(shuffleArray(data), 8);
      const month = getBatches(shuffleArray(data), 4);
      const single = getBatches(shuffleArray(data), 1);
      const products = getBatches(shuffleArray(data), 8);

      set({
        products: data,
        flashDetails: flash,
        flashCurrentBatch: flash[0] || [],
        flashBatchIndex: 0,

        monthCurrentBatch: month[0] || [],
        monthSingleBatch: single[0] || [],

        productDetails: products,
        productCurrentBatch: products[0] || [],
        productBatchIndex: 0,
        selectedProduct: products,

        AllItems: data,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  // Flash Navigation
  nextFlashBatch: () => {
    const { flashBatchIndex, flashDetails } = get();
    const next = (flashBatchIndex + 1) % flashDetails.length;
    set({
      flashBatchIndex: next,
      flashCurrentBatch: flashDetails[next],
    });
  },

  prevFlashBatch: () => {
    const { flashBatchIndex, flashDetails } = get();
    const prev = (flashBatchIndex - 1 + flashDetails.length) % flashDetails.length;
    set({
      flashBatchIndex: prev,
      flashCurrentBatch: flashDetails[prev],
    });
  },

  // Product Navigation
  nextProductBatch: () => {
    const { productBatchIndex, productDetails } = get();
    const next = (productBatchIndex + 1) % productDetails.length;
    set({
      productBatchIndex: next,
      productCurrentBatch: productDetails[next],
    });
  },

  prevProductBatch: () => {
    const { productBatchIndex, productDetails } = get();
    const prev = (productBatchIndex - 1 + productDetails.length) % productDetails.length;
    set({
      productBatchIndex: prev,
      productCurrentBatch: productDetails[prev],
    });
  },
}));