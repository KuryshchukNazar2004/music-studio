// src/hooks/ColorTestStore.ts
import { create } from "zustand";

const luscherColors = [
  "blue", // глибокий спокій
  "green", // впертість, самоконтроль
  "red", // енергія, активність
  "yellow", // надія, легкість
  "violet", // чутливість, інтуїція
  "brown", // тілесність, комфорт
  "black", // заперечення, протест
  "gray", // нейтральність, уникнення
];

type ColorStats = Record<string, number>;

interface ColorTestState {
  stats: ColorStats;
  totalHits: number;
  addColor: (color: string) => void;
  getResult: () => string;
  reset: () => void;
}

export const useColorTestStore = create<ColorTestState>((set, get) => ({
  stats: luscherColors.reduce((acc, c) => ({ ...acc, [c]: 0 }), {}),
  totalHits: 0,

  addColor: (color: string) => {
    set((state) => ({
      stats: {
        ...state.stats,
        [color]: (state.stats[color] || 0) + 1,
      },
      totalHits: state.totalHits + 1,
    }));
  },

  getResult: () => {
    const sorted = Object.entries(get().stats).sort((a, b) => b[1] - a[1]);

    const [topColor] = sorted[0];

    const interpretations: Record<string, string> = {
      blue: "Ви прагнете спокою, стабільності та глибоких стосунків.",
      green: "Ви вперті, цілеспрямовані, шукаєте самоствердження.",
      red: "Ви активні, енергійні, орієнтовані на досягнення.",
      yellow: "Ви відкриті до нового, сподіваєтесь на краще.",
      violet: "Ви емоційні, чутливі, часто мрієте.",
      brown: "Для вас важливий комфорт, безпека, тілесне благополуччя.",
      black: "Ви протестуєте проти обмежень, шукаєте свободу.",
      gray: "Ви прагнете уникнення конфліктів та нейтральності.",
    };

    return interpretations[topColor] || "Недостатньо даних.";
  },

  reset: () => {
    set({
      stats: luscherColors.reduce((acc, c) => ({ ...acc, [c]: 0 }), {}),
      totalHits: 0,
    });
  },
}));
