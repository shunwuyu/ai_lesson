import { create } from 'zustand'
import {
    getImages
} from '../api/home'

export const useImageStore = create((set, get) => ({
    images: [],
    page: 1,
    loading: false,
    fetchMore: async () => {
    // console.log('-----')
      if (get().loading) return
      set({ loading: true })
      const newImages = await getImages(get().page)
    //   console.log(newImages, '??????')
      set((state) => ({
        images: [...state.images, ...newImages],
        page: state.page + 1,
        loading: false
      }))
    }
}))