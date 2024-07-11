import { defineStore } from "pinia";
import { ApiService } from "../services/ApiService";

const useAuthStore = defineStore({
  id: "auth",

  // State
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  // Getters
  getters: {
    getUser() {
      return this.user;
    },

    isAuthenticated() {
      return this.isAuthenticated;
    },
  },

  // Actions
  actions: {
    async login(credentials) {
      this.loading = true;
      try {
        const user = await ApiService.post("/login", credentials);
        this.user = user;
        this.isAuthenticated = true;
        this.loading = false;
        this.setUserToLocalStorage();
        this.error = null; // Reset error state on success
      } catch (error) {
        this.error = error.message || "Failed to login";
        this.isAuthenticated = false; // Ensure user is not authenticated on failure
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await ApiService.logout(); // Assuming ApiService has a logout method
        this.user = null;
        this.isAuthenticated = false;
        this.loading = false;
        this.error = null; // Reset error state on success
        localStorage.removeItem("user");
      } catch (error) {
        this.error = error.message || "Failed to logout";
        this.loading = false;
      }
    },
    setUserToLocalStorage() {
      localStorage.setItem("user", JSON.stringify(this.user));
    }
},
});

export default useAuthStore;
