import { create } from 'zustand'

interface ResultStore {
  result: string
  setResult: (result: string) => void
}

export const useResult = create<ResultStore>((set) => ({
  result: '',
  setResult: (result) => set(() => ({ result })),
}))
