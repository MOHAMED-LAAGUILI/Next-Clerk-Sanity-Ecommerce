import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Products } from "../../sanity.types";

export interface BasketItem {
  product: Products; 
  quantity: number;  
}

export interface BasketState {
  items: BasketItem[];           
  addItem: (product: Products) => void; 
  removeItem: (productId: string) => void; 
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist((set, get) => ({
    items: [], // Initialize the items as an empty array
    
    // Add item to the basket
    addItem: (product: Products) => {
      set((state) => {
        const existingItem = state.items.find(item => item.product._id === product._id);
        
        if (existingItem) {
          existingItem.quantity += 1; // If the product exists, increase its quantity by 1
        } else {
          state.items.push({ product, quantity: 1 }); // Otherwise, add the product with quantity 1
        }
        return { items: [...state.items] }; // Update the state
      });
    },
    
    // Remove item from the basket (decrease quantity by 1)
    removeItem: (productId: string) => {
      set((state) => {
        const updatedItems = state.items.map(item => {
          if (item.product._id === productId) {
            // If the item quantity is greater than 1, just decrease by 1
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              // Otherwise, remove the item entirely if the quantity is 1
              return null;
            }
          }
          return item;
        }).filter(item => item !== null); // Remove null values (items that were removed)
        
        return { items: updatedItems };
      });
    },

    // Clear all items in the basket
    clearBasket: () => {
      set({ items: [] });
    },

    // Calculate the total price of all items in the basket
    getTotalPrice: () => {
      return get().items.reduce((total, item) => {
        return total + ((item.product.price ?? 0) * item.quantity); // Handle undefined price
      }, 0);
    },

    // Get the quantity of a specific item by its productId
    getItemCount: (productId: string) => {
      const item = get().items.find(item => item.product._id === productId);
      return item ? item.quantity : 0;
    },

    // Group items by product, consolidating quantity
    getGroupedItems: () => {
      return get().items.reduce((groupedItems, item) => {
        const existingItem = groupedItems.find(group => group.product._id === item.product._id);
        
        if (existingItem) {
          existingItem.quantity += item.quantity; // Combine quantities if the same product
        } else {
          groupedItems.push({ ...item });
        }
        
        return groupedItems;
      }, [] as BasketItem[]);
    }
  }), { name: "basket-storage" }) // Persist the store to localStorage or sessionStorage
);

export default useBasketStore;
