// components/ThemeRegistry.tsx
"use client";

import { createContext, useContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import useThemeStore from "@/store/theme";

// Темы
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f5f5f5", paper: "#fff" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: { default: "#121212", paper: "#171a1a" },
  },
});

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>;
}

export const useTheme = () => useContext(ThemeContext);
