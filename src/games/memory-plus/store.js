import { create } from "zustand";

export const useMemoryStore = create((set) => ({
  score: 0,
  gameStatus: "menu", // menu, playing, gameover, paused
  incrementScore: () => set((state) => ({ score: state.score + 10 })),
  setGameStatus: (status) => set({ gameStatus: status }),
  resetGame: () => set({ score: 0, gameStatus: "menu" }),
}));
