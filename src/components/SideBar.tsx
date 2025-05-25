"use client";

import useThemeStore from "@/store/theme";
import {
  Box,
  Button,
  createTheme,
  FormControlLabel,
  Stack,
  Switch,
  ThemeProvider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function SideBar({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { theme, switchTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const menuItems = [
    { label: "Главная", key: "/", onClick: () => router.push("/") },
    {
      label: "Информация",
      key: "/info",
      onClick: () => router.push("/info"),
    },
  ];

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

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Box sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
        <Stack sx={{ height: "100vh" }} direction="row" spacing={1} p={1}>
          {/* Левая панель */}
          <Box
            sx={{
              padding: 1,
              width: "15vw",
              borderRadius: 3,
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <Stack direction="column" spacing={1}>
              {menuItems.map((item) => (
                <Button
                  onClick={item.onClick}
                  key={item.key}
                  sx={{ width: "100%" }}
                  variant="outlined"
                >
                  {item.label}
                </Button>
              ))}

              {/* Переключатель темы */}
            </Stack>
            {/* Уменьшить height, если не будет хватать места */}
            <Stack height={"85%"} direction={"column"} justifyContent={"end"}>
              <FormControlLabel
                control={
                  <Switch
                    checked={theme === "dark"}
                    onChange={() => switchTheme()}
                  />
                }
                label="Темная тема"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              />
            </Stack>
          </Box>

          {/* Основной контент */}
          <Box
            sx={{
              padding: 1,
              width: "84vw",
              borderRadius: 3,
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            {children}
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
