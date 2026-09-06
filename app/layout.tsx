import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "BugMeme — Gerador de memes e desculpas absurdas",
  description:
    "Crie memes de tech, futebol, trabalho, relacionamento e mais. Modo personalizado, download e compartilhamento.",
  openGraph: {
    title: "BugMeme",
    description: "Gerador de memes e desculpas absurdas",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${space.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-[#07070b] antialiased selection:bg-fuchsia-500/30 pb-16">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
