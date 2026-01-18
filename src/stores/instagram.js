import { defineStore } from 'pinia';
import { InstagramService } from '@/services/InstagramService';

export const useInstagramStore = defineStore('instagram', {
  state: () => ({
    currentUser: null,
    loading: false,
    error: null
  }),
  actions: {
    async searchUser(username) {
      this.loading = true;
      this.error = null;
      try {
        this.currentUser = await InstagramService.getUserInfo(username);
      } catch (err) {
        this.error = "User not found or API error";
        this.currentUser = null;
      } finally {
        this.loading = false;
      }
    }
  }
});