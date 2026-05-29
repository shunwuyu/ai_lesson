import { create } from 'zustand';
import { ask } from '@/api/rag';

interface RagState {
  question: string;
  answer: string;
  setQuestion: (question: string) => void;
  setAnswer: (answer: string) => void;
  retrieve: () => Promise<void>;
}

export const useRagStore = create<RagState>((set, get) => ({
  question: '',
  answer: '',
  setQuestion: (question: string) => set({ question }),
  setAnswer: (answer: string) => set({ answer }),
  retrieve: async () => {
    
    const { question } = get();
    const res = await ask(question);
    console.log(res);
    set({ answer: res.data.answer });
  },
}))
