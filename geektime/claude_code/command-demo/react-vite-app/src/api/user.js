// User API service
const API_BASE = '/api';

export const userApi = {
  // Get user list
  getUsers: async () => {
    const response = await fetch(`${API_BASE}/users`);
    return response.json();
  },

  // Get user by id
  getUserById: async (id) => {
    const response = await fetch(`${API_BASE}/users/${id}`);
    return response.json();
  },

  // Create user
  createUser: async (userData) => {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
};
