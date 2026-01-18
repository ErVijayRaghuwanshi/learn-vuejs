import apiClient from '@/api/client';

export const InstagramService = {
  // GET /instagram/ping
  async ping() {
    const { data } = await apiClient.get('/instagram/ping');
    return data.message;
  },

  // GET /instagram/userinfo?username=...
  async getUserInfo(username) {
    const { data } = await apiClient.get(`/instagram/userinfo`, {
      params: { username }
    });
    // We return only the 'user' object to simplify things for the UI
    return data.data.user;
  }
};