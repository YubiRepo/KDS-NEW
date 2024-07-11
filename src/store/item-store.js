import ApiService from "@/services/ApiService";
import { defineStore } from "pinia";

const useItemStore = defineStore({
  id: "item",

  // State
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  // Getters
  getters: {
    getItems() {
      return this.items;
    },
  },

  // Actions
  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        console.log("fetching items");
        const items = await ApiService.get("/master/item");
        this.items = items;
        this.loading = false;
        this.error = null; // Reset error state on success
      } catch (error) {
        this.error = error.message || "Failed to fetch items";
        this.loading = false;
      }
    },

    async createItem(itemData) {
      this.loading = true;
      try {
        const newItem = await ApiService.post("/items", itemData);
        this.items.push(newItem); // Assuming newItem has an ID assigned by the server
        this.loading = false;
        this.error = null; // Reset error state on success
      } catch (error) {
        this.error = error.message || "Failed to create item";
        this.loading = false;
      }
    },

    async updateItem(itemData) {
      this.loading = true;
      try {
        const updatedItem = await ApiService.put(`/items/${itemData.id}`, itemData);
        const index = this.items.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
        this.loading = false;
        this.error = null; // Reset error state on success
      } catch (error) {
        this.error = error.message || "Failed to update item";
        this.loading = false;
      }
    },

    async deleteItem(itemId) {
      this.loading = true;
      try {
        await ApiService.delete(`/items/${itemId}`);
        this.items = this.items.filter(item => item.id !== itemId);
        this.loading = false;
        this.error = null; // Reset error state on success
      } catch (error) {
        this.error = error.message || "Failed to delete item";
        this.loading = false;
      }
    },

    // Add more actions as needed (fetchItem, etc.)
  },
});

export default useItemStore;
