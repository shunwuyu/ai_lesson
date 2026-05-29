import { create } from 'zustand';
import { getBanners } from '../api/home';

const useHomeStore = create((set) => ({
  banners: [],
  loading: false,
  error: null,
  fetchBanners: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getBanners();
      set({ banners: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));

export default useHomeStore