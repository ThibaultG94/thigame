import { create } from "zustand";

export const useMemoryStore = create((set) => ({
  score: 0,
  moves: 0,
  level: 1,
  incrementScore: (points) => set((state) => ({ score: state.score + points })),
  incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),
  incrementLevel: () => set((state) => ({ level: state.level + 1 })),
  resetGame: () => set({ score: 0, moves: 0, level: 1 }),
}));
