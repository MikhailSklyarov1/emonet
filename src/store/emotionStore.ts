import { create } from "zustand";

export type ModelId =
  | "deepseek/deepseek-r1-distill-qwen-32b:free"
  | "google/gemini-2.5-pro-exp-03-25:free"
  | "mistralai/mistral-small-3.1-24b-instruct:free";

export type Lang = "ru" | "en";

export type Vote = { model: string; emotion: string; weight: number | string; category: string };

type EmotionStore = {
  text: string;
  emotion: string | null;
  votes: Vote[] | null;
  model: ModelId;
  lang: Lang;
  setText: (text: string) => void;
  setEmotion: (emotion: string | null) => void;
  setVotes: (votes: Vote[] | null) => void,
  setModel: (model: ModelId) => void;
  setLang: (lang: Lang) => void;
};

const useEmotionStore = create<EmotionStore>((set) => ({
  text: "",
  emotion: null,
  model: "deepseek/deepseek-r1-distill-qwen-32b:free",
  votes: null,
  lang: "ru",
  setText: (text) => set({ text }),
  setEmotion: (emotion) => set({ emotion }),
  setVotes: (votes) => set({votes}),
  setModel: (model) => set({ model }),
  setLang: (lang) => set({ lang }),
}));

export default useEmotionStore;
