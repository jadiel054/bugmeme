import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "BugMeme — Gerador de Memes de Tech que Não Funciona",
  description:
    "Crie desculpas de programador + respostas de IA em loop. Animações reativas, GIF e figurinhas. Feito com ódio de deploy na sexta.",
  openGraph: {
    title: "BugMeme",
    description: "Gerador de memes de tech que não funciona",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${space.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background antialiased selection:bg-fuchsia-500/30">
        {children}
      </body>
    </html>
  );
}
