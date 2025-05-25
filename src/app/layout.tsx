import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import { ThemeRegistry } from "@/components/ThemeRegistry";

// Шрифты
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Метаданные
export const metadata: Metadata = {
  title: "Emonet",
  description: "Приложение для распознавания эмоций в тексте",
};

// Компонент RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <ThemeRegistry>
          <SideBar>{children}</SideBar>
        </ThemeRegistry>
      </body>
    </html>
  );
}
