import { create } from 'zustand';
import {
    getDetail
} from '../api/detail'

const useTourStore = create((set) => ({
  detail: {
    images:[]
  },
  loading: false,
  setDetail: async () => {
    set({loading: true})
    const res = await getDetail();
    // console.log(res);
    set({loading: false, detail:res.data});

  },
  setLoading: (flag) => set({ loading: flag })
}));

export  default useTourStore