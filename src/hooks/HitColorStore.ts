import { create } from "zustand";

type ColorStore = {
  colors: string[];
  addColor: (color: string) => void;
};

export const useColorStore = create<ColorStore>((set) => ({
  colors: [],
  addColor: (color) =>
    set((state) => ({
      colors: [color, ...state.colors.slice(0, 4)],
    })),
}));
