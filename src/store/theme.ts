import { create } from "zustand";

type ThemeStore = {
  theme: string;
  switchTheme: () => void;
};

export enum ThemeEnum {
  light = "light",
  dark = "dark",
}

const useThemeStore = create<ThemeStore>()((set) => ({
  theme: ThemeEnum.dark,
  switchTheme: () =>
    set((state) => ({
      theme: state.theme === ThemeEnum.dark ? ThemeEnum.light : ThemeEnum.dark,
    })),
}));

export default useThemeStore;
