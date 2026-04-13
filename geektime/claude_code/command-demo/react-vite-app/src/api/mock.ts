// Mock API with simulated data
const DELAY = 500; // Simulate network delay

// Helper function to simulate async delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const mockUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'User' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor' },
];

let users = [...mockUsers];

// Mock API functions
export const mockApi = {
  // Get all users
  getUsers: async () => {
    await delay(DELAY);
    return [...users];
  },

  // Get user by ID
  getUserById: async (id: number) => {
    await delay(DELAY);
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  },

  // Create new user
  createUser: async (userData: Omit<User, 'id'>) => {
    await delay(DELAY);
    const newUser = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      ...userData,
    };
    users.push(newUser);
    return newUser;
  },

  // Update user
  updateUser: async (id: number, userData: Partial<User>) => {
    await delay(DELAY);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    users[index] = { ...users[index], ...userData };
    return users[index];
  },

  // Delete user
  deleteUser: async (id: number) => {
    await delay(DELAY);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    users.splice(index, 1);
    return { success: true };
  },

  // Reset mock data
  resetData: async () => {
    await delay(DELAY);
    users = [...mockUsers];
    return [...users];
  },
};

// TypeScript types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default mockApi;
