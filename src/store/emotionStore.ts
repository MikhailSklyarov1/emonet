import { create } from "zustand";

export type ModelId =
  | "deepseek/deepseek-r1-distill-qwen-32b:free"
  | "google/gemini-2.5-pro-exp-03-25:free"
  | "mistralai/mistral-small-3.1-24b-instruct:free";

type EmotionStore = {
  text: string;
  emotion: string | null;
  model: ModelId;
  setText: (text: string) => void;
  setEmotion: (emotion: string | null) => void;
  setModel: (model: ModelId) => void;
};

const useEmotionStore = create<EmotionStore>((set) => ({
  text: "",
  emotion: null,
  model: "deepseek/deepseek-r1-distill-qwen-32b:free",
  setText: (text) => set({ text }),
  setEmotion: (emotion) => set({ emotion }),
  setModel: (model) => set({ model }),
}));

export default useEmotionStore;

